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

    <ion-header :translucent="true" class="ion-no-border">
      <ion-toolbar>
        <ion-title>{{ $t('welcome') }}
        </ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" :scroll-events="true" @ionScroll="handleScroll">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">{{ $t('welcome') }}</ion-title>
        </ion-toolbar>
      </ion-header>

      <div class="main-content">{{ $t('welcome_text') }}
      </div>

      <div class="cards-content">

        <ion-card router-link="/ar">
          <ion-card-header>
            <ion-card-title>{{ $t('island') }}</ion-card-title>
          </ion-card-header>

          <ion-card-content>
            {{ $t('island_description') }}
          </ion-card-content>
          <img src="../assets/inselansicht.svg" :alt="$t('island')" style="width: 100%; margin-top: 10px;" />
        </ion-card>

        <ion-card router-link="/orbit">
          <ion-card-header>
            <ion-card-title>{{ $t('single') }}</ion-card-title>
          </ion-card-header>

          <ion-card-content>
            {{ $t('single_description') }}
          </ion-card-content>
          <img src="../assets/einzelansicht2.svg" :alt="$t('single')" style="width: 100%; margin-top: 10px;" />
        </ion-card>

        <ion-card router-link="/artifacts">
          <ion-card-header>
            <ion-card-title>{{ $t('artifacts') }}</ion-card-title>
          </ion-card-header>

          <ion-card-content>
            {{ $t('artifacts_description') }}
          </ion-card-content>
          <img src="../assets/artifacts.svg" :alt="$t('artifacts')"
            style="width: 100%; margin-top: 10px; max-height: 152px;" />
        </ion-card>

      </div>
      <hr />
      <div class="main-content">{{ $t('welcome_text') }}
      </div>
    </ion-content>
    <Footer />
  </ion-page>
</template>

<script setup lang="ts">
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/vue';
import { ref, onMounted } from 'vue';
import { IonIcon } from '@ionic/vue';
import { homeOutline } from 'ionicons/icons';
import type { ScrollDetail } from '@ionic/vue';
import Footer from '@/components/Footer.vue';

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

ion-header ion-title {
  font-size: 2em;
}
</style>
