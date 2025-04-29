<template>
  <div class="product-detail-page">
    <v-container v-if="loading" class="loading-container d-flex justify-center align-center">
      <v-progress-circular indeterminate color="primary" size="64"></v-progress-circular>
    </v-container>

    <v-container v-else-if="error" class="text-center py-16">
      <v-alert type="error" class="mb-4">{{ error }}</v-alert>
      <v-btn color="primary" @click="fetchProduct">Erneut versuchen</v-btn>
    </v-container>

    <template v-else>
      <v-container class="py-16">
        <v-row>
          <!-- Product Images -->
          <v-col cols="12" md="6">
            <v-carousel
              v-if="product.images && product.images.length > 0"
              hide-delimiter-background
              show-arrows="hover"
              height="500"
            >
              <v-carousel-item
                v-for="image in product.images"
                :key="image.id"
                :src="image.src"
                cover
              ></v-carousel-item>
            </v-carousel>
            <v-img
              v-else
              src="/placeholder.jpg"
              height="500"
              cover
            ></v-img>
          </v-col>

          <!-- Product Info -->
          <v-col cols="12" md="6" class="d-flex flex-column">
            <div class="flex-grow-1">
              <h1 class="text-h3 mb-6 display-font">{{ product.name }}</h1>
              
              <div class="mb-6">
                <div class="text-h4 mb-1 display-font">{{ formatPrice(product.price) }}</div>
                <div class="text-body-2 text-grey">zzgl. MwSt.</div>
              </div>

              <div class="mb-8" v-html="product.description"></div>

              <v-divider class="mb-8"></v-divider>

              <!-- Additional Info -->
              <div v-if="product.attributes && product.attributes.length > 0" class="mb-8">
                <h3 class="text-h6 mb-4 display-font">Produktdetails</h3>
                <v-list>
                  <v-list-item
                    v-for="attr in product.attributes"
                    :key="attr.name"
                    density="compact"
                  >
                    <template v-slot:prepend>
                      <strong class="text-body-2">{{ attr.name }}:</strong>
                    </template>
                    <v-list-item-title class="text-body-2">{{ attr.options.join(', ') }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </div>

              <!-- Actions -->
              <div class="mt-auto">
                <v-btn
                  color="primary"
                  size="large"
                  block
                  class="mb-4"
                  v-motion
                  :initial="{ scale: 0.95, opacity: 0 }"
                  :enter="{ scale: 1, opacity: 1, transition: { delay: 300 } }"
                  whileHover="{ scale: 1.05 }"
                  whileTap="{ scale: 0.95 }"
                >
                  Jetzt anfragen
                </v-btn>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useWooCommerce } from '~/composables/useWooCommerce';

const { getProduct } = useWooCommerce();
const route = useRoute();
const product = ref(null);
const loading = ref(true);
const error = ref(null);

const fetchProduct = async () => {
  loading.value = true;
  error.value = null;
  
  try {
    product.value = await getProduct(route.params.id);
  } catch (e) {
    error.value = 'Fehler beim Laden des Produkts. Bitte versuchen Sie es später erneut.';
    console.error('Error fetching product:', e);
  } finally {
    loading.value = false;
  }
};

const formatPrice = (price) => {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR'
  }).format(parseFloat(price));
};

onMounted(() => {
  fetchProduct();
});

definePageMeta({
  layout: "default",
});
</script>

<style scoped>
.product-detail-page {
  margin-top: 84px;
  min-height: calc(100vh - 84px); /* Ensure page takes full height minus nav */
}

.loading-container {
  min-height: calc(100vh - 84px); /* Match page height */
  margin: 0;
  padding: 0;
}

:deep(.v-carousel .v-window__container) {
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

:deep(.v-list-item) {
  min-height: 40px !important;
}

/* Ensure proper spacing for the product description */
:deep(p) {
  margin-bottom: 1rem;
}

:deep(ul), :deep(ol) {
  margin-bottom: 1rem;
  padding-left: 1.5rem;
}

:deep(li) {
  margin-bottom: 0.5rem;
}
</style> 