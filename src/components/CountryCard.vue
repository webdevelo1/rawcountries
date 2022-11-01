<!-- eslint-disable vue/no-mutating-props -->
<template>
  <q-item
    clickable
    tag="a"
    target="_blank"
    :href="link"
    :class="[store.routePath == '/mylist' ? 'trashClass' : 'checkboxClass']"
  >
    <q-item-section @click="selectCountry(country), (store.searchTerm = '')">
      <q-item-label>{{ country.countryName }}</q-item-label>
      <q-item-label caption>{{ country.region }}</q-item-label>
    </q-item-section>
    <q-item-section>
      <label class="container"
        >{{ prompt }}
        <input
          type="checkbox"
          v-model="model"
          :value="value"
          @change="$emit('tickboxChanged')"
        />
        <span class="checkmark"></span>
      </label>
    </q-item-section>
  </q-item>
</template>

<script setup>
import { ref, computed, defineComponent } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "stores/store";

const store = useStore();
const router = useRouter();

const props = defineProps({
  modelValue: { type: [Array, Boolean] },
  value: { type: [Boolean, Object] },
  country: { type: Object },
  prompt: { type: String },
});
const emit = defineEmits(["update:modelValue"]);
const model = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});

function selectCountry(country) {
  store.countryDetails = country;
  router.push("/details");
}
</script>

<style scoped>
/* 1. Normal checkbox on index page */
/* 1.1 The container */
.checkboxClass .container {
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 13px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* 1.2 Hide the browser's default checkbox */
.checkboxClass .container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

/* 1.3 Create a custom checkbox */
.checkboxClass .checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 25px;
  width: 25px;
  background-color: #eee;
  border-style: solid;
  border-width: 1px;
  border-radius: 4px;
}

/* 1.4 On mouse-over, add a grey background color */
.checkboxClass .container:hover input ~ .checkmark {
  background-color: #ccc;
}

/* 1.5 When the checkbox is checked, add a blue background */
.checkboxClass .container input:checked ~ .checkmark {
  background-color: rgb(44, 228, 44);
}

/* 1.6 Create the checkmark/indicator (hidden when not checked) */
.checkboxClass .checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* 1.7 Show the checkmark when checked */
.checkboxClass .container input:checked ~ .checkmark:after {
  display: block;
}

/* 1.8 Style the checkmark/indicator */
.checkboxClass .container .checkmark:after {
  left: 9px;
  top: 5px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}

/* 2. Delete button as modified checkbox on mylist page */

/* 2.1 The container */
.trashClass .container {
  display: block;
  padding: 5px 50px 5px 22px;
  margin: 10px 15px 12px 0px;
  cursor: pointer;
  font-size: 14px;
  color: red;
  border-style: solid;
  border-width: 1px;
  border-radius: 8px;
  max-width: 70px;
  position: absolute;
  right: 0px;
}

/* 2.2 Hide the browser's default checkbox */
.trashClass .container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

/* 2.6 Create the checkmark/indicator (hidden when not checked) */
.trashClass .checkmark:after {
  content: "\2718";
  position: absolute;
  display: none;
}

/* 2.7 Show the checkmark when checked */
.trashClass .container input:checked ~ .checkmark:after {
  display: block;
}

/* 2.8 Style the checkmark/indicator */
.trashClass .container .checkmark:after {
  left: 5px;
  top: 4px;
}
</style>
