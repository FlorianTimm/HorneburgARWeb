<template>
    <div class="leftright">
        <div>
            <slot name="left"></slot>
        </div>
        <div>
            <slot name="right"></slot>
        </div>
    </div>
</template>

<style scoped>
.leftright {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 4em;
}

@media (max-width: 800px) {
    .leftright {
        grid-template-columns: 1fr;
        grid-template-rows: auto auto;
    }
}
</style>