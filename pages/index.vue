<script setup>
import pageData from '@/data/index.json'
const page = ref(pageData)

const featuredProducts = [
  {
    title: 'Weine & Schaumweine',
    description: 'Entdecken Sie unsere handverlesene Auswahl an Premium-Weinen',
    image: 'https://images.pexels.com/photos/1123260/pexels-photo-1123260.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    cta: 'Jetzt entdecken',
    to: '/wein-schaumweine'
  },
  {
    title: 'Spirituosen',
    description: 'Erlesene Spirituosen für den perfekten Genuss',
    image: 'https://images.pexels.com/photos/613182/pexels-photo-613182.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    cta: 'Mehr erfahren',
    to: '/spirituosen'
  },
  {
    title: 'Ausstattungstechnik',
    description: 'Professionelle Ausstattung für Ihre Weinbar',
    image: 'https://images.pexels.com/photos/2343467/pexels-photo-2343467.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    cta: 'Zur Auswahl',
    to: '/ausstattung'
  }
]

definePageMeta({
  layout: "default",
});
</script>

<template>
  <div>
    <!-- Hero Section - 50/50 Split -->
    <div class="hero-section d-flex">
      <!-- Left side - Image -->
      <div 
        class="hero-image flex-1"
        v-motion
        :initial="{ opacity: 0, x: -100 }"
        :enter="{ opacity: 1, x: 0, transition: { duration: 1000, ease: 'easeOut' } }"
      >
        <v-img
          src="https://images.pexels.com/photos/1545529/pexels-photo-1545529.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          height="100vh"
          cover
        ></v-img>
      </div>
      
      <!-- Right side - Dark box with text -->
      <div 
        class="hero-content flex-1 d-flex align-center justify-center bg-grey-darken-4"
        v-motion
        :initial="{ opacity: 0, x: 100 }"
        :enter="{ opacity: 1, x: 0, transition: { duration: 1000, ease: 'easeOut', delay: 200 } }"
        style="padding: 2em"
      >
        <v-container class="py-16">
          <h3 
            class="text-h5 font-weight-bold text-white mb-6"
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :enter="{ opacity: 1, y: 0, transition: { duration: 800, delay: 400 } }"
          >DER WEINGENERAL</h3>
          <h1
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :enter="{ opacity: 1, y: 0, transition: { duration: 800, delay: 600 } }"
          >Wilkommen in der Weinkompanie</h1>
          <p 
            class="text-h5 text-white mb-8"
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :enter="{ opacity: 1, y: 0, transition: { duration: 800, delay: 800 } }"
          >
            Der Weingeneral - Ihr stilvoller Showroom für erlesene Weine, edle Spirituosen und passende Ausstattungstechnik.
          </p>
          <v-btn
            color="white"
            size="large"
            class="text-black"
            variant="flat"
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :enter="{ opacity: 1, y: 0, transition: { duration: 800, delay: 1000 } }"
            whileHover="{ scale: 1.05 }"
            whileTap="{ scale: 0.95 }"
          >
            Jetzt anfragen
          </v-btn>
        </v-container>
      </div>
    </div>

    <!-- Featured Products -->
    <v-container class="py-16">
      <h2 
        class="text-h3 text-center mb-12"
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 800 } }"
      >Beliebte Produkte</h2>
      <v-row>
        <v-col
          v-for="(product, index) in featuredProducts"
          :key="product.title"
          cols="12"
          md="4"
        >
          <v-card
            class="h-100"
            elevation="2"
            v-motion
            :initial="{ opacity: 0, y: 50 }"
            :enter="{ opacity: 1, y: 0, transition: { duration: 800, delay: index * 200 } }"
            whileHover="{ y: -10, transition: { duration: 300 } }"
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
                :to="product.to"
                v-motion
                whileHover="{ scale: 1.05 }"
                whileTap="{ scale: 0.95 }"
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
        <v-col 
          cols="12" 
          md="8" 
          class="text-center"
          v-motion
          :initial="{ opacity: 0, y: 50 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 800 } }"
        >
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
            v-motion
            whileHover="{ scale: 1.05 }"
            whileTap="{ scale: 0.95 }"
          >
            Mehr erfahren
          </v-btn>
        </v-col>
      </v-row>
    </v-container>

    <!-- Features Section -->
    <v-container class="py-16">
      <v-row>
        <v-col 
          v-for="(feature, index) in [
            { icon: 'mdi-truck', title: 'Kostenloser Versand', desc: 'Für alle Bestellungen' },
            { icon: 'mdi-lock', title: 'Sichere Zahlung', desc: '100% sicher' },
            { icon: 'mdi-headset', title: '24/7 Support', desc: 'Engagierte Unterstützung' },
            { icon: 'mdi-gift', title: 'Mitgliedsrabatt', desc: 'Bei jeder Bestellung' }
          ]"
          :key="feature.title"
          cols="12" 
          md="3" 
          class="text-center"
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 800, delay: index * 200 } }"
        >
          <v-icon 
            size="48" 
            color="primary" 
            class="mb-4"
            v-motion
            whileHover="{ scale: 1.2, rotate: 360 }"
            transition="{ duration: 0.5 }"
          >{{ feature.icon }}</v-icon>
          <h3 class="text-h6 mb-2">{{ feature.title }}</h3>
          <p class="text-body-2 text-grey">{{ feature.desc }}</p>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style scoped>
.max-width-600 {
  max-width: 600px;
}

.hero-section {
  height: 100vh;
  overflow: hidden;
}

.hero-image, .hero-content {
  width: 50%;
}

@media (max-width: 960px) {
  .hero-section {
    flex-direction: column;
    height: auto;
  }
  
  .hero-image, .hero-content {
    width: 100%;
    height: 50vh;
  }
}
</style>
