<template>
    <ion-page>
        <ion-header :translucent="true" class="ion-no-border">
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button default-href="/"></ion-back-button>
                </ion-buttons>
                <ion-title>{{ $t('single') }}</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content :fullscreen="true">
            <ion-header collapse="condense">
                <ion-toolbar>
                    <ion-title size="large">{{ $t('single') }}</ion-title>
                </ion-toolbar>
            </ion-header>

            <div class="cards-content">
                <ion-card :router-link="`/orbit/alle`" :key="'alle'" class="cards">
                    <img src="../assets/alle_gebaeude.svg" alt="Alle Modelle Vorschau"
                        style="width: 100%; margin-top: 10px;" />
                    <ion-card-header>
                        <ion-card-title>{{ $t('all_models') }}</ion-card-title>
                    </ion-card-header>

                    <ion-card-content>
                        {{ $t('all_models_description') }}
                    </ion-card-content>
                </ion-card>

                <ion-card :router-link="`/orbit/${key}`" v-for="(model, key) in filteredModelle" :key="key"
                    class="cards">
                    <img :src="model.svg_path" :alt="`${model.getName($i18n.locale)} Vorschau`"
                        style="width: 100%; margin-top: 10px;" />
                    <ion-card-header>
                        <ion-card-title>{{ model.getName($i18n.locale) }}</ion-card-title>
                    </ion-card-header>

                    <ion-card-content>{{ model.getDescription($i18n.locale) }}</ion-card-content>
                </ion-card>
            </div>
        </ion-content>
        <Footer />
    </ion-page>
</template>

<script setup lang="ts">
import { IonCard, IonCardContent, IonCardHeader, IonButtons, IonBackButton, IonCardTitle, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/vue';
import { ref, onMounted, computed } from 'vue';
import { ModelJson } from '@/func/modelle_json';
import { JsonFile } from '@/func/json';

import type { Ref } from 'vue';
import Footer from '@/components/Footer.vue';
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
        if (model.show_in_list) {
            result[key] = model;
        }
    }
    return result;
});

</script>

<style scoped>
ion-card:hover {
    cursor: pointer;
    background-color: #f0f0f0;
}
</style>
