<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>HorneburgAR</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Blank</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-card router-link="/ar">
        <ion-card-header>
          <ion-card-title>Inselmodus</ion-card-title>
          <ion-card-subtitle>AR-Anwendung vor Ort</ion-card-subtitle>
        </ion-card-header>

        <ion-card-content>
          Erlebe Horneburg in Augmented Reality direkt vor Ort auf der Insel.
        </ion-card-content>

      </ion-card>

      <ion-card router-link="/liste">
        <ion-card-header>
          <ion-card-title>Einzelmodus</ion-card-title>
          <ion-card-subtitle>Gebäude von allen Seiten</ion-card-subtitle>
        </ion-card-header>

        <ion-card-content>
          Erkunde die 3D-Modelle der Horneburger Gebäude interaktiv aus allen Blickwinkeln.
        </ion-card-content>

      </ion-card>

    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/vue';
</script>

<style scoped>
ion-card:hover {
  cursor: pointer;
  background-color: #f0f0f0;
}
</style>
