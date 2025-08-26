<template>
  <div class="min-h-screen flex items-center justify-center bg-[#f6f0ed]">
    <div class="bg-white p-8 rounded-2xl shadow-md w-full max-w-lg">
      <h1 class="text-3xl font-semibold text-[#191970] mb-6 text-center">Créer un compte</h1>

      <form @submit.prevent="register" class="space-y-4">
        <div class="my-6 border-t border-gray-300"></div>
        <h3 class="text-xl text-[#191970]">Informations de contact</h3>

        <div>
          <label class="block text-sm text-gray-600 mb-1" for="firstName">Prénom</label>
          <input
            v-model="registerForm.firstName"
            type="text"
            id="firstName"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4a4ab3]"
            placeholder="Prénom"
            required
          />
        </div>

        <div>
          <label class="block text-sm text-gray-600 mb-1" for="lastName">Nom</label>
          <input
            v-model="registerForm.lastName"
            type="text"
            id="lastName"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4a4ab3]"
            placeholder="Nom"
            required
          />
        </div>

        <div>
          <label class="block text-sm text-gray-600 mb-1" for="email">Adresse e-mail</label>
          <input
            v-model="registerForm.email"
            type="email"
            id="email"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4a4ab3]"
            placeholder="vous@example.com"
            required
          />
          <ErrorMap :errors="errors.email" />
        </div>

        <div>
          <label class="block text-sm text-gray-600 mb-1" for="country">Pays</label>
          <div class="flex items-center">
            <select
              v-model="registerForm.country"
              id="country"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4a4ab3]"
              required
              @change="updatePhoneCode"
            >
              <option disabled value="">-- Choisissez un pays --</option>
              <option
                v-for="country in countries"
                :key="country"
                :value="country"
              >{{ country }}</option>
            </select>
            <img
              v-if="countryFlag"
              :src="countryFlag"
              alt="flag"
              class="ml-2 w-6 h-4 rounded"
            />
          </div>
        </div>

        <div>
          <label class="block text-sm text-gray-600 mb-1" for="phone">Téléphone</label>
          <div class="flex items-center">
            <img
              v-if="countryFlag"
              :src="countryFlag"
              alt="flag"
              class="mr-2 w-6 h-4 rounded"
            />
            <span
              v-if="phoneCode"
              class="px-2 py-1 bg-gray-100 border border-gray-300 rounded-l"
            >{{ phoneCode }}</span>
            <input
              v-model="registerForm.phone"
              type="tel"
              id="phone"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4a4ab3]"
              placeholder="xx xxx xxx"
              required
            />
          </div>
          <ErrorMap :errors="errors.phone" />
        </div>

        <div>
          <label class="block text-sm text-gray-600 mb-1" for="password">Mot de passe</label>
          <input
            v-model="registerForm.password"
            type="password"
            id="password"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4a4ab3]"
            placeholder="••••••••"
            required
          />
          <ErrorMap :errors="errors.password" />
        </div>

        <div class="my-6 border-t border-gray-300"></div>
        <button
          type="submit"
          class="w-full bg-[#191970] hover:bg-[#14145c] text-white py-2 rounded-lg transition duration-200 mb-4"
        >
          S'inscrire
        </button>

        <span>
          Vous avez déjà un compte ?
          <RouterLink class="text-[#4a4ab3] hover:text-[#14145c]" to="/login">
            Connectez-vous ici !
          </RouterLink>
        </span>
      </form>
    </div>
  </div>

  <Snackbar />
</template>

<script>
import { RouterLink } from 'vue-router';
import ErrorMap from '@/components/ErrorMap.vue';
import Snackbar from '@/components/Snackbar.vue';

export default {
  name: 'RegisterView',
  components: { ErrorMap, Snackbar, RouterLink },
  data() {
    return {
      registerForm: {
        firstName: '',
        lastName: '',
        email: '',
        country: '',
        phone: '',
        password: ''
      },
      errors: {
        email: [],
        phone: [],
        password: []
      },
      countries: [
        'Tunisie', 'France', 'Italie', 'Espagne', 'Allemagne', 'Maroc',
        'Algérie', 'Libye', 'Égypte', 'Turquie', 'Canada', 'États-Unis',
        'Royaume-Uni', 'Belgique', 'Suisse', 'Pays-Bas', 'Portugal', 'Grèce',
        'Chine', 'Japon', 'Russie', 'Brésil', 'Argentine', 'Mexique',
        'Australie', 'Nouvelle-Zélande', 'Inde', 'Pakistan', 'Bangladesh',
        'Indonésie', 'Malaisie', 'Singapour', 'Thaïlande', 'Vietnam',
        'Corée du Sud', 'Philippines', 'Arabie Saoudite', 'Émirats arabes unis',
        'Qatar', 'Koweït', 'Jordanie', 'Liban', 'Syrie', 'Irak', 'Iran',
        'Afghanistan', 'Afrique du Sud', 'Nigeria', 'Kenya', 'Éthiopie',
        'Sénégal', "Côte d'Ivoire", 'Ghana', 'Cameroun', 'Soudan', 'Norvège',
        'Suède', 'Danemark', 'Finlande', 'Islande', 'Pologne',
        'République tchèque', 'Slovaquie', 'Hongrie', 'Autriche', 'Roumanie',
        'Bulgarie', 'Croatie', 'Serbie', 'Slovénie', 'Bosnie-Herzégovine',
        'Monténégro', 'Macédoine du Nord', 'Albanie', 'Estonie', 'Lettonie',
        'Lituanie', 'Ukraine', 'Biélorussie', 'Géorgie', 'Arménie',
        'Azerbaïdjan', 'Chili', 'Colombie', 'Pérou', 'Venezuela', 'Uruguay',
        'Paraguay', 'Bolivie', 'Équateur', 'Costa Rica', 'Panama', 'Cuba',
        'République dominicaine', 'Haïti', 'Jamaïque', 'Trinité-et-Tobago',
        'Bahamas', 'Barbade', 'Fidji', 'Papouasie-Nouvelle-Guinée',
        'Nouvelle-Calédonie', 'Polynésie française', 'Madagascar', 'Maurice',
        'Seychelles', 'Malte', 'Chypre', 'Israël', 'Palestine', 'Yémen',
        'Oman', 'Bahreïn', 'Mongolie', 'Kazakhstan', 'Ouzbékistan',
        'Turkménistan', 'Kirghizistan', 'Tadjikistan', 'Sri Lanka', 'Népal',
        'Bhoutan', 'Myanmar', 'Cambodge', 'Laos', 'Brunei', 'Timor oriental',
        'Zimbabwe', 'Zambie', 'Botswana', 'Namibie', 'Mozambique', 'Angola',
        'Rwanda', 'Burundi', 'Ouganda', 'Tanzanie', 'Somalie',
        'République centrafricaine', 'République du Congo',
        'République démocratique du Congo', 'Guinée', 'Guinée-Bissau',
        'Guinée équatoriale', 'Sierra Leone', 'Libéria', 'Mali',
        'Burkina Faso', 'Togo', 'Bénin', 'Niger', 'Tchad', 'Gabon',
        'Swaziland', 'Lesotho'
      ],
      countryPhoneMap: {
        Tunisie:    { code: '+216', flag: 'https://flagcdn.com/tn.svg' },
        France:     { code: '+33',  flag: 'https://flagcdn.com/fr.svg' },
        Italie:     { code: '+39',  flag: 'https://flagcdn.com/it.svg' },
        Espagne:    { code: '+34',  flag: 'https://flagcdn.com/es.svg' },
        Allemagne:  { code: '+49',  flag: 'https://flagcdn.com/de.svg' },
        Suisse:     { code: '+41',  flag: 'https://flagcdn.com/ch.svg' },
        Maroc:      { code: '+212', flag: 'https://flagcdn.com/ma.svg' },
        Algérie:    { code: '+213', flag: 'https://flagcdn.com/dz.svg' },
        Libye:      { code: '+218', flag: 'https://flagcdn.com/ly.svg' },
        Égypte:     { code: '+20',  flag: 'https://flagcdn.com/eg.svg' },
        Turquie:    { code: '+90',  flag: 'https://flagcdn.com/tr.svg' },
        Canada:     { code: '+1',   flag: 'https://flagcdn.com/ca.svg' },
        'États-Unis': { code: '+1', flag: 'https://flagcdn.com/us.svg' },
        'Royaume-Uni': { code: '+44', flag: 'https://flagcdn.com/gb.svg' },
        Belgique:   { code: '+32',  flag: 'https://flagcdn.com/be.svg' },
        'Pays-Bas':   { code: '+31',  flag: 'https://flagcdn.com/nl.svg' },
        Portugal:   { code: '+351', flag: 'https://flagcdn.com/pt.svg' },
        Grèce:      { code: '+30',  flag: 'https://flagcdn.com/gr.svg' },
        Chine:      { code: '+86',  flag: 'https://flagcdn.com/cn.svg' },
        Japon:      { code: '+81',  flag: 'https://flagcdn.com/jp.svg' },
        Russie:     { code: '+7',   flag: 'https://flagcdn.com/ru.svg' },
        Brésil:     { code: '+55',  flag: 'https://flagcdn.com/br.svg' },
        Argentine:  { code: '+54',  flag: 'https://flagcdn.com/ar.svg' },
        Mexique:    { code: '+52',  flag: 'https://flagcdn.com/mx.svg' },
        Australie:  { code: '+61',  flag: 'https://flagcdn.com/au.svg' },
        'Nouvelle-Zélande': { code: '+64', flag: 'https://flagcdn.com/nz.svg' },
        Inde:       { code: '+91',  flag: 'https://flagcdn.com/in.svg' },
        Pakistan:   { code: '+92',  flag: 'https://flagcdn.com/pk.svg' },
        Bangladesh: { code: '+880', flag: 'https://flagcdn.com/bd.svg' },
        Indonésie:  { code: '+62',  flag: 'https://flagcdn.com/id.svg' },
        Malaisie:   { code: '+60',  flag: 'https://flagcdn.com/my.svg' },
        Singapour:  { code: '+65',  flag: 'https://flagcdn.com/sg.svg' },
        Thaïlande:  { code: '+66',  flag: 'https://flagcdn.com/th.svg' },
        Vietnam:    { code: '+84',  flag: 'https://flagcdn.com/vn.svg' },
        'Corée du Sud': { code: '+82', flag: 'https://flagcdn.com/kr.svg' },
        Philippines:{ code: '+63',  flag: 'https://flagcdn.com/ph.svg' },
        'Arabie Saoudite': { code: '+966', flag: 'https://flagcdn.com/sa.svg' },
        'Émirats arabes unis': { code: '+971', flag: 'https://flagcdn.com/ae.svg' },
        Qatar:      { code: '+974', flag: 'https://flagcdn.com/qa.svg' },
        Koweït:     { code: '+965', flag: 'https://flagcdn.com/kw.svg' },
        Jordanie:   { code: '+962', flag: 'https://flagcdn.com/jo.svg' },
        Liban:      { code: '+961', flag: 'https://flagcdn.com/lb.svg' },
        Syrie:      { code: '+963', flag: 'https://flagcdn.com/sy.svg' },
        Irak:       { code: '+964', flag: 'https://flagcdn.com/iq.svg' },
        Iran:       { code: '+98',  flag: 'https://flagcdn.com/ir.svg' },
        Afghanistan:{ code: '+93',  flag: 'https://flagcdn.com/af.svg' },
        'Afrique du Sud': { code: '+27', flag: 'https://flagcdn.com/za.svg' },
        Nigeria:    { code: '+234', flag: 'https://flagcdn.com/ng.svg' },
        Kenya:      { code: '+254', flag: 'https://flagcdn.com/ke.svg' },
        Éthiopie:   { code: '+251', flag: 'https://flagcdn.com/et.svg' },
        Sénégal:    { code: '+221', flag: 'https://flagcdn.com/sn.svg' },
        "Côte d'Ivoire": { code: '+225', flag: 'https://flagcdn.com/ci.svg' },
        Ghana:      { code: '+233', flag: 'https://flagcdn.com/gh.svg' },
        Cameroun:   { code: '+237', flag: 'https://flagcdn.com/cm.svg' },
        Soudan:     { code: '+249', flag: 'https://flagcdn.com/sd.svg' },
        Norvège:    { code: '+47',  flag: 'https://flagcdn.com/no.svg' },
        Suède:      { code: '+46',  flag: 'https://flagcdn.com/se.svg' },
        Danemark:   { code: '+45',  flag: 'https://flagcdn.com/dk.svg' },
        Finlande:   { code: '+358', flag: 'https://flagcdn.com/fi.svg' },
        Islande:    { code: '+354', flag: 'https://flagcdn.com/is.svg' },
        Pologne:    { code: '+48',  flag: 'https://flagcdn.com/pl.svg' },
        'République tchèque': { code: '+420', flag: 'https://flagcdn.com/cz.svg' },
        Slovaquie:  { code: '+421', flag: 'https://flagcdn.com/sk.svg' },
        Hongrie:    { code: '+36',  flag: 'https://flagcdn.com/hu.svg' },
        Autriche:   { code: '+43',  flag: 'https://flagcdn.com/at.svg' },
        Roumanie:   { code: '+40',  flag: 'https://flagcdn.com/ro.svg' },
        Bulgarie:   { code: '+359', flag: 'https://flagcdn.com/bg.svg' },
        Croatie:    { code: '+385', flag: 'https://flagcdn.com/hr.svg' },
        Serbie:     { code: '+381', flag: 'https://flagcdn.com/rs.svg' },
        Slovénie:   { code: '+386', flag: 'https://flagcdn.com/si.svg' },
        'Bosnie-Herzégovine': { code: '+387', flag: 'https://flagcdn.com/ba.svg' },
        Monténégro:  { code: '+382', flag: 'https://flagcdn.com/me.svg' },
        'Macédoine du Nord': { code: '+389', flag: 'https://flagcdn.com/mk.svg' },
        Albanie:    { code: '+355', flag: 'https://flagcdn.com/al.svg' },
        Estonie:    { code: '+372', flag: 'https://flagcdn.com/ee.svg' },
        Lettonie:   { code: '+371', flag: 'https://flagcdn.com/lv.svg' },
        Lituanie:   { code: '+370', flag: 'https://flagcdn.com/lt.svg' },
        Ukraine:    { code: '+380', flag: 'https://flagcdn.com/ua.svg' },
        Biélorussie:{ code: '+375', flag: 'https://flagcdn.com/by.svg' },
        Géorgie:    { code: '+995', flag: 'https://flagcdn.com/ge.svg' },
        Arménie:    { code: '+374', flag: 'https://flagcdn.com/am.svg' },
        Azerbaïdjan:{ code: '+994', flag: 'https://flagcdn.com/az.svg' }
      },
      phoneCode: '',
      countryFlag: ''
    };
  },
  methods: {
    updatePhoneCode() {
      const entry = this.countryPhoneMap[this.registerForm.country];
      if (entry) {
        this.phoneCode = entry.code;
        this.countryFlag = entry.flag;
      } else {
        this.phoneCode = '';
        this.countryFlag = '';
      }
    },
    register() {
      // reset errors
      this.errors.email = [];
      this.errors.phone = [];
      this.errors.password = [];

      let valid = true;

      if (!this.registerForm.email) {
        this.errors.email.push("L'adresse e-mail est requise.");
        valid = false;
      }
      if (!this.registerForm.phone) {
        this.errors.phone.push("Le numéro de téléphone est requis.");
        valid = false;
      }
      if (!this.registerForm.password) {
        this.errors.password.push("Le mot de passe est requis.");
        valid = false;
      }

      if (!valid) {
        return;
      }
      // prepend phone code if not present
      if (this.phoneCode && this.registerForm.phone && !this.registerForm.phone.startsWith(this.phoneCode)) {
        this.registerForm.phone = this.phoneCode + ' ' + this.registerForm.phone.replace(/^\+?[0-9 ]*/, '')
      }
      // call registration API
      this.$store.dispatch('auth/register', { data: this.registerForm }).then(success => {
        if (success) {
          this.$router.push('/login');
          this.$store.dispatch('snackbar/show', {
            message: "Vérifiez votre email pour confirmer votre inscription.",
            type: 'info',
            timeout: 5000
          });
        }
      });
    }
  }
};
</script>

<style scoped>
/* Add any extra component-specific styles here */
</style>
