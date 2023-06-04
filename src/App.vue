<template>
  <v-layout>
    <v-navigation-drawer :rail="collapsed" location="right" :absolute="true">
      <v-list-item
        prepend-avatar="@/assets/logo.png"
        title="Capibar JS Example"
        subtitle="Capibar JS"
        :nav="true"
      />

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
              !isDark ? 'mdi-white-balance-sunny' : 'mdi-moon-waxing-crescent'
            "
            title="Switch theme"
            @click="toggleTheme"
          />
          <v-list-item
            @click="collapsed = !collapsed"
            :prepend-icon="
              collapsed ? 'mdi-chevron-double-left' : 'mdi-chevron-double-right'
            "
            title="Collapse sidebar"
          ></v-list-item>
        </v-list>
      </template>
    </v-navigation-drawer>
    <v-main>
      <router-view />
    </v-main>
  </v-layout>
</template>

<script setup>
import { useTheme } from 'vuetify';
import { computed, onBeforeMount } from 'vue';
import { useApi } from '@/composables/api';
import { useStorage } from '@vueuse/core';

const theme = useTheme();
const themeStorage = useStorage('theme', 'dark');
const isDark = computed(() => themeStorage.value === 'dark');
const toggleTheme = () => {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark';
  themeStorage.value = theme.global.name.value;
};

onBeforeMount(() => {
  theme.global.name.value = themeStorage.value;
});

useApi().setup();

const collapsed = useStorage('sidebar-collapsed', false);
</script>

<style>
.cm-scroller::-webkit-scrollbar {
  width: 5px;
}

.cm-scroller::-webkit-scrollbar-track {
  background: transparent;
}

.cm-scroller::-webkit-scrollbar-thumb {
  background: #1f1f1f;
  cursor: pointer;
}

.cm-scroller::-webkit-scrollbar-thumb:hover {
  background: #101010;
}
</style>
