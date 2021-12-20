<script>
    import page from 'page';
    import Button from '../../components/Button.svelte';
    import { user } from '../../stores';
</script>

<div class='navigation'>

    <!-- navigation bar links -->
    <div class='navigation-item mr' on:click={() => page('/')}>Books</div>
    
    {#if $user != null}
        <div class='navigation-item mr' on:click={() => page('/orders')}>Orders</div>
        <div class='navigation-item mr' on:click={() => page('/cart')}>Shopping Cart</div>
        <Button text='Sign out ({$user.firstName} {$user.lastName})' icon='user' style='margin-left: auto;' on:submit={() => {user.set(null); localStorage.removeItem('idUser'); page('/');}}/>
    {:else}
        <Button text='Sign in / register' icon='user' style='margin-left: auto;' on:submit={() => page('/register')}/>
    {/if}

</div>

<style>
    /* core classes */
    .navigation {
        display: flex;
        padding: 0.75rem 10%;
        align-items: center;

        border-bottom: 1px solid var(--background-medium);
        font-size: 0.75rem;
        font-weight: 300;
        background: var(--white);
    }
    .navigation-item {
        cursor: pointer;
        transition: all 0.5s;
    }
    
    /* layout classes */
    .mr { margin-right: 2rem; }
</style>