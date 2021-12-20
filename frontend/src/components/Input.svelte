<script>
    export let id;
    export let text;

    export let style = '';
</script>

<input style={style} id='{id}' placeholder='{text}'>

<style>
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