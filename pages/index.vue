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
    <TheHeroSection />

    <!-- Featured Products -->
    <v-container class="py-16">
      <div class="text-center">
        <h2 
          class="text-h3 section-title d-inline-block"
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 800 } }"
        >
          <span class="title-background"></span>
          <span class="title-text">
            Unsere 3 Spezialitäten
          </span>
        </h2>
      </div>
      <v-row class="mt-12">
        <v-col
          v-for="(product, index) in featuredProducts"
          :key="product.title"
          cols="12"
          md="4"
          class="d-flex"
        >
          <NuxtLink 
            :to="product.to" 
            class="text-decoration-none d-flex w-100"
          >
            <v-card
              class="d-flex flex-column w-100"
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
                class="flex-grow-0"
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

              <v-card-text class="d-flex flex-column flex-grow-1 pa-6">
                <h3 class="text-h5 mb-4 display-font">{{ product.title }}</h3>
                <p class="text-body-1 text-grey base-font flex-grow-1">{{ product.description }}</p>
              </v-card-text>

              <v-card-actions class="pa-6 pt-0">
                <v-btn
                  variant="outlined"
                  color="primary"
                  block
                  size="large"
                  class="display-font text-button clickable-btn"
                >
                  {{ product.cta }}
                </v-btn>
              </v-card-actions>
            </v-card>
          </NuxtLink>
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
            { icon: 'mdi-headset', title: '365 Tage Service', desc: 'Engagierte Unterstützung von wahren Experten' },
            { icon: 'mdi-gift', title: '300€ Bonus für Ausstattung', desc: 'Ab 1.000€ Bestellwert im Weinsektor' }
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

.section-title {
  position: relative;
  padding: 0;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
}

.title-background {
  background-color: #9a1915;
  height: 34px;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
}

.title-text {
  position: relative;
  z-index: 2;
  padding: 4px 24px 16px;
  background: linear-gradient(
    to bottom,
    #fff 0%,
    #fff 60%,
    #000 60%,
    #000 100%
  );
  -webkit-background-clip: text;
  background-clip: text;
  text-shadow: 
    -1px -1px 0 #9a1915,  
     1px -1px 0 #9a1915,  
    -1px  1px 0 #9a1915,
     1px  1px 0 #9a1915;
  color: white;
}

/* Remove the previous underscore and after styles */
.section-title::after,
.title-text::after {
  display: none;
}

@media (max-width: 600px) {
  .title-text {
    font-size: 2rem;
    padding: 4px 16px 12px;
  }
  
  .title-background {
    height: 28px;
  }
}

.display-font {
  font-family: 'Pathway Gothic One', sans-serif !important;
}

.base-font {
  font-family: 'Patrick Hand', cursive !important;
  font-size: 1.25rem !important;
  line-height: 1.6 !important;
}

.v-card {
  border-radius: 12px;
  transition: all 0.3s ease;
  cursor: pointer;
}

.v-card:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12) !important;
}

.v-card-text {
  position: relative;
}

.clickable-btn {
  pointer-events: none;
  border-width: 2px;
  font-weight: 500;
  letter-spacing: 0.5px;
}

/* Remove the old button styles */
.v-btn.v-btn--variant-outlined {
  border-width: 2px;
  font-weight: 500;
  letter-spacing: 0.5px;
}

/* Add hover effect for the entire card */
.v-card:hover .clickable-btn {
  background-color: rgba(154, 25, 21, 0.05);
  transform: scale(1.05);
  transition: all 0.3s ease;
}

@media (max-width: 960px) {
  .v-card-text {
    padding: 24px !important;
  }
  
  .v-card-actions {
    padding: 0 24px 24px !important;
  }
}
</style>
