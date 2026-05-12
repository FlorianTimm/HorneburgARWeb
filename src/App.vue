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
    --margin-sides: 0.1em;
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
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: 'Karla', sans-serif;
  font-weight: 400;
  text-align: left;
  line-height: 1.6;
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
  font-weight: 500;
}

h1 {
  font-size: 2.8em;
}

h2 {
  font-size: 1.5em;
}

h3 {
  font-size: 1.15em;
  margin-bottom: 0.5em;
}

h4 {
  font-size: 1.1em;
}

button {
  font-weight: 600;
}

hr {
  border: none;
  border-bottom: 2px solid #999;
  margin-top: 2em;
  margin-bottom: 4em;
}
</style>