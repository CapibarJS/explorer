<template>
  <v-container class="fill-height">
    <v-responsive class="d-flex flex-column align-center text-center">
      <v-img height="300" src="@/assets/logo.png" />

      <div class="text-body-2 font-weight-light mt-4">Welcome to</div>

      <h1 class="text-h2 font-weight-bold">Capibar JS API</h1>

      <div class="py-14" />

      <v-row class="d-flex align-center justify-center">
        <v-col cols="auto">
          <v-btn
            href="/playground"
            min-width="164"
            rel="noopener noreferrer"
            variant="text"
          >
            <v-icon icon="mdi-script-text-play" size="large" start />
            Playground
          </v-btn>
        </v-col>

        <v-col cols="auto">
          <v-btn
            color="primary"
            href="https://github.com/CapibarJS/core#readme"
            min-width="228"
            rel="noopener noreferrer"
            size="x-large"
            target="_blank"
            variant="flat"
          >
            <v-icon icon="mdi-file-document" size="large" start />
            Docs
          </v-btn>
        </v-col>

        <v-col cols="auto">
          <v-btn
            href="https://github.com/CapibarJS/explorer/issues"
            min-width="164"
            rel="noopener noreferrer"
            target="_blank"
            variant="text"
          >
            <v-icon icon="mdi-account-group" size="large" start />
            Issues
          </v-btn>
        </v-col>
      </v-row>
      <v-row class="d-flex align-center justify-center">
        <v-col cols="auto">
          <v-btn
            href="/"
            min-width="164"
            rel="noopener noreferrer"
            variant="text"
          >
            <v-icon icon="mdi-function" size="large" start />
            Methods
          </v-btn>
        </v-col>

        <v-col cols="auto">
          <v-btn
            href="/schemas"
            min-width="164"
            rel="noopener noreferrer"
            variant="text"
          >
            <v-icon icon="mdi-application-braces" size="large" start />
            Schemas
          </v-btn>
        </v-col>
      </v-row>
    </v-responsive>
  </v-container>
</template>

<script setup>
//
</script>
