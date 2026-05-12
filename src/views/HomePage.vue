<template>

  <div id="scroll-container">
    <section id="lock-screen">
      <img src="../assets/grafiken/burginsel.gif" />
      <h1>{{ t('welcome') }}</h1>
      <h2 id="subheader">
        {{ t('subheader') }}
      </h2>
      <img id="arrow" src="../assets/icons/arrow_down.svg" :alt="t('scroll_hint')" />
    </section>

    <section id="main-content">
      <Header type="homepage">
        <template #left><img src="../assets/logos/burginsel_wort_bild.svg" alt="Horneburg Logo" /></template>
        <template #right>
          <router-link to="/about"><img src="@/assets/icons/arrow_right.svg" id="about_link"
              alt="{{ t('about') }}">&nbsp;{{ t('about') }}</router-link>
        </template>
      </Header>

      <main>
        <div id="welcome_text">{{ t('welcome_text') }}</div>

        <Cards>

          <Card :title="t('island')" :description="t('island_description')" link="/ar" :image="svg_inselansicht" />

          <Card :title="t('single')" :description="t('single_description')" link="/orbit" :image="svg_einzelgebaeude" />

          <Card :title="t('artifacts')" :description="t('artifacts_description')" link="/artifacts"
            :image="svg_fundstuecke" />
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
        <div id='history'>
          <h3> {{ t('visit') }} </h3>
          {{ t('visit_text') }}
        </div>
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
import Header from '@/components/Header.vue';

import svg_inselansicht from '@/assets/grafiken/modus_inselansicht.svg';
import svg_einzelgebaeude from '@/assets/grafiken/modus_einzelgebaeude.svg';
import svg_fundstuecke from '@/assets/grafiken/modus_fundstuecke.svg';

import { useSplashStore } from '@/stores/splash';
const splash = useSplashStore()

import { useI18n } from 'vue-i18n'
const { t } = useI18n()

let splashTimer: ReturnType<typeof setTimeout>;


// 2. MAUS-DRAG LOGIK
onMounted(() => {
  const container = document.getElementById('scroll-container');
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
#scroll-container {
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

#scroll-container:active {
  cursor: grabbing;
}

section {
  scroll-snap-align: start;
  scroll-snap-stop: always;
  position: relative;
  min-height: 100vh;
  width: 100%;
}

#lock-screen {
  height: 100vh;
  width: 100%;
  background-image: url('@/assets/bilder/burginsel.jpg');
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2em var(--margin-sides);
  color: white;
  pointer-events: none;
  /* Klicks gehen durch zum Container */
}

#lock-screen img {
  width: 130px;
  margin: 0 auto;
  margin-bottom: 20px;
}

#lock-screen h1 {
  margin: 0 auto;
  text-align: center;
  display: block;
}

#subheader {
  margin: 0 auto;
  width: 100%;
  text-align: center;
  font-size: 1.5em;
}

@media (max-width: 800px) {
  #subheader {
    font-size: 1.2em;
    margin: 0 auto;
  }
}

#arrow {
  position: absolute;
  height: 2em;
  bottom: 3em;
  left: 50%;
  transform: translateX(-50%);
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


main {
  text-align: center;
  margin: 2em var(--margin-sides);
  display: grid;
  grid-template-rows: auto 1fr auto;
  color: rgb(14, 10, 10);
}

#about_link,
#museum_link {
  display: inline;
  height: 1em;
}

#welcome_text,
#history {
  margin: 1em auto;
  max-width: 1000px;

}

#timeline_big {
  display: block;
  width: 100%;
  max-width: 1000px;
  margin: 5em auto;
}

#timeline_small {
  display: none;
  margin: 20px auto;
  max-width: 700px;
}

@media (max-width: 800px) {
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
  color: #222;
  border: 1px solid #222;
  background-color: inherit;
  cursor: pointer;
}


#map {
  height: 400px;
}

#leftright {
  max-width: 1200px;
  margin: 3em auto;
  display: grid;
  grid-template-columns: 2fr 1fr;
  font-size: 0.85em;
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

#leftright a {
  margin-top: 10px;
  font-weight: 600;
}

header img {
  display: block;
  height: auto;
}

header a {
  display: inline-block;
  text-decoration: none;
  color: #333;
  font-size: 0.85em;
  font-weight: bold;
  border-radius: 5px;
}
</style>
