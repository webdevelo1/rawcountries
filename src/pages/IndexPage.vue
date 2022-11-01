<template>
  <q-page padding>
    <h1 class="text-h3 q-mt-xs q-mb-md">All countries list</h1>
    <q-input
      rounded
      outlined
      v-model="store.searchTerm"
      label="Search"
      :hint="store.searchHint"
      class="q-mb-md q-ml-md q-mr-md"
      style="max-width: 500px"
    >
      <template v-slot:prepend>
        <q-icon name="search" />
      </template>
      <template v-slot:append>
        <q-icon
          name="close"
          @click="store.searchTerm = ''"
          class="cursor-pointer"
        />
      </template>
    </q-input>

    <div class="row">
      <div
        v-for="country in store.pagedArr"
        :key="country.id"
        class="col-xs-12 col-sm-5"
        style="
          border: none;
          background-color: #e6d7e6;
          border-radius: 8px;
          margin: 7px;
          padding: 4px;
        "
      >
        <CountryCard
          :country="country"
          :countryName="country.countryName"
          :region="country.region"
          prompt="Want to visit?"
          v-model="country.wantToVisit"
          :value="country"
          @tickboxChanged="toggleCountrySelectedList(country)"
        ></CountryCard>
      </div>
    </div>

    <div class="q-pt-md q-pb-none q-mb-none flex flex-center">
      <q-pagination
        v-model="store.page"
        color="primary"
        :max="store.maxPages"
        :max-pages="6"
        boundary-numbers
      />
    </div>

    <div class="text-caption q-ma-none q-pt-none flex flex-center">
      {{ store.maxPages }} result pages (update as you enter search text)
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import CountryCard from "components/CountryCard.vue";
import { useStore } from "stores/store";
const store = useStore();

const current = ref(3);
const wantToVisit = ref(false);

function toggleCountrySelectedList(country) {
  store.adjustCountryArrSelected();
}

onMounted(() => {});
</script>
