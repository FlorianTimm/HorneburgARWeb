<template>
    <DefaultPage>
        <template #header_left>
            <button @click="$router.push('/#main')">&#8592;</button>
        </template>
        <template #header_center>
            <h1>{{ $t('artifacts') }}</h1>
        </template>
        <template #main>
            <Cards>
                <Card :link="`/artifacts/${key}`" v-for="(artifact, key) in filteredArtifacts" :key="key"
                    :title="artifact.getName($i18n.locale)">
                    <!-- :description="artifact.getDescription($i18n.locale)">-->

                    <img src="../assets/beispielhaus.svg" :alt="`${artifact.getName($i18n.locale)} Vorschau`"
                        style="width: 100%; margin-top: 10px;" />
                </Card>
            </Cards>
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