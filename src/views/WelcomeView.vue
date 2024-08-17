<script setup lang="ts">
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
</script>

<template>
  <div
    class="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-black via-gray-800 to-black p-6"
  >
    <p
      class="text-2xl md:text-5xl leading-loose md:leading-normal font-light italic text-white max-w-2xl text-center px-4 mb-8"
    >
      Just when I’m ready to give up, thoughts of us keep me going.
    </p>
    <p
      class="text-xl md:text-4xl leading-loose md:leading-normal font-medium italic text-gray-300 max-w-2xl text-center px-4"
    >
      - {{ userStore.name }}
    </p>
  </div>
</template>

<style scoped>
body {
  font-family: 'Lora', serif;
}

p {
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
}
</style>
