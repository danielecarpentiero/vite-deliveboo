<script>
import store from '../store';

export default {
    name: 'Cart',

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
        },

        incrementItemInCart(index) {
            this.store.cart.items[index].quantity++;
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
    <ul class="list-unstyled text-white">
        <div v-if="store.cart.items.length > 0">{{
            store.cart.items[0].restaurant_name }}</div>
        <li v-if="store.cart.items.length > 0">
            <div v-for="(food, index) in store.cart.items" :key="index" class="d-flex gap-1 align-items-center p-2">
                {{ food.item }} - {{ food.price }} € (x {{ food.quantity }})
                <button @click.stop="removeItemFromCart(index)" class="btn btn-warning btn-sm"
                    style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .75rem;">
                    <font-awesome-icon :icon="['fas', 'minus']" />
                </button>
                <button @click.stop="incrementItemInCart(index)" class="btn btn-warning btn-sm"
                    style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .75rem;">
                    <font-awesome-icon :icon="['fas', 'plus']" />
                </button>
            </div>
            <div class="checkout d-flex gap-1 align-items-center p-2">
                <div class="subtotal">
                    Subtotal: {{ store.cart.subtotal }}
                </div>
                <router-link :to="{ name: 'checkout' }">
                    <button class="btn btn-success btn-sm p-2"
                        style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem;">Go to
                        checkout
                    </button>
                </router-link>
            </div>
        </li>
        <li v-else>
            <span>Your cart is empty</span>
        </li>
    </ul>
</template>

<style scoped lang="scss"></style>
