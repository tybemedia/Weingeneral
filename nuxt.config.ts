// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: [
    'vuetify/styles',
    '@mdi/font/css/materialdesignicons.min.css',
  ],
  build: {
    transpile: ['vuetify'],
  },
  modules: [
    'nuxt-icon',
    '@nuxt/image',
  ],
  vite: {
    define: {
      'process.env.DEBUG': false,
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "vuetify/styles" as *;'
        }
      }
    }
  },
  runtimeConfig: {
    woocommerce: {
      url: "https://weingeneral.de/weingeneral",
      consumerKey: "ck_f569f9d15352cd965f14e58d00cfde131e628a93",
      consumerSecret: "cs_bd541bb1dda1dce7e1baa7d3832ca42e412dc1b4"
    },
  },
  experimental: { appManifest: false },
  compatibilityDate: "2024-12-18",
});
