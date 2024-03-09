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

        incrementItemInCart(index) {
            this.store.cart.items[index].quantity++;
        },

        updateCart() {
            // Recupera gli elementi dal localStorage. Se non ci sono elementi, restituisce un array vuoto.
            const storedItems = JSON.parse(localStorage.getItem('items')) || [];
            // Combina gli elementi presenti nel localStorage con quelli attuali nel carrello utilizzando l'operatore spread per creare un nuovo array.
            const updatedItems = [...storedItems, ...this.store.cart.items];
            // Trasforma in stinga JSON l'array combinato e lo salva nel localStorage con la chiave 'items'.
            localStorage.setItem('items', JSON.stringify(updatedItems));
        },
    },

    computed: {
        isHome() {
            // Controlla se la route corrente è la pagina home
            return this.$route.name === 'home';
        },
    },

    watch: {
        'store.cart.items': {
            handler() {
                let subtotal = 0; // Inizializza il subtotal come variabile locale
                this.store.cart.items.forEach(element => {
                    const price = parseFloat(element.price);
                    if (!isNaN(price)) {
                        subtotal += price * element.quantity; // Aggiungi il prezzo senza arrotondare
                    }
                });
                this.store.cart.subtotal = subtotal.toFixed(2); // Assegna il subtotal arrotondato a due decimali
            },
            deep: true // Assicurati di osservare le modifiche in profondità
        }
    }
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
    min-height: 400px;
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
    padding: .625rem 12.5rem;
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
