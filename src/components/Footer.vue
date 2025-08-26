<template>
  <footer class="bg-[#191970] text-gray-200 py-8">
    <div class="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
      <div class="mb-4 md:mb-0 text-center md:text-left">
        <h4 class="text-xl font-semibold mb-2">Nino</h4>
        <p>© 2025 Nino. Tous droits réservés.</p>
      </div>
      <nav class="flex space-x-6">
        <RouterLink to="/" class="hover:text-white transition">Accueil</RouterLink>
        <RouterLink to="/a-propos" class="hover:text-white transition">À propos</RouterLink>
      </nav>
    </div>
  </footer>
</template>

<script>
import { RouterLink } from 'vue-router';

export default {
  name: 'Footer',
};
</script>