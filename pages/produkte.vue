<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-8">Unsere Weine</h1>
    
    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center min-h-[400px]">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center py-8">
      <p class="text-red-500">{{ error }}</p>
      <button @click="fetchProducts" class="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark">
        Erneut versuchen
      </button>
    </div>

    <!-- Products Grid -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <div v-for="product in products" :key="product.id" class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
        <img 
          :src="product.images?.[0]?.src || '/placeholder-wine.jpg'" 
          :alt="product.name"
          class="w-full h-64 object-cover"
        >
        <div class="p-4">
          <h2 class="text-xl font-semibold mb-2">{{ product.name }}</h2>
          <p class="text-gray-600 mb-4">{{ product.short_description }}</p>
          <div class="flex justify-between items-center">
            <span class="text-lg font-bold">{{ formatPrice(product.price) }}</span>
            <button 
              @click="addToCart(product)"
              class="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition-colors"
            >
              In den Warenkorb
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="!loading && !error && products.length === 0" class="text-center py-8">
      <p class="text-gray-500">Keine Produkte gefunden.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useWooCommerce } from '~/composables/useWooCommerce';

const { getProducts } = useWooCommerce();

const products = ref<any[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);

const fetchProducts = async () => {
  loading.value = true;
  error.value = null;
  
  try {
    products.value = await getProducts();
  } catch (e) {
    error.value = 'Fehler beim Laden der Produkte. Bitte versuchen Sie es später erneut.';
    console.error('Error fetching products:', e);
  } finally {
    loading.value = false;
  }
};

const formatPrice = (price: string) => {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR'
  }).format(parseFloat(price));
};

const addToCart = (product: any) => {
  // TODO: Implement cart functionality
  console.log('Adding to cart:', product);
};

onMounted(() => {
  fetchProducts();
});
</script>

<style scoped>
.container {
  max-width: 1280px;
}
</style>
  