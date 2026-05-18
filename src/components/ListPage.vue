<template>

    <DefaultPage>
        <template #header_left>
            <button @click="$router.push('/#main')" :title="t('back')"><img src="@/assets/icons/arrow_long.svg"
                    :alt="t('back')"></button>
        </template>
        <template #header_center>
            <h1>
                {{ header }}
            </h1>
        </template>

        <template #main>
            <p id="intro">{{ intro }}</p>
            <slot></slot>
        </template>
    </DefaultPage>
</template>

<script setup lang="ts">
import DefaultPage from '@/components/DefaultPage.vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

defineProps<{
    header: string;
    intro: string;
}>()
</script>

<style scoped>
#intro {
    font-style: italic;
}
</style>