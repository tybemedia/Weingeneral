<template>
  <div class="product-detail-page">
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
        @click="fetchProduct"
      >
        Erneut versuchen
      </v-btn>
    </div>

    <template v-else>
      <!-- Product Header Section -->
      <div class="container-fluid px-4 py-8">
        <div class="max-w-[1140px] mx-auto">
          <v-row>
            <!-- Left Column - Image Gallery -->
            <v-col cols="12" md="6" class="product-gallery pe-md-8">
              <div class="main-image-container mb-4">
                <v-img
                  :src="currentImage"
                  :alt="product?.name"
                  height="500"
                  class="main-image rounded-lg"
                  cover
                >
                  <template v-slot:placeholder>
                    <v-row class="fill-height ma-0" align="center" justify="center">
                      <v-progress-circular indeterminate color="grey-lighten-5"></v-progress-circular>
                    </v-row>
                  </template>
                </v-img>
              </div>
              
              <!-- Thumbnail Gallery -->
              <div class="thumbnails-container d-flex gap-4 justify-space-between">
                <div
                  v-for="(image, index) in product?.images"
                  :key="index"
                  class="thumbnail-wrapper"
                  @click="currentImage = image.src"
                >
                  <v-img
                    :src="image.src"
                    :alt="'Product image ' + (index + 1)"
                    width="80"
                    height="80"
                    cover
                    class="thumbnail"
                    :class="{ 'active': currentImage === image.src }"
                  ></v-img>
                </div>
              </div>
            </v-col>

            <!-- Right Column - Product Info -->
            <v-col cols="12" md="6" class="product-info pl-md-8">
              <h1 class="text-h3 mb-4 display-font">{{ product?.name }}</h1>
              
              <div class="price-container mb-6">
                <div class="d-flex align-center">
                  <span class="text-h4 font-weight-medium display-font mr-2">{{ formatPrice(product?.price) }}</span>
                  <span class="text-caption text-grey-darken-1">zzgl. MwSt.</span>
                </div>
                <div class="text-caption text-grey-darken-1 mt-1" v-if="product?.price">
                  ({{ calculatePricePerLiter(product.price, product.meta_data) }} € / 1 L)
                </div>
              </div>

              <div class="short-description base-font mb-6" v-if="product?.short_description" v-html="sanitizeHtml(product.short_description)"></div>

              <v-btn
                color="primary"
                size="x-large"
                block
                class="inquiry-btn display-font mb-6"
                @click="handleInquiry(product)"
                v-motion
                whileHover="{ scale: 1.02 }"
                whileTap="{ scale: 0.98 }"
              >
                Anfragen
              </v-btn>
            </v-col>
          </v-row>
        </div>
      </div>

      <!-- Product Details Tabs -->
      <div class="container-fluid px-4 py-8 bg-grey-lighten-4">
        <div class="max-w-[1140px] mx-auto">
          <v-tabs
            v-model="activeTab"
            color="primary"
            class="product-tabs mb-6"
          >
            <v-tab value="description" class="display-font text-h6">Beschreibung</v-tab>
            <v-tab value="details" class="display-font text-h6">Produktdetails</v-tab>
          </v-tabs>

          <v-window v-model="activeTab">
            <v-window-item value="description">
              <div class="base-font product-description pa-4" v-if="product?.description" v-html="sanitizeHtml(product.description)"></div>
            </v-window-item>

            <v-window-item value="details">
              <div class="product-details pa-4">
                <table class="details-table w-100">
                  <tbody>
                    <tr v-for="(value, key) in productDetails" :key="key">
                      <td class="py-2 pr-4 base-font">{{ key }}</td>
                      <td class="py-2 base-font">{{ value }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </v-window-item>
          </v-window>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useWooCommerce } from '~/composables/useWooCommerce';
import DOMPurify from 'isomorphic-dompurify';

const route = useRoute();
const { getProduct } = useWooCommerce();

const product = ref<any>(null);
const loading = ref(true);
const error = ref<string | null>(null);
const currentImage = ref('');
const activeTab = ref('description');

const fetchProduct = async () => {
  loading.value = true;
  error.value = null;
  
  try {
    const slug = route.params.slug as any;
    product.value = await getProduct(slug);
    if (product.value?.images?.[0]?.src) {
      currentImage.value = product.value.images[0].src;
    }
  } catch (e) {
    error.value = 'Fehler beim Laden des Produkts. Bitte versuchen Sie es später erneut.';
    console.error('Error fetching product:', e);
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

const calculatePricePerLiter = (price: string, metaData: any[]) => {
  // Find volume in meta_data and calculate price per liter
  const volume = 0.75; // Default to 0.75L if not found
  const priceNumber = parseFloat(price);
  if (isNaN(priceNumber)) return '0.00';
  return (priceNumber / volume).toFixed(2);
};

const sanitizeHtml = (html: string) => {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'ul', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    ALLOWED_ATTR: []
  });
};

const productDetails = computed(() => {
  if (!product.value) return {};
  
  return {
    'Rebsorte': product.value.attributes?.grape || '-',
    'Herkunftsland': product.value.attributes?.country || '-',
    'Region': product.value.attributes?.region || '-',
    'Alkoholgehalt': product.value.attributes?.alcohol || '-',
    'Allergene': 'Enthält Sulfite',
    'Füllmenge': product.value.attributes?.volume || '0,75l',
    'Geschmack': product.value.attributes?.taste || '-',
    'Bio': product.value.attributes?.organic ? 'Ja' : 'Nein',
    'Jahrgang': product.value.attributes?.vintage || '-',
    'Trinktemperatur': product.value.attributes?.drinking_temperature || '-',
  };
});

const handleInquiry = (product: any) => {
  // TODO: Implement inquiry functionality
  console.log('Inquiry for product:', product);
};

onMounted(() => {
  fetchProduct();
});
</script>

<style scoped>
.max-w-\[1140px\] {
  max-width: 1140px;
}

.product-gallery {
  position: relative;
}

.main-image-container {
  border-radius: 16px;
  overflow: hidden;
  background: #f5f5f7;
  max-height: 500px;
}

.main-image {
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.thumbnails-container {
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 16px;
  padding: 0;
}

.thumbnail-wrapper {
  cursor: pointer;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
  flex: 1;
  max-width: calc(25% - 12px);
}

.thumbnail {
  border: 2px solid transparent;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.thumbnail.active {
  border-color: var(--v-primary-base);
}

.thumbnail-wrapper:hover .thumbnail:not(.active) {
  opacity: 0.8;
}

.product-info {
  height: 100%;
}

.price-container {
  padding: 16px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
}

.inquiry-btn {
  height: 56px;
  border-radius: 12px;
  font-size: 1.2rem !important;
  letter-spacing: 0.5px;
}

.details-table td:first-child {
  font-weight: 500;
  color: #1d1d1f;
  width: 200px;
}

.display-font {
  font-family: 'Pathway Gothic One', sans-serif !important;
}

.base-font {
  font-family: 'Patrick Hand', cursive !important;
  font-size: 1.25rem !important;
  line-height: 1.6 !important;
}

.product-tabs {
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
}

:deep(.v-tab) {
  text-transform: none !important;
  letter-spacing: 0 !important;
}

:deep(.v-tab--selected) {
  color: var(--v-primary-base) !important;
}

:deep(.product-description) {
  max-width: 800px;
  margin: 0 auto;
}

:deep(.product-description p) {
  margin-bottom: 1rem;
}

:deep(.product-description h1),
:deep(.product-description h2),
:deep(.product-description h3) {
  font-family: 'Pathway Gothic One', sans-serif !important;
  margin: 2rem 0 1rem;
  color: #1d1d1f;
}

@media (max-width: 960px) {
  .product-info {
    padding-left: 16px !important;
    margin-top: 32px;
  }
}
</style> 