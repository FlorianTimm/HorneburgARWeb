<template>
  <ion-app mode="ios">
    <ion-router-outlet />
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
</script>

<style>
:root {
  --ion-background-color: #DDE3DD;
}

ion-card {
  background-color: #FFFFFF;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

ion-card:hover {
  cursor: pointer;
  background-color: #f0f0f0;
}

ion-card {
  max-width: 400px;
  margin: 30px auto;
  display: block;
  transition: background-color 0.3s ease;
}

.header-md {
  box-shadow: none !important;
  -webkit-box-shadow: none !important;
}

@media (min-width: 800px) {
  ion-content {
    text-align: center;
    padding: 30px;
  }

  ion-card {
    display: inline-block;
    vertical-align: top;
    margin: 30px;
    width: 380px;
  }
}
</style>
