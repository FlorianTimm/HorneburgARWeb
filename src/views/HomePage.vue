<template>

  <div class="scroll-container" id="container">
    <section class="lock-screen">
      <img src="../assets/grafiken/burginsel.gif" />
      <h1>{{ t('welcome') }}</h1>
      <div id="subheader">
        {{ t('subheader') }}
      </div>
      <img id="arrow" src="../assets/icons/arrow_down.svg" :alt="t('scroll_hint')" />
    </section>

    <section class="main-content">
      <header>
        <img src="../assets/logos/burginsel_wort_bild.svg" alt="Horneburg Logo" />
        <router-link to="/about"><img src="@/assets/icons/arrow_right.svg" id="about_link" alt="{{ t('about') }}">{{
          t('about')
        }}</router-link>
      </header>

      <main>
        <div id="welcome_text">{{ t('welcome_text') }}</div>

        <Cards>

          <Card :title="t('island')" :description="t('island_description')" link="/ar">
            <img src="../assets/grafiken/modus_inselansicht.svg" :alt="t('island')"
              style="width: 100%; margin-top: 10px;" />
          </Card>

          <Card :title="t('single')" :description="t('single_description')" link="/orbit">
            <img src="../assets/grafiken/modus_einzelgebaeude.svg" :alt="t('single')"
              style="width: 100%; margin-top: 10px;" />
          </Card>

          <Card :title="t('artifacts')" :description="t('artifacts_description')" link="/artifacts">
            <img src="../assets/grafiken/modus_fundstuecke.svg" :alt="t('artifacts')"
              style="width: 100%; margin-top: 10px; max-height: 152px;" />
          </Card>
        </Cards>
        <hr />
        <div id='history'>
          <h3>{{ t('history') }}</h3>
          {{ t('history_text') }}
          <img src="../assets/grafiken/zeitstrahl_groß.svg" id="timeline_big" />
          <img src="../assets/grafiken/zeitstrahl_klein.svg" id="timeline_small" />
          <router-link to="/history" custom v-slot="{ navigate }">
            <button @click="navigate">{{ t('history_more') }}</button>
          </router-link>
        </div>
        <hr />
        <div id="leftright">
          <Map :center="[9.58769, 53.50963]" :zoom="14.5" id="map" />
          <div>
            <h3>Handswerksmuseum Horneburg</h3>
            Marschdamm 2c, 21640 Horneburg<br />
            {{ t('museum_opening_hours') }}<br />
            {{ t('museum_price') }}<br />
            <a href="https://handwerksmuseum-horneburg.de/" target="_blank"><img src="@/assets/icons/arrow_right.svg"
                id="museum_link">&nbsp;handwerksmuseum-horneburg.de</a>
          </div>
        </div>
      </main>
      <Footer />
    </section>

  </div>

</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import Footer from '@/components/Footer.vue';
import Card from '@/components/Card.vue';
import Cards from '@/components/Cards.vue';
import Map from '@/components/Map.vue';

import { useSplashStore } from '@/stores/splash';
const splash = useSplashStore()

import { useI18n } from 'vue-i18n'
import type router from '@/router';
const { t } = useI18n()

let splashTimer: ReturnType<typeof setTimeout>;


// 2. MAUS-DRAG LOGIK
onMounted(() => {
  const container = document.getElementById('container');
  if (container) {
    let isPressed = false;
    let startY: number;
    let scrollTop: number;

    container.addEventListener('scroll', () => {
      if (container.scrollTop > window.innerHeight / 2) {
        window.history.replaceState(null, '', "#main");
      } else {
        window.history.replaceState(null, '', "#splash");
      }
    });

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
      if (document.querySelector('#map:hover')) {
      } else if (container.scrollTop > 100 && container.scrollTop < window.innerHeight) {
        container.scrollTo(0, window.innerHeight);
        window.history.replaceState(null, '', "#main");
      } else if (container.scrollTop <= 100) {
        container.scrollTo(0, 0);
      }
    });

    container.addEventListener('mousemove', (e) => {
      if (!isPressed) return;
      if (document.querySelector('#map:hover')) return;
      e.preventDefault();
      const y = e.pageY - container.offsetTop;
      const walk = (y - startY) * 1.5; // Geschwindigkeit des Ziehens
      container.scrollTop = scrollTop - walk;
    });

    if (container.scrollTop < 100) {
      splashTimer = setTimeout(() => {
        if (container.scrollTop < 100) {
          container.style.scrollBehavior = 'smooth';
          container.scrollTo(0, window.innerHeight);
          window.history.replaceState(null, '', "#main");
        }
      }, 20000);
    }

    if (!splash.shouldShow() || window.location.hash === '#main') {
      container.scrollTo(0, window.innerHeight);
    }
    splash.wasShown();
  } else {
    console.error("Container für Scrollen nicht gefunden");
  }

  onUnmounted(() => {
    console.log("HomePage.vue unmounted");
    if (splashTimer) {
      clearTimeout(splashTimer);
    }
  });
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
  background-image: url('@/assets/bilder/burginsel.jpg');
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* padding: 0 0 10px 10%; */
  color: white;
  pointer-events: none;
  /* Klicks gehen durch zum Container */
}

.lock-screen img {
  width: 130px;
  margin: 0 auto;
  margin-bottom: 20px;
}

.lock-screen h1 {
  margin: 0 auto;
  font-size: 46px;
  font-weight: 500;
  width: 80%;
  text-align: center;
  display: block;
}


@media (max-width: 800px) {
  .lock-screen h1 {
    font-size: 40px;


  }
}



main {
  text-align: center;
  margin: 20px;
  margin-top: 20px;
}

#subheader {
  position: absolute;
  bottom: 160px;
  width: 100%;
  text-align: center;
  font-size: 30px;
}

@media (max-width: 800px) {
  #subheader {
    font-size: 20px;
    bottom: 120px;
  }
}

#arrow {
  position: absolute;
  height: 40px;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 24px;
  animation: bounce 2s infinite;
  animation-delay: 10s;
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

.main-content {
  display: grid;
  grid-template-rows: auto 1fr auto;
  color: rgb(14, 10, 10);
}

header {
  display: grid;
  grid-template-columns: 1fr auto;
  width: auto;
  height: auto;
  align-items: center;
  margin: 30px 40px;
  margin-bottom: 0;
}

@media (max-width: 800px) {
  header {
    grid-template-columns: auto;
    grid-template-rows: auto auto;
    padding-bottom: 20px;
    margin: 20px;
  }
}

header,
hr {
  border: none;
  border-bottom: 2px solid #999;
}

hr {
  margin: 120px 20px 60px 20px;
}

@media (max-width: 800px) {
  hr {
    margin: 80px 20px 40px 20px;
  }
}

#about_link,
#museum_link {
  display: inline;
  height: 1em;
  margin-right: 5px;
  position: relative;
  top: 2px;
}

#history {
  max-width: 1000px;
  margin: 20px auto;
  text-align: left;
  font-size: 20px;
  line-height: 1.5;
}

#timeline_big {
  display: block;
  margin: 20px auto;
  width: 100%;
  max-width: 1000px;
}

#timeline_small {
  display: none;
  margin: 20px auto;
  width: 100%;
  max-width: 600px;
}

@media (max-width: 600px) {
  #timeline_big {
    display: none;
  }

  #timeline_small {
    display: block;
  }
}

#history button {
  display: block;
  margin: 20px auto;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: 500;
  color: #222;
  border: 1px solid #222;
  background-color: inherit;
  cursor: pointer;
}


#map {
  width: 100%;
  height: 400px;

}

#leftright {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 2fr 1fr;
  font-size: 15px;
  font-weight: 400;
  text-align: left;
  gap: 40px;
}

@media (max-width: 800px) {
  #leftright {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto;
  }
}

#leftright div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  line-height: 2;

}

#leftright h3 {
  font-weight: 500;
  font-size: 20px;
  margin-bottom: 10px;
}

#leftright a {
  margin-top: 10px;
  color: inherit;
  font-weight: 600;
  text-decoration: none;
}

header img {
  display: block;
  height: auto;
}

header a {
  display: inline-block;
  text-decoration: none;
  color: #333;
  font-size: 15px;
  font-weight: bold;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

#welcome_text {
  display: block;
  margin: 20px auto;
  font-size: 20px;
  text-align: left;
  max-width: 1000px;
}
</style>
