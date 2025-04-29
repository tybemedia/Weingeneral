<script setup>
import { ref, onMounted, nextTick } from 'vue';
import { useWooCommerce } from '~/composables/useWooCommerce';
import ProductCard from '~/components/ProductCard.vue';

const { getProductsByCategory, getCategories } = useWooCommerce();
const products = ref([]);
const loading = ref(true);
const error = ref(null);
const categoryId = ref(null);
const loadingTimeout = ref(null);
const maxRetries = 3;
const retryCount = ref(0);
const isInitialLoad = ref(true);
const isFetching = ref(false);
const isClient = ref(false);

// Function to fetch products with timeout and retry logic
const fetchProducts = async () => {
  // Prevent multiple simultaneous fetches
  if (isFetching.value) {
    console.log('Fetch already in progress, skipping');
    return;
  }
  
  // If we already have products and this isn't a retry, don't reload
  if (products.value.length > 0 && isInitialLoad.value && !retryCount.value) {
    console.log('Products already loaded, skipping initial fetch');
    loading.value = false;
    isInitialLoad.value = false;
    return;
  }
  
  // Clear any existing timeout
  if (loadingTimeout.value) {
    clearTimeout(loadingTimeout.value);
  }
  
  isFetching.value = true;
  loading.value = true;
  error.value = null;
  
  try {
    // Set a timeout to prevent infinite loading
    loadingTimeout.value = setTimeout(() => {
      if (loading.value) {
        loading.value = false;
        error.value = 'Zeitüberschreitung beim Laden der Produkte. Bitte versuchen Sie es später erneut.';
        console.error('Loading timeout reached');
        isFetching.value = false;
      }
    }, 10000); // 10 second timeout
    
    const categories = await getCategories();
    console.log('Categories loaded:', categories);
    
    // Find the equipment category
    const equipmentCategory = categories.find(cat => 
      cat.name.toLowerCase().includes('ausstattung') || 
      cat.slug.toLowerCase().includes('ausstattung')
    );
    
    if (!equipmentCategory) {
      throw new Error('Ausstattungs-Kategorie nicht gefunden');
    }
    
    console.log('Equipment category found:', equipmentCategory);
    categoryId.value = equipmentCategory.id;
    
    // Fetch products with a timeout
    const productsData = await Promise.race([
      getProductsByCategory(equipmentCategory.id),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Zeitüberschreitung beim Laden der Produkte')), 8000)
      )
    ]);
    
    // Clear the timeout since we got a response
    clearTimeout(loadingTimeout.value);
    
    if (!productsData || productsData.length === 0) {
      console.warn('No products found for category:', equipmentCategory.id);
      products.value = [];
    } else {
      console.log('Products loaded:', productsData.length);
      products.value = productsData;
    }
    
    loading.value = false;
    retryCount.value = 0; // Reset retry count on success
    isInitialLoad.value = false;
  } catch (e) {
    console.error('Error fetching products:', e);
    
    // Clear the timeout
    clearTimeout(loadingTimeout.value);
    
    // Implement retry logic
    if (retryCount.value < maxRetries) {
      retryCount.value++;
      console.log(`Retrying (${retryCount.value}/${maxRetries})...`);
      
      // Exponential backoff
      const backoffTime = Math.pow(2, retryCount.value) * 1000;
      setTimeout(() => {
        fetchProducts();
      }, backoffTime);
    } else {
      error.value = 'Fehler beim Laden der Produkte. Bitte versuchen Sie es später erneut.';
      loading.value = false;
      retryCount.value = 0;
    }
  } finally {
    isFetching.value = false;
  }
};

// Function to manually retry loading
const retryLoading = () => {
  retryCount.value = 0;
  fetchProducts();
};

// Initial data loading
onMounted(async () => {
  // Set client-side flag after component is mounted
  await nextTick();
  isClient.value = true;
  
  // Only fetch on client-side
  if (isClient.value) {
    fetchProducts();
  }
});

definePageMeta({
  layout: "default",
});
</script>

<template>
  <div class="product-page">
    <!-- Header Section -->
    <div 
      class="header-section"
      v-motion
      :initial="{ opacity: 0, y: -50 }"
      :enter="{ opacity: 1, y: 0, transition: { duration: 1000 } }"
    >
      <v-img
        src="https://images.pexels.com/photos/4397840/pexels-photo-4397840.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        height="400"
        cover
        class="header-image"
      >
        <div class="header-overlay d-flex align-center justify-center">
          <v-container>
            <h1 
              class="text-h2 text-white text-center mb-4"
              v-motion
              :initial="{ opacity: 0, y: 20 }"
              :enter="{ opacity: 1, y: 0, transition: { duration: 800, delay: 300 } }"
            >Ausstattung</h1>
            <p 
              class="text-h6 text-white text-center"
              v-motion
              :initial="{ opacity: 0, y: 20 }"
              :enter="{ opacity: 1, y: 0, transition: { duration: 800, delay: 500 } }"
            >
              Entdecken Sie unsere Auswahl an hochwertiger Ausstattung für Ihre Bar
            </p>
          </v-container>
        </div>
      </v-img>
    </div>

    <!-- Products Section - Client Only -->
    <ClientOnly>
      <v-container class="py-16">
        <!-- Loading State -->
        <div 
          v-if="loading" 
          class="d-flex flex-column justify-center align-center"
          style="min-height: 400px"
          v-motion
          :initial="{ opacity: 0 }"
          :enter="{ opacity: 1, transition: { duration: 500 } }"
        >
          <v-progress-circular
            indeterminate
            color="primary"
            size="64"
            class="mb-4"
          ></v-progress-circular>
          <p class="text-body-1 text-grey-darken-1">Produkte werden geladen...</p>
          <p v-if="retryCount > 0" class="text-caption text-grey mt-2">
            Versuch {{ retryCount }}/{{ maxRetries }}...
          </p>
        </div>

        <!-- Error State -->
        <div 
          v-else-if="error" 
          class="text-center"
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 500 } }"
        >
          <v-alert
            type="error"
            class="mb-4"
          >
            {{ error }}
          </v-alert>
          <v-btn
            color="primary"
            @click="retryLoading"
            v-motion
            whileHover="{ scale: 1.05 }"
            whileTap="{ scale: 0.95 }"
          >
            Erneut versuchen
          </v-btn>
        </div>

        <!-- Empty State -->
        <div 
          v-else-if="products.length === 0" 
          class="text-center py-8"
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 500 } }"
        >
          <v-icon size="64" color="grey-lighten-1" class="mb-4">mdi-glass-wine</v-icon>
          <h2 class="text-h5 mb-2">Keine Produkte gefunden</h2>
          <p class="text-body-1 text-grey-darken-1 mb-4">
            Leider konnten keine Produkte in dieser Kategorie gefunden werden.
          </p>
          <v-btn
            color="primary"
            @click="retryLoading"
            v-motion
            whileHover="{ scale: 1.05 }"
            whileTap="{ scale: 0.95 }"
          >
            Erneut versuchen
          </v-btn>
        </div>

        <!-- Products Grid -->
        <v-row v-else>
          <v-col
            v-for="(product, index) in products"
            :key="product.id"
            cols="12"
            sm="6"
            md="4"
            lg="3"
          >
            <ProductCard :product="product" :index="index" />
          </v-col>
        </v-row>
      </v-container>
    </ClientOnly>
  </div>
</template>

<style scoped>
.product-page {
  margin-top: 64px; /* Add margin for navigation bar */
}

.header-section {
  position: relative;
}

.header-image {
  position: relative;
}

.header-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7));
}
</style> 