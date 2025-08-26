<template>
	<PageContainer title="Réserver un véhicule">
		<!-- Header Image + Text -->
		<div class="h-64 w-full flex justify-center items-center bg-white">
			<img class="h-full w-auto object-contain rounded-md" :src="selectedCarPic"
				:alt="`${vehiculeForm.seatCount}-seat car`" />
		</div>

		<form class="bg-white p-6 rounded-lg shadow-md space-y-6">
			<!-- Number of Places -->
			<div>
				<label class="block text-sm text-gray-600 mb-1" for="places">Nombre de places</label>
				<div class="flex items-center space-x-2">
					<select v-model.number="vehiculeForm.seatCount" id="places"
						class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4a4ab3]"
						required>
						<option disabled value="">-- Choisir --</option>
						<option :value="4">4</option>
						<option :value="6">6</option>
						<option :value="8">8</option>
					</select>
				</div>
			</div>

			<!-- Date and Time -->
			<div class="grid md:grid-cols-2 gap-4">
				<div>
					<label class="block text-sm text-gray-600 mb-1" for="date">Date de réservation</label>
					<input v-model="vehiculeForm.date" type="date" id="date"
						:min="new Date().toISOString().split('T')[0]"
						class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4a4ab3]"
						required />
					<ErrorMap :errors="errors.date" />
				</div>
				<div>
					<label class="block text-sm text-gray-600 mb-1" for="time">Heure de réservation</label>
					<input v-model="vehiculeForm.time" type="time" id="time"
						class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4a4ab3]"
						required />
					<ErrorMap :errors="errors.time" />
				</div>
			</div>

			<!-- From and To Select -->
			<div class="grid md:grid-cols-2 gap-4">
				<div>
					<label class="block text-sm text-gray-600 mb-1" for="from">De</label>
					<select disabled v-model="vehiculeForm.from" id="from"
						class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4a4ab3]"
						required>
						<option disabled value="">-- Choisissez une gouvernorat --</option>
						<option v-for="gov in governorates" :key="'from-' + gov" :value="gov">{{ gov }}</option>
					</select>
					<ErrorMap :errors="errors.from" />
				</div>
				<div>
					<label class="block text-sm text-gray-600 mb-1" for="to">À</label>
					<select v-model="vehiculeForm.to" id="to"
						class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4a4ab3]"
						required>
						<option disabled value="">-- Choisissez une gouvernorat --</option>
						<option v-for="gov in governorates.filter(gov => gov !== 'Tunis')" :key="'to-' + gov" :value="gov">{{ gov }}</option>
					</select>
					<ErrorMap :errors="errors.to" />
				</div>
			</div>

				<!-- Display Price -->
        <div  v-if="vehiculeForm" class="flex justify-between items-center px-2">
          <span class="text-sm text-gray-600">Prix de l’excursion</span>
          <span class="text-lg font-semibold text-[#191970]">
            {{ calculatedPrice.toFixed(2) }} €
          </span>
        </div>

			<!-- Submit -->
			<button @click="submitForm"
				class="w-full cursor-pointer bg-[#191970] hover:bg-[#14145c] text-white py-3 rounded-lg transition duration-200 flex justify-center items-center">
				<span v-if="!loading">Réserver le véhicule</span>
				<Spinner v-if="loading" />
			</button>
		</form>

	</PageContainer>
		<Footer />
		<Snackbar />
</template>

<script>
import FourSeatsCarPic from '@/assets/images/4_seater.jpg'
import sixSeatsCarPic from '@/assets/images/6_seater.jpg'
import eightSeatsCarPic from '@/assets/images/8_seater.jpg'

import Footer from '@/components/Footer.vue'
import PageContainer from '@/components/PageContainer.vue'
import ErrorMap from '@/components/ErrorMap.vue'
import Snackbar from '@/components/Snackbar.vue'
import Spinner from '@/components/Spinner.vue'

export default {
	name: "ExcursionView",
	components: { PageContainer, Footer, ErrorMap, Snackbar, Spinner },
	data() {
		return {
			vehiculeForm: {
				seatCount: 4,
				date: '',
				time: '',
				from: 'Tunis',
				to: '',
				prix: 0
			},
			isFormValid: false,
			errors: {
				date: [],
				time: [],
				from: [],
				to: [],
			},
			FourSeatsCarPic,
			sixSeatsCarPic,
			eightSeatsCarPic,
			governorates: [
				'Tunis', 'Hammamet', 'Sousse', 'Monastir', 'Tozeur',
				'Mahdia', 'Djerba', 'Bizerte'
			],
			priceMap: {
				Hammamet: 50,
				Sousse: 90,
				Monastir: 110,
				Tozeur: 260,
				Mahdia: 120,
				Djerba: 300,
				Bizerte: 50
			},
			loading: false
		}
	},
	methods: {
		async submitForm(event) {
			event.preventDefault()

			if (!this.isAuthenticated) {
				localStorage.setItem('vehiculeForm', JSON.stringify(this.vehiculeForm));
				this.$router.push({ name: 'login', query: { redirect: this.$route.fullPath } })
				return
			}

			this.isFormValid = true
			this.errors = {
				date: [],
				time: [],
				from: [],
				to: [],
			}

			if (!this.vehiculeForm.date) {
				this.errors.date.push('Champ réquis')
				this.isFormValid = false
			} else if (new Date(this.vehiculeForm.date) <= new Date()) {
				this.errors.date.push('La date doit être dans le futur')
				this.isFormValid = false
			}

			if (!this.vehiculeForm.time) {
				this.errors.time.push('Champ réquis')
				this.isFormValid = false
			}

			if (!this.vehiculeForm.from) {
				this.errors.from.push('Champ réquis')
				this.isFormValid = false
			}

			if (!this.vehiculeForm.to) {
				this.errors.to.push('Champ réquis')
				this.isFormValid = false
			}

			if (!this.isFormValid) return

			this.vehiculeForm.prix = this.calculatedPrice
			this.loading = true
			const success = await this.$store.dispatch('reservations/reserveVehicule', { data: this.vehiculeForm })
			this.loading = false
			if (success) {
				this.$router.push('/')
				this.$store.dispatch('snackbar/show', {
					message: "Réservation réussie ! Vérifiez votre email pour la confirmation.",
					type: 'success',
					timeout: 5000
				});
			}
		}
	},
	computed: {
		selectedCarPic() {
			switch (this.vehiculeForm.seatCount) {
				case 4: return FourSeatsCarPic
				case 6: return sixSeatsCarPic
				case 8: return eightSeatsCarPic
				default: return FourSeatsCarPic
			}
		},
		isAuthenticated() {
			return this.$store.state.auth.isAuthenticated
		},
		calculatedPrice() {
			return this.priceMap[this.vehiculeForm.to] ?? 0
		}
	},
	mounted() {
		const savedForm = localStorage.getItem('vehiculeForm');
		if (savedForm) {
			Object.assign(this.vehiculeForm, JSON.parse(savedForm));
			localStorage.removeItem('vehiculeForm');
		}
	}
}
</script>

<style></style>
