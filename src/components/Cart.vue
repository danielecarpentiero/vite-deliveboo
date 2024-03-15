<script>
import store from '../store';
import { myMixin } from '../myMixin';
import { RouterLink } from 'vue-router';

export default {
  name: 'Cart',
  mixins: [myMixin],

  data() {
    return {
      store,
    };
  },

  methods: {
    removeItemFromCart(index) {
      if (this.store.cart.items[index].quantity > 1) {
        // Diminuisci la quantità qualora il cibo abbia più di una quantity
        this.store.cart.items[index].quantity--;
      } else {
        // Altrimenti se il cibo è stato selezionato una volta eliminalo
        this.store.cart.items.splice(index, 1);
      }
    },

    incrementItemInCart(index) {
      this.store.cart.items[index].quantity++;
    },

    // Rimuove tutti gli articoli dal carrello
    removeAllItems() {
      this.store.cart.items = [];
    },
  },
};
</script>

<template>
  <div class="cart-container p-3">
    <div
      class="cart-header d-flex justify-content-between align-items-center p-2"
    >
      <h5 class="m-0">Shopping Cart</h5>
      <span class="text-danger btn" @click="removeAllItems">Remove All</span>
    </div>

    <ul class="list-unstyled text-dark">
      <!-- Cambiato il colore del testo da white a dark -->
      <div v-if="store.cart.items.length > 0">
        {{ store.cart.items[0].restaurant_name }}
      </div>
      <li v-if="store.cart.items.length > 0">
        <div
          v-for="(food, index) in store.cart.items"
          :key="index"
          class="d-flex justify-content-between align-items-center p-2"
        >
          <div>
            <span>{{ food.item }}</span> -
            <span>{{ food.price }} €</span>
          </div>
          <div class="d-flex align-items-center">
            <button
              @click.stop="removeItemFromCart(index)"
              class="btn quantity-btn btn-sm rounded-circle me-2"
            >
              <font-awesome-icon :icon="['fas', 'minus']" />
            </button>
            <span>{{ food.quantity }}</span>
            <button
              @click.stop="incrementItemInCart(index)"
              class="btn quantity-btn btn-sm rounded-circle ms-2"
            >
              <font-awesome-icon :icon="['fas', 'plus']" />
            </button>
          </div>
        </div>
        <div class="d-flex justify-content-center p-2">
          <hr />
        </div>

        <div
          class="checkout d-flex justify-content-between align-items-center p-2"
        >
          <div class="subtotal">Subtotal: €{{ store.cart.subtotal }}</div>
          <router-link :to="{ name: 'checkout' }">
            <button class="my-btn">Go to checkout</button>
          </router-link>
        </div>
      </li>
      <li v-else>
        <span>Your cart is empty</span>
      </li>
    </ul>
  </div>
</template>
<style scoped lang="scss">
@import '/src/style.scss';
.cart-container {
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  color: black;
}

.quantity-btn {
  color: $darkgreen;
  background-color: white;
  border: 1px solid $darkgreen;

  &:hover {
    background-color: $darkgreen;
    color: white;
  }
}

.my-btn {
  border-radius: 40px;
  margin: 0;
  padding: 5px 20px;
  border-style: none;
  color: $orange;
  background-color: white;
  border: 1px solid $orange;

  &:hover {
    background-color: $orange;
    color: white;
  }
}
hr {
  width: 80%;
  color: $darkgreen;
}
</style>
