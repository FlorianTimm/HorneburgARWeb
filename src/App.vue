<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useSplashStore } from './stores/splash';
const splash = useSplashStore()
splash.shouldShow();

import { useI18n } from 'vue-i18n'
const { t } = useI18n()

import { ModelFetcher } from '@/func/modelFetcher';
ModelFetcher.preload();
</script>

<template>
  <RouterView :key="$route.fullPath"></RouterView>
</template>


<style>
@font-face {
  font-family: 'Karla';
  src: url('@/assets/font/Karla/Karla-VariableFont_wght.ttf') format('truetype');
}

@font-face {
  font-family: 'Karla italic';
  src: url('@/assets/font/Karla/Karla-Italic-VariableFont_wght.ttf') format('truetype');
}

:root {
  --margin-sides: 3em;
}

@media (max-width: 800px) {
  :root {
    --margin-sides: 1em;
  }
}

@media (max-width: 400px) {
  :root {
    --margin-sides: 0.5em;
  }
}

body,
html {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  background-color: #EBEDE9;
  font-size: 18px;
  color: #000;
  line-height: 1.6;
  text-align: left;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: 'Karla', sans-serif;
  font-weight: 400;
}

a {
  color: inherit;
  text-decoration: none;
}

h1,
h2,
h3,
h4,
h5 {
  line-height: 1.25;
  font-weight: 500;
}

h1 {
  font-size: 2.8em;
}

h2 {
  font-size: 1.5em;
}

h3 {
  font-size: 1.2em;
  margin-bottom: 0.5em;
}

h4 {
  font-size: 1.1em;
}

main>p,
article>p,
main>h1,
article>h1,
main>h2,
article>h2,
main>h3,
article>h3,
main>h4,
article>h4 {
  margin-left: 1em;
  margin-bottom: 0.7em;
  width: 100%;
  max-width: 1000px;
}

@media (min-width: 1050px) {

  article>p,
  main>h1,
  main>h2,
  main>h3,
  main>h4,
  article>h1,
  article>h2,
  article>h3,
  article>h4 {
    margin-left: auto;
    margin-right: auto;
  }
}

@media (max-width: 800px) {

  main>p,
  article>p,
  main>h1,
  main>h2,
  main>h3,
  main>h4,
  article>h1,
  article>h2,
  article>h3,
  article>h4 {
    margin-left: 0.1em;
  }
}

button {
  font-weight: 600;
}

hr {
  border: none;
  border-bottom: 2px solid #999;
  margin: 4em -0.5em;
}

.arrow_in_front::before {
  content: "";
  display: inline-block;
  height: 0.7em;
  width: 1em;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: bottom right;
  margin-right: 0.3em;
  background-image: url('@/assets/icons/arrow_right.svg');

}
</style>