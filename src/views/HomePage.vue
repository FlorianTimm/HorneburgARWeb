<template>

  <div class="scroll-container" id="container">
    <section class="lock-screen">
      <h1>{{ $t('welcome') }}</h1>
      <div class="hint">
        Klicken und hochziehen oder scrollen
      </div>
    </section>

    <section class="main-content">
      <header>
        <h2>{{ $t('welcome') }}</h2>
        <router-link to="/about">{{ $t('about') }}</router-link>
      </header>

      {{ $t('welcome_text') }}

      <Cards>

        <Card :title="$t('island')" :description="$t('island_description')" link="/ar">
          <img src="../assets/inselansicht.svg" :alt="$t('island')" style="width: 100%; margin-top: 10px;" />
        </Card>

        <Card :title="$t('single')" :description="$t('single_description')" link="/orbit">
          <img src="../assets/einzelansicht2.svg" :alt="$t('single')" style="width: 100%; margin-top: 10px;" />
        </Card>

        <Card :title="$t('artifacts')" :description="$t('artifacts_description')" link="/artifacts">
          <img src="../assets/artifacts.svg" :alt="$t('artifacts')"
            style="width: 100%; margin-top: 10px; max-height: 152px;" />
        </Card>
      </Cards>
      <Footer />
    </section>

  </div>

</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Footer from '@/components/Footer.vue';
import Card from '@/components/Card.vue';
import Cards from '@/components/Cards.vue';

import { useSplashStore } from '@/stores/splash';
const splash = useSplashStore()


// 2. MAUS-DRAG LOGIK
onMounted(() => {
  const container = document.getElementById('container');
  if (container) {
    let isPressed = false;
    let startY: number;
    let scrollTop: number;

    container.addEventListener('mousedown', (e) => {
      isPressed = true;
      startY = e.pageY - container.offsetTop;
      scrollTop = container.scrollTop;
      container.style.scrollSnapType = 'none'; // Snap kurz aus für freies Ziehen
      container.style.scrollBehavior = 'auto';
    });

    container.addEventListener('mouseleave', () => { isPressed = false; });
    container.addEventListener('mouseup', () => {
      isPressed = false;
      container.style.scrollSnapType = 'y mandatory'; // Snap wieder an
      container.style.scrollBehavior = 'smooth';

      // Prüfen, ob weit genug gezogen wurde
      if (container.scrollTop > 100) {
        container.scrollTo(0, window.innerHeight);
      } else {
        container.scrollTo(0, 0);
      }
    });

    container.addEventListener('mousemove', (e) => {
      if (!isPressed) return;
      e.preventDefault();
      const y = e.pageY - container.offsetTop;
      const walk = (y - startY) * 1.5; // Geschwindigkeit des Ziehens
      container.scrollTop = scrollTop - walk;
    });

    setInterval(() => {
      if (container.scrollTop < 100) {
        container.style.scrollBehavior = 'smooth';
        container.scrollTo(0, window.innerHeight);
      }
    }, 10000);

    if (!splash.shouldShow()) {
      container.scrollTo(0, window.innerHeight);
    }
    splash.wasShown();
  } else {
    console.error("Container für Scrollen nicht gefunden");
  }
});
</script>

<style scoped>
/* Container mit Scroll-Snap für Touch & Scrollrad */
.scroll-container {
  height: 100%;
  width: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  touch-action: pan-y;

  /* Zeigt an, dass man ziehen kann */
}



.scroll-container:active {
  cursor: grabbing;
}

section {
  scroll-snap-align: start;
  scroll-snap-stop: always;
  position: relative;
  min-height: 100vh;
  width: 100vw;
}

.lock-screen {
  height: 100vh;
  width: 100vw;
  background-image: url('@/assets/startscreen.png');
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 0 10px 10%;
  color: white;
  pointer-events: none;
  /* Klicks gehen durch zum Container */
}

.lock-screen h1 {
  margin: 0 auto;
}

.main-content {
  display: flex;
  flex-direction: column;
  align-items: center;

  color: rgb(14, 10, 10);
}

.hint {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 18px;
  opacity: 0.8;
  animation: bounce 2s infinite;
}

@keyframes bounce {

  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateX(-50%) translateY(0);
  }

  40% {
    transform: translateX(-50%) translateY(-10px);
  }

  60% {
    transform: translateX(-50%) translateY(-5px);
  }
}
</style>
