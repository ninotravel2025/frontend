<template>
  <section class="py-16 bg-[#f6f0ed]">
    <div class="container-xl lg:container m-auto">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
        <Card bg="bg-[#e0d8cc]">
          <h2 class="text-2xl font-bold">Réserver une excursion</h2>
          <p class="mt-2 mb-4">
            Découvrez les merveilles de la Tunisie avec des excursions guidées vers les sites les plus emblématiques du pays.
          </p>
          <RouterLink to="/excursions" class="inline-block bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-700">
            Voir les excursions
          </RouterLink>
        </Card>

        <Card bg="bg-[#e0e0f7]"> <!-- light indigo shade instead of bg-cyan-100 -->
          <h2 class="text-2xl font-bold text-[#4a4ab3]">Réserver un véhicule</h2>
          <p class="mt-2 mb-4">
            Louez le véhicule parfait pour explorer la Tunisie à votre rythme, en toute liberté et sécurité.
          </p>
          <RouterLink
            to="/vehicules"
            class="inline-block bg-[#191970] text-white rounded-lg px-4 py-2 hover:bg-[#14145c]"
          >
            Choisir un véhicule
          </RouterLink>
        </Card>
      </div>
    </div>
  </section>
</template>


<script setup>
import Card from './Card.vue';
import { RouterLink } from "vue-router"

</script>