<script>
import axios from "axios";
import store from "../store";
import RestaurantCard from "../components/RestaurantCard.vue";

export default {
  name: "AppHome",
  components: {
    RestaurantCard,
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
          console.log(this.restaurants);
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

<template>
  <div>ciao</div>
  <RestaurantCard />
</template>

<style></style>
