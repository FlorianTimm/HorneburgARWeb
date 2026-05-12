<template>
    <DefaultPage>
        <template #header_left>
            <button @click="$router.push('/#main')" :title="t('back')"><img src="@/assets/icons/arrow_long.svg"
                    :alt="t('back')"></button>
        </template>
        <template #header_center>
            <h1>{{ t('single_header') }}</h1>
        </template>


        <template #main>
            <Cards>
                <Card :link="`/orbit/alle`" :title="t('all_models')" :image="alleGebaeudeSvg" />

                <Card :link="`/orbit/${key}`" v-for="(model, key) in filteredModelle" :key="key"
                    :title="model.getName($i18n.locale)" :image="model.svg_path" />
            </Cards>
        </template>
    </DefaultPage>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { ModelJson } from '@/func/modelle_json';
import { type JsonFile } from '@/func/json';

import type { Ref } from 'vue';
import DefaultPage from '@/components/DefaultPage.vue';
import Card from '@/components/Card.vue';
import Cards from '@/components/Cards.vue';
import alleGebaeudeSvg from '@/assets/alle_gebaeude.svg';
const modelle: Ref<JsonFile<ModelJson>> = ref({});

import { useI18n } from 'vue-i18n'
const { t } = useI18n()

onMounted(async () => {
    modelle.value = await ModelJson.load_json();
    console.log("Liste.vue mounted");
});

// filter models to only those that should be shown in the list
const filteredModelle = computed(() => {
    const result: JsonFile<ModelJson> = {};
    for (const key in modelle.value) {
        const model = modelle.value[key];
        if (model && model.show_in_list) {
            result[key] = model;
        }
    }
    return result;
});

</script>
