<script>
    import { user } from '../../stores';
    import * as http from '../../http';
    import Header from '../../components/Header.svelte';
    import Card from '../../components/Card.svelte';
    import { afterUpdate, onMount } from 'svelte';
    import * as Feather from 'feather-icons';
    import Footnote from '../../components/Footnote.svelte';

    let books = null;
    onMount(async () => {
        books = await http.getAllBooks();
        for (let i = 0; i < books.length; i++) {
            let author = await http.getAuthor(books[i].idAuthor);
            let publisher = await http.getPublisher(books[i].idPublisher);
            books[i] = {...books[i], author, publisher};
        }
    });
    afterUpdate(() => Feather.replace());

    let search = '';
</script>

{#if $user}
    <Header text={`Hello ${$user.firstName}, welcome to the bookstore.`}/>
{:else}
    <Header text={`Hello, welcome to the bookstore.`}/>
{/if}

<input bind:value={search} id='' placeholder='Search' class='search'/>
<Footnote text='Search is supported for book title, genre, ISBN, author name, or publishing house name.' style='margin-top: 1rem;'/>

{#if books}
    <div class='books-container'>
        {#each books as book}
            {#if book.title.toLowerCase().includes(search.toLowerCase()) ||
                 book.author.name.toLowerCase().includes(search.toLowerCase()) ||
                 book.publisher.name.toLowerCase().includes(search.toLowerCase()) ||
                 book.ISBN.includes(search.toLowerCase()) ||
                 book.genre.toLowerCase().includes(search.toLowerCase())}
                <Card 
                    icon='book'
                    toast={`${book.customerPrice} | Stock: ${book.stock}`}
                    toastStatus='success'
                    title={book.title}
                    description={`${book.title} is a ${book.genre.toLowerCase()} novel that is marked by the international standard book number ${book.ISBN}.`}
                    linkText={`Read more about ${book.title}`}
                    linkRoute={`/book/${book.ISBN}`}>
                </Card>
            {/if}
        {/each}
    </div>
{/if}

<style>
    .books-container {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        column-gap: 1rem;
        row-gap: 1rem;
        margin-top: 2rem;
        width: 100%;
    }
    .search {
        min-width: 16rem;
        padding: 0.25rem 1rem;
        margin: 0px;
        margin-top: 2rem;
        height: 2rem;

        color: var(--text-medium);
        font-size: 0.75rem;
        font-weight: 300;
        border: 1px solid var(--background-medium);
        border-radius: 5px;
        background: white;
    }
    .search:focus {
        outline: none !important;
        border: 1px solid var(--primary);
    }
</style>