<template>
  <router-view />
</template>

<script setup>
import { useRoute } from "vue-router";
import { defineComponent, ref, onMounted, computed } from "vue";
import { api } from "boot/axios";
import { useQuasar } from "quasar";
import { useStore } from "stores/store";
const store = useStore();
const $q = useQuasar();
const data = ref(null);

const route = useRoute();
store.routePath = computed(() => route.path);

onMounted(() => {
  if (store.countryArrAll.length == 0) {
    api
      .get("/all")
      .then((response) => {
        data.value = response.data;
        let countryArrAll = [];
        for (let i = 0; i < data.value.length; i++) {
          let countryObj = {};
          countryObj.id = i;
          countryObj.countryName = data.value[i].name; // NB watch out here, in API its called just name but in this app its called countryName to reduce changes of name clashes
          countryObj.region = data.value[i].region;
          countryObj.subregion = data.value[i].subregion;
          countryObj.flag = data.value[i].flag;
          countryObj.latlong = data.value[i].latlng; // eg for SA to get lat use countryArrAll[208].latlong[0]
          countryObj.wantToVisit = false;
          countryArrAll.push(countryObj);
        }
        store.countryArrAll = countryArrAll;
      })
      .catch(() => {
        $q.notify({
          color: "negative",
          position: "top",
          message: "Loading failed",
          icon: "report_problem",
        });
      });
  }
});
</script>
