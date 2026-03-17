<template>
  <ion-app mode="ios">
    <ion-router-outlet />
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
</script>

<style>
ion-card {
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

ion-card:hover {
  cursor: pointer;
  background-color: var(--ion-color-light-tint);
}

ion-card {
  max-width: 400px;
  margin: 30px auto;
  display: block;
  transition: background-color 0.3s ease;
}


@media (min-width: 800px) {
  div.cards-content {
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

/* Desktop */
@media (min-width: 1000px) {
  div.main-content {
    width: 800px;
    margin: auto;
    margin-top: 40px;
    position: relative;
  }

  ion-header {
    margin: auto;
    width: 800px;
  }

}
</style>
