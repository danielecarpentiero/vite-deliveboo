<script>
import { RouterView } from 'vue-router';
import AppHeader from '../components/AppHeader.vue';
import AppFooter from '../components/AppFooter.vue';
import axios from 'axios';
import store from '../store';

export default {
  name: 'SingleRestaurant',
  props: ['restaurant'],
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
    addItemToCart(food) {
    // Verifica se il carrello è vuoto o contiene solo articoli dallo stesso ristorante
    if (this.store.cart.items.length === 0 || this.store.cart.items[0].restaurant_id === food.restaurant_id) {
      this.store.cart.items.push(food);
      this.updateCart();
    } else {
      // Mostra un messaggio di errore o rimuovi gli articoli esistenti prima di aggiungere il nuovo articolo
      alert('Puoi ordinare solo da un ristorante alla volta. Svuota il carrello per ordinare da un altro ristorante.');
      // Oppure svuota automaticamente il carrello
    }
  },
    // Rimuovi un elemento dal carrello
    removeItemFromCart(index) {
    this.store.cart.items.splice(index, 1);
    this.updateCart();
  },
    updateCart(){
      localStorage.setItem('items', JSON.stringify(this.store.cart.items));
    },
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
  if (!localStorage.getItem('items')) {
    localStorage.setItem('items', JSON.stringify([]));
  } else {
    this.store.cart.items = JSON.parse(localStorage.getItem('items'));
  }
},
  watch: {
    items: {
      handler(newItems) {
        localStorage.setItem('items', JSON.stringify(newItems));
      },
      deep: true,
    },
  },
};
</script>


<template>
  <div class="container card my-4 bg-dark text-white rounded-4">
    <div class="card-body">
      <!-- <h1 class="card-title text-center">{{ restaurant.name }}</h1>
      <p class="text-center">{{ restaurant.address }}</p> -->
      <h3 class="mt-2 text-center">Menu</h3>

      <ul class="list-unstyled row gap-3 justify-content-center">
        <li
          v-for="food in restaurant.foods"
          :key="food.id"
          class="col-12 col-md-3 text-center flip-card mt-3 rounded-5"
        >
          <div class="flip-card-inner shadow rounded-5">
            <div class="w-100 flip-card-front rounded-5">
              <img
                :src="store.api.mainUrl + store.api.storagePath + food.img"
                :alt="food.slug"
                class="rounded-5"
              />
            </div>

            <div
              class="flip-card-back rounded-5 d-flex flex-column justify-content-center align-items-center gap-2"
            >
              <h3 class="mb-2 text-uppercase">{{ food.name }}</h3>
              <p><span>Description:</span> {{ food.description }}</p>
              <p>Prezzo: {{ food.price }} €</p>
              <p v-if="food.is_vegetarian">Vegetariano</p>
              <p v-else>Non vegetariano</p>
              <p v-if="food.is_visible">Elemento disponibile</p>
              <p v-else>Elemento non disponibile</p>
              <button class="btn btn-primary w-50 mt-4" @click="addItemToCart(food)">Aggiungi al carrello</button>
              <div class="mt-4">
        <h4>Carrello</h4>
        <ul>
          <li v-for="(item, index) in this.store.cart.items" :key="index">
            {{ item.name }} - {{ item.price }} €
          </li>
        </ul>
      </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
.bg-team {
  background-color: #0c2d57;
}

img {
  width: 100%;
  height: 100%;
}
.flip-card {
  background-color: transparent;
  width: 400px;
  height: 400px;
  perspective: 1000px; /* Remove this if you don't want the 3D effect */
}

/* This container is needed to position the front and back side */
.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
}

/* Do an horizontal flip when you move the mouse over the flip box container */
.flip-card:hover .flip-card-inner {
  transform: rotateY(180deg);
}

/* Position the front and back side */
.flip-card-front,
.flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden; /* Safari */
  backface-visibility: hidden;
}

/* Style the front side (fallback if image is missing) */
.flip-card-front {
  background-color: #bbb;
  color: black;
}

/* Style the back side */
.flip-card-back {
  background: rgb(255, 134, 20);
  background: linear-gradient(
    118deg,
    rgba(255, 134, 20, 1) 0%,
    rgba(64, 74, 172, 1) 98%
  );
  color: white;
  transform: rotateY(180deg);
}
</style>
