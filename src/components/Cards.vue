<template>
    <div>
        <slot></slot>
    </div>
</template>

<style scoped>
div {
    text-align: center;
    max-width: 1800px;
    margin: 0 auto;
}

@media (min-width: 800px) {
    div {

        padding: 30px;
    }
}
</style>
