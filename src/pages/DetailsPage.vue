<template>
  <q-page padding>
    <h1 v-if="store.countryDetails.countryName" class="text-h3 q-mt-xs q-mb-xs">
      {{ store.countryDetails.countryName }}
    </h1>

    <div class="text-subtitle1 q-mt-xs">
      Region:
      <span v-if="store.countryDetails.region">{{
        store.countryDetails.region
      }}</span>
      (subregion:
      <span v-if="store.countryDetails.subregion">{{
        store.countryDetails.subregion
      }}</span
      >).
    </div>

    <div v-if="store.countryDetails.latlong" class="text-subtitle2 q-mb-md">
      Lattitude: {{ store.countryDetails.latlong[0] }}, Longitude:
      {{ store.countryDetails.latlong[1] }}.
    </div>

    <div
      v-if="store.countryDetails.flag"
      class="col-6 flex flex-center q-mb-md"
      style="max-width: 400px"
    >
      <q-img :src="store.countryDetails.flag">
        <div class="absolute-bottom-right text-subtitle2">Flag</div>
      </q-img>
    </div>

    <div
      v-if="store.countryDetails.countryName"
      class="text-subtitle1 q-mt-sm q-mb-md"
    >
      {{ store.countryDetails.countryName }} is
      <strong>{{ store.detailParagrapgSnippet }} on</strong> your list.
    </div>

    <q-btn
      @click="router.go(-1)"
      color="primary"
      icon="arrow_back_ios_new"
      label="Back"
      size="md"
      class="q-mr-md"
    />

    <q-btn
      @click="
        router.go(-1),
          store.toggleCountrySelectedDetails(store.countryDetails.id)
      "
      :color="store.detailButtonColour"
      :icon="store.detailButtonSymbol"
      :label="store.detailButtonLabel"
      size="md"
    />
  </q-page>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { useStore } from "stores/store";
const store = useStore();
const route = useRoute();
const router = useRouter();
</script>
