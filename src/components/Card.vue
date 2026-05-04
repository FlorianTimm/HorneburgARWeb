<template>
    <router-link v-if="link" :to="link" tag="div">
        mit Link
        <div>
            <h2>{{ title }}</h2>
            <p>{{ description }}</p>
            <slot></slot>
        </div>
    </router-link>

    <div v-else>
        <h2>{{ title }}</h2>
        <p>{{ description }}</p>
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    title: string;
    description: string;
    link?: string;
}>();
</script>

<style scoped>
div,
router-link {
    border: 1px solid #ccc;
    padding: 16px;
    border-radius: 8px;
    margin-bottom: 16px;
}
</style>