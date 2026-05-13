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
            <LeftRight>
                <template #left>
                    <span v-html="t('history_fulltext')"></span>
                </template>
                <template #right>
                    <img src="@/assets/bilder/burginsel.jpg" :alt="t('image')" class="history-image">
                </template>
            </LeftRight>
        </template>
    </DefaultPage>
</template>

<script setup lang="ts">
import DefaultPage from '@/components/DefaultPage.vue';
import LeftRight from '@/components/LeftRight.vue';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
</script>


<style scoped>
.history-image {
    width: 40vw;
}
</style>