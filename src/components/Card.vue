<template>
    <router-link :to="link">

        <h2>{{ title }}</h2>
        <p v-if="description">{{ description }}</p>
        <slot></slot>

    </router-link>

</template>

<script setup lang="ts">
defineProps<{
    title: string;
    description?: string;
    link: string;
}>();
</script>

<style scoped>
a {
    display: block;
    float: flex-start;

    text-decoration: none;
    color: #333;

    border-radius: 5px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    width: 350px;
    height: 390px;
    margin: 20px;

    transition: background-color 0.3s ease;
    background-color: #fff;
}

a h2 {
    display: block;
    width: 100%;
    text-align: center;
}

a:hover {
    cursor: pointer;
    background-color: #f0f0f0;
}
</style>