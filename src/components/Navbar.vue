<template>
  <nav class="bg-[#191970] border-b border-[#1a1a6e]">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-20 items-center justify-between">
        <!-- Logo -->
        <RouterLink class="flex items-center" to="/">
          <img class="h-10 w-auto" :src="Logo" alt="Car rental" />
          <span class="block text-white text-2xl font-bold ml-2">NINO</span>
        </RouterLink>

        <!-- Mobile menu button -->
        <div class="flex sm:hidden">
          <button @click="showMenu = !showMenu" type="button"
            class="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-[#6666cc] hover:bg-[#1c1c82] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            aria-controls="mobile-menu"
            aria-expanded="false">
            <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
              stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        <!-- Desktop menu -->
        <div class="hidden sm:flex space-x-2">
          <RouterLink
            to="/"
            :class="[
              isActiveLink('/') ? 'bg-[#14145c]' : 'hover:bg-gray-900 hover:text-white',
              'text-white rounded-md px-3 py-2'
            ]">Accueil</RouterLink>
          <RouterLink
            to="/a-propos"
            :class="[
              isActiveLink('/a-propos') ? 'bg-[#14145c]' : 'hover:bg-gray-900 hover:text-white',
              'text-white rounded-md px-3 py-2'
            ]">A propos</RouterLink>
          <RouterLink
            to="/vehicules"
            :class="[
              isActiveLink('/vehicules') ? 'bg-[#14145c]' : 'hover:bg-gray-900 hover:text-white',
              'text-white rounded-md px-3 py-2'
            ]">Véhicules</RouterLink>
          <RouterLink
            to="/excursions"
            :class="[
              isActiveLink('/excursions') ? 'bg-[#14145c]' : 'hover:bg-gray-900 hover:text-white',
              'text-white rounded-md px-3 py-2'
            ]">Excursion</RouterLink>

          <template v-if="!isAuthenticated">
            <RouterLink
              to="/login"
              :class="[
                isActiveLink('/login') ? 'bg-[#14145c] text-white hover:text-[#6666cc]' : 'bg-white hover:bg-gray-100 hover:text-[#191970]',
                'rounded-md px-3 py-2'
              ]">Se connecter</RouterLink>
          </template>
          <template v-else>
            <button
              @click="logout"
              class="bg-red-600 text-white hover:bg-red-700 rounded-md px-3 py-2"
            >
              Se déconnecter
            </button>
          </template>
        </div>
      </div>
    </div>

    <!-- Mobile menu -->
    <div v-if="showMenu" class="sm:hidden px-4 pb-4">
      <div class="space-y-1">
        <RouterLink
          to="/"
          @click="showMenu = false"
          :class="[
            isActiveLink('/') ? 'bg-[#14145c]' : 'hover:bg-gray-900 hover:text-white',
            'block text-white rounded-md px-3 py-2'
          ]">Accueil</RouterLink>
        <RouterLink
          to="/a-propos"
          @click="showMenu = false"
          :class="[
            isActiveLink('/a-propos') ? 'bg-[#14145c]' : 'hover:bg-gray-900 hover:text-white',
            'block text-white rounded-md px-3 py-2'
          ]">A propos</RouterLink>
        <RouterLink
          to="/vehicules"
          @click="showMenu = false"
          :class="[
            isActiveLink('/vehicules') ? 'bg-[#14145c]' : 'hover:bg-gray-900 hover:text-white',
            'block text-white rounded-md px-3 py-2'
          ]">Véhicules</RouterLink>
        <RouterLink
          to="/excursions"
          @click="showMenu = false"
          :class="[
            isActiveLink('/excursions') ? 'bg-[#14145c]' : 'hover:bg-gray-900 hover:text-white',
            'block text-white rounded-md px-3 py-2'
          ]">Excursion</RouterLink>

        <template v-if="!isAuthenticated">
          <RouterLink
            to="/login"
            @click="showMenu = false"
            :class="[
              isActiveLink('/login') ? 'bg-[#14145c] text-white hover:text-[#6666cc]' : 'bg-white hover:bg-gray-100 hover:text-[#191970]',
              'block rounded-md px-3 py-2'
            ]">Se connecter</RouterLink>
        </template>
        <template v-else>
          <button
            @click="handleMobileLogout"
            class="block w-full text-left bg-red-600 text-white hover:bg-red-700 rounded-md px-3 py-2"
          >
            Se déconnecter
          </button>
        </template>
      </div>
    </div>
  </nav>
</template>

<script>
import Logo from "@/assets/images/logo_white_car.png";
import { useRoute, RouterLink } from "vue-router";

export default {
  components: {
    RouterLink
  },
  data() {
    return {
      Logo,
      showMenu: false
    };
  },
  computed: {
    route() {
      return useRoute();
    },
    isAuthenticated () {
      return this.$store.state.auth.isAuthenticated;
    }
  },
  methods: {
    isActiveLink(routePath) {
      return this.route.path === routePath;
    },
    toggleMenu() {
      this.showMenu = !this.showMenu;
    },
    logout() {
      this.$store.dispatch('auth/logout').then(() => {
        this.$router.push('/');
      });
    },
    handleMobileLogout() {
      this.logout();
      this.showMenu = false;
    }
  }
};
</script>
