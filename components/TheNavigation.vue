<script setup>
const isMenuOpen = ref(false)
const isScrolled = ref(false)

onMounted(() => {
  window.addEventListener('scroll', () => {
    isScrolled.value = window.scrollY > 50
  })
})

onUnmounted(() => {
  window.removeEventListener('scroll', () => {})
})

const navItems = [
  { title: 'Startseite', to: '/' },
  { title: 'Über uns', to: '/ueber-uns' },
  { title: 'Produkte', to: '/produkte' },
  { title: 'Kontakt', to: '/kontakt' }
]

// Import the logo
import Logo from '~/assets/Logo.svg'
</script>

<template>
  <v-app-bar
    :elevation="isScrolled ? 2 : 0"
    :color="isScrolled ? 'white' : 'transparent'"
    fixed
    class="transition-all duration-300"
  >
    <v-container class="d-flex align-center">
      <!-- Logo -->
      <NuxtLink 
        to="/" 
        class="text-decoration-none d-flex align-center"
        :class="'text-black'"
      >
        <img :src="Logo" alt="DER WEINGENERAL" class="h-8" style="background: white;" />
      </NuxtLink>

      <v-spacer></v-spacer>

      <!-- Desktop Navigation -->
      <div class="d-none d-md-flex align-center">
        <v-btn
          v-for="item in navItems"
          :key="item.title"
          :to="item.to"
          variant="text"
          class="mx-2"
          :class="'text-grey-darken-1'"
        >
          {{ item.title }}
        </v-btn>
        <v-btn
          color="white"
          class="ml-4"
          variant="flat"
        >
          Jetzt anfragen
        </v-btn>
      </div>

      <!-- Mobile Menu Button -->
      <v-app-bar-nav-icon
        @click="isMenuOpen = !isMenuOpen"
        :color="isScrolled ? 'black' : 'white'"
        class="d-md-none"
      ></v-app-bar-nav-icon>
    </v-container>

    <!-- Mobile Menu -->
    <v-navigation-drawer
      v-model="isMenuOpen"
      temporary
      location="right"
      class="d-md-none"
    >
      <v-list>
        <v-list-item
          v-for="item in navItems"
          :key="item.title"
          :to="item.to"
          :title="item.title"
        ></v-list-item>
        <v-list-item>
          <v-btn
            color="primary"
            block
            variant="flat"
          >
            Jetzt anfragen
          </v-btn>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-app-bar>
</template> 