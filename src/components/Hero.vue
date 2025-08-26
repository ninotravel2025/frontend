<template>
  <section class="relative h-[70vh] flex items-center justify-center text-white">
    <transition-group name="fade" tag="div" class="absolute inset-0 w-full h-full">
      <div
        v-for="(pic, index) in pics"
        v-show="index === selectedPicIndex"
        :key="index"
        class="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000"
        :style="{ backgroundImage: `url(${pic})` }">
      </div>
    </transition-group>
    
    <div class="relative z-10 p-6 rounded-2xl text-center max-w-3xl text-shadow-lg mx-auto">
      <h2 class="text-4xl md:text-6xl font-bold mb-4">{{ title }}</h2>
      <p class="text-lg md:text-xl font-bold">{{ subtitle }}</p>
    </div>
  </section>
</template>

<script>
import HeroPic1 from "@/assets/images/hero_caravan.jpg";
import HeroPic2 from "@/assets/images/hero_jem.jpg";
import HeroPic3 from "@/assets/images/hero_sidibou.jpg";

export default {
  name: "Hero",
  props: {
    title: {
      type: String,
      default: 'Explorez la Tunisie à Votre Rythme',
    },
    subtitle: {
      type: String,
      default: 'Réservez vos excursions et véhicules en quelques clics pour des aventures inoubliables.',
    }
  },
  data() {
    return {
      selectedPicIndex: 0,
      pics: [HeroPic1, HeroPic2, HeroPic3],
      intervalId: null,
    };
  },
  mounted() {
    this.intervalId = setInterval(() => {
      this.selectedPicIndex = (this.selectedPicIndex + 1) % this.pics.length;
    }, 2000); // Change image every 4 seconds
  },
  beforeUnmount() {
    clearInterval(this.intervalId);
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>