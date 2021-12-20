<script>
    import page from 'page';

    export let linkText;
    export let linkRoute;

    export let style = '';
</script>

<div class='link' style={style} on:click={() => page(linkRoute)}>
    {linkText}
    <i class='feather-icon' data-feather='arrow-right'/>
</div>

<style>
    .link {
        /* link content positioning */
        display: flex;
        padding: 0.25rem 1rem 0.25rem 0rem;
        align-items: center;
        width: fit-content;

        /* font settings */
        font-family: 'Roboto', sans-serif;
        font-size: 0.75rem;
        font-weight: 300;
        color: var(--primary);

        cursor: pointer;
        transition: all 0.5s;
    }

    .feather-icon {
        margin-left: 0.5rem;
        color: var(--primary);
    }

    /* hover events */
    .link:hover .feather-icon {
        transform: translateX(0.5rem);
    }
</style>