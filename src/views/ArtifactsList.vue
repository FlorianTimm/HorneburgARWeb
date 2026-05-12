<template>
    <DefaultPage>
        <template #header_left>
            <button @click="$router.push('/#main')"><img src="@/assets/icons/arrow_long.svg"
                    alt="{{ t('back') }}"></button>
        </template>
        <template #header_center>
            <h1>{{ t('artifacts_header') }}</h1>
        </template>
        <template #main>
            <p>{{ t('artifacts_intro') }}</p>
            <div id="images">
                <a :href="`/artifacts/${key}`" v-for="(artifact, key) in filteredArtifacts" :key="key">
                    <img :src="artifact.getPreviewImage()" :alt="artifact.getName($i18n.locale)" />
                </a>
            </div>
        </template>
    </DefaultPage>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { type JsonFile } from '@/func/json';
import { ArtifactJson } from '@/func/artifacts_json';

import type { Ref } from 'vue';
import Card from '@/components/Card.vue';
import Cards from '@/components/Cards.vue';
import DefaultPage from '@/components/DefaultPage.vue';

import { useI18n } from 'vue-i18n';
const { t } = useI18n();

const artifacts: Ref<JsonFile<ArtifactJson>> = ref({});

onMounted(async () => {
    artifacts.value = await ArtifactJson.load_json();
    console.log("Artifacts.vue mounted");
});

// filter models to only those that should be shown in the list
const filteredArtifacts = computed(() => {
    const result: JsonFile<ArtifactJson> = {};
    for (const key in artifacts.value) {
        const artifact = artifacts.value[key];
        if (artifact)
            result[key] = artifact;
    }
    return result;
});

</script>

<style scoped>
#images {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 2em;
}

a {
    display: block;
    width: 12em;
    height: auto;
    border-radius: 5px;
    transition: transform 0.3s ease, filter 0.3s ease;
}

a img {
    width: 100%;
    height: auto;
    border-radius: 5px;
    display: block;
}

a:hover img {
    transform: scale(1.05);
    transition: transform 0.3s ease;
    filter: drop-shadow(4px 4px 4px #919191);
}
</style>