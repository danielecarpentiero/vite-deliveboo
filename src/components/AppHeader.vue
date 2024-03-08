<script>
import store from '../store';
export default {
    name: 'AppHeader',

    data() {
        return {
            store,
        }
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
            this.updateCart();
        },

        updateCart() {
            localStorage.setItem('items', JSON.stringify(this.store.cart.items.item));
        }
    },

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
                        <div class="dropdown-item" v-if="store.cart.items.length > 0">{{
                            store.cart.items[0].restaurant_name }}</div>
                        <li v-if="store.cart.items.length > 0" class="dropdown-item">
                            <div v-for="(food, index) in store.cart.items" :key="index">
                                (x {{ food.quantity }}) {{ food.item }} - {{ food.price }} €
                                <button @click.stop="removeItemFromCart(index)">Remove item</button>
                            </div>
                        </li>
                        <li v-else class="dropdown-item">
                            <span>Your cart is empty</span>
                        </li>
                    </ul>
                </div>
            </div>
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
                        All the food you want, when you want.
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
