<script>
    import Subheader from './Subheader.svelte';
    import Body from './Body.svelte';
    import Toast from './Toast.svelte';
    import Link from './Link.svelte';

    export let header = null;
    export let icon = null;
    export let toast = null;
    export let toastStatus = '';
    export let title = null;
    export let description = null;
    export let linkText = null;
    export let linkRoute = null;

    export let style = '';
</script>

<div class='card' style={style}>

    {#if header}
        <div class='card-header'>
            <Body text={header}/>
        </div>
    {/if}

    <div class='content-wrapper'>
        <div class='icon-toast-wrapper'>
            {#if icon}<i class='feather-icon' data-feather='{icon}'/>{/if}
            {#if toast}<Toast text={toast} status={toastStatus} style={icon ? 'margin-left: auto;' : ''}/>{/if}
        </div>

        {#if title}<Subheader text={title} style={icon || toast ? 'margin-top: 1rem;' : ''}/>{/if}
        {#if description}<Body text={description} style='margin-top: 1rem;'/>{/if}
        <slot></slot>
        {#if linkText && linkRoute}<Link linkText={linkText} linkRoute={linkRoute} style='margin-top: 1rem;'/>{/if}
    </div>

</div>

<style>
    /* set wrapper margins */
    .content-wrapper {
        padding: 2rem;
    }

    /* core styles */
    .card {
        border: 1px solid var(--background-medium);
        border-radius: 5px;
        background: var(--white);
        transition: all 0.5s;
    }
    .card-header {
        padding: 1rem 2rem;
        background: var(--background-light);
        border-radius: 5px 5px 0px 0px;
    }
    .icon-toast-wrapper {
        display: flex;
        align-items: center;
    }
    .feather-icon {
        color: var(--primary)
    }

    /* hover events */
    /* .card:hover {
        transform: translateY(-0.25rem);
        border: 1px solid var(--primary);
    } */
</style>
