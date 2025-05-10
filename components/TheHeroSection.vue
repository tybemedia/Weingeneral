
!-- components/TheHeroSection.vue -->
<template>
  <section class="hero-section">
    <v-container fluid class="pa-0 h-100">
      <v-row no-gutters class="h-100">
        <!-- Left Image Side -->
        <v-col cols="12" md="6" class="hero-image-col">
          <div class="image-wrapper">
            <img 
              src="/assets/Hero-Image.jpg" 
              alt="Hero Image" 
              class="hero-image"
            />
          </div>
        </v-col>

        <!-- Right Content Side -->
        <v-col cols="12" md="6" class="hero-content d-flex align-center">
          <div class="content-wrapper px-8 px-md-16">
            <div class="content-inner"
              v-motion
              :initial="{ opacity: 0, x: 50 }"
              :enter="{ opacity: 1, x: 0, transition: { duration: 800 } }"
            >

              <h1 class="heading-text text-h2 mb-8">
                Ihr Partner für exklusive Weine, Spirituosen und Ausstattung
              </h1>
              <p class="body-text text-h6 mb-8">
                In unserem Showroom erleben Sie eine Auswahl feinster Tropfen und hochwertiger Präsentationslösungen, perfekt abgestimmt auf anspruchsvolle Genießer und professionelle Gastgeber.
                Ob für private Sammlungen oder gewerbliche Projekte – bei Weingeneral verbinden wir Genuss, Ästhetik und Technik auf höchstem Niveau.
              </p>
              <v-btn
                color="primary"
                size="x-large"
                class="body-text text-button"
                to="/produkte"
                v-motion
                whileHover="{ scale: 1.05 }"
                whileTap="{ scale: 0.95 }"
              >
                Jetzt entdecken
              </v-btn>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<style scoped>
.hero-section {
  position: relative;
  height: 100vh;
  max-height: 800px;
  min-height: 600px;
  background-color: #fff;
  overflow: hidden;
}

.hero-content {
  background-color: #fff;
  z-index: 2;
}

.content-wrapper {
  width: 100%;
  max-width: 700px;
}

.content-inner {
  max-width: 600px;
}

.hero-image-col {
  position: relative;
  height: 100%;
}

.image-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
}

.hero-image {
  position: absolute;
  top: 80%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  object-fit: cover;
}

@media (max-width: 960px) {
  .hero-section {
    height: auto;
    min-height: 100vh;
  }

  .hero-content {
    padding: 64px 24px;
    order: 2;
  }

  .hero-image-col {
    height: 50vh;
    order: 1;
  }

  .content-wrapper {
    text-align: center;
    padding: 0;
  }

  .content-inner {
    max-width: 100%;
  }
}

@media (max-width: 600px) {
  .hero-content {
    padding: 48px 16px;
  }

  .hero-image-col {
    height: 40vh;
  }
}
</style> 