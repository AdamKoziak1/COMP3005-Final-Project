<script>
    import { afterUpdate, onMount } from 'svelte';
    import { user, activeBook, shoppingCart } from '../../stores';
    import * as http from '../../http';
    import * as Feather from 'feather-icons';
    import Card from '../../components/Card.svelte';
    import Button from '../../components/Button.svelte';
    import Header from '../../components/Header.svelte';
    import Body from '../../components/Body.svelte';
    import Input from '../../components/Input.svelte';
    import page from 'page';

    let book = null;
    let author = null;
    let publisher = null;

    afterUpdate(() => Feather.replace());

    onMount(async () => {
        book = await http.getBook($activeBook);
        author = await http.getAuthor(book.idAuthor);
        publisher = await http.getPublisher(book.idPublisher);
        getReviews();
    });

    async function deleteBook(isbn) {
        await http.adminDeleteBook(isbn);
        page('/');
    }

    async function addReview(event) {
        await http.addReview(
            $activeBook,
            $user.idUser,
            event.target.rating.value,
            event.target.review.value
        );
        getReviews();
        alert('Added review');
    }

    let reviews = [];
    async function getReviews() {
        reviews = await http.getReviews($activeBook);
        for (let i = 0; i < reviews.length; i++) {
            let user = await http.getUserName(reviews[i].idUser);
            reviews[i] = {...reviews[i], ...user[0]};
        }
        reviews = reviews;
    }
    $: console.log(reviews);
</script>

<Button text='Back' icon='arrow-left' on:submit={() => history.back()}/>
<div class='section'>
    {#if book}
        <Card 
            header='Book Information'
            toast={`Customer price: ${book.customerPrice} | Bulk price: ${book.bulkCost}`}
            toastStatus='success'
            title={book.title}
            description={`${book.title} is a ${book.genre.toLowerCase()} novel that is marked by the international standard book number ${book.ISBN}.`}
            style='margin-top: 2rem;'>
            <div style='display: flex; margin-top: 1rem;'>
                {#if $user && $shoppingCart[book.ISBN]}
                    <Button text='Remove from cart' icon='shopping-cart' on:submit={() => {$shoppingCart[book.ISBN] = 0; sessionStorage.setItem('cart', JSON.stringify($shoppingCart))}}/>
                {:else if $user}
                    <Button text='Add to cart' icon='shopping-cart' on:submit={() => {($shoppingCart[book.ISBN] ? $shoppingCart[book.ISBN] = $shoppingCart[book.ISBN] + 1 : $shoppingCart[book.ISBN] = 1); sessionStorage.setItem('cart', JSON.stringify($shoppingCart))}}/>
                {/if}
                {#if $user && $user.email == 'admin@admin.com'}
                    <Button style='margin-left: 1rem;' text='Delete book (only visible to admin)' icon='delete' on:submit={() => deleteBook(book.ISBN)}/>
                {/if}
            </div>
        </Card>
    {/if}

    {#if author}
        <Card 
            header='Author Information'
            icon={'edit'}
            title={author.name}
            description={`${author.name} lives at ${author.address} and can be reached at ${author.email} or ${author.phoneNumber}. ${author.name}'s banking number is ${author.bankingAccount}.`}
            style='margin-top: 2rem;'/>
    {/if}

    {#if publisher}
        <Card 
            header='Publisher Information'
            icon={'paperclip'}
            title={publisher.name}
            description={`${publisher.name} is located at ${publisher.address} and can be reached at ${publisher.email} or ${publisher.phoneNumber}. ${publisher.name}'s banking number is ${publisher.bankingAccount}.`}
            style='margin-top: 2rem;'/>
    {/if}
</div>

<Header text='Reviews' style='margin-top: 2rem;'/>

{#if $user}
    <form on:submit|preventDefault={addReview} style='margin-bottom: 2rem;'>
        <input type='number' id='rating' name='rating' placeholder='Rating' min='1' max='5' style='margin-top: 1rem; max-width: 400px;'/>
        <Input id='review' text='Review' style='margin-top: 1rem; margin-left: 1rem; max-width: 400px;'/>
        <Button text='Add review' icon='edit' style='margin-top: 1rem; margin-left: 1rem; max-width: 434px; justify-content: center;'/>
    </form>
{/if}

{#each reviews as review}
    <Body text={`${review.firstName} ${review.lastName} -- ${review.rating}/5 -- ${review.review}`} style='margin-top: 1rem;'/>
{/each}

<style>
    .section {
        display: grid;
        grid-template-columns: 2fr 1fr 1fr;
        column-gap: 1rem;
    }
    form {
        display: flex;
        flex-direction: row;
    }
    input {
        min-width: 16rem;
        padding: 0.25rem 1rem;
        margin: 0px;
        height: 2rem;

        color: var(--text-medium);
        font-size: 0.75rem;
        font-weight: 300;
        border: 1px solid var(--background-medium);
        border-radius: 5px;
        background: white;
    }
    input:focus {
        outline: none !important;
        border: 1px solid var(--primary);
    }
</style>