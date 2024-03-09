<script>
import store from '../store';

export default {
    name: 'Checkout',

    data() {
        return {
            store,
        }
    },
};
</script>

<template>
    <div class="container d-flex flex-column align-items-center">
        <h1 class="text-center my-4">Checkout page</h1>
        <div class="card w-75 mb-3">
            <div class="card-body">
                <h5 class="card-title">Order informations</h5>
                <p class="card-text">
                <ul>
                    <li v-for="item in store.cart.items">
                        <div class="name">
                            {{ item.item }}
                        </div>
                        <div class="price">
                            Prezzo: {{ item.price }} €
                        </div>
                        <div class="quantity">
                            Quantità: {{ item.quantity }}
                        </div>
                    </li>
                </ul>
                <div class="total">Totale: {{ store.cart.subtotal }} €</div>
                </p>
                <a href="#" class="btn btn-primary">Go to payment</a>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss"></style>