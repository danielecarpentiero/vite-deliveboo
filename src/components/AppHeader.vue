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
  <header>
    <!-- Navbar -->
    <nav class="navbar">
      <!-- Logo -->
      <div class="navbar-brand">
        <img src="/DelivebooLogo.png" alt="Logo" class="logo" />
      </div>
      <div>
        <RouterLink :to="{ name: 'checkout' }">
          <font-awesome-icon
            :icon="['fas', 'cart-shopping']"
            class="cart-icon"
          />
        </RouterLink>
      </div>
    </nav>

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

/* Navbar */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.3rem 12.5rem;
  z-index: 3;
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
