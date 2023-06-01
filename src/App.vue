<template>
  <v-layout>
    <v-navigation-drawer expand-on-hover rail location="right">
      <v-list>
        <v-list-item
          prepend-avatar="@/assets/logo.png"
          title="Capibar JS Example"
          subtitle="Capibar JS"
        ></v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list density="compact">
        <v-list-item prepend-icon="mdi-home" title="Home" href="/home" />
        <v-list-item prepend-icon="mdi-function" title="Methods" href="/" />
        <v-list-item
          prepend-icon="mdi-application-braces"
          title="Schemas"
          href="schemas"
        />
        <v-list-item
          prepend-icon="mdi-script-text-play"
          title="Playground"
          href="/playground"
        />
      </v-list>

      <template #append>
        <v-list>
          <v-list-item
            :prepend-icon="
              !currentTheme
                ? 'mdi-white-balance-sunny'
                : 'mdi-moon-waxing-crescent'
            "
            title="Switch theme"
            @click="toggleTheme"
          />
        </v-list>
      </template>
    </v-navigation-drawer>
    <router-view />
  </v-layout>
</template>

<script setup>
import { useTheme } from 'vuetify';
import { computed } from 'vue';

const theme = useTheme();
const currentTheme = computed(() => theme.global.current.value.dark);
const toggleTheme = () => {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark';
};
</script>
