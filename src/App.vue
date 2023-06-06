<template>
  <v-app>
    <v-navigation-drawer :rail="collapsed" location="right">
      <v-list-item prepend-avatar="@/assets/logo.png" :nav="true">
        <v-list-item-title>
          {{ meta.name }}
        </v-list-item-title>
        <v-list-item-subtitle>
          Capibar JS
          <code class="ml-1">v{{ meta.coreVersion }}</code>
        </v-list-item-subtitle>
      </v-list-item>

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
      <v-container class="d-flex align-center pa-0">
        <v-col class="text-h6">
          <span class="text-disabled">Explorer </span>
          <span class="text-h6">{{ meta.name }}</span>
          <v-chip class="ml-3" size="small">
            <code>{{ meta.version }}</code>
          </v-chip>
        </v-col>
        <v-spacer />
        <v-col cols="4" md="2">
          <v-select
            label="Client"
            v-model="currentClient"
            :items="clients"
            variant="outlined"
            density="compact"
            hide-details
          ></v-select>
        </v-col>
      </v-container>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
import { useTheme } from 'vuetify';
import { computed, onBeforeMount } from 'vue';
import { useStorage } from '@vueuse/core';
import { useMeta } from '@/composables/meta';
import { useApi } from '@/composables/api';

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

useMeta().setup();
useApi().setup();

const { meta } = useMeta();
const clients = computed(() => meta.value?.clients?.map((x) => x.name));
const { currentClient } = useApi();

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
