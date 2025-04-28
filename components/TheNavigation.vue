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
</script>

<template>
  <nav :class="[
    'fixed w-full z-50 transition-all duration-300',
    isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'
  ]">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-20">
        <!-- Logo -->
        <NuxtLink to="/" class="text-2xl font-bold" :class="isScrolled ? 'text-gray-900' : 'text-white'">
          DER WEINGENERAL
        </NuxtLink>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-8">
          <NuxtLink 
            v-for="item in ['Startseite', 'Über uns', 'Produkte', 'Kontakt']" 
            :key="item"
            :to="item === 'Startseite' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`"
            class="text-lg font-medium transition-colors duration-200"
            :class="isScrolled ? 'text-gray-600 hover:text-gray-900' : 'text-white hover:text-gray-200'"
          >
            {{ item }}
          </NuxtLink>
          <button class="bg-white text-gray-900 px-6 py-2 rounded-full text-lg font-semibold 
                       hover:bg-gray-100 transition duration-300">
            Jetzt anfragen
          </button>
        </div>

        <!-- Mobile Menu Button -->
        <button 
          @click="isMenuOpen = !isMenuOpen"
          class="md:hidden p-2"
          :class="isScrolled ? 'text-gray-900' : 'text-white'"
        >
          <svg 
            class="w-6 h-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              v-if="!isMenuOpen"
              stroke-linecap="round" 
              stroke-linejoin="round" 
              stroke-width="2" 
              d="M4 6h16M4 12h16M4 18h16"
            />
            <path 
              v-else
              stroke-linecap="round" 
              stroke-linejoin="round" 
              stroke-width="2" 
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <!-- Mobile Menu -->
      <div 
        v-show="isMenuOpen"
        class="md:hidden absolute top-20 left-0 right-0 bg-white shadow-lg"
      >
        <div class="px-4 py-4 space-y-4">
          <NuxtLink 
            v-for="item in ['Startseite', 'Über uns', 'Produkte', 'Kontakt']" 
            :key="item"
            :to="item === 'Startseite' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`"
            class="block text-gray-600 hover:text-gray-900 text-lg font-medium"
          >
            {{ item }}
          </NuxtLink>
          <button class="w-full bg-gray-900 text-white px-6 py-2 rounded-full text-lg font-semibold 
                       hover:bg-gray-800 transition duration-300">
            Jetzt anfragen
          </button>
        </div>
      </div>
    </div>
  </nav>
</template> 