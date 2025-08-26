<template>
  <div class="min-h-screen flex items-center justify-center bg-[#f6f0ed]">
    <div class="bg-white p-8 rounded-md shadow-md w-full max-w-md">
      <h1 class="text-3xl font-semibold text-[#191970] mb-6 text-center">Bienvenue</h1>
      <form>
        <div class="mb-4">
          <label class="block text-sm text-gray-600 mb-1" for="email">Email</label>
          <input
            v-model="loginForm.email"
            type="email"
            id="email"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4a4ab3]"
            placeholder="you@example.com"
            required
          />
        </div>
        <div class="mb-6">
          <label class="block text-sm text-gray-600 mb-1" for="password">Mot de passe</label>
          <input
            v-model="loginForm.password"
            type="password"
            id="password"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4a4ab3]"
            placeholder="••••••••"
            required
          />
        </div>
        <button
          @click="login"
          class="w-full bg-[#191970] hover:bg-[#14145c] text-white py-2 rounded-lg transition duration-200 mb-4"
        >
          S'autentifier
        </button>

        <span>
          Vous n'avez pas encore de compte ?
          <RouterLink class="text-[#4a4ab3] hover:text-[#191970]" to="/register">
            Inscrivez-vous ici !
          </RouterLink>
        </span>
      </form>
    </div>
  </div>
  
  <Snackbar />
</template>

<script>
import Snackbar from '@/components/Snackbar.vue'
export default {
  name: "LoginView",
  components: {
    Snackbar
  },
  data () {
    return {
      loginForm: {
        email: "",
        password: "",
      }
    }
  },
  methods : {
    async login (event) {
      event.preventDefault();
      const success = await this.$store.dispatch('auth/login', { data: this.loginForm })
      if (success) {
        const redirect = this.$route.query.redirect || '/';
        this.$router.push(redirect)
        this.$store.dispatch('snackbar/show', {
          message: "Connexion réussie ! Bienvenue.",
          type: 'success',
          timeout: 4000
        });
      }
    }
  }
}

</script>