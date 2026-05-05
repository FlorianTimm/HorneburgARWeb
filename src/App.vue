<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useSplashStore } from './stores/splash';
const splash = useSplashStore()
splash.shouldShow();
</script>

<template>
  <RouterView :key="$route.fullPath"></RouterView>
</template>
