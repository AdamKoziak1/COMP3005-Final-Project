<script>
    import Footnote from '../../components/Footnote.svelte';
    import Link from '../../components/Link.svelte';
</script>

<div class='banner'>
    <Footnote text='Your are signed in to the admin account.'/>
    <Link linkText='View the admin console' linkRoute='/admin' style='margin-left: 1rem;'/>
</div>

<style>
    /* core classes */
    .banner {
        display: flex;
        padding: 0.25rem 10%;
        align-items: center;

        border-bottom: 1px solid var(--background-medium);
        background: var(--background-light);
    }
</style>