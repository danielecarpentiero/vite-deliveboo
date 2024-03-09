<script>
import store from '../store';

export default {
    name: 'Checkout',

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

    mounted() {
        if (!localStorage.getItem('items')) {
            // Se il localstorage è undefined inserisci un array vuoto
            localStorage.setItem('items', JSON.stringify([]));
        } else {
            // Se il localstorage è già popolato aggiungi altri elementi
            this.store.cart.items = JSON.parse(localStorage.getItem('items'));
        }
    },

    watch: {
        'store.cart.items': {
            handler(newItems) {
                localStorage.setItem('items', JSON.stringify(newItems));
            },
            deep: true,
        },
    },
};
</script>

<template>
    <div class="container d-flex align-items-center flex-column gap-3">
        <h1 class="text-center my-4">Checkout page</h1>
        <div class="card w-75 mb-3">
            <div class="card-body">
                <h5 class="card-title pb-5">Order informations</h5>
                <p class="card-text">
                <ul class="list-unstyled">
                    <li>
                        <div class="container text-center">
                            <div class="row g-5">
                                <div class="col-12 col-md-4" v-for="(item, index) in store.cart.items">
                                    <div class="food d-flex flex-column align-items-center">
                                        <div class="food-img d-flex align-items-center">
                                            <img :src="store.api.mainUrl + store.api.storagePath + item.img" alt=""
                                                class="img-fluid " />
                                        </div>
                                        <div class="info">
                                            <div class="name">
                                                {{ item.item }}
                                            </div>
                                            <div class="price">
                                                Prezzo: {{ item.price }} €
                                            </div>
                                            <div class="quantity">
                                                Quantità: {{ item.quantity }}
                                            </div>
                                            <div class="arr-remove d-flex gap-2 justify-content-center mt-2">
                                                <button class="btn btn-sm border"
                                                    @click.stop="removeItemFromCart(index)"><font-awesome-icon
                                                        :icon="['fas', 'minus']" /></button>
                                                <button class="btn btn-sm border"
                                                    @click.stop="incrementItemInCart(index)"><font-awesome-icon
                                                        :icon="['fas', 'plus']" /></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
                <div v-if="store.cart.items.length > 0" class="total">Totale: {{ store.cart.subtotal }} €</div>
                <div v-else>
                    <p>Cart is empty</p>
                </div>
                </p>
                <a href="#" class="btn btn-success me-3" v-if="store.cart.items.length > 0">Go to payment</a>
                <RouterLink v-if="store.cart.items.length > 0"
                    :to="{ name: 'restaurant', params: { slug: store.cart.items[0].restaurant_slug } }">
                    <button class="btn btn-secondary">Back to restaurant</button>
                </RouterLink>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.food-img {
    width: 100px;
    height: 100px;
    overflow: hidden;
    border-radius: 50%;
}
</style>