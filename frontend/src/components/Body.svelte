<script>
    export let text;
    export let style = '';
</script>

<div style={style} class='body'>{text}</div>

<style>
    .body {
        /* font settings */
        font-family: 'Roboto', sans-serif;
        font-size: 0.875rem;
        font-weight: 300;
        line-height: 1.25rem;
        color: var(--text-medium);
    }
</style>