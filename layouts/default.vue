<template>
  <v-app>
    <TheNavigation />
    
    <v-main>
      <slot />
    </v-main>

    <v-footer class="bg-grey-darken-4 text-white py-12">
      <v-container>
        <v-row>
          <!-- Company Info -->
          <v-col cols="12" md="3">
            <h3 class="text-h6 font-weight-bold mb-4">DER WEINGENERAL</h3>
            <p class="text-grey-lighten-1">
              Ihr stilvoller Showroom für erlesene Weine, edle Spirituosen und 
              passende Ausstattungstechnik.
            </p>
          </v-col>

          <!-- Quick Links -->
          <v-col cols="12" md="3">
            <h3 class="text-h6 font-weight-bold mb-4">Quick Links</h3>
            <v-list density="compact" class="bg-transparent">
              <v-list-item
                v-for="item in ['Startseite', 'Über uns', 'Produkte', 'Kontakt']"
                :key="item"
                :to="item === 'Startseite' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`"
                class="text-grey-lighten-1"
              >
                {{ item }}
              </v-list-item>
            </v-list>
          </v-col>

          <!-- Contact Info -->
          <v-col cols="12" md="3">
            <h3 class="text-h6 font-weight-bold mb-4">Kontakt</h3>
            <v-list density="compact" class="bg-transparent">
              <v-list-item class="text-grey-lighten-1">Email: info@weingeneral.de</v-list-item>
              <v-list-item class="text-grey-lighten-1">Tel: +49 (0) XXX XXX XXX</v-list-item>
              <v-list-item class="text-grey-lighten-1">Adresse: Musterstraße 123</v-list-item>
              <v-list-item class="text-grey-lighten-1">12345 Musterstadt</v-list-item>
            </v-list>
          </v-col>

          <!-- Social Media -->
          <v-col cols="12" md="3">
            <h3 class="text-h6 font-weight-bold mb-4">Folgen Sie uns</h3>
            <div class="d-flex gap-4">
              <v-btn
                icon
                variant="text"
                color="white"
                href="#"
              >
                <v-icon>mdi-instagram</v-icon>
              </v-btn>
              <v-btn
                icon
                variant="text"
                color="white"
                href="#"
              >
                <v-icon>mdi-facebook</v-icon>
              </v-btn>
            </div>
          </v-col>
        </v-row>

        <v-divider class="my-8"></v-divider>

        <div class="text-center text-grey-lighten-1">
          <p>&copy; {{ new Date().getFullYear() }} DER WEINGENERAL. Alle Rechte vorbehalten.</p>
        </div>
      </v-container>
    </v-footer>
  </v-app>
</template>
