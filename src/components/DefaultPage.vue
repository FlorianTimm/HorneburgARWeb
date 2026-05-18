<template>
    <div id="container">
        <Header :type="headertype">
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

        <main v-if="$slots.main" id="main">
            <slot name="main"></slot>
        </main>

        <main v-if="$slots.fullscreen" id="fullscreen">
            <slot name="fullscreen"></slot>
        </main>
        <Footer v-if="footer" />
    </div>
</template>

<script setup lang="ts">
import Footer from '@/components/Footer.vue';
import Header from '@/components/Header.vue';

withDefaults(defineProps<{
    headertype?: "default" | "object" | "ar";
    footer?: boolean;
}>(), {
    headertype: "default",
    footer: true
})

</script>

<style scoped>
div#container {
    width: 100%;
    min-height: 100%;
    display: grid;
    grid-template-rows: auto 1fr auto;
}

#main {
    padding: 1em var(--margin-sides) 2em;
}

#fullscreen {
    padding: 0;
    margin: 0;
    width: 100%;
}
</style>