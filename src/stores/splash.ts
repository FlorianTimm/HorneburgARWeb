import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useSplashStore = defineStore('splash', () => {
  const count = ref(false)
  function wasShown() {
    count.value = true
  }

  function shouldShow(): boolean {
    return !count.value;
  }

  return { count, wasShown, shouldShow }
})
