<template>
    <div class="cards">
        <slot></slot>
    </div>
</template>

<style scoped>
.cards {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
}
</style>
