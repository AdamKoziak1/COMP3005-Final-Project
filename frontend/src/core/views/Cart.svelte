<script>
    import { user, shoppingCart } from '../../stores';
    import * as http from '../../http';
    import Header from '../../components/Header.svelte';
    import Button from '../../components/Button.svelte';
    import Card from '../../components/Card.svelte';
    import { afterUpdate, onMount } from 'svelte';
    import * as Feather from 'feather-icons';
    import Input from '../../components/Input.svelte';
    import moment from 'moment';

    let cartBooks = [];
    onMount(async () => await getCartBooks());

    async function getCartBooks() {
        if (sessionStorage.getItem('cart')) {
            cartBooks = [];
            for (let item of Object.keys(JSON.parse(sessionStorage.getItem('cart')))) {
                if (JSON.parse(sessionStorage.getItem('cart'))[item] > 0) {
                    cartBooks.push(await http.getBook(item));
                    cartBooks = cartBooks;
                }
            }
        }
    }

    afterUpdate(() => Feather.replace());

    async function checkout(event) {
        let quantities = JSON.parse(sessionStorage.getItem('cart'));
        let count = 0;
        for (let item of cartBooks) {
            let res = await http.checkItemStock(item.ISBN, quantities[item.ISBN]);
            if (res.length > 0)
                count += 1;
        }

        if (count < cartBooks.length) {
            alert('Some of the books you selected are not in stock');
            return;
        }

        let date = moment().format('YYYY-MM-DD');
        let total = 0;
        for (let book of cartBooks)
            total += parseFloat(book.customerPrice.substring(1)) * $shoppingCart[book.ISBN];

        let order = await http.addOrder(
            $user.idUser,
            'Order Placed',
            date,
            total,
            event.target.shipping.value,
            event.target.billing.value
        );

        for (let item of cartBooks) {
            await http.addOrderItem(
                item.ISBN,
                order.idOrder,
                quantities[item.ISBN],
                item.customerPrice,
                item.bulkCost
            );
        }

        shoppingCart.set({});
        sessionStorage.removeItem('cart');
        cartBooks = [];
        alert('Placed order');
    }
</script>

{#if $user}
    <Header text={`Hello ${$user.firstName}, this is your shopping cart.`}/>
{:else}
    <Header text={`Hello, this is your shopping cart.`}/>
{/if}

<!-- idUser, status, datePlaced, total, shipping, billing -->
{#if $user}
    <form on:submit|preventDefault={checkout} style='margin-top: 2rem; display: flex;'>
        <Input id='shipping' text='Shipping Address' style='margin-right: 1rem; max-width: 400px;'/>
        <Input id='billing' text='Billing Address' style='margin-right: 1rem; max-width: 400px;'/>
        <Button text='Place order' icon='shopping-bag' style='justify-content: center;'/>
    </form>
{/if}

<div class='books-container'>
    {#each cartBooks as book}
        <Card
            toast={`Quantity: ${JSON.parse(sessionStorage.getItem('cart'))[book.ISBN]} out of ${book.stock}`}
            toastStatus='info'
            title={book.title}>
            <div style='display: flex; margin-top: 1rem;'>
                <Button style='margin-right: 1rem;' text='Increment' icon='plus' on:submit={() => {
                    $shoppingCart[book.ISBN] = $shoppingCart[book.ISBN] + 1
                    sessionStorage.setItem('cart', JSON.stringify($shoppingCart));
                    sessionStorage.getItem('cart');
                    getCartBooks();
                }}/>
                <Button style='margin-right: 1rem;' text='Decrement' icon='minus' on:submit={() => {
                    $shoppingCart[book.ISBN] = $shoppingCart[book.ISBN] - 1
                    sessionStorage.setItem('cart', JSON.stringify($shoppingCart));
                    sessionStorage.getItem('cart');
                    getCartBooks();
                }}/>
                <Button text='Remove' icon='trash' on:submit={() => {
                    $shoppingCart[book.ISBN] = 0
                    sessionStorage.setItem('cart', JSON.stringify($shoppingCart));
                    sessionStorage.getItem('cart');
                    getCartBooks();
                }}/>
            </div>
        </Card>
    {/each}
</div>

<style>
    .books-container {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        column-gap: 1rem;
        row-gap: 1rem;
        margin-top: 2rem;
        width: 100%;
    }
</style>