<!-- components/TheHeroSection.vue -->
<template>
  <section class="hero-section">
    <v-container fluid class="pa-0 h-100">
      <v-row no-gutters class="h-100">
        <!-- Left Video Side -->
        <v-col cols="12" md="6" class="hero-video-col">
          <div class="video-wrapper">
            <video 
              class="hero-video" 
              autoplay 
              loop 
              muted 
              playsinline
            >
              <source src="/assets/3197862-hd_1920_1080_25fps.mp4" type="video/mp4">
            </video>
            <div class="video-overlay"></div>
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

              <h2 class="display-font text-h4 mb-8">
                Ihr Partner für exklusive Weine, Spirituosen und Ausstattung
              </h2>
              <p class="text-large mb-8">
                In unserem Showroom erleben Sie eine Auswahl feinster Tropfen und hochwertiger Präsentationslösungen, perfekt abgestimmt auf anspruchsvolle Genießer und professionelle Gastgeber.
                Ob für private Sammlungen oder gewerbliche Projekte – bei Weingeneral verbinden wir Genuss, Ästhetik und Technik auf höchstem Niveau.
              </p>
              <v-btn
                color="primary"
                size="x-large"
                class="text-button display-font text-large"
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

/* Font Classes */
.display-font {
  font-family: 'Pathway Gothic One', sans-serif !important;
}

.base-font {
  font-family: 'Patrick Hand', cursive !important;
}

/* Override any Vuetify default fonts */
:deep(.v-btn),
:deep(.text-h2),
:deep(.text-h4) {
  font-family: 'Pathway Gothic One', sans-serif !important;
}

:deep(.text-body-1),
:deep(.text-body-2),
:deep(.text-subtitle-1),
:deep(.text-subtitle-2) {
  font-family: 'Patrick Hand', cursive !important;
}

.hero-video-col {
  position: relative;
  height: 100%;
}

.video-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
}

.hero-video {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  object-fit: cover;
}

.video-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to right,
    rgba(0, 0, 0, 0.2) 0%,
    rgba(0, 0, 0, 0) 100%
  );
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

  .hero-video-col {
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

  .hero-video-col {
    height: 40vh;
  }
}
</style> 