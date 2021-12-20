<script>
    import page from 'page';
	import { activeBook, user } from './stores';
    import { afterUpdate } from 'svelte';
    import * as Feather from 'feather-icons';
    
    import Banner from './core/modules/Banner.svelte';
    import Navigation from './core/modules/Navigation.svelte';
	import Book from './core/views/Book.svelte'
	import BookCollection from './core/views/BookCollection.svelte';
	import Cart from './core/views/Cart.svelte';
	import Register from './core/views/Register.svelte';
	import Orders from './core/views/Orders.svelte';
    import Admin from './core/views/Admin.svelte';

    let activeComponent;

    afterUpdate(() => Feather.replace());

    page('/', () => activeComponent = BookCollection);

    page('/cart', (ctx, next) => {
        localStorage.getItem('idUser') ? next() : page('/');
    }, () => activeComponent = Cart);

    page('/admin', (ctx, next) => {
        localStorage.getItem('idUser') && localStorage.getItem('idUser') == '447675' ? next() : page('/');
    }, () => activeComponent = Admin);

	// view individual book for provided id
    page('/book/:id', (ctx, next) => {
        activeBook.set(ctx.params.id);
        next();
    }, () => activeComponent = Book);

	// view tracking information for book with provided id
    page('/orders', (ctx, next) => {
        localStorage.getItem('idUser') ? next() : page('/');
    }, () => activeComponent = Orders);

	// register or sign in user if they do not exist
	page('/register', (ctx, next) => {
        localStorage.getItem('idUser') ? page('/') : next();
    }, () => activeComponent = Register);
	
    page.start();
</script>

{#if $user && $user.email == 'admin@admin.com'}
    <Banner/>
{/if}
<Navigation/>
<div class='activeComponent'>
    <svelte:component this={activeComponent}/>
</div>
<img class='background-lines' src='/assets/graphics/background-lines.svg' alt=''>

<style>
    .activeComponent {
        padding: 4rem 10%;
    }
    .background-lines {
        position: fixed;
        z-index: -10;
        top: 0;
        width: 100%;
    }
</style>