<script>
import store from '../store';
export default {
  data(){
    return {
      store,
    }
  },
  methods: {
    removeItemFromCart(index){
      this.store.cart.items.splice(index, 1);
      this.updateCart();
    },
    updateCart(){
      localStorage.setItem('items', JSON.stringify(this.store.cart.items));
    }
  },
  name: 'AppHeader',
  computed: {
    isHome() {
      // Controlla se la route corrente è la pagina home
      return this.$route.name === 'home';
    },
  },
};
</script>

<template>
  <header>
    <!-- Navbar -->
    <nav class="navbar">
      <!-- Logo -->
      <div class="navbar-brand">
        <img src="/DelivebooLogo.png" alt="Logo" class="logo" />
      </div>

      <!-- Icona del carrello -->
      <div class="mt-4">
        <div class="dropdown dropstart">
          <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
            <font-awesome-icon :icon="['fas', 'cart-shopping']" />
          </button>
          <ul class="dropdown-menu">
            <li v-if="store.cart.items.length > 0" v-for="(item, index) in store.cart.items" :key="index" class="dropdown-item">
            {{ item.name }} - {{ item.price }} €
            <button @click.stop="removeItemFromCart(index)">Remove item</button>
            </li>
            <li v-else class="dropdown-item">Your cart is empty</li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- Div vuoto per l'overlay nero sopra il video -->

   
  </header>
</template>

<style scoped lang="scss">
header {
  position: relative;
  background-color: black;
  height: 7vh;
  min-height: 7rem;
  width: 100%;
  overflow: hidden;
}

header video {
  position: absolute;
  top: 50%;
  left: 50%;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  z-index: 0;
  transform: translateX(-50%) translateY(-50%);
}

header .container {
  position: relative;
  z-index: 2;
}

header .overlay {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: black;
  opacity: 0.5;
  z-index: 1;
}

/* Navbar */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 200px;
  z-index: 3;
}

.logo {
  max-height: 50px;
}

.cart-icon {
  color: white;
  font-size: 24px;
}
</style>
