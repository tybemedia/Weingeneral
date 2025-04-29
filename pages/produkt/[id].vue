<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useWooCommerce } from '~/composables/useWooCommerce';

const route = useRoute();
const { getProduct, getProductsByCategory } = useWooCommerce();

const product = ref(null);
const loading = ref(true);
const error = ref(null);
const selectedImage = ref(0);
const relatedProducts = ref([]);

const formatPrice = (price) => {
  if (!price) return '0.00';
  return parseFloat(price).toFixed(2);
};

const fetchProduct = async () => {
  loading.value = true;
  error.value = null;
  
  try {
    product.value = await getProduct(parseInt(route.params.id));
    
    // Fetch related products from the same category
    if (product.value.categories && product.value.categories.length > 0) {
      const categoryId = product.value.categories[0].id;
      const allProducts = await getProductsByCategory(categoryId);
      relatedProducts.value = allProducts
        .filter(p => p.id !== product.value.id)
        .slice(0, 4); // Show up to 4 related products
    }
  } catch (e) {
    error.value = 'Fehler beim Laden des Produkts. Bitte versuchen Sie es später erneut.';
    console.error('Error fetching product:', e);
  } finally {
    loading.value = false;
  }
};

const handleInquiry = () => {
  // TODO: Implement inquiry functionality
  console.log('Inquiry for product:', product.value.id);
};

onMounted(() => {
  fetchProduct();
});

definePageMeta({
  layout: "default",
});
</script>

<template>
  <div>
    <!-- Loading State -->
    <v-container v-if="loading" class="d-flex justify-center align-center" style="min-height: 60vh">
      <v-progress-circular
        indeterminate
        color="primary"
        size="64"
      ></v-progress-circular>
    </v-container>

    <!-- Error State -->
    <v-container v-else-if="error" class="d-flex flex-column align-center justify-center" style="min-height: 60vh">
      <v-icon
        icon="mdi-alert-circle-outline"
        color="error"
        size="64"
        class="mb-4"
      ></v-icon>
      <div class="h4 font-weight-medium mb-4">{{ error }}</div>
      <v-btn
        color="primary"
        @click="fetchProduct"
        class="text-button"
      >
        Erneut versuchen
      </v-btn>
    </v-container>

    <!-- Product Content -->
    <template v-else>
      <!-- Breadcrumb -->
      <v-container class="py-4">
        <v-breadcrumbs :items="[
          { title: 'Startseite', to: '/' },
          { title: 'Produkte', to: '/produkte' },
          { title: product.name, disabled: true }
        ]" class="px-0 text-caption">
          <template v-slot:divider>
            <v-icon>mdi-chevron-right</v-icon>
          </template>
        </v-breadcrumbs>
      </v-container>

      <!-- Product Details -->
      <v-container class="py-8">
        <v-row>
          <!-- Product Images -->
          <v-col cols="12" md="6" class="pr-md-8">
            <div class="product-images">
              <v-img
                :src="selectedImage || product.images[0]?.src || '/placeholder.jpg'"
                :aspect-ratio="1"
                class="main-image rounded-lg"
                cover
              ></v-img>
              
              <div class="d-flex gap-4 mt-6">
                <v-img
                  v-for="(image, index) in product.images"
                  :key="index"
                  :src="image.src"
                  :aspect-ratio="1"
                  width="80"
                  height="80"
                  class="thumbnail rounded-lg cursor-pointer"
                  :class="{ 'selected': selectedImage === image.src }"
                  @click="selectedImage = image.src"
                  cover
                ></v-img>
              </div>
            </div>
          </v-col>

          <!-- Product Info -->
          <v-col cols="12" md="6" class="pl-md-8">
            <div class="product-info">
              <h1 class="h2 mb-4">{{ product.name }}</h1>
              
              <div class="text-price-lg mb-6" v-if="product.price">
                {{ formatPrice(product.price) }} €
              </div>

              <div class="mb-8">
                <div class="text-body-lg mb-4" v-html="product.short_description"></div>
              </div>

              <v-btn
                color="primary"
                size="x-large"
                class="text-button mb-8"
                :loading="loading"
                @click="addToCart"
              >
                In den Warenkorb
              </v-btn>

              <!-- Product Properties -->
              <div class="product-properties">
                <div v-if="product.attributes" class="mb-8">
                  <h2 class="h4 mb-4">Produktdetails</h2>
                  <v-list class="bg-transparent">
                    <v-list-item
                      v-for="attr in product.attributes"
                      :key="attr.name"
                      class="px-0"
                    >
                      <template v-slot:prepend>
                        <span class="text-body font-weight-medium">{{ attr.name }}:</span>
                      </template>
                      <span class="text-body">{{ attr.options.join(', ') }}</span>
                    </v-list-item>
                  </v-list>
                </div>

                <!-- Description -->
                <div v-if="product.description" class="mb-8">
                  <h2 class="h4 mb-4">Beschreibung</h2>
                  <div class="text-body-lg rich-text" v-html="product.description"></div>
                </div>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>

      <!-- Related Products -->
      <v-container v-if="relatedProducts.length" class="py-12">
        <h2 class="h3 mb-8">Ähnliche Produkte</h2>
        <v-row>
          <v-col
            v-for="product in relatedProducts"
            :key="product.id"
            cols="12"
            sm="6"
            md="4"
            lg="3"
          >
            <v-card
              :to="`/produkt/${product.id}`"
              class="h-100 product-card"
              elevation="0"
            >
              <v-img
                :src="product.images[0]?.src || '/placeholder.jpg'"
                :aspect-ratio="1"
                cover
                class="rounded-lg"
              ></v-img>
              
              <v-card-title class="h5 pt-4">
                {{ product.name }}
              </v-card-title>
              
              <v-card-text class="text-price">
                {{ formatPrice(product.price) }} €
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </template>
  </div>
</template>

<style scoped>
.product-page {
  padding: 48px 0;
}

.breadcrumbs {
  margin-bottom: 32px;
}

.breadcrumbs a {
  color: #9a1915;
  text-decoration: none;
  transition: color 0.3s ease;
}

.breadcrumbs a:hover {
  color: #7a1410;
}

.product-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  margin-bottom: 64px;
}

.product-images {
  position: sticky;
  top: 100px;
}

.main-image {
  width: 100%;
  height: auto;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 24px;
}

.thumbnail-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.thumbnail {
  width: 100%;
  height: auto;
  border-radius: 8px;
  cursor: pointer;
  transition: opacity 0.3s ease;
}

.thumbnail:hover {
  opacity: 0.8;
}

.product-info {
  padding-top: 32px;
}

.product-card {
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.product-image {
  width: 100%;
  height: 300px;
  object-fit: cover;
}

.product-details {
  padding: 24px;
}

@media (max-width: 960px) {
  .product-content {
    grid-template-columns: 1fr;
    gap: 32px;
  }

  .product-images {
    position: static;
  }

  .product-info {
    padding-top: 0;
  }
}
</style> 