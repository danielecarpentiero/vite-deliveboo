<script>
import { RouterView } from "vue-router";
import { RouterLink } from "vue-router";
import AppHeader from "../components/AppHeader.vue";
import AppFooter from "../components/AppFooter.vue";
import axios from "axios";
import store from "../store";
import { myMixin } from "../myMixin";
import { Modal } from "bootstrap";
import Cart from "../components/Cart.vue";

export default {
  name: "SingleRestaurant",
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
      localStorage.setItem("items", JSON.stringify(this.store.cart.items));
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
      let modalElement = document.getElementById("empty-modal-cart");
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
      this.$router.push({ name: "home" });
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
    if (!localStorage.getItem("items")) {
      // Se il localstorage è undefined inserisci un array vuoto
      localStorage.setItem("items", JSON.stringify([]));
    } else {
      // Se il localstorage è già popolato aggiungi altri elementi
      this.store.cart.items = JSON.parse(localStorage.getItem("items"));
    }

    // Cibo
    if (!localStorage.getItem("foodIds")) {
      // Se il localstorage è undefined inserisci un array vuoto
      localStorage.setItem("foodIds", JSON.stringify([]));
    } else {
      // Se il localstorage è già popolato aggiungi altri elementi
      localStorage.setItem("foodIds", JSON.stringify(this.allFoodIds));
    }
  },

  computed: {
    allFoodIds() {
      return this.getAllFoodIds();
    },
  },

  watch: {
    // Carrello
    "store.cart.items": {
      handler(newItems) {
        localStorage.setItem("items", JSON.stringify(newItems));
      },
      deep: true,
    },

    // Cibo
    allFoodIds: {
      handler() {
        localStorage.setItem("foodIds", JSON.stringify(this.allFoodIds));
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
    <div class="row justify-content-center">
      <div class="col-12 col-md-8">
        <div id="menu" class="container my-3 text-dark rounded-4">
          <div class="rst-cnt rounded d-flex justify-content-between align-items-center">
            <div class="rst-ttl fw-bold ps-4 text-white">
              {{ restaurant.name }}
            </div>

            <img class="rst-img rounded img-fluid" :src="store.api.mainUrl + store.api.storagePath + restaurant.cover_img
                " :alt="restaurant.name" />
            <div class="overlay"></div>
          </div>

          <div class="card-body">
            <!-- <h1 class="card-title text-center">{{ restaurant.name }}</h1>
          <p class="text-center">{{ restaurant.address }}</p> -->
            <h3 class="mt-2 text-center">Menu</h3>
          </div>

          <!-- Card Cibi -->
          <div class="d-flex gap-3 flex-wrap justify-content-center">
            <div v-for="food in restaurant.foods" :key="food.id" class="my-card mb-3 rounded"
              style="width: 250px; height: 350px">
              <div class="card-bg" :style="{
                backgroundImage:
                  'url(' +
                  store.api.mainUrl +
                  store.api.storagePath +
                  food.img +
                  ')',
              }">
                <div class="overlay"></div>
                <!-- Overlay trasparente -->
                <div class="card-overlay">
                  <!-- Elemento per la descrizione del cibo -->
                  <div class="card-info">
                    <h5 class="card-title text-white">{{ food.name }}</h5>
                    <p class="card-text text-white font-weight-bold">
                      {{ food.price }} €
                    </p>
                  </div>

                  <div class="card-description">
                    <p class="card-text text-white">{{ food.description }}</p>
                  </div>
                  <div class="card-body">
                    <!-- Rimuovi i pulsanti dal corpo della card -->
                  </div>
                  <div class="card-footer" v-if="food.is_visible === 1">
                    <button class="my-btn" @click="addItemToCart(food, restaurant)">
                      <i class="fas fa-cart-plus"></i> Add item to cart
                    </button>
                  </div>
                  <div v-else class="card-footer">
                    <button type="button" class="my-btn" id="not">
                      <i class="fas fa-cart-plus"></i> Item not available
                    </button>
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
      <div class="cart col-12 col-md-4 my-4">
        <Cart />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "/src/style.scss";

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
  background-color: rgba(0, 0, 0, 0.5);
  background-image: url("../../public/color-doodle-food-burger-pattern_1409-3918-transformed.jpeg");
  background-repeat: no-repeat;
  background-size: cover;

  @media (max-width: 1400px) {
    flex-direction: column;
  }

  position: relative;
}

.rst-cnt {
  position: relative;
  /* Assicura che l'overlay sia posizionato correttamente */
}

.overlay {
  position: absolute;
  /* Posizionamento assoluto rispetto al contenitore rst-cnt */
  top: 0;
  /* Allineamento in alto */
  left: 0;
  /* Allineamento a sinistra */
  width: 100%;
  /* Occupa l'intera larghezza del contenitore */
  height: 100%;
  /* Occupa l'intera altezza del contenitore */
  background-color: rgba(0, 0, 0, 0.5);
  /* Colore di sfondo con trasparenza */
  pointer-events: none;
  /* Assicura che l'overlay non interagisca con il contenuto sottostante */
  border-radius: 15px;
  /* Opzionale: arrotonda gli angoli dell'overlay */
}

.rst-ttl {
  font-size: 60px;
  position: relative;
  z-index: 2;
}

.rst-img {
  width: 440px;
  height: 100%;
  object-fit: contain;
  position: relative;
  z-index: 2;
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
  background-color: #ec732c;
  color: #fff;

  &:hover {
    background-color: transparent;
    border-color: #ec732c;
    color: #ec732c;
  }
}

.position-absolute {
  position: absolute;
  bottom: 0;
  right: 0;
}

.my-card {
  width: 250px;
  height: 350px;
  border-radius: 15px;
  transition: all 0.2s;
  position: relative;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: scale(1.05);
  }
}

.card-bg {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  position: relative;
  border-radius: 15px;
}

.card-info {
  background-color: rgba(255, 153, 0, 0.428);
  backdrop-filter: blur(12px);
  border-radius: 15px 15px 0 0;
  -webkit-backdrop-filter: blur(12px);
  padding: 20px 0px;
}

.my-card {
  &:hover {
    .overlay {
      visibility: visible;
    }
  }

  .overlay {
    visibility: hidden;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(45, 45, 45, 0.12);
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(2.6px);
    -webkit-backdrop-filter: blur(6.6px);
  }
}

.card-description {
  position: absolute;
  bottom: 130px;
  left: 0;
  width: 100%;
  padding: 1rem;
  border-radius: 15px;
  transition: opacity 0.3s ease;
  opacity: 0;
}

.card-body,
.card-footer {
  padding: 1rem;
}

.card-title,
.card-text {
  margin-bottom: 0;
  color: white;
  /* Assicura che il titolo e il prezzo siano sempre bianchi */
}

.card-overlay {
  position: absolute;
  /* Posizione assoluta all'interno della card-bg */
  top: 0;
  /* Allinea il card-overlay sopra la card-bg */
  left: 0;
  /* Allinea il card-overlay a sinistra della card-bg */
  width: 100%;
  /* Larghezza del card-overlay */
  height: 100%;
  /* Altezza del card-overlay */
  display: flex;
  /* Display flessibile per i pulsanti */
  flex-direction: column;
  /* Direzione della flessione verticale */
  justify-content: space-between;
  /* Allinea i pulsanti in alto e in basso */
}

/* Aggiungi regole specifiche al passaggio del mouse */
.my-card:hover .card-description {
  opacity: 1;
}

.my-btn {
  border-radius: 40px;
  margin: 0;
  padding: 5px 20px;
  border-style: none;
  color: $orange;
  background-color: white;

  &:hover {
    background-color: $orange;
    color: white;
  }
}

#not {
  opacity: 0.7;
}
</style>
