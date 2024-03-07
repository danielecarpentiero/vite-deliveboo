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
      restaurant: [],
      store,
    };
  },
  methods: {
    getRestaurants() {
      axios
        .get(
          this.store.api.mainUrl +
            this.store.api.listUrl.restaurants +
            this.$route.params.slug
        )
        .then((response) => {
          console.log(response);
          this.restaurant = response.data.result;
          console.log(response.data.result);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created() {
    this.getRestaurants();
    console.log(this.$route);
  },
};
</script>

<template>
  <div class="card">
    <div class="card-body">
      <h1 class="card-title">{{ restaurant.name }}</h1>
      <h2>{{ restaurant.address }}</h2>
      <ul class="list-unstyled">
        <li v-for="food in restaurant.foods" :key="food.id">
          <h3>{{ food.name }}</h3>
          <p>{{ food.description }}</p>
          <p>Prezzo: {{ food.price }} €</p>
          <p v-if="food.is_vegetarian">Vegetariano</p>
          <p v-else>Non vegetariano</p>
          <img
            :src="store.api.mainUrl + store.api.storagePath + food.img"
            :alt="food.slug"
          />
          <p v-if="food.is_visible">Elemento disponibile</p>
          <p v-else>Elemento non disponibile</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
img {
  width: 20%;
}
</style>
