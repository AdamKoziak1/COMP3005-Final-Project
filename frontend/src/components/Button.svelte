<script>
    import { createEventDispatcher } from 'svelte';
    
    const dispatch = createEventDispatcher();
    const submit = () => dispatch('submit');

    export let icon;
    export let text;

    export let style = '';
    export let colour = '';
    export let disabled = false;
</script>

<button disabled={disabled} class={colour} style={style} on:click={submit}>
    <i class='feather-icon' data-feather={icon}/>
    {text}
</button>

<style>
    button {
        display: flex;
        padding: 0.5rem 1rem;
        margin: 0px;
        align-items: center;
        cursor: pointer;
        transition: all 0.5s;

        font-size: 0.75rem;
        font-weight: 300;
        color: var(--text-medium);
        border: 1px solid var(--background-medium);
        border-radius: 5px;
        background: white;
    }
    button .feather-icon {
        margin-right: 0.5rem;
    }
    button:hover {
        background: var(--background-light);
    }

    /* set primary colour style */
    .primary {
        border: 1px solid var(--primary);
        background: var(--primary);
        color: var(--white);
    }
    .primary .feather-icon {
        color: var(--white);
    }
    .primary:hover {
        background: var(--primary);
    }
    .primary:disabled {
        border: 1px solid var(--primary-muted);
        background: var(--primary-muted);
        color: var(--primary);
    }
    .primary:disabled .feather-icon {
        color: var(--primary);
    }
</style>