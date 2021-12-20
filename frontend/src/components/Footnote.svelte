<script>
    export let text;
    export let style = '';
</script>

<div style={style} class='body'>{text}</div>

<style>
    .body {
        /* font settings */
        font-family: 'Roboto', sans-serif;
        font-size: 0.75rem;
        font-weight: 300;
        color: var(--text-medium);
    }
</style>