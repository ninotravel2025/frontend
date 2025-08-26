<template>
  <section class="text-center flex flex-col justify-center items-center h-96">
      <i class="pi pi-exclamation-triangle text-yellow-500 text-7xl mb-5"></i>
      <h1 class="text-6xl font-bold mb-4">404 Non trouvé</h1>
      <p class="text-xl mb-5">Cette page n'existe pas</p>
      <RouterLink
        to="/"
        class="text-white bg-[#4a4ab3] hover:bg-[#191970] rounded-md px-3 py-2 mt-4"
        >Retourner en arrière</RouterLink
      >
    </section>
</template>

<script setup>
import { RouterLink } from 'vue-router';
</script>