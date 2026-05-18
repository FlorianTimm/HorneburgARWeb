<template>
    <ListPage :header="t('artifacts_header')" :intro="t('artifacts_intro')">
        <div id="images">
            <a :href="`/artifacts/${key}`" v-for="(artifact, key) in filteredArtifacts" :key="key">
                <img :src="artifact.getPreviewImage()" :alt="artifact.getName($i18n.locale)" />
            </a>
        </div>
    </ListPage>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { type JsonFile } from '@/func/json';
import { ArtifactJson } from '@/func/artifacts_json';
import ListPage from '@/components/ListPage.vue';

import type { Ref } from 'vue';

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
    margin: 1.5em;
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