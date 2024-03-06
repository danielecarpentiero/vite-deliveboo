<script>
import { RouterView } from "vue-router";
import AppHeader from "../components/AppHeader.vue";
import AppFooter from "../components/AppFooter.vue";
import axios from "axios";
import store from "../store";

export default {
  name: "SingleRestaurant",
  props: ["restaurant"],
  components: {
    AppHeader,
    RouterView,
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
        .get(
          this.store.api.mainUrl +
            this.store.api.listUrl.restaurants +
            "/" +
            this.$route.params.slug
        )
        .then((response) => {
          this.restaurants = response.data.results.data;
          console.log(this.restaurants);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created() {
    this.getRestaurants();
    console.log(this.getRestaurants);
    console.log(this.$route);
  },
};
</script>

<template>
  <div class="card">
    <div class="card-body">
      <h2 class="card-title">{{ restaurants.name }}</h2>
      <h3>{{ restaurants.address }}</h3>
    </div>
  </div>
</template>

<style></style>
