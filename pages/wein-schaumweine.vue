<script setup>
import { ref } from 'vue';
import { useWooCommerce } from '~/composables/useWooCommerce';
import ProductCard from '~/components/ProductCard.vue';

const { getProductsByCategory, getCategories } = useWooCommerce();
const products = ref([]);
const loading = ref(true);
const error = ref(null);
const categoryId = ref(null);

// Use async setup for SSR
const { data: initialProducts } = await useAsyncData('wine-products', async () => {
  try {
    const categories = await getCategories();
    console.log(categories);
    const wineCategory = categories.find(cat => 
      cat.name.toLowerCase().includes('wein') || 
      cat.slug.toLowerCase().includes('wein')
    );

    if (wineCategory) {
      categoryId.value = wineCategory.id;
      const productsData = await getProductsByCategory(wineCategory.id);
      loading.value = false;
      return productsData;
    }
    loading.value = false;
    return [];
  } catch (e) {
    console.error('Error fetching products:', e);
    error.value = 'Fehler beim Laden der Produkte. Bitte versuchen Sie es später erneut.';
    loading.value = false;
    return [];
  }
});

// Set initial products
products.value = initialProducts.value || [];

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
        src="https://images.pexels.com/photos/1123260/pexels-photo-1123260.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
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
            >Wein & Schaumweine</h1>
            <p 
              class="text-h6 text-white text-center"
              v-motion
              :initial="{ opacity: 0, y: 20 }"
              :enter="{ opacity: 1, y: 0, transition: { duration: 800, delay: 500 } }"
            >
              Entdecken Sie unsere handverlesene Auswahl an erlesenen Weinen und Schaumweinen
            </p>
          </v-container>
        </div>
      </v-img>
    </div>

    <!-- Products Section -->
    <v-container class="py-16">
      <!-- Loading State -->
      <div 
        v-if="loading" 
        class="d-flex justify-center align-center"
        style="min-height: 400px"
        v-motion
        :initial="{ opacity: 0 }"
        :enter="{ opacity: 1, transition: { duration: 500 } }"
      >
        <v-progress-circular
          indeterminate
          color="primary"
          size="64"
        ></v-progress-circular>
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
          @click="fetchProducts"
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