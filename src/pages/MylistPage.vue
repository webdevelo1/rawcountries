<template>
  <q-page padding>
    <h1 class="text-h3 q-mt-xs">My country list</h1>

    <div
      v-if="store.countryArrSelected.length == 0"
      class="text-subtitle1 q-mt-sm q-mb-md"
    >
      You don't have any countries selected yet. Go to the list of all countries
      to select your own list of those you wish to visit.
    </div>
    <div class="row">
      <div
        v-for="country in store.countryArrSelected"
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
          prompt="Delete"
          v-model="country.wantToVisit"
          :value="country"
          @tickboxChanged="toggleCountrySelectedList(country)"
        ></CountryCard>
      </div>
    </div>

    <q-btn
      @click="router.push('/')"
      color="primary"
      icon="checklist"
      label="Select countries"
      size="md"
      class="q-mt-md"
    />
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import CountryCard from "components/CountryCard.vue";
import { useStore } from "stores/store";
const router = useRouter();
const store = useStore();
onMounted(() => {
  store.adjustCountryArrSelected();
});
function toggleCountrySelectedList(country) {
  store.adjustCountryArrSelected();
}
</script>
