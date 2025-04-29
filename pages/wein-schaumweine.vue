<script setup>
import { ref, onMounted } from 'vue';
import { useWooCommerce } from '~/composables/useWooCommerce';

const { getProductsByCategory, getCategories } = useWooCommerce();
const products = ref([]);
const loading = ref(true);
const error = ref(null);
const categoryId = ref(null);

const initializeCategory = async () => {
  try {
    const categories = await getCategories();
    // Suche nach der Kategorie "Wein & Schaumweine"
    const wineCategory = categories.find(cat => 
      cat.name.toLowerCase().includes('wein') || 
      cat.slug.toLowerCase().includes('wein')
    );
    
    if (wineCategory) {
      categoryId.value = wineCategory.id;
      await fetchProducts();
    } else {
      error.value = 'Kategorie nicht gefunden';
    }
  } catch (e) {
    error.value = 'Fehler beim Laden der Kategorien';
    console.error('Error fetching categories:', e);
  }
};

const fetchProducts = async () => {
  if (!categoryId.value) return;
  
  loading.value = true;
  error.value = null;
  
  try {
    products.value = await getProductsByCategory(categoryId.value);
  } catch (e) {
    error.value = 'Fehler beim Laden der Produkte. Bitte versuchen Sie es später erneut.';
    console.error('Error fetching products:', e);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  initializeCategory();
});

definePageMeta({
  layout: "default",
});
</script>

<template>
  <div>
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
          <v-card
            class="h-100"
            elevation="2"
            v-motion
            :initial="{ opacity: 0, y: 50 }"
            :enter="{ opacity: 1, y: 0, transition: { duration: 800, delay: index * 100 } }"
            whileHover="{ y: -10, transition: { duration: 300 } }"
          >
            <v-img
              :src="product.images[0]?.src || '/placeholder.jpg'"
              height="200"
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

            <v-card-text>
              <h3 class="text-h6 mb-2">{{ product.name }}</h3>
              <p class="text-body-2 text-grey">{{ product.short_description }}</p>
              <div class="d-flex align-center justify-space-between mt-4">
                <span class="text-h6">{{ product.price }} €</span>
                <v-btn
                  color="primary"
                  variant="outlined"
                  :to="`/produkt/${product.id}`"
                  v-motion
                  whileHover="{ scale: 1.05 }"
                  whileTap="{ scale: 0.95 }"
                >
                  Mehr Details
                </v-btn>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style scoped>
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