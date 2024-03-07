<script>
export default {
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
      <div class="cart-icon">Shopping Cart</div>
    </nav>

    <!-- Div vuoto per l'overlay nero sopra il video -->
    <div class="overlay"></div>

    <!-- Video nel background (solo se siamo nella home) -->
    <video v-if="isHome" playsinline autoplay muted loop>
      <source src="/HeaderVideoSD.mp4" type="video/mp4" />
    </video>

    <!-- Contenuti Header -->
    <div class="container h-100">
      <div class="d-flex h-100 text-center align-items-center">
        <div class="w-100 text-white">
          <h1 class="display-3 fw-bold">
            Tutto il cibo che vuoi, quando lo vuoi
          </h1>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped lang="scss">
header {
  position: relative;
  background-color: black;
  height: 75vh;
  min-height: 25rem;
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
