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

            <ion-card router-link="/orbit#Wohnhaus1">
                <ion-card-header>
                    <ion-card-title>Wohnhaus 1</ion-card-title>
                </ion-card-header>

                <ion-card-content>
                    Erkunde das 3D-Modell des Wohnhauses 1 interaktiv aus allen Blickwinkeln.
                </ion-card-content>
            </ion-card>


        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { IonCard, IonCardContent, IonCardHeader, IonButtons, IonBackButton, IonCardTitle, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/vue';
</script>

<style scoped>
ion-card:hover {
    cursor: pointer;
    background-color: #f0f0f0;
}
</style>
