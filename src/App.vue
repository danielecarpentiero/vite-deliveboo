<template>
  <div>
    <AppHeader />
    <AppFooter />
  </div>
</template>

<script>
import axios from "axios";
import AppHeader from "./components/AppHeader.vue";
import AppFooter from "./components/AppFooter.vue";
import store from "../src/store.js";

export default {
  name: "App",
  components: {
    AppHeader,
    AppFooter,
  },
  data() {
    return {
      restaurants: [],
      store,
    };
  },
  methods: {
    getRestaurants() {
      console.log(this.store);
      axios
        .get(this.store.api.mainUrl + this.store.api.listUrl.restaurants)
        .then((response) => {
          this.restaurants = response.data.results;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created() {
    this.getRestaurants();
  },
};
</script>

<style></style>
