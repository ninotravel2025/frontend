<template>
  <PageContainer title="A propos">
    <!-- Section 1: Text left, image right -->
    <AboutSection title="Notre mission" :image="GroupPic">
      <p>
        Notre plateforme est conçue pour simplifier vos déplacements
        et vos découvertes en Tunisie. Que vous ayez besoin de réserver
        un véhicule pour voyager entre les différentes régions du pays
        ou que vous souhaitiez vivre une expérience touristique unique,
        nous sommes là pour vous accompagner. En quelques clics,
        réservez un véhicule adapté à vos besoins ou choisissez une
        excursion inoubliable à travers les merveilles de la Tunisie.
      </p>
    </AboutSection>
    <!-- Section 2: Image left, text right -->
    <AboutSection reverse title="Nos services" :image="DesertPic">
      <p>Notre site vous offre deux services principaux :</p>
      <ul>
        <li>
          La réservation de véhicules avec chauffeur, disponibles en versions 4, 6 ou 8 places,
          entre n'importe quelles gouvernorats de Tunisie.</li>
        <li>
          La réservation d'excursions, avec trois types d’expériences
          au choix pour satisfaire toutes les envies : culture, aventure ou détente.
        </li>
      </ul>
      <p> Avec notre solution simple, rapide et fiable, voyager en Tunisie n’a jamais été aussi facile et agréable</p>
    </AboutSection>

    <h2 class="text-2xl font-bold text-[#191970] text-left mb-2">
      Gallerie
    </h2>

    <div class="flex flex-wrap justify-around items-center mb-4 bg-white p-6 rounded-lg gap-5 shadow-md">
      <img :src="PplPic1" alt="group-pic1"
        class="flex-1 min-w-[300px] max-w-[200px] aspect-square object-cover rounded-md" />
      <img :src="PplPic2" alt="group-pic2"
        class="flex-1 min-w-[300px] max-w-[200px] aspect-square object-cover rounded-md" />
      <img :src="PplPic3" alt="group-pic3"
        class="flex-1 min-w-[300px] max-w-[200px] aspect-square object-cover rounded-md" />
      <img :src="PplPic4" alt="group-pic4"
        class="flex-1 min-w-[300px] max-w-[200px] aspect-square object-cover rounded-md" />
      <img :src="PplPic5" alt="group-pic5"
        class="flex-1 min-w-[300px] max-w-[200px] aspect-square object-cover rounded-md" />
      <img :src="PplPic6" alt="group-pic6"
        class="flex-1 min-w-[300px] max-w-[200px] aspect-square object-cover rounded-md" />
    </div>
  </PageContainer>
  <Footer />
</template>

<script>

import DesertPic from "@/assets/images/jmal.jpg";
import GroupPic from "@/assets/images/grouppic.jpg";
import PplPic1 from "@/assets/images/ppl_pic1.jpg";
import PplPic2 from "@/assets/images/ppl_pic2.jpg";
import PplPic3 from "@/assets/images/ppl_pic3.jpg";
import PplPic4 from "@/assets/images/ppl_pic4.jpg";
import PplPic5 from "@/assets/images/ppl_pic5.jpg";
import PplPic6 from "@/assets/images/ppl_pic6.jpg";


import AboutSection from '@/components/AboutSection.vue';
import Footer from '@/components/Footer.vue';
import PageContainer from '@/components/PageContainer.vue';
export default {
  name: "AboutView",
  components: { PageContainer, Footer, AboutSection },
  data() {
    return {
      DesertPic,
      GroupPic,
      PplPic1,
      PplPic2,
      PplPic3,
      PplPic4,
      PplPic5,
      PplPic6
    }
  }
}
// No specific logic required for this static page
</script>
