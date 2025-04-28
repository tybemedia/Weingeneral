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
  bodyAttrs: {
    class: 'font-sans antialiased'
  }
});
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap');

.font-sans {
  font-family: 'Inter', sans-serif;
}

.font-display {
  font-family: 'Playfair Display', serif;
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
