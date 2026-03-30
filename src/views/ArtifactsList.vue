<template>
    <ion-page>
        <ion-header :translucent="true" class="ion-no-border">
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button default-href="/"></ion-back-button>
                </ion-buttons>
                <ion-title>{{ $t('artifacts') }}</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content :fullscreen="true">
            <ion-header collapse="condense">
                <ion-toolbar>
                    <ion-title size="large">{{ $t('artifacts') }}</ion-title>
                </ion-toolbar>
            </ion-header>

            <div class="cards-content">
                <ion-card :router-link="`/artifacts/${key}`" v-for="(artifact, key) in filteredArtifacts" :key="key">
                    <img src="../assets/beispielhaus.svg" :alt="`${artifact.getName($i18n.locale)} Vorschau`"
                        style="width: 100%; margin-top: 10px;" />
                    <ion-card-header>
                        <ion-card-title>{{ artifact.getName($i18n.locale) }}</ion-card-title>
                    </ion-card-header>

                    <ion-card-content>{{ artifact.getDescription($i18n.locale) }}</ion-card-content>
                </ion-card>
            </div>
        </ion-content>
        <Footer />
    </ion-page>
</template>

<script setup lang="ts">
import { IonCard, IonCardContent, IonCardHeader, IonButtons, IonBackButton, IonCardTitle, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/vue';
import { ref, onMounted, computed } from 'vue';
import { JsonFile } from '@/func/json';
import { ArtifactJson } from '@/func/artifacts_json';

import type { Ref } from 'vue';
import Footer from '@/components/Footer.vue';
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
        result[key] = artifact;
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
