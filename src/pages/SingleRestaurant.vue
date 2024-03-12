<script>
import { RouterView } from 'vue-router';
import { RouterLink } from 'vue-router';
import AppHeader from '../components/AppHeader.vue';
import AppFooter from '../components/AppFooter.vue';
import axios from 'axios';
import store from '../store';
import { myMixin } from '../myMixin';
import { Modal } from 'bootstrap';
import Cart from '../components/Cart.vue';

export default {
  name: 'SingleRestaurant',
  mixins: [myMixin],
  components: {
    AppHeader,
    RouterView,
    AppFooter,
    Cart,
  },

  data() {
    return {
      restaurant: [],
      store,
      count: 1,
      selectedFood: null,
      selectedFoodName: null,
      currentRestaurant: null,
    };
  },

  methods: {
    addItemToCart(food, restaurant) {
      // Verifica se il carrello è vuoto o contiene solo articoli dallo stesso ristorante
      if (
        this.store.cart.items.length === 0 ||
        this.store.cart.items[0].restaurant_id === food.restaurant_id
      ) {
        let index = this.store.cart.items.findIndex(
          (item) => item.food_id === food.id
        );
        if (index !== -1) {
          // Se l'elemento esiste già, incrementa la quantità
          this.store.cart.items[index].quantity++;
        } else {
          // Se l'elemento non esiste, aggiungilo al carrello
          this.store.cart.items.push({
            item: food.name,
            food_id: food.id,
            quantity: 1,
            restaurant_id: food.restaurant_id,
            restaurant_name: restaurant.name,
            price: food.price,
            img: food.img,
            restaurant_slug: restaurant.slug,
          });
        }
      } else {
        this.errorCart(food, restaurant);
      }
      this.updateCart();
    },

    updateCart() {
      localStorage.setItem('items', JSON.stringify(this.store.cart.items));
      // localStorage.setItem('foods', JSON.stringify(this.store.foods));
    },

    getRestaurants() {
      axios
        .get(
          this.store.api.mainUrl +
            this.store.api.listUrl.restaurants +
            this.$route.params.slug
        )
        .then((response) => {
          this.restaurant = response.data.result;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    errorCart(food, restaurant) {
      // Seleziona l'elemento HTML della modale
      let modalElement = document.getElementById('empty-modal-cart');
      // Inizializza la modale utilizzando il costruttore Modal di Bootstrap
      let modal = new Modal(modalElement);
      // Mostra la modale
      modal.show();
      this.selectedFood = food;
      this.selectedFoodName = food.name;
      this.currentRestaurant = restaurant;
    },

    emptyAndReplaceCart() {
      this.store.cart.items = [];
      this.store.foods = [];
      if (this.selectedFood) {
        this.addItemToCart(this.selectedFood, this.currentRestaurant);
      }
    },
  },

  computed: {
    allFoodIds() {
      return this.getAllFoodIds();
    },
  },

  mounted() {
    this.getRestaurants();
    // Carrello
    if (!localStorage.getItem('items')) {
      // Se il localstorage è undefined inserisci un array vuoto
      localStorage.setItem('items', JSON.stringify([]));
    } else {
      // Se il localstorage è già popolato aggiungi altri elementi
      this.store.cart.items = JSON.parse(localStorage.getItem('items'));
    }

    // Cibo
    if (!localStorage.getItem('foodIds')) {
      // Se il localstorage è undefined inserisci un array vuoto
      localStorage.setItem('foodIds', JSON.stringify([]));
    } else {
      // Se il localstorage è già popolato aggiungi altri elementi
      localStorage.setItem('foodIds', JSON.stringify(this.allFoodIds));
    }
  },

  computed: {
    allFoodIds() {
      return this.getAllFoodIds();
    },
  },

  watch: {
    // Carrello
    'store.cart.items': {
      handler(newItems) {
        localStorage.setItem('items', JSON.stringify(newItems));
      },
      deep: true,
    },

    // Cibo
    allFoodIds: {
      handler() {
        localStorage.setItem('foodIds', JSON.stringify(this.allFoodIds));
      },
      deep: true,
    },
  },
};
</script>

<template>
  <div class="container text-center">
    <div class="row">
      <div class="col-12 col-md-8">
        <div id="menu" class="container card my-4 bg-dark text-white rounded-4">
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
                      :src="
                        store.api.mainUrl + store.api.storagePath + food.img
                      "
                      :alt="food.slug"
                      class="rounded-5"
                    />
                  </div>
                  <!-- Flip card -->
                  <div
                    class="flip-card-back rounded-5 d-flex flex-column justify-content-center align-items-center gap-2"
                  >
                    <div class="info">
                      <h3 class="mt-5 mb-2 text-uppercase">{{ food.name }}</h3>
                      <p>Description: {{ food.description }}</p>
                      <p>Prezzo: {{ food.price }} €</p>
                      <p v-if="food.is_vegetarian">Vegetariano</p>
                      <p v-else>Non vegetariano</p>
                      <p v-if="food.is_visible">Elemento disponibile</p>
                      <p v-else>Elemento non disponibile</p>
                      <button
                        class="btn btn-success w-30 mt-4"
                        @click="addItemToCart(food, restaurant)"
                      >
                        <font-awesome-icon :icon="['fas', 'plus']" />
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
            <!-- Modal -->
            <div class="modal fade" id="empty-modal-cart">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h1
                      class="modal-title fs-5 text-dark"
                      id="exampleModalLabel"
                    >
                      Emptying cart
                    </h1>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div class="modal-body text-dark text-start">
                    You can order from one restaurant at a time. Do you want to
                    empty your cart and insert "{{ this.selectedFoodName }}"?
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-secondary text-white"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      class="btn btn-danger text-white"
                      @click="emptyAndReplaceCart()"
                      data-bs-dismiss="modal"
                    >
                      Empty cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-4 cart my-4">
        <Cart />
      </div>
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
  width: 250px;
  height: 250px;
  perspective: 1000px;
  /* Remove this if you don't want the 3D effect */
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
  -webkit-backface-visibility: hidden;
  /* Safari */
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

  .info {
    font-size: 15px;
  }
}
</style>
