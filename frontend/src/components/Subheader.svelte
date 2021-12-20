<script>
    export let text;
    export let style = '';
</script>

<div style={style} class='subheader'>{text}</div>

<style>
    .subheader {
        /* font settings */
        font-family: 'Playfair Display', serif;
        font-size: 1.25rem;
        font-weight: 400;
        color: var(--text-dark);
    }
</style>