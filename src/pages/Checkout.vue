<script>
import store from '../store';
import { myMixin } from '../myMixin';
import axios from 'axios';
import config from '../config.json';
import {router} from '../router'

export default {
    name: 'Checkout',
    mixins: [myMixin],
    data() {
        return {
            router,
            store,
            guestName: '',
            guestSurname: '',
            guestAddress: '',
            guestPhone: '',
            guestEmail: '',
            errorName: '',
            errorSurname: '',
            errorAddress: '',
            errorPhone: '',
            errorEmail: '',
            braintreeAuthToken: config.braintreeAuthToken,
            hasError: false,
        }
    },

    computed: {
        allFoodIds() {
            return this.getAllFoodIds();
        },
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

        redirectToSingleRestaurant(){
            this.$router.push({ name: 'restaurant', params: { slug: store.cart.items[0].restaurant_slug } });
            window.scrollTo({
            top: 0,
            behavior: 'smooth' // Optional: Add smooth scrolling behavior
      });
        },

        redirectToAllRestaurant() {
            this.$router.push({ name: 'home' });
            window.scrollTo({
            top: 0,
            behavior: 'smooth' // Optional: Add smooth scrolling behavior
            });
        },

        isValidEmail(email) {
            // Espressione regolare per la validazione dell'email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        },

        isValidPhone(phone) {
            // Espressione regolare per la validazione del numero di telefono
            const phoneRegex = /^\d{7,15}$/; // Minimo 7 e massimo 15 cifre
            return phoneRegex.test(phone);
        },

        validateInput() {
            this.hasError = false;
            if (this.guestName === '') {
                this.errorName = 'Insert a valid name';
                this.hasError = true;
            } else {
                this.errorName = '';
            }

            if (this.guestSurname === '') {
                this.errorSurname = 'Insert a valid surname';
                this.hasError = true;
            } else {
                this.errorSurname = '';
            }

            if (this.guestAddress === '') {
                this.errorAddress = 'Insert a valid address';
                this.hasError = true;
            } else {
                this.errorAddress = '';
            }

            if (this.guestPhone === '' || !(this.isValidPhone(this.guestPhone))) {
                this.errorPhone = 'Insert a valid telephone';
                this.hasError = true;
            } else {
                this.errorPhone = '';
            }

            if (this.guestEmail === '' || !(this.isValidEmail(this.guestEmail))) {
                this.errorEmail = 'Insert a valid e-mail';
                this.hasError = true;
            } else {
                this.errorEmail = '';
            }
            // Check ritorna 5 se tutti i controlli sono superati
        },
    },

    mounted() {
        const self = this;

        // Carrello
        if (!localStorage.getItem('items')) {
            localStorage.setItem('items', JSON.stringify([]));
        } else {
            this.store.cart.items = JSON.parse(localStorage.getItem('items'));
        };

        // Cibo
        if (!localStorage.getItem('foodIds')) {
            // Se il localstorage è undefined inserisci un array vuoto
            localStorage.setItem('foodIds', JSON.stringify([]));
        } else {
            // Se il localstorage è già popolato aggiungi altri elementi
            localStorage.setItem('foodIds', JSON.stringify(this.allFoodIds));
        }

        const button = document.querySelector('#submit-button');

        braintree.dropin.create({
            authorization: self.braintreeAuthToken,
            container: '#dropin-container',
        }, function (createErr, instance) {
            button.addEventListener('click', function () {
                self.validateInput();
                if (!self.hasError) {
                    instance.requestPaymentMethod(function (requestPaymentMethodErr, payload) {
                        if (requestPaymentMethodErr) {
                            console.error('Error requesting payment method:', requestPaymentMethodErr);
                            return;
                        }
                        // Invia il payload.nonce al server tramite Axios
                        axios.post(store.api.mainUrl + store.api.listUrl.orders, {
                            nonce: payload.nonce,
                            amount: store.cart.subtotal,
                            first_name: self.guestName,
                            last_name: self.guestSurname,
                            email: self.guestEmail,
                            phone: self.guestPhone,
                            address: self.guestAddress,
                            restaurant_id: store.cart.items[0].restaurant_id,
                            foods_id: JSON.parse(localStorage.getItem('foodIds')),
                        }).then(function (response) {
                            console.log('Payment success:', response.data);
                            self.store.cart.items = [];
                            localStorage.removeItem('items');
                            localStorage.removeItem('foods');
                            self.$router.push({ name: 'successful' });
                            // Possiamo fare altre azioni qui in base alla risposta del server
                        }).catch(function (error) {
                            console.error('Payment error:', error);
                            // Gestiamo eventuali errori qui
                        });
                    });
                };
            });
        });
    },

    watch: {
        // Carrello
        'store.cart.items': {
            handler(newItems) {
                localStorage.setItem('items', JSON.stringify(newItems));
            },
            deep: true,
        },

        // Cibo
        'allFoodIds': {
            handler() {
                localStorage.setItem('foodIds', JSON.stringify(this.allFoodIds));
            },
            deep: true,
        },

        // Watch per il cambio di valore nei campi degli input
        guestName: 'validateInput',
        guestSurname: 'validateInput',
        guestAddress: 'validateInput',
        guestPhone: 'validateInput',
        guestEmail: 'validateInput',
    },
};
</script>

<template>
    <div class="container cart d-flex align-items-center flex-column gap-3">
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
                <div v-if="store.cart.items.length > 0" class="total">Totale: {{ store.cart.subtotal }} €
                </div>
                <div v-else>
                    <p>Cart is empty</p>
                </div>
                <div v-if="store.cart.items.length > 0" class="paymeny-form mt-5">
                    <div class="mb-3">
                        <label for="guestName" class="form-label">Name</label>
                        <input type="text" class="form-control" id="guestName" placeholder="Name" v-model="guestName"
                            maxlength="20">
                        <strong style="font-size: 0.875em; color: red;" role="alert">{{ errorName }}</strong>
                    </div>
                    <div class="mb-3">
                        <label for="guestSurname" class="form-label">Surname</label>
                        <input type="text" class="form-control" id="guestSurname" placeholder="Surname"
                            v-model="guestSurname" maxlength="20">
                        <strong style="font-size: 0.875em; color: red;" role="alert">{{ errorSurname }}</strong>
                    </div>
                    <div class="mb-3">
                        <label for="guestAddress" class="form-label">Address</label>
                        <input type="text" class="form-control" id="guestAddress" placeholder="Address"
                            v-model="guestAddress" maxlength="50">
                        <strong style="font-size: 0.875em; color: red;" role="alert">{{ errorAddress }}</strong>
                    </div>
                    <div class="mb-3">
                        <label for="guestPhone" class="form-label">Phone</label>
                        <input type="text" class="form-control" id="guestPhone" placeholder="Phone"
                            v-model="guestPhone">
                        <strong style="font-size: 0.875em; color: red;" role="alert">{{ errorPhone }}</strong>
                    </div>
                    <div class="mb-3">
                        <label for="guestEmail" class="form-label">Email address</label>
                        <input type="email" class="form-control" id="guestEmail" placeholder="name@example.com"
                            v-model="guestEmail">
                        <strong style="font-size: 0.875em; color: red;" role="alert">{{ errorEmail }}</strong>
                    </div>
                </div>
                </p>
                <div v-if="hasError" class="alert alert-warning" role="alert">
                    Compila tutti i campi per procedere al pagamento
                </div>
                <div id="dropin-container" v-if="store.cart.items.length > 0"></div>
                <button id="submit-button" class="btn btn-success me-3" v-show="store.cart.items.length > 0"
                    :disabled="hasError">Pay</button>
                <button v-if="store.cart.items.length > 0" class="btn btn-secondary me-3" @click ="redirectToSingleRestaurant">Back to restaurant</button>
               <button class="btn btn-secondary" @click="redirectToAllRestaurant">Back to Home</button>
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

.cart{
    min-height: 70vh;
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