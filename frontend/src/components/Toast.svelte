<script>
    export let text;
    export let status;

    export let style = '';
</script>

<div class='toast {status}' style={style}>{text}</div>

<style>
    .toast {
        padding: 0.4rem 1rem;
        border-radius: 5px;
        font-size: 0.625rem;

        color: var(--text-medium);
        background: var(--background-light);
    }

    /* set color for toast status */
    .primary {
        color: var(--primary);
        background: var(--primary-muted);
    }
    .success {
        color: var(--success);
        background: var(--success-muted);
    }
    .warning {
        color: var(--warning);
        background: var(--warning-muted);
    }
    .info {
        color: var(--info);
        background: var(--info-muted);
    }
    .error {
        color: var(--error);
        background: var(--error-muted);
    }
</style>