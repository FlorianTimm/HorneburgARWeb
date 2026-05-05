<template>
    <DefaultPage>
        <template #header_left>
            <button @click="$router.push('/artifacts')">&#8592;</button>
        </template>
        <template #header_center>
            <h1>{{ artifacts[artifact]?.getName($i18n.locale) }}</h1>
        </template>
        <template #main>
            {{ artifacts[artifact]?.getDescription($i18n.locale) }}
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

const route = useRoute();
const { artifact } = route.params as { artifact: string };
const artifacts: Ref<JsonFile<ArtifactJson>> = ref({});

onMounted(async () => {
    artifacts.value = await ArtifactJson.load_json();
});

</script>