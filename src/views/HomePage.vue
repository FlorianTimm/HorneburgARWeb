<template>

  <div v-if="showSplash" class="splash-overlay">
    <img src="../assets/storch.png" alt="Storch" />
    <div class="splash-content">
      <h1>{{ $t('welcome') }}</h1>
      <!--<p><ion-icon :icon="arrowDownOutline" size="large" /></p>-->
    </div>
  </div>

  <h1>{{ $t('welcome') }}</h1>
  <p>{{ $t('welcome_text') }}</p>

  <Cards>
    <router-link :to="'/ar'">
      <Card :title="$t('island')" :description="$t('island_description')" link="/home">
        <img src="../assets/inselansicht.svg" :alt="$t('island')" style="width: 100%; margin-top: 10px;" />
      </Card>
    </router-link>

    <router-link :to="'/orbit'">
      <Card :title="$t('single')" :description="$t('single_description')" link="/single">
        <img src="../assets/einzelansicht2.svg" :alt="$t('single')" style="width: 100%; margin-top: 10px;" />
      </Card>
    </router-link>

    <router-link :to="'/artifacts'">
      <Card :title="$t('artifacts')" :description="$t('artifacts_description')" link="/artifacts">
        <img src="../assets/artifacts.svg" :alt="$t('artifacts')"
          style="width: 100%; margin-top: 10px; max-height: 152px;" />
      </Card>
    </router-link>

  </Cards>
  <hr />
  <div class="main-content">{{ $t('welcome_text') }}
  </div>

  <Footer />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Footer from '@/components/Footer.vue';
import Card from '@/components/Card.vue';
import Cards from '@/components/Cards.vue';

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
