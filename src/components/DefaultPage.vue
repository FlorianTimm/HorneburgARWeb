<template>
    <div id="container">
        <Header>
            <template #left>
                <slot name="header_left"></slot>
            </template>
            <template #center>
                <slot name="header_center"></slot>
            </template>
            <template #right>
                <slot name="header_right"></slot>
            </template>

        </Header>

        <main>
            <slot name="main"></slot>
        </main>
        <Footer />
    </div>
</template>

<script setup lang="ts">
import Footer from '@/components/Footer.vue';
import Header from '@/components/Header.vue';
</script>

<style scoped>
div#container {
    width: 100%;
    min-height: 100%;
    display: grid;
    grid-template-rows: auto 1fr auto;
}

main {
    padding: 20px;
    text-align: center;
}
</style>