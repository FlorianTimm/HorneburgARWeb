<template>
    <ion-page>
        <ion-header :translucent="true">
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button default-href="/"></ion-back-button>
                </ion-buttons>
                <ion-title>Einzelmodus</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content :fullscreen="true">
            <ion-header collapse="condense">
                <ion-toolbar>
                    <ion-title size="large">Blank</ion-title>
                </ion-toolbar>
            </ion-header>


            <ion-card :router-link="`/orbit/${key}`" v-for="(model, key) in modelle" :key="key">
                <ion-card-header>
                    <ion-card-title>{{ model.name }}</ion-card-title>
                </ion-card-header>

                <ion-card-content>
                    Erkunde das 3D-Modell des {{ model.name }} interaktiv aus allen Blickwinkeln.
                </ion-card-content>
            </ion-card>


        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { IonCard, IonCardContent, IonCardHeader, IonButtons, IonBackButton, IonCardTitle, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/vue';
import { ref, onMounted } from 'vue';
import { load_json, ModelleJson } from '@/func/modelle_json';

import type { Ref } from 'vue';
const modelle: Ref<ModelleJson> = ref({});

onMounted(async () => {
    modelle.value = await load_json();
    console.log("Liste.vue mounted");
});

</script>

<style scoped>
ion-card:hover {
    cursor: pointer;
    background-color: #f0f0f0;
}
</style>
