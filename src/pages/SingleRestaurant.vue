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

    redirectToAllRestaurant() {
      this.$router.push({ name: 'home' });
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
  <div class="container py-5 text-center">
    <!-- <button class="btn btn-secondary mt-3" @click="redirectToAllRestaurant">
      Back to Home
    </button> -->
    <div class="row">
      <div class="col-12 col-md-8">
        <div id="menu" class="container my-4 text-dark rounded-4">
          <div class="rst-cnt p-3 rounded d-flex justify-content-between align-items-center">
            <div>
              <div class="rst-ttl fw-bold text-white text-center">{{ restaurant.name }}</div>
            </div>


            <img class="rst-img rounded img-fluid"
              :src="store.api.mainUrl + store.api.storagePath + restaurant.cover_img" :alt="restaurant.name" />

          </div>

          <div class="card-body">
            <!-- <h1 class="card-title text-center">{{ restaurant.name }}</h1>
          <p class="text-center">{{ restaurant.address }}</p> -->
            <h3 class="mt-2 text-center">Menu</h3>

            <div class="row p-0 gap-5">
              <div v-for="food in restaurant.foods" :key="food.id" class="col-md-6 mb-4 card card-h card-h row p-0">
                <div class="col-md-4">
                  <img :src="store.api.mainUrl + store.api.storagePath + food.img" :alt="food.slug"
                    class="card-img-top w-100" />
                </div>
                <div class="col-8 p-0">
                  <div>
                    <h5 class="card-title">{{ food.name }}</h5>
                    <p class="card-text">{{ food.description }}</p>
                  </div>
                  <div class="d-flex justify-content-between mt-4 align-items-center">
                    <p class="card-text">{{ food.price }} €</p>
                    <button class="btn btn-success" @click="addItemToCart(food, restaurant)">
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div> -->
          <div class="d-flex gap-3 flex-wrap">
            <div v-for="food in restaurant.foods" :key="food.id" id="card-container">
              <div class="card mb-3" style="max-width: 500px;">
                <div class="row g-0 align-items-center fixed-height">
                  <div class="col-md-3">
                    <img :src="store.api.mainUrl + store.api.storagePath + food.img" class="width-calc rounded-start"
                      :alt="food.slug">
                  </div>
                  <div class="col-md-9">
                    <div class="card-body text-start">
                      <h5 class="card-title">{{ food.name }}</h5>
                      <p class="card-text">{{ food.description }}</p>
                      <p>{{ food.price }} €</p>
                      <button class="btn position-absolute add-button" @click="addItemToCart(food, restaurant)">
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Modal -->
          <div class="modal fade" id="empty-modal-cart">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-5 text-dark" id="exampleModalLabel">
                    Emptying cart
                  </h1>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body text-dark text-start">
                  You can order from one restaurant at a time. Do you want to
                  empty your cart and insert "{{ this.selectedFoodName }}"?
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary text-white" data-bs-dismiss="modal">
                    Close
                  </button>
                  <button type="button" class="btn btn-danger text-white" @click="emptyAndReplaceCart()"
                    data-bs-dismiss="modal">
                    Empty cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="cart col-12 col-md-4 cart my-4">
        <Cart />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.bg-team {
  background-color: #0c2d57;
}

#card-container {
  width: calc(100% / 2 - 8px);

  @media (max-width: 1200px) {
    width: 100%;
  }
}

.rst-cnt {
  background-color: #386641;
}

.rst-ttl {
  font-size: 60px;
}

.rst-img {
  width: 440px;
  height: 100px;
}

.container.text-center {
  min-height: 70vh;
}

.cart {
  position: sticky;
  top: 20px;
  align-self: start;
}

.width-calc {
  @media (max-width: 768px) {
    width: 150px;
  }
}

.fixed-height {
  height: 150px;
  overflow-y: hidden;

  img {
    object-fit: contain;
  }

  @media (max-width: 768px) {
    height: auto;
  }
}

img {
  max-width: 100%;
}

// .card {
//   background-color: #386641;
// }

.add-button {
  background-color: #EC732C;
  color: #fff;

  &:hover {
    background-color: transparent;
    border-color: #EC732C;
    color: #EC732C;
  }
}

.position-absolute {
  position: absolute;
  bottom: 0;
  right: 0;
}
</style>
