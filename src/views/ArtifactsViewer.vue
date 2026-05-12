<template>
    <DefaultPage headertype="object" :footer="false">
        <template #header_left>
            <button @click="$router.push('/artifacts')"><img src="@/assets/icons/close.svg"
                    alt="{{ t('close') }}"></button>
        </template>
        <template #header_center>
            <h1>{{ artifacts[artifact]?.getName(locale) }}</h1>
        </template>
        <template #main>
            <span v-html="artifacts[artifact]?.getDescription(locale)"></span>
            <img v-for="(image, index) in artifacts[artifact]?.images || []" :key="index" :src="image.large"
                :alt="`${artifacts[artifact]?.getName(locale)} Bild ${index + 1}`"
                style="width: 100%; margin-top: 10px;" />

        </template>
        <template #header_right>
            <div id="vorzurueck">
                <button @click="vorheriges()" alt="{{ t('previous') }}"><img src="@/assets/icons/arrow_left.svg"
                        alt="{{ t('previous') }}"></button>
                <button @click="naechstes()" alt="{{ t('next') }}"><img src="@/assets/icons/arrow_right.svg"
                        alt="{{ t('next') }}"></button>
            </div>
        </template>
    </DefaultPage>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { ref } from 'vue';
import { ArtifactJson } from '@/func/artifacts_json';
import { type JsonFile } from '@/func/json';
import type { Ref } from 'vue';
import { useRoute } from 'vue-router';
import DefaultPage from '@/components/DefaultPage.vue';

import router from '@/router'

import { useI18n } from 'vue-i18n'
const { locale } = useI18n()

const route = useRoute();
const { artifact } = route.params as { artifact: string };
const artifacts: Ref<JsonFile<ArtifactJson>> = ref({});

onMounted(async () => {
    artifacts.value = await ArtifactJson.load_json();
});




function vorheriges() {


    let keys = Object.keys(artifacts.value);

    let index = keys.indexOf(artifact);



    index--;
    if (index < 0) {
        index = keys.length - 1;
    }


    if (index >= 0 && index < keys.length) {
        let nextArtifact = keys[index];
        router.push(`/artifacts/${nextArtifact}`);
    }
}

function naechstes() {
    let keys = Object.keys(artifacts.value);
    let index = keys.indexOf(artifact);

    index++;

    if (index >= keys.length) {
        index = 0;
    }


    if (index >= 0 && index < keys.length) {
        let nextArtifact = keys[index];
        router.push(`/artifacts/${nextArtifact}`);
    }
}


</script>

<style scoped>
#vorzurueck {
    display: flex;
    gap: 0.5em;
}
</style>