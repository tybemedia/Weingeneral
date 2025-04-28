<script setup>
import pageData from '@/data/index.json'
const page = ref(pageData)

const featuredProducts = [
  {
    title: 'Weine & Schaumweine',
    description: 'Entdecken Sie unsere handverlesene Auswahl an Premium-Weinen',
    image: 'https://images.pexels.com/photos/1123260/pexels-photo-1123260.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    cta: 'Jetzt entdecken'
  },
  {
    title: 'Spirituosen',
    description: 'Erlesene Spirituosen für den perfekten Genuss',
    image: 'https://images.pexels.com/photos/613182/pexels-photo-613182.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    cta: 'Mehr erfahren'
  },
  {
    title: 'Ausstattungstechnik',
    description: 'Professionelle Ausstattung für Ihre Weinbar',
    image: 'https://images.pexels.com/photos/2343467/pexels-photo-2343467.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    cta: 'Zur Auswahl'
  }
]

definePageMeta({
  layout: "default",
});
</script>

<template>
  <div>
    <!-- Hero Section -->
    <v-parallax
      src="https://images.pexels.com/photos/1545529/pexels-photo-1545529.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      height="100vh"
      class="d-flex align-center justify-center"
    >
      <v-overlay
        :model-value="true"
        class="align-center justify-center"
        contained
      >
        <v-container class="text-center">
          <h1 class="text-h2 font-weight-bold text-white mb-6">DER WEINGENERAL</h1>
          <p class="text-h5 text-white mb-8 max-width-600 mx-auto">
            Willkommen in der Wein-Kompanie. Ihr stilvoller Showroom für erlesene Weine, 
            edle Spirituosen und passende Ausstattungstechnik.
          </p>
          <v-btn
            color="white"
            size="large"
            class="text-black"
            variant="flat"
          >
            Jetzt anfragen
          </v-btn>
        </v-container>
      </v-overlay>
    </v-parallax>

    <!-- Featured Products -->
    <v-container class="py-16">
      <h2 class="text-h3 text-center mb-12">Beliebte Produkte</h2>
      <v-row>
        <v-col
          v-for="product in featuredProducts"
          :key="product.title"
          cols="12"
          md="4"
        >
          <v-card
            class="h-100"
            elevation="2"
            hover
          >
            <v-img
              :src="product.image"
              height="300"
              cover
            >
              <template v-slot:placeholder>
                <v-row
                  class="fill-height ma-0"
                  align="center"
                  justify="center"
                >
                  <v-progress-circular
                    indeterminate
                    color="grey-lighten-5"
                  ></v-progress-circular>
                </v-row>
              </template>
            </v-img>

            <v-card-text class="position-relative">

              <h3 class="text-h5 mb-2">{{ product.title }}</h3>
              <p class="text-body-1 text-grey">{{ product.description }}</p>
            </v-card-text>

            <v-card-actions>
              <v-btn
                variant="outlined"
                color="primary"
                block
              >
                {{ product.cta }}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- About Section -->
    <v-container class="py-16 bg-grey-lighten-4">
      <v-row justify="center">
        <v-col cols="12" md="8" class="text-center">
          <h2 class="text-h3 mb-6">Über Der Weingeneral</h2>
          <p class="text-body-1 text-grey-darken-1 mb-8">
            Der Weingeneral steht für Qualität und Eleganz. Wir bieten Ihnen eine 
            sorgfältig kuratierte Auswahl an erlesenen Weinen und hochwertigen Spirituosen, 
            ergänzt durch technische Lösungen für den anspruchsvollen Genuss und die 
            Gastronomie. Lassen Sie sich von unserem Angebot inspirieren und finden Sie 
            Ihre persönlichen Favoriten.
          </p>
          <v-btn
            color="primary"
            size="large"
            variant="flat"
          >
            Mehr erfahren
          </v-btn>
        </v-col>
      </v-row>
    </v-container>

    <!-- Features Section -->
    <v-container class="py-16">
      <v-row>
        <v-col cols="12" md="3" class="text-center">
          <v-icon size="48" color="primary" class="mb-4">mdi-truck</v-icon>
          <h3 class="text-h6 mb-2">Kostenloser Versand</h3>
          <p class="text-body-2 text-grey">Für alle Bestellungen</p>
        </v-col>
        <v-col cols="12" md="3" class="text-center">
          <v-icon size="48" color="primary" class="mb-4">mdi-lock</v-icon>
          <h3 class="text-h6 mb-2">Sichere Zahlung</h3>
          <p class="text-body-2 text-grey">100% sicher</p>
        </v-col>
        <v-col cols="12" md="3" class="text-center">
          <v-icon size="48" color="primary" class="mb-4">mdi-headset</v-icon>
          <h3 class="text-h6 mb-2">24/7 Support</h3>
          <p class="text-body-2 text-grey">Engagierte Unterstützung</p>
        </v-col>
        <v-col cols="12" md="3" class="text-center">
          <v-icon size="48" color="primary" class="mb-4">mdi-gift</v-icon>
          <h3 class="text-h6 mb-2">Mitgliedsrabatt</h3>
          <p class="text-body-2 text-grey">Bei jeder Bestellung</p>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style scoped>
.max-width-600 {
  max-width: 600px;
}
</style>
