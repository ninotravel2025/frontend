<template>
  <!-- Header -->
  <PageContainer title="Réserver une excursion">
    <!-- Tabs -->
    <div class="flex justify-center flex-wrap space-x-4 mb-8">
      <button
        v-for="(excursion, index) in excursions"
        :key="index"
        @click="selectedTab = index"
        :class="[
          'px-6 py-2 my-2 rounded-full transition',
          selectedTab === index
            ? 'bg-[#191970] text-white'
            : 'bg-white text-[#191970] border border-[#191970] hover:bg-[#f6f6ff]',
        ]">
        {{ excursion.name }}
      </button>
    </div>

    <!-- Selected Excursion Content -->
    <div class="bg-white rounded-lg shadow-md overflow-hidden">
      <!-- Header Image + Text -->
      <div class="h-64 bg-cover bg-center flex flex-col justify-center items-center text-white text-center px-6"
        :style="{ backgroundImage: `url(${excursions[selectedTab].image})` }">
        <h3 class="text-3xl font-semibold drop-shadow-md">{{ excursions[selectedTab].name }}</h3>
        <p class="mt-2 max-w-xl drop-shadow-sm">{{ excursions[selectedTab].description }}</p>
      </div>

      <div class="bg-[#f6f6ff] text-[#191970] px-6 py-4 border-t border-gray-200">
        <p class="text-sm md:text-base leading-relaxed">
          Pour toute excursion supplémentaire, personnalisée ou pour tout autre service, 
          <strong>l'équipe Nino</strong> est à votre écoute. N'hésitez pas à nous contacter 
          par <a href="mailto:contact@gmail.com" class="underline hover:text-blue-600">e-mail</a> 
          ou via <a href="https://wa.me/your_number" target="_blank" class="underline hover:text-green-600">WhatsApp</a>.
        </p>
      </div>

      <!-- Programme -->
      <div class="pt-6 px-6">
        <h4 class="text-xl font-semibold mb-2 text-[#191970]">Programme</h4>
        
        <!-- Conditional Duration -->
        <p v-if="excursions[selectedTab].duration" class="text-sm text-gray-600 italic mb-2">
          {{ excursions[selectedTab].duration }}
        </p>

        <p class="whitespace-pre-wrap text-gray-700">
          {{ excursions[selectedTab].program }}
        </p>
      </div>

      <!-- Form -->
      <form class="p-6 space-y-6">
        <div class="grid md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm text-gray-600 mb-1">Date de départ</label>
            <input
              v-model="excursionForm.startDate"
              type="date"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4a4ab3]"
              required
            />
            
          <ErrorMap :errors="errors.startDate"/>
          </div>
          <div>
            <label class="block text-sm text-gray-600 mb-1">Nombre de personnes</label>
            <input
              v-model="excursionForm.peopleCount"
              type="number"
              min="1"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4a4ab3]"
              required
            />
          </div>
        </div>

        <!-- Price Section -->
        <div class="px-2">
          <div class="flex justify-between items-center">
            <span class="text-sm text-gray-600">Prix de l’excursion</span>
            <span class="text-lg font-semibold text-[#191970]">
              {{ excursions[selectedTab].price.toFixed(2) }} €
            </span>
          </div>
          <p class="text-sm text-gray-600 italic mt-1">
            Le prix est pour tout le groupe (maximum 8 personnes)
          </p>
          
          <p class="text-sm text-gray-600 italic mt-1" v-if="excursions[selectedTab].nightStay"> 
            <span class="font-bold">pour logement et 3 repas </span>: 100 euro supplementaire pour chaque personne 
          </p>
        </div>
        
        <button
          @click="submitForm"
          class="w-full bg-[#191970] cursor-pointer hover:bg-[#14145c] text-white py-3 rounded-lg transition duration-200 flex justify-center items-center">
          <span v-if="!loading">Réserver maintenant</span>
           <Spinner v-if="loading"/>
        </button>
      </form>
    </div>
  </PageContainer>
  <Footer/>
  <Snackbar/>
</template>
<script>
import KairawanPic from "@/assets/images/kairawen.jpg"
import SidiBouPic from "@/assets/images/sidi_bou.jpg"
import DesertBike from "@/assets/images/desert_bike.jpg"
import Matmata from "@/assets/images/excursion_matmata.jpg"
import Dogga from "@/assets/images/excursion_dogga.jpg"
import Testour from "@/assets/images/excursion_testour.jpg"

import PageContainer from '@/components/PageContainer.vue';
import Footer from '@/components/Footer.vue';
import ErrorMap from '@/components/ErrorMap.vue';
import Snackbar from '@/components/Snackbar.vue';
import Spinner from '@/components/Spinner.vue';

export default {
  name: "ExcursionView",
  components: { PageContainer, Footer, ErrorMap, Snackbar, Spinner},
  data() {
    return {
      excursions: [
        {
          name: 'Kairouan-el jem',
          type: "Kairouan-el jem",
          date: '',
          description: 'de la spiritualité de Kairouan à la grandeur du Colisée d’El Jem. Culture et patrimoine au sommet.',
          program: `- Kairouan
- El jem`,
          image: KairawanPic,
          price: 200
        },
        {
          name: 'De Carthage à la Médina',
          type: "Carthage - sidi bou - El médina",
          date: '',
          description: 'ruines romaines, village bleu perché et Médina envoûtante. Un condensé d’histoire et de charme en une journée.',
          program: `- Carthage 
- Sidi bou 
- El médina`,
          image: SidiBouPic,
          price: 130
        },
        {
          name: 'Circuit des Oasis et Dunes',
          type: "Tozeur-chbika tamarza ong jmal",
          date: '',
          description: 'oasis, cascades, canyons et dunes dorées. Un décor de rêve entre nature et cinéma.',
          program: `- Tozeur
- Chbika
- Tamarza 
- Ong jmal`,
          duration: '1 nuitée, 2 jours', 
          nightStay: true,
          image: DesertBike,
          price: 550
        },
        {
          name: 'Circuit des Oasis et Dunes 2',
          type: "Tozeur-chbika - ong jmal - douz - tamarzet - matmata",
          date: '',
          description: 'Explorez Tozeur, Chbika, Ong Jmal, Douz, Tamerza et Matmata en un circuit épique entre désert, montagne et traditions.',
          program: `- Tozeur
- Chbika
- Ong jmal
- Douz
- Tamarza 
- Matmata`,
          duration: '2 nuités, 3 jours', 
          nightStay: true,
          image: Matmata,
          price: 700
        },
        {
          name: 'Entre ruines romaines et charme andalou',
          type: 'Dogga - Testour',
          date: '',
          description: 'Découvrez les vestiges grandioses de Dougga et laissez-vous charmer par l’architecture andalouse de Testour. Un pur concentré d’histoire et d’élégance.',
          program: `- Dogga
- Testour`,
          image: Testour,
          price: 150
        },
        {
          name: 'Sur les traces de l’Antiquité et de la nature',
          type: 'Dogga - bellerijia',
          date: '',
          description: 'Explorez Dougga, site archéologique majeur, puis partez à la découverte de la réserve naturelle de Bellerijia. Un voyage entre histoire et paysages préservés.',
          program: `- Dogga
- Bellerijia`,
          image: Dogga,
          price: 200
        }
      ],
      selectedTab: 0,
      excursionForm: {
        excursionType: "",
        peopleCount: 1,
        startDate: "",
        price: 0
      },
      errors: {
        startDate : []
      },
      isFormValid: true,
      loading: false,
    }
  },
  mounted() {
    const savedForm = localStorage.getItem('excursionForm');
    if (savedForm) {
      Object.assign(this.excursionForm, JSON.parse(savedForm));
      localStorage.removeItem('excursionForm');
    }
  },
  computed: {
    isAuthenticated () {
      return this.$store.state.auth.isAuthenticated
    }
  },
  methods: {
    async submitForm(event) {
      event.preventDefault();
      
      if (!this.isAuthenticated) {
        localStorage.setItem('excursionForm', JSON.stringify(this.excursionForm));
        this.$router.push({ name: 'login', query: { redirect: this.$route.fullPath } })
        return
      }

      this.isFormValid = true
      this.errors = {
        startDate: []
      }

      if (!this.excursionForm.startDate) {
        this.errors.startDate.push('Champ réquis')
        this.isFormValid = false
      } else if (new Date(this.excursionForm.startDate) <= new Date()) {
        this.errors.startDate.push('La date doit être dans le futur')
        this.isFormValid = false
      }
      
      if (!this.isFormValid) return

      this.excursionForm.excursionType = this.excursions[this.selectedTab].type
      this.excursionForm.price = this.excursions[this.selectedTab].price

      this.loading = true
      const success = await this.$store.dispatch('reservations/reserveExcursion', {data: this.excursionForm})
      this.loading = false
      if (success) {
        this.$router.push('/')
        this.$store.dispatch('snackbar/show', {
          message: "Réservation d'excursion réussie ! Vérifiez votre email pour la confirmation.",
          type: 'success',
          timeout: 5000
        });
      }
    }
  }
}
</script>
<style></style>