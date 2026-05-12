<template>
    <DefaultPage headertype="default">
        <template #header_left>
            <button @click="$router.push('/#main')"><img src="@/assets/icons/arrow_long.svg"
                    alt="{{ t('back') }}"></button>
        </template>
        <template #header_center>
            <h1>{{ t('about') }}</h1>
        </template>
        <template #main>
            {{ t('about_html') }}
        </template>
    </DefaultPage>
</template>

<script setup lang="ts">
import DefaultPage from '@/components/DefaultPage.vue';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
</script>
