import { defineStore } from "pinia";
import { useRouter } from "vue-router";
const router = useRouter();

export const useStore = defineStore("store", {
  state: () => ({
    counter: 1,
    countryArrAll: [], // contain country objects with properties id, countryName, region, subregion, flag, latlng (to get lat and long use countryArrAll[208].latlong[0] and [1]), wantToVisit, passFilter.
    countryArrSelected: [],
    searchFilteredArrState: [],
    pagedArr: [],
    routePath: "",
    countryDetails: {}, // country object with properties id, countryName, region, subregion, flag, latlng (to get lat and long use countryArrAll[208].latlong[0] and [1]), wantToVisit, passFilter.
    searchTerm: "",
    page: 1, // current page's number (also where it opens by default)
    totalPages: 10, // no of items per page
    maxPages: 25, // no of listing pages
  }),
  getters: {
    doubleCount: (state) => state.counter * 2,
    searchFilteredArr: (state) =>
      state.countryArrAll.filter((country) =>
        country.countryName
          .toLowerCase()
          .includes(state.searchTerm.toLowerCase())
      ),
    pagedArr: (state) =>
      state.searchFilteredArr.slice(
        (state.page - 1) * state.totalPages,
        (state.page - 1) * state.totalPages + state.totalPages
      ),
    maxPages: (state) =>
      Math.ceil(state.searchFilteredArr.length / state.totalPages),
    searchHint: (state) =>
      state.searchFilteredArr.length + " countries match your search so far...",
    detailParagrapgSnippet: (state) =>
      state.countryDetails.wantToVisit ? "already" : "not",
    detailButtonLabel: (state) =>
      state.countryDetails.wantToVisit ? "Remove from list" : "Add to list",
    detailButtonColour: (state) =>
      state.countryDetails.wantToVisit ? "red" : "green",
    detailButtonSymbol: (state) =>
      state.countryDetails.wantToVisit ? "clear" : "add_task",
  },
  actions: {
    increment() {
      this.counter++;
    },
    toggleCountrySelectedDetails(id) {
      let obj = this.countryArrAll.find((i) => i.id == id);
      obj.wantToVisit = !obj.wantToVisit;
      this.adjustCountryArrSelected();
    },
    adjustCountryArrSelected() {
      this.countryArrSelected = this.countryArrAll.filter(myFunction);
      function myFunction(value) {
        return value.wantToVisit == true;
      }
    },
  },
});
