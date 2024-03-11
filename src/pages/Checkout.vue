<script>
import store from '../store';
import { myMixin } from '../myMixin';
import axios from 'axios';

export default {
    name: 'Checkout',
    mixins: [myMixin],

    data() {
        return {
            store,
            guestName: "",
            guestSurname: "",
            guestAddress: "",
            guestPhone: "",
            guestEmail: "",
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
            localStorage.setItem('items', JSON.stringify([]));
        } else {
            this.store.cart.items = JSON.parse(localStorage.getItem('items'));
        };

        // Braintree payments
        const button = document.querySelector('#submit-button');

        braintree.dropin.create({
            authorization: 'sandbox_4x7jkkm3_n2sddky376q9g4bt',
            container: '#dropin-container',
        }, function (createErr, instance) {
            button.addEventListener('click', function () {
                instance.requestPaymentMethod(function (requestPaymentMethodErr, payload) {
                    if (requestPaymentMethodErr) {
                        console.error('Error requesting payment method:', requestPaymentMethodErr);
                        return;
                    }
                    // Invia il payload.nonce al server tramite Axios
                    axios.post(store.api.mainUrl + store.api.listUrl.orders, {
                        nonce: payload.nonce,
                        amount: store.cart.subtotal,
                        first_name: 'daniele',
                        last_name: 'carpentiero',
                        email: 'daniele@io.it',
                        phone: '3317526531',
                        address: 'via prova 44',
                        restaurant_id: '1',
                        foods_id: [1, 2, 3],
                    }).then(function (response) {
                        console.log('Payment success:', response.data);
                        // Possiamo fare altre azioni qui in base alla risposta del server
                    }).catch(function (error) {
                        console.error('Payment error:', error);
                        // Gestiamo eventuali errori qui
                    });
                });
            });
        });
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
                <div v-if="store.cart.items.length > 0" class="paymeny-form mt-5">
                    <div class="mb-3">
                        <label for="guestName" class="form-label">Name</label>
                        <input type="text" class="form-control" id="guestName" placeholder="Name" v-model="guestName">
                    </div>
                    <div class="mb-3">
                        <label for="surname" class="form-label">Surname</label>
                        <input type="text" class="form-control" id="surname" placeholder="Surname"
                            v-model="guestSurname">
                    </div>
                    <div class="mb-3">
                        <label for="address" class="form-label">Address</label>
                        <input type="text" class="form-control" id="address" placeholder="Address"
                            v-model="guestAddress">
                    </div>
                    <div class="mb-3">
                        <label for="phone" class="form-label">Phone</label>
                        <input type="text" class="form-control" id="phone" placeholder="Phone" v-model="guestPhone">
                    </div>
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Email address</label>
                        <input type="email" class="form-control" id="exampleFormControlInput1"
                            placeholder="name@example.com" v-model="guestEmail">
                    </div>
                </div>
                </p>
                <div id="dropin-container" v-if="store.cart.items.length > 0"></div>
                <button id="submit-button" class="btn btn-success me-3"
                    v-show="store.cart.items.length > 0">Pay</button>
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

.button {
    cursor: pointer;
    font-weight: 500;
    left: 3px;
    line-height: inherit;
    position: relative;
    text-decoration: none;
    text-align: center;
    border-style: solid;
    border-width: 1px;
    border-radius: 3px;
    display: inline-block;
}

.button--small {
    padding: 10px 20px;
    font-size: 0.875rem;
}

.button--green {
    outline: none;
    background-color: #64d18a;
    border-color: #64d18a;
    color: white;
    transition: all 200ms ease;
}

.button--green:hover {
    background-color: #8bdda8;
    color: white;
}
</style>