<script>
import axios from "axios";
import store from "../store";
import RestaurantCard from "../components/RestaurantCard.vue";
import { RouterLink } from "vue-router";

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
  },
};
</script>

<template>
  <div class="container">
    <h1 class="text-center">Restaurants</h1>
    <ul class="row list-unstyled">
      <li
        class="col col-md-4 g2"
        v-for="(restaurant, index) in restaurants"
        :key="index"
      >
        <RouterLink
          :to="{ name: 'restaurant', params: { slug: restaurant.slug } }"
        >
          {{ restaurant.name }}
        </RouterLink>
      </li>
    </ul>
  </div>
</template>

<style></style>
