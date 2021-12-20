<script>
    export let text;
    export let style = '';
</script>

<div style={style} class='header'>{text}</div>

<style>
    .header {
        /* font settings */
        font-family: 'Playfair Display', serif;
        font-size: 2rem;
        font-weight: 400;
        color: var(--text-dark);
    }
</style>