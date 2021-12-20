<script>
    import { afterUpdate, onMount } from 'svelte';
    import * as Feather from 'feather-icons';
    import * as http from '../../http';
    import Header from '../../components/Header.svelte';
    import Body from '../../components/Body.svelte';
    import Input from '../../components/Input.svelte';
    import Button from '../../components/Button.svelte';
    import Toast from '../../components/Toast.svelte';

    let orderItems = [];
    let sales = 0;
    let expenditures = 0;
    let profitMargin = 0;
    let profit = 0;

    let salesPerGenre = {};
    let salesPerAuthor = {};

    let booksNeedingRestock = [];
    let booksNeedingRestockDisplay = [];

    onMount(mountFunc);

    afterUpdate(() => Feather.replace());

    async function mountFunc() {
        orderItems = await http.getAllOrderItems();
        for (let item of orderItems) {
            sales += parseFloat(item.quantity) * parseFloat(item.finalItemPrice.substring(1));
            expenditures += parseFloat(item.quantity) * parseFloat(item.finalBulkCost.substring(1));
        }
        profit = sales - expenditures;
        profitMargin = profit / sales;

        for (let i = 0; i < orderItems.length; i++) {
            orderItems[i]['book'] = await http.getBook(orderItems[i].ISBN);
            orderItems[i]['author'] = await http.getAuthor(orderItems[i]['book']['idAuthor']);

            salesPerGenre[orderItems[i]['book']['genre']] ?
                salesPerGenre[orderItems[i]['book']['genre']] += parseFloat(orderItems[i].finalItemPrice.substring(1)) * parseFloat(orderItems[i].quantity) :
                salesPerGenre[orderItems[i]['book']['genre']] = parseFloat(orderItems[i].finalItemPrice.substring(1)) * parseFloat(orderItems[i].quantity);

            salesPerAuthor[orderItems[i]['author']['name']] ?
                salesPerAuthor[orderItems[i]['author']['name']] += parseFloat(orderItems[i].finalItemPrice.substring(1)) * parseFloat(orderItems[i].quantity) :
                salesPerAuthor[orderItems[i]['author']['name']] = parseFloat(orderItems[i].finalItemPrice.substring(1)) * parseFloat(orderItems[i].quantity);
        }

        booksNeedingRestock = await http.getBooksNeedingRestock();
        for (let i = 0; i < booksNeedingRestock.length; i++) {
            booksNeedingRestock[i].publisher = await http.getPublisher(booksNeedingRestock[i].idPublisher);
            booksNeedingRestock[i].restock = (await http.getRestockAmount(booksNeedingRestock[i].ISBN))[0]['SUM(quantity)'];
        }
        booksNeedingRestockDisplay = booksNeedingRestock;
    }

    async function restock(restock, isbn) {
        await http.restock(restock, isbn);
        mountFunc();
        alert('Book restocked');
    }

    async function addBook(event) {
        await http.adminAddBook(
            event.target.isbn.value,
            event.target.title.value,
            event.target.idAuthor.value,
            event.target.genre.value,
            event.target.pageCount.value,
            event.target.customerPrice.value,
            event.target.stock.value,
            event.target.bulkCost.value,
            event.target.isActive.value,
            event.target.idPublisher.value,
            event.target.releaseYear.value,
            event.target.publisherCut.value
        );
        alert('Added book');
    }

    async function addAuthor(event) {
        await http.adminAddAuthor(
            event.target.idAuthor.value,
            event.target.name.value,
            event.target.address.value,
            event.target.email.value,
            event.target.phoneNumber.value,
            event.target.bankingAccount.value
        );
        alert('Added author');
    }

    async function addPublisher(event) {
        await http.adminAddPublisher(
            event.target.idPublisher.value,
            event.target.name.value,
            event.target.address.value,
            event.target.email.value,
            event.target.phoneNumber.value,
            event.target.bankingAccount.value
        );
        alert('Added publisher');
    }
</script>

<Header text='Admin Console'/>
<Body style='max-width: 50rem; margin-top: 1rem;' text='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'/>

<div style='display: flex;'>

    <form on:submit|preventDefault={addBook}>
        <div class='section-title'>Add a Book</div>
        <Input id='isbn' text='ISBN' style='margin-top: 2rem; max-width: 400px;'/>
        <Input id='idAuthor' text='Author ID' style='margin-top: 1rem; max-width: 400px;'/>
        <Input id='idPublisher' text='Publisher ID' style='margin-top: 1rem; max-width: 400px;'/>
        <Input id='title' text='Title' style='margin-top: 1rem; max-width: 400px;'/>
        <Input id='genre' text='Genre' style='margin-top: 1rem; max-width: 400px;'/>
        <Input id='pageCount' text='Page Count' style='margin-top: 1rem; max-width: 400px;'/>
        <Input id='customerPrice' text='Customer Price' style='margin-top: 1rem; max-width: 400px;'/>
        <Input id='stock' text='Stock' style='margin-top: 1rem; max-width: 400px;'/>
        <Input id='bulkCost' text='Bulk Cost' style='margin-top: 1rem; max-width: 400px;'/>
        <Input id='isActive' text='Is Active' style='margin-top: 1rem; max-width: 400px;'/>
        <Input id='releaseYear' text='Release Year' style='margin-top: 1rem; max-width: 400px;'/>
        <Input id='publisherCut' text='Publisher Cut' style='margin-top: 1rem; max-width: 400px;'/>
        <Button text='Submit' icon='upload' style='margin-top: 1rem; max-width: 434px; justify-content: center;'/>
    </form>

    <form on:submit|preventDefault={addAuthor} style='margin-left: 2rem;'>
        <div class='section-title'>Add an Author</div>
        <Input id='idAuthor' text='ID Author' style='margin-top: 2rem; max-width: 400px;'/>
        <Input id='name' text='Name' style='margin-top: 1rem; max-width: 400px;'/>
        <Input id='address' text='Address' style='margin-top: 1rem; max-width: 400px;'/>
        <Input id='email' text='Email' style='margin-top: 1rem; max-width: 400px;'/>
        <Input id='phoneNumber' text='Phone Number' style='margin-top: 1rem; max-width: 400px;'/>
        <Input id='bankingAccount' text='Banking Account' style='margin-top: 1rem; max-width: 400px;'/>
        <Button text='Submit' icon='upload' style='margin-top: 1rem; max-width: 434px; justify-content: center;'/>
    </form>

    <form on:submit|preventDefault={addPublisher} style='margin-left: 2rem;'>
        <div class='section-title'>Add a Publisher</div>
        <Input id='idPublisher' text='ID Publisher' style='margin-top: 2rem; max-width: 400px;'/>
        <Input id='name' text='Name' style='margin-top: 1rem; max-width: 400px;'/>
        <Input id='address' text='Address' style='margin-top: 1rem; max-width: 400px;'/>
        <Input id='email' text='Email' style='margin-top: 1rem; max-width: 400px;'/>
        <Input id='phoneNumber' text='Phone Number' style='margin-top: 1rem; max-width: 400px;'/>
        <Input id='bankingAccount' text='Banking Account' style='margin-top: 1rem; max-width: 400px;'/>
        <Button text='Submit' icon='upload' style='margin-top: 1rem; max-width: 434px; justify-content: center;'/>
    </form>

</div>

<Header text='Reports' style='margin-top: 4rem;'/>
<Body style='max-width: 50rem; margin-top: 1rem;' text='The data below is generated from the Order Items table in our MySQL database. Total sales are the amount that customers have spent, cost of goods sold is the amount that the bookstore has spent, profit is amount the store has made after factoring in any relevant costs (i.e. cost of goods sold), and profit margin is the relative profitability of the bookstore.'/>

<div style='display: flex;'>

    <div>
        <div class='section-title'>Total Sales</div>
        <div style='margin-top: 1rem;'>${parseFloat(sales).toFixed(2)}</div>
    </div>

    <div style='margin-left: 4rem;'>
        <div class='section-title'>Cost of Goods Sold</div>
        <div style='margin-top: 1rem;'>${parseFloat(expenditures).toFixed(2)}</div>
    </div>

    <div style='margin-left: 4rem;'>
        <div class='section-title'>Profit</div>
        <div style='margin-top: 1rem;'>${parseFloat(profit).toFixed(2)}</div>
    </div>

    <div style='margin-left: 4rem;'>
        <div class='section-title'>Profit Margin</div>
        <div style='margin-top: 1rem;'>{(parseFloat(profitMargin) * 100).toFixed(2)}%</div>
    </div>

</div>

<div style='margin-top: 2rem;'>
    <div class='section-title' style='margin-bottom: 1rem;'>Sales per Genre</div>
    {#each Object.keys(salesPerGenre) as key}
        <Body style='margin-top: 0.5rem;' text={`${key} generated $${(parseFloat(salesPerGenre[key])).toFixed(2)} in revenue.`}/>
    {/each}
</div>

<div style='margin-top: 2rem;'>
    <div class='section-title' style='margin-bottom: 1rem;'>Sales per Author</div>
    {#each Object.keys(salesPerAuthor) as key}
        <Body style='margin-top: 0.5rem;' text={`${key} generated $${(parseFloat(salesPerAuthor[key])).toFixed(2)} in revenue.`}/>
    {/each}
</div>

<Header text='Books Requiring Restock' style='margin-top: 4rem;'/>
<Body style='max-width: 50rem; margin-top: 1rem; margin-bottom: 1rem;' text='The books below have a stock equal to or less than 10, they require to be restocked soon!'/>

{#each booksNeedingRestockDisplay as book}
    <Body style='margin-top: 2rem;' text={`${book.title} has a stock of ${book.stock} and a bulk cost of ${book.bulkCost}. Email sent to ${book.publisher.email} (${book.publisher.name}).`}/>
    <Button text={`Restock by ${book.restock} (number of times this book was purchased in the last month)`} icon='package' style='margin-top: 1rem;' on:submit={() => restock(book.restock, book.ISBN)}/>
{/each}

<style>
    form {
        display: flex;
        flex-direction: column;
    }
    .section-title {
        margin-top: 2rem;
        font-size: 1.5rem;
        font-family: 'Playfair-Display', serif;
        color: var(--text-dark);
    }
</style>