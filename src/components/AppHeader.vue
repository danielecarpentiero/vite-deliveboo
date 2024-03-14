<script>
import store from "../store";
import { RouterLink } from "vue-router";
import { myMixin } from "../myMixin";

export default {
  name: "AppHeader",
  mixins: [myMixin],

  data() {
    return {
      store,
    };
  },
};
</script>

<template>
  <header class="d-flex align-items-center">
    <!-- Navbar -->
    <div class="container">
      <nav class="navbar">
        <!-- Logo -->
        <RouterLink :to="{ name: 'home' }">
          <img src="/DelivebooLogo.png" alt="Logo" class="logo" />
        </RouterLink>
        <div class="d-flex align-items-center margin-top">
          <RouterLink :to="{ name: 'checkout' }" class="d-flex align-items-center">
            <font-awesome-icon :icon="['fas', 'cart-shopping']" class="cart-icon" />
            <a class="px-2"> Subtotal: {{ store.cart.subtotal }} € </a>
          </RouterLink>
          <a href="http://127.0.0.1:8000/" class="btn ms-4 login">Login</a>
        </div>
      </nav>
    </div>
    <!-- Div vuoto per l'overlay nero sopra il video -->
  </header>
</template>

<style scoped lang="scss">
@import "/src/style.scss";

header {
  position: relative;
  background-color: $darkgreen;
  // height: 75vh;
  // min-height: 400px;
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

a {
  color: #f2e8cf;
  text-decoration: none;
}

.login {
  color: #212529;
  background-color: #f2e8cf;

  &:hover {
    background-color: #f2e8cf;
    color: #212529;
  }
}

/* Navbar */
.navbar {
  z-index: 3;

  @media (max-width: 768px) {
    justify-content: center;
  }
}

.margin-top {
  margin: 20px 0;
}

.logo {
  max-height: 5rem;
}

.cart-icon {
  color: $beige;
  font-size: 2rem;
}

.dropdown-item {
  &:active {
    color: #212529;
    background-color: transparent;
  }

  &:focus {
    background-color: #fff;
  }

  &:hover {
    background-color: #fff;
  }
}
</style>
