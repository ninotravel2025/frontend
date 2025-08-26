<template>
  <Hero/>
  <HomeCards/>  
  <Footer/>
</template>
<script>
import Footer from '@/components/Footer.vue';
import Hero from '@/components/Hero.vue';
import HomeCards from '@/components/HomeCards.vue';
export default {
  name: 'HomeView',
  components: {Hero, HomeCards, Footer}
}

</script>