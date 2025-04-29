<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-12 display-font text-center">Unsere Weine</h1>
    
    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center min-h-[400px]">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center py-8">
      <p class="text-red-500 base-font">{{ error }}</p>
      <v-btn 
        color="primary"
        class="mt-4 display-font"
        @click="fetchProducts"
      >
        Erneut versuchen
      </v-btn>
    </div>

    <!-- Products Grid -->
    <v-row v-else class="mt-4">
      <v-col
        v-for="product in products"
        :key="product.id"
        cols="12"
        sm="6"
        lg="4"
        class="d-flex"
      >
        <v-card
          class="d-flex flex-column product-card w-100"
          elevation="0"
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0 }"
          whileHover="{ y: -10, transition: { duration: 300 } }"
          @click="navigateToProduct(product)"
        >
          <div class="product-image-container">
            <v-img
              :src="product.images?.[0]?.src || '/placeholder-wine.jpg'"
              :alt="product.name"
              height="360"
              cover
              class="product-image"
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
          </div>

          <v-card-text class="d-flex flex-column flex-grow-1 pa-6">
            <div class="product-info flex-grow-1">
              <h2 class="text-h5 mb-2 display-font product-title">{{ product.name }}</h2>
              <div 
                class="text-body-1 text-grey-darken-1 base-font product-description"
                v-html="sanitizeHtml(product.short_description)"
              ></div>
            </div>

            <div class="product-footer mt-6">
              <div class="d-flex justify-space-between align-center mb-4">
                <span class="text-h6 font-weight-medium display-font">{{ formatPrice(product.price) }}</span>
                <span class="text-caption text-grey-darken-1">inkl. MwSt.</span>
              </div>
              <v-btn
                color="primary"
                variant="tonal"
                class="product-button display-font text-none"
                block
                @click="addToCart(product)"
                v-motion
                whileHover="{ scale: 1.02 }"
                whileTap="{ scale: 0.98 }"
              >
                In den Warenkorb
              </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Empty State -->
    <div v-if="!loading && !error && products.length === 0" class="text-center py-8">
      <p class="text-grey-darken-1 base-font">Keine Produkte gefunden.</p>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 1280px;
}

.display-font {
  font-family: 'Pathway Gothic One', sans-serif !important;
}

.base-font {
  font-family: 'Patrick Hand', cursive !important;
  font-size: 1.25rem !important;
  line-height: 1.6 !important;
}

.product-card {
  border-radius: 20px;
  background: #fff;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(0, 0, 0, 0.06);
  height: 100%;
  overflow: hidden;
}

.product-card:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  border-color: rgba(0, 0, 0, 0.12);
}

.product-image-container {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  margin: 12px;
  background: #f5f5f7;
}

.product-image {
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.product-card:hover .product-image {
  transform: scale(1.05);
}

.product-info {
  min-height: 160px;
}

.product-title {
  font-size: 1.75rem;
  letter-spacing: -0.5px;
  color: #1d1d1f;
}

.product-description {
  margin-top: 12px;
  color: #86868b;
}

.product-footer {
  border-top: 1px solid rgba(0, 0, 0, 0.06);
  padding-top: 16px;
  margin-top: auto;
}

.product-button {
  font-size: 1.1rem !important;
  letter-spacing: 0.5px;
  height: 48px !important;
  border-radius: 12px;
  text-transform: none;
}

:deep(.product-description p) {
  margin-bottom: 0.75rem;
}

:deep(.product-description p:last-child) {
  margin-bottom: 0;
}

:deep(.product-description ul) {
  margin: 0.75rem 0 0.75rem 1.5rem;
}

:deep(.product-description li) {
  margin-bottom: 0.5rem;
}

:deep(.product-description strong) {
  color: #1d1d1f;
  font-weight: 600;
}

:deep(.product-description em) {
  font-style: italic;
}

@media (max-width: 600px) {
  .product-card {
    border-radius: 16px;
  }

  .product-image-container {
    margin: 8px;
    border-radius: 12px;
  }

  .v-card-text {
    padding: 16px !important;
  }

  .product-info {
    min-height: 140px;
  }

  .product-title {
    font-size: 1.5rem;
  }

  .product-button {
    height: 44px !important;
  }
}
</style>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useWooCommerce } from '~/composables/useWooCommerce';
import DOMPurify from 'isomorphic-dompurify';

const router = useRouter();
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

const sanitizeHtml = (html: string) => {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'ul', 'li'],
    ALLOWED_ATTR: []
  });
};

const addToCart = (product: any) => {
  // TODO: Implement cart functionality
  console.log('Adding to cart:', product);
};

const navigateToProduct = (product: any) => {
  router.push({
    path: '/product-details',
    query: { id: product.id.toString() }
  });
};

onMounted(() => {
  fetchProducts();
});
</script>
  