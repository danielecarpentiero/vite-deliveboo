<script>
import store from "../store";

export default {
  name: "AppHeader",

  data() {
    return {
      store,
    };
  },

  computed: {
    isHome() {
      // Controlla se la route corrente è la pagina home
      return this.$route.name === "home";
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
    </nav>

    <!-- Div vuoto per l'overlay nero sopra il video -->
  </header>
</template>

<style scoped lang="scss">
header {
  position: relative;
  background-color: black;
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
  padding: 0.625rem 12.5rem;
  z-index: 3;
}

.logo {
  max-height: 3.125rem;
}

.cart-icon {
  color: white;
  font-size: 1.5rem;
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
