<template>
    <DefaultPage>
        <template #header_left>
            <button @click="$router.push('/#main')"><img src="@/assets/icons/arrow_long.svg"
                    :title="t('back')"></button>
        </template>
        <template #header_center>
            <h1>{{ t('about') }}</h1>
        </template>
        <template #main>
            <LeftRight>
                <template #left>
                    <span v-html="t('about_html')"></span>
                </template>
                <template #right>
                    <img src="@/assets/bilder/luftbild.png" :alt="t('image')" class="history-image">
                    <img src="@/assets/bilder/vr.png" :alt="t('image')" class="history-image">
                </template>
            </LeftRight>
        </template>
    </DefaultPage>
</template>

<script setup lang="ts">
import DefaultPage from '@/components/DefaultPage.vue';
import { useI18n } from 'vue-i18n';
import LeftRight from '@/components/LeftRight.vue';
const { t } = useI18n();
</script>

<style scoped>
.history-image {
    width: 30vw;
}
</style>
