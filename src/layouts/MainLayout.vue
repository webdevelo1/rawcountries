<template>
  <q-layout view="hHr lpR fFf">
    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title @click="$router.push('/')">
          <q-avatar>
            <img src="world.png" />
          </q-avatar>
          Travelplanner
        </q-toolbar-title>
      </q-toolbar>

      <q-tabs align="left">
        <q-route-tab to="/" label="All countries" />
        <q-route-tab to="/mylist" label="My country list"
          ><q-badge color="green" floating>{{
            store.countryArrSelected.length
          }}</q-badge>
        </q-route-tab>
        <q-route-tab to="/about" label="About" />
      </q-tabs>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "stores/store";
import { useRouter } from "vue-router";

const router = useRouter();
const store = useStore();
</script>
