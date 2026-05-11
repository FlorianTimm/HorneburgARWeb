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

body,
html {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  font-family: 'Karla', sans-serif;
  background-color: #EBEDE9;
}
</style>