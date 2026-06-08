<template>
    <router-link :to="link" class="card" v-if="!image">
        <h2>{{ title }}</h2>
        <p v-if="description">{{ description }}</p>
        <slot></slot>
    </router-link>


    <router-link :to="link" class="card card_with_image" v-if="image">
        <div>
            <h2>{{ title }}</h2>
            <p v-if="description">{{ description }}</p>
            <slot></slot>
        </div>
        <div id="img">
            <img :src="image" :alt="title" />
        </div>
    </router-link>

</template>

<script setup lang="ts">
defineProps<{
    title: string;
    description?: string;
    link: string;
    image?: string;
}>();
</script>

<style scoped>
a {
    display: block;
    float: flex-start;
    color: #333;
    border-radius: 5px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    width: 20em;
    height: 20em;
    margin: 1.5em;
    padding: 1em;
    transition: background-color 0.3s ease;
    background-color: #fff;
    cursor: pointer;
    border: 2px solid transparent;
}

.card_with_image {
    display: grid;
    grid-template-rows: auto 70%;
}

#img {
    align-self: center;
    margin: 5%
}

.card_with_image img {
    width: 100%;
    height: auto;
    margin: 0 auto;
    display: block;
}

@media (max-width: 750px) {
    a {
        margin: 1em 0;
        width: 100%;
        max-width: 20em;
    }
}

a:hover {
    border-color: #555;
}
</style>