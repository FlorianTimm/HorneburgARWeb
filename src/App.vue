<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <h1>{{ $route.name }}</h1>
  <a @click="$router.back()" href="">back</a>
  <p><strong>Current route path:</strong> {{ $route.fullPath }}</p>
  <main>
    <RouterView />
  </main>
</template>
