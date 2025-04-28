<script setup>
import pageData from '@/data/index.json'
const page = ref(pageData)

const featuredProducts = [
  {
    title: 'Exquisite Weine',
    description: 'Entdecken Sie unsere handverlesene Auswahl an Premium-Weinen',
    image: '/images/wines.jpg',
    discount: '70%',
    cta: 'Jetzt entdecken'
  },
  {
    title: 'Edle Spirituosen',
    description: 'Erlesene Spirituosen für den perfekten Genuss',
    image: '/images/spirits.jpg',
    discount: '50%',
    cta: 'Mehr erfahren'
  },
  {
    title: 'Ausstattungstechnik',
    description: 'Professionelle Ausstattung für Ihre Weinbar',
    image: '/images/equipment.jpg',
    discount: '40%',
    cta: 'Zur Auswahl'
  }
]

definePageMeta({
  layout: "default",
});
</script>

<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section class="relative h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 to-gray-800">
      <div class="absolute inset-0 bg-black/50 z-10"></div>
      <div class="container mx-auto px-4 z-20 text-center text-white">
        <h1 class="text-5xl md:text-7xl font-bold mb-6">DER WEINGENERAL</h1>
        <p class="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
          Willkommen in der Wein-Kompanie. Ihr stilvoller Showroom für erlesene Weine, 
          edle Spirituosen und passende Ausstattungstechnik.
        </p>
        <button class="bg-white text-gray-900 px-8 py-3 rounded-full text-lg font-semibold 
                     hover:bg-gray-100 transition duration-300">
          Jetzt anfragen
        </button>
      </div>
    </section>

    <!-- Featured Products -->
    <section class="py-20 bg-white">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl md:text-4xl font-bold text-center mb-12">Beliebte Produkte</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div v-for="product in featuredProducts" :key="product.title" 
               class="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition duration-300">
            <div class="aspect-w-16 aspect-h-9 bg-gray-200">
              <!-- Image placeholder - replace with actual images -->
              <div class="w-full h-64 bg-gray-300"></div>
            </div>
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-6 flex flex-col justify-end">
              <span class="text-white text-sm font-semibold mb-2">{{ product.discount }} Rabatt</span>
              <h3 class="text-white text-xl font-bold mb-2">{{ product.title }}</h3>
              <p class="text-gray-200 text-sm mb-4">{{ product.description }}</p>
              <button class="text-white border border-white px-4 py-2 rounded-full text-sm 
                           hover:bg-white hover:text-gray-900 transition duration-300">
                {{ product.cta }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- About Section -->
    <section class="py-20 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="max-w-3xl mx-auto text-center">
          <h2 class="text-3xl md:text-4xl font-bold mb-6">Über Der Weingeneral</h2>
          <p class="text-lg text-gray-600 leading-relaxed">
            Der Weingeneral steht für Qualität und Eleganz. Wir bieten Ihnen eine 
            sorgfältig kuratierte Auswahl an erlesenen Weinen und hochwertigen Spirituosen, 
            ergänzt durch technische Lösungen für den anspruchsvollen Genuss und die 
            Gastronomie. Lassen Sie sich von unserem Angebot inspirieren und finden Sie 
            Ihre persönlichen Favoriten.
          </p>
          <button class="mt-8 bg-gray-900 text-white px-8 py-3 rounded-full text-lg font-semibold 
                       hover:bg-gray-800 transition duration-300">
            Mehr erfahren
          </button>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-20 bg-white">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div class="text-center">
            <div class="text-4xl mb-4">🚚</div>
            <h3 class="text-xl font-semibold mb-2">Kostenloser Versand</h3>
            <p class="text-gray-600">Für alle Bestellungen</p>
          </div>
          <div class="text-center">
            <div class="text-4xl mb-4">🔒</div>
            <h3 class="text-xl font-semibold mb-2">Sichere Zahlung</h3>
            <p class="text-gray-600">100% sicher</p>
          </div>
          <div class="text-center">
            <div class="text-4xl mb-4">💬</div>
            <h3 class="text-xl font-semibold mb-2">24/7 Support</h3>
            <p class="text-gray-600">Engagierte Unterstützung</p>
          </div>
          <div class="text-center">
            <div class="text-4xl mb-4">🎁</div>
            <h3 class="text-xl font-semibold mb-2">Mitgliedsrabatt</h3>
            <p class="text-gray-600">Bei jeder Bestellung</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.aspect-w-16 {
  position: relative;
  padding-bottom: 56.25%;
}

.aspect-w-16 > div {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
</style>
