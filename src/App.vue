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
