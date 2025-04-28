<script setup>
useHead({
  htmlAttrs: { lang: "de" },
  title: "DER WEINGENERAL - Ihr Showroom für erlesene Weine",
  meta: [
    {
      name: "description",
      content:
        "DER WEINGENERAL - Ihr stilvoller Showroom für erlesene Weine, edle Spirituosen und passende Ausstattungstechnik. Entdecken Sie unsere exklusive Auswahl.",
    },
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1",
    },
    {
      property: "og:title",
      content: "DER WEINGENERAL - Ihr Showroom für erlesene Weine",
    },
    {
      property: "og:description",
      content:
        "Entdecken Sie unsere exklusive Auswahl an erlesenen Weinen, edlen Spirituosen und professioneller Ausstattungstechnik.",
    },
    {
      property: "og:type",
      content: "website",
    },
  ],
});
</script>

<template>
  <v-app>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </v-app>
</template>

<style lang="scss">
@import '@/assets/scss/main.scss';
</style>
