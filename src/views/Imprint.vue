<template>
    <DefaultPage>
        <template #header_left>
            <button @click="$router.push('/#main')"><img src="@/assets/icons/arrow_long.svg"
                    :title="t('back')"></button>
        </template>
        <template #header_center>
            <h1>{{ t('imprint') }}</h1>
        </template>
        <template #main>
            <article v-html="t('imprint_html')" id="text" />
        </template>
    </DefaultPage>
</template>

<script setup lang="ts">
import DefaultPage from '@/components/DefaultPage.vue';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
</script>

<style scoped>
#text {
    margin-top: 1rem;
}
</style>
