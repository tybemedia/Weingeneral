<template>
  <v-card
    class="product-card h-100 d-flex flex-column"
    elevation="2"
    v-motion
    :initial="{ opacity: 0, y: 50 }"
    :enter="{ opacity: 1, y: 0, transition: { duration: 800, delay: props.index * 100 } }"
    whileHover="{ y: -10, transition: { duration: 300 } }"
  >
    <v-img
      :src="product.images[0]?.src || '/placeholder.jpg'"
      height="200"
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

    <v-card-text class="d-flex flex-column flex-grow-1">
      <div class="flex-grow-1">
        <h3 class="text-h6 mb-2 display-font">{{ product.name }}</h3>
        <p class="text-body-2 text-grey base-font" v-html="sanitizedDescription"></p>
      </div>

      <div class="product-footer mt-4">
        <div class="d-flex align-center justify-space-between mb-4">
          <div>
            <span class="text-h6 display-font">{{ formatPrice(product.price) }}</span>
            <div class="text-caption text-grey-darken-1">zzgl. MwSt.</div>
          </div>
          <v-btn
            color="primary"
            variant="outlined"
            :to="`/produkt/${product.id}`"
            class="display-font"
            v-motion
            whileHover="{ scale: 1.05 }"
            whileTap="{ scale: 0.95 }"
          >
            Mehr Details
          </v-btn>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import DOMPurify from 'isomorphic-dompurify';

const props = defineProps<{
  product: any;
  index: number;
}>();

const sanitizedDescription = computed(() => {
  if (!props.product.short_description) return '';
  // First sanitize HTML
  const sanitized = DOMPurify.sanitize(props.product.short_description, {
    ALLOWED_TAGS: ['br'],
    ALLOWED_ATTR: []
  });
  // Then remove any remaining HTML tags except allowed ones
  return sanitized.replace(/<(?!br\s*\/?)[^>]+>/g, '');
});

const formatPrice = (price: string) => {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR'
  }).format(parseFloat(price));
};
</script>

<style scoped>
.product-card {
  transition: all 0.3s ease;
  border: 1px solid rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

.product-image {
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
}

.product-footer {
  border-top: 1px solid rgba(0, 0, 0, 0.08);
  padding-top: 1rem;
}

:deep(br) {
  margin-bottom: 0.5rem;
}
</style> 