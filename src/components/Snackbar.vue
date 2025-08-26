<template>
  <transition name="fade">
    <div
      v-if="visible"
      :class="[
        'fixed bottom-4 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg shadow-md text-white z-50',
        colorClass
      ]"
    >
      {{ message }}
    </div>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('snackbar', ['snackbarVisible', 'snackbarMessage', 'snackbarType']),
    visible() {
      return this.snackbarVisible
    },
    message() {
      return this.snackbarMessage
    },
    colorClass() {
      switch (this.snackbarType) {
        case 'success':
          return 'bg-green-600'
        case 'error':
          return 'bg-red-600'
        case 'warning':
          return 'bg-yellow-500 text-black'
        default:
          return 'bg-blue-600'
      }
    }
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>