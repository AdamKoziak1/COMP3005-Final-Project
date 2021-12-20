<script>
    import { afterUpdate, onMount } from 'svelte';
    import { user } from '../../stores';
    import { getOrders, getOrderItems, getBook } from '../../http';
    import * as Feather from 'feather-icons';

    import Header from '../../components/Header.svelte';
    import Card from '../../components/Card.svelte';

    let orders = [];
    let done = false;

    onMount(async () => {
        if (localStorage.getItem('idUser'))
            orders = await getOrders(localStorage.getItem('idUser'));
        for (let i = 0; i < orders.length; i++) {
            orders[i]['items'] = await getOrderItems(orders[i].idOrder);
            orders[i]['itemsString'] = '';
            for (let j = 0; j < orders[i]['items'].length; j++) {
                let book = await getBook(orders[i]['items'][j].ISBN);
                orders[i]['items'][j] = {...orders[i]['items'][j], ...book};
                orders[i]['itemsString'] += orders[i]['items'][j].quantity + ' x ' + orders[i]['items'][j].title + ', ';
            }
        }
        done = true;
        console.log(orders);
    });

    afterUpdate(() => Feather.replace());
</script>

<Header text={`Orders for ${ $user != null ? $user.firstName + ' ' + $user.lastName : '' }`} style='margin-bottom: 2rem;'/>

<div class='books-container'>
{#if done}
    {#each orders as order}
        <Card
            header={`${order.datePlaced} (Shipping Address: ${order.shipping}, Billing Address: ${order.billing})`}
            title={`Order #${order.idOrder}`}
            description={`You spent a total of $${parseFloat(order.total).toFixed(2)} for ${order.items.length} item(s). You ordered ${order.itemsString.substring(0, order.itemsString.length - 2)}.`}
            icon='truck'
            toast={order.status}
            toastStatus='success'
            style='margin-top: 1rem;'
        />
    {/each}
{/if}
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