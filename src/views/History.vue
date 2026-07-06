<template>
    <DefaultPage headertype="default">
        <template #header_left>
            <button @click="$router.push('/#main')" :title="t('back')"><img src="@/assets/icons/arrow_long.svg"
                    :alt="t('back')"></button>
        </template>
        <template #header_center>
            <h1>{{ t('history_title') }}</h1>
        </template>
        <template #main>
            <TextWithImages :images="images">
                <article v-html="t('history_fulltext')"></article>

            </TextWithImages>
            <ImgSources :sources="t('history_sources_html')" />
        </template>
    </DefaultPage>
</template>

<script setup lang="ts">
import DefaultPage from '@/components/DefaultPage.vue';
import TextWithImages from '@/components/TextWithImages.vue';
import ImgSources from '@/components/ImgSources.vue';
import { useI18n } from 'vue-i18n';
import { ref, onMounted } from 'vue';
import { getImages, type ImageData } from '@/func/imageHelper';
const { t } = useI18n();

const images = ref<ImageData[]>([]);

onMounted(() => {
    getImages('history').then((data) => {
        images.value = data;
    });
})
</script>
