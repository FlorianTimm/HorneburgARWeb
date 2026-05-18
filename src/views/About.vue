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
            <TextWithImages :images="images">
                <article v-html="t('about_html')"></article>
            </TextWithImages>
        </template>
    </DefaultPage>
</template>

<script setup lang="ts">
import DefaultPage from '@/components/DefaultPage.vue';
import { useI18n } from 'vue-i18n';
import TextWithImages from '@/components/TextWithImages.vue';
import { ref, onMounted } from 'vue';
import { getImages, type ImageData } from '@/func/imageHelper';
const { t } = useI18n();

const images = ref<ImageData[]>([]);

onMounted(() => {
    getImages('about').then((data) => {
        images.value = data;
    });
})
</script>
