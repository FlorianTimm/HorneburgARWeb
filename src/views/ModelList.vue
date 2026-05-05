<template>
    <DefaultPage>
        <template #header_left>
            <button @click="$router.push('/#main')">&#8592;</button>
        </template>
        <template #header_center>
            <h1>{{ $t('single') }}</h1>
        </template>


        <template #main>
            <Cards>
                <Card :link="`/orbit/alle`" :title="$t('all_models')">
                    <!-- :description="$t('all_models_description')" -->
                    <img src="../assets/alle_gebaeude.svg" alt="Alle Modelle Vorschau"
                        style="width: 100%; margin-top: 10px;" />
                </Card>

                <Card :link="`/orbit/${key}`" v-for="(model, key) in filteredModelle" :key="key"
                    :title="model.getName($i18n.locale)"> <!-- :description="model.getDescription($i18n.locale)">-->
                    <img :src="model.svg_path" :alt="`${model.getName($i18n.locale)} Vorschau`"
                        style="width: 100%; margin-top: 10px;" />
                </Card>
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
const modelle: Ref<JsonFile<ModelJson>> = ref({});


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
