<script>
import axios from 'axios';
import store from '../store';
import { RouterLink } from 'vue-router';
import $ from 'jquery';
import 'slick-carousel/slick/slick.css'; // Importa gli stili di Slick Slider
import 'slick-carousel/slick/slick-theme.css'; // Importa il tema di Slick Slider (se necessario)
import 'slick-carousel'; // Importa Slick Slider dopo jQuery

export default {
  name: 'AppHome',

  data() {
    return {
      restaurants: [],
      store,
      types: [],
      selectedTypes: [],
    };
  },

  methods: {
    //Ottiene i ristoranti dall'api
    getRestaurants() {
      let params = {};

      if (this.selectedTypes.length > 0) {
        params.types = this.selectedTypes.join(',');
      }

      axios
        .get(this.store.api.mainUrl + this.store.api.listUrl.restaurants, {
          params: params,
        })
        .then((response) => {
          this.restaurants = response.data.results.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    //Ottiene i tipi
    getTypes() {
      axios
        .get(this.store.api.mainUrl + this.store.api.listUrl.types)
        .then((response) => {
          this.types = response.data.results;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    updateFilter() {
      // Aggiorna l'URL con i tipi selezionati
      const selectedTypesString = this.selectedTypes.join(',');
      this.$router.push({ query: { types: selectedTypesString || undefined } });

      // Aggiorna la lista dei ristoranti
      this.getRestaurants();
    },
  },

  watch: {
    selectedTypes: 'updateFilter',
  },

  computed: {
    isMobile() {
      return window.innerWidth <= 900; // o qualsiasi altro breakpoint che preferisci
    },
  },
  mounted() {
    this.selectedTypes = this.$route.query.types
      ? this.$route.query.types.split(',')
      : [];
    this.getRestaurants();
    this.getTypes();
    this.$nextTick(() => {
      $('.customer-logos').slick({
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: true,
        dots: false,
        pauseOnHover: false,
        responsive: [
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 4,
            },
          },
          {
            breakpoint: 520,
            settings: {
              slidesToShow: 3,
            },
          },
        ],
      });
    });
  },
};
</script>

<template>
  <div class="jumbo">
    <!-- Div Vuoto per -->
    <div class="overlay"></div>

    <!-- Video -->
    <video playsinline autoplay muted loop class="img-fluid">
      <source src="/HeaderVideoSD.mp4" type="video/mp4" />
    </video>

    <!-- Contenuti Header -->
    <div class="container h-100 jumbotext">
      <div class="d-flex h-100 align-items-center justify-content-center">
        <div class="w-100 text-center text-white">
          <h1 class="display-3 fw-bold">We deliver good mood.</h1>
        </div>
      </div>
    </div>
  </div>
  <div class="row mt-5 p-5">
    <div class="col-12 text-center col-md-6 d-flex align-items-center">
      <div>
        <h1 class="fw-bold">Welcome to your top quality delivery.</h1>

        <div class="container p-3 mt-3">
          <h3>
            We source only the freshest, highest quality ingredients and prepare
            them with care. Our chefs are passionate about creating delicious,
            memorable meals that exceed your expectations.
          </h3>
        </div>
      </div>
    </div>

    <div class="col-12 col-md-6 pr">
      <div class="container-img text-center">
        <img class="img-fluid" style="width: 500px" src="/burger.png" alt="" />
      </div>
    </div>
  </div>

  <div class="divider-top mt-5">
    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1100 120" preserveAspectRatio="none">
      <path
        d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
        class="shape-fill"></path>
    </svg>
  </div>
  <div class="partner-container">
    <div class="container">
      <h2 class="text-white text-center display-4 mb-4">Our Partners</h2>
      <section class="customer-logos slider mb-5">
        <div class="slide">
          <img decoding="async"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR52VCje4Bz5uQoQ_z7UYXkg8mTqExFiponPAz7k5nY_t7ITGh8mbVmwZEIvBBQ_JyWfsU&usqp=CAU" />
        </div>
        <div class="slide">
          <img decoding="async"
            src="https://i0.wp.com/www.linkiesta.it/wp-content/uploads/2021/01/nuovo-logo-burger-king-fonte-pagina-fb-burger-king.jpg?fit=960%2C960&ssl=1" />
        </div>
        <div class="slide">
          <img decoding="async"
            src="https://img.freepik.com/premium-vector/kebab-logo-template-fast-food-vector-illustration-vector-illustration_194708-2419.jpg" />
        </div>
        <div class="slide">
          <img decoding="async"
            src="https://wl3-cdn.landsec.com/sites/default/files/images/shops/logos/five_guys.jpg" />
        </div>
        <div class="slide">
          <img decoding="async" src="https://www.galleriaborromea.it/wp-content/uploads/2022/09/billy_tacos_logo.png" />
        </div>
        <div class="slide">
          <img decoding="async" src="https://rhocenter.com/wp-content/uploads/2019/01/la-piadineria.png" />
        </div>
        <div class="slide">
          <img decoding="async"
            src="data:image/png;base64,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" />
        </div>
        <div class="slide">
          <img decoding="async"
            src="https://play-lh.googleusercontent.com/_lq2HX0YJNDrr0EeUebLAB2JsGbRGyoFY-XOnuUFTPfeEqaHNIyMOGqLx-oq4mUWPpn0" />
        </div>
      </section>
    </div>
  </div>
  <div class="divider">
    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1100 120" preserveAspectRatio="none">
      <path
        d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
        class="shape-fill"></path>
    </svg>
  </div>
  <div class="container mb-5">
    <!-- tipi -->
    <h2 class="display-4 text-center mb-5">What do you want to eat today?</h2>
    <div class="container-filters mt-3">
      <!-- Filtri per mobile -->
      <ul v-if="isMobile" class="list-unstyled">
        <li v-for="(type, index) in types" :key="index">
          <input type="checkbox" :id="`type-${type.name}`" v-model="selectedTypes" :value="type.name"
            class="type-checkbox" />
          <label :for="`type-${type.name}`" class="type-name-mobile">
            <b>{{ type.name.toUpperCase() }}</b>
          </label>
        </li>
      </ul>
      <!-- Filtri desktop-->
      <ul v-else class="d-flex justify-content-between p-0">
        <li v-for="(type, index) in types" :key="index">
          <input type="checkbox" :id="`type-${type.name}`" v-model="selectedTypes" :value="type.name"
            class="type-checkbox" />
          <label :for="`type-${type.name}`" class="type-name">
            <b>{{ type.name.toUpperCase() }}</b>
          </label>
        </li>
      </ul>
      <ul v-else class="d-flex justify-content-between p-0">
        <li v-for="(type, index) in types" class="list-unstyled" :key="index">
          <input type="checkbox" :id="`type-${type.name}`" v-model="selectedTypes" :value="type.name"
            class="type-checkbox" />
          <label :for="`type-${type.name}`" class="type-img-container">
            <img class="types-image" :src="store.api.mainUrl + type.img" :alt="type.name" />
            <div class="type-name">
              <b>{{ type.name.toUpperCase() }}</b>
            </div>
          </label>
        </li>
      </ul>
    </div>

    <!-- Ristoranti -->
    <h2 class="text-center mb-5 mt-3">Restaurants</h2>
    <ul class="row list-unstyled">
      <li class="col-12 col-md-6 col-lg-4 g2" v-for="(restaurant, index) in restaurants" :key="index">
        <RouterLink class="link-offset-2 link-underline link-underline-opacity-0 text-dark"
          :to="{ name: 'restaurant', params: { slug: restaurant.slug } }">
          <div class="card card-restaurant d-flex flex-column align-items-center border-0">
            <div class="card-image">
              <img class="img" :src="store.api.mainUrl +
        store.api.storagePath +
        restaurant.cover_img
        " alt="" />
              <div class="ripple-cont"></div>
            </div>
            <!-- <div class="table"> -->
            <h4 class="card-caption text-center">
              {{ restaurant.name }}
            </h4>
            <h6 class="category text-center">
              Restaurant Types:
              <ul class="list-unstyled d-flex gap-3 justify-content-center">
                <li v-for="(type, index) in restaurant.types" :key="`type-${index}`" class="types-category mt-2">
                  {{ type.name }}
                </li>
              </ul>
            </h6>
            <!-- </div> -->
          </div>
        </RouterLink>
      </li>
    </ul>
  </div>
  <div class="dividerwork-top mt-5">
    <svg style="" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1100 120" preserveAspectRatio="none">
      <path
        d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
        class="shape-fill"></path>
    </svg>
  </div>
  <div class="row p-5 work-section">
    <div class="col-12 col-md-6 pr">
      <div class="container-img text-center">
        <img class="img-fluid my-img" style="width: 500px"
          src="https://img.freepik.com/free-photo/delivery-concept-handsome-african-american-delivery-man-rush-running-delivering-package-customer-isolated-grey-studio-background-copy-space_1258-1211.jpg"
          alt="" />
      </div>
    </div>
    <div class="col-12 text-center col-md-6 d-flex align-items-center">
      <div>
        <h1 class="fw-bold">Work with us.</h1>

        <div class="container p-3 mt-3">
          <h3>
            We are passionate about working with the best restaurants and chefs
            to deliver high quality, delicious meals directly to your door. Our
            delivery partners care about providing an exceptional service to get
            your food to you promptly and safely. Together, we strive to make
            your food delivery experience easy and enjoyable.
          </h3>
        </div>
      </div>
    </div>
  </div>
  <div class="dividerwork">
    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1100 120" preserveAspectRatio="none">
      <path
        d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
        class="shape-fill"></path>
    </svg>
  </div>
</template>

<style scoped lang="scss">
@import '/src/style.scss';

/* Stili per il jumbotron */
.jumbo {
  position: relative;

  .jumbotext {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 4;
  }

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: black;
    opacity: 0.5;
    z-index: 1;
  }

  video {
    min-width: 100%;
    min-height: 100%;
    height: calc(100vh - 96px);
    object-fit: cover;
    z-index: 0;
    // height: 100vh;
  }
}

/* Stili per le immagini */
.box {
  height: 300px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.partner-container {
  padding: 10vh 0;
  background-color: $orange;
  border: 1px solid $orange;
}

.divider svg {
  position: relative;
  display: block;
  width: calc(100% + 1.3px);
  height: 228px;
}

.divider .shape-fill {
  fill: #f88a35;
}

.divider-top svg {
  position: relative;
  top: 10px;
  display: block;
  width: calc(100% + 2px);
  height: 228px;
  transform: rotateY(180deg);
}

.divider-top .shape-fill {
  fill: #f88a35;
}



.dividerwork-top svg {
  position: relative;
  top: 10px;
  display: block;
  width: calc(100% + 2px);
  height: 228px;
  transform: rotateY(180deg);
  
}



.dividerwork .shape-fill {
  fill: $darkgreen;
}

.dividerwork-top .shape-fill {
  fill: $darkgreen;
}

/* Nascondi le checkbox */
.type-checkbox {
  display: none;
}

/* Stili per il container dei filtri */
.container-filters {
  display: flex;
  justify-content: center;
}

/* Stili per il container delle immagini */
.type-img-container {
  position: relative;
  top: 0;
  left: 0;
  width: 100px;
  height: 220px;
  overflow: hidden;
  border-radius: 10px;
  cursor: pointer;
  border: 2px solid transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  transition: 0.3s;
}

/* Stili per le immagini dei tipi */
.types-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
  filter: grayscale(1);
}

/* Stili per il nome del tipo */
.type-name {
  position: absolute;
  width: 100%;
  bottom: 10;
  left: 0;
  background-color: $beige;
  color: $orange;
  padding: 5px 0;
}

/* Stili quando la checkbox è selezionata */
.type-checkbox:checked+label .type-img-container {
  border-color: $orange;
}

.type-checkbox:checked+label .type-name {
  background-color: $orange;
  color: $beige;
}

.type-checkbox:checked+label .types-image {
  filter: grayscale(0);
}

/* Effetto hover - solo per desktop */
@media (min-width: 901px) {
  .type-img-container:hover {
    width: 300px;
    border-color: orange;

    img {
      filter: grayscale(0);
    }
  }
}

.card {
  display: inline-block;
  position: relative;
  width: 100%;
  margin-bottom: 30px;
  border-radius: 6px;
  color: rgba(0, 0, 0, 0.87);
  background: #fff;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
  transition: 0.3s;
}

.card-image {
  transition: transform 0.3s;
}

.card-image:hover {
  transform: scale(1.11);
}

.card .card-image {
  height: 300px;
  width: 90%;
  position: relative;
  bottom: 30px;
  overflow: hidden;
  margin: 15px;
  border-radius: 6px;
  box-shadow: 0 16px 38px -12px rgba(0, 0, 0, 0.56),
    0 4px 25px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2);
  cursor: pointer;
}

.card .card-image img {
  width: 100%;
  height: 100%;
  border-radius: 6px;
  pointer-events: none;
  object-fit: cover;
}

.card .card-image .card-caption {
  position: absolute;
  bottom: 15px;
  left: 15px;
  color: #fff;
  font-size: 1.3em;
  text-shadow: 0 2px 5px rgba(33, 33, 33, 0.5);
}

.card-restaurant .card-caption {
  margin-top: 5px;
}

.card-restaurant .card-image+.category {
  margin-top: 20px;
}

.category {
  color: $orange;
  font-weight: bold;
}

.types-category {
  font-size: 13px;
  color: #212529;
}

@media (max-width: 900px) {
  .container-filters {
    display: block;
    /* Mostra i filtri come una lista verticale */
  }

  .type-checkbox+label {
    display: block;
    /* Mostra ogni checkbox e label su una riga separata */
    margin-bottom: 10px;
    /* Spazio tra le checkbox */
  }

  .type-img-container {
    display: none;
    /* Nascondi il container dell'immagine */
  }

  /* Stile per il pulsante dei filtri quando è attivo */
  .type-checkbox:checked+label {
    background-color: $orange;
    color: $beige;
    border-radius: 5px;
    padding: 5px 10px;
  }

  /* Stili per i filtri mobile */
  .type-name-mobile {
    display: block;
    cursor: pointer;
    margin-bottom: 10px;
    /* Spazio tra i filtri */
    padding: 5px;
    border-radius: 5px;
    text-align: center;
    background-color: $beige;
    /* Colore di sfondo iniziale */
    color: $orange;
    /* Colore del testo iniziale */
  }

  /* Quando la checkbox è selezionata, cambia lo sfondo e il colore del testo */
  .type-checkbox:checked+.type-name-mobile {
    background-color: $orange;
    color: $beige;
  }

  /* Nascondi i filtri mobile su desktop */
  @media (min-width: 901px) {
    .type-name-mobile {
      display: none;
    }
  }

  /* Nascondi i filtri desktop su mobile */
  @media (max-width: 900px) {
    .type-img-container {
      display: none;
    }
  }
}

/* Slider */
.slick-slide {
  margin: 0px 10px;
}

.slick-slide img {
  width: 100%;
  padding: 15px;
}

.my-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 15px;
}

.work-section {
  background-color: $darkgreen;
  color: $beige;
  border-bottom: 1px solid $darkgreen;
}
@media screen and (max-width: 576px) {
  .dividerwork .svg{
  border-top:1px solid $darkgreen;
}
.dividerwork-top .svg{
  border-top: 1px solid $darkgreen;
}

}
</style>
