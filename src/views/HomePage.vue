<template>
  <ion-page>
    <transition name="fade">
      <div v-if="showSplash" class="splash-overlay">
        <img src="../assets/storch.png" alt="Storch" />
        <div class="splash-content">
          <ion-icon :icon="homeOutline" size="large" />
          <h1>{{ $t('welcome') }}</h1>
          <!--<p><ion-icon :icon="arrowDownOutline" size="large" /></p>-->
        </div>
      </div>
    </transition>

    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>{{ $t('welcome') }}<br />
          <span style="font-size: 1rem;">{{ $t('discovery_prompt') }}</span>
        </ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" :scroll-events="true" @ionScroll="handleScroll">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">{{ $t('welcome') }}</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-card router-link="/ar">
        <ion-card-header>
          <ion-card-title>{{ $t('island') }}</ion-card-title>
          <ion-card-subtitle>{{ $t('island_description') }}</ion-card-subtitle>
        </ion-card-header>

        <ion-card-content>
          {{ $t('island_content') }}
        </ion-card-content>
        <img src="../assets/inselansicht.svg" alt="Horneburg Orbit Vorschau" style="width: 100%; margin-top: 10px;" />
      </ion-card>

      <ion-card router-link="/orbit">
        <ion-card-header>
          <ion-card-title>{{ $t('single') }}</ion-card-title>
          <ion-card-subtitle>{{ $t('single_description') }}</ion-card-subtitle>
        </ion-card-header>

        <ion-card-content>
          {{ $t('single_content') }}
        </ion-card-content>
        <img src="../assets/einzelansicht2.svg" alt="Horneburg Orbit Vorschau" style="width: 100%; margin-top: 10px;" />
      </ion-card>

    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/vue';
import { ref, onMounted } from 'vue';
import { IonIcon } from '@ionic/vue';
import { arrowDownOutline, homeOutline } from 'ionicons/icons';
import type { ScrollDetail } from '@ionic/vue';

const showSplash = ref(true);

// Funktion zum Ausblenden
const dismissSplash = () => {
  showSplash.value = false;
};

// Timer: Nach 3 Sekunden automatisch ausblenden
onMounted(() => {
  setTimeout(() => {
    dismissSplash();
  }, 3000);
});

// Scroll: Sobald der User scrollt, Splash entfernen
const handleScroll = (event: CustomEvent<ScrollDetail>) => {
  console.log("Scroll event detected, scrollTop:", event.detail.scrollTop);
  if (showSplash.value && event.detail.scrollTop > 10) {
    dismissSplash();
  }
};

</script>

<style scoped>
/* Splash-Screen Styling */
.splash-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #3880ff, #2dd36f);
  background-image: url('@/assets/startscreen.png');
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  color: white;
  text-align: center;
}

.splash-overlay img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  max-width: 400px;
}

/* Vue Fade-Animation */
.fade-leave-active {
  transition: opacity 0.8s ease, transform 0.8s ease;
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.main-content {
  padding: 16px;
}
</style>
