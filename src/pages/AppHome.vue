<script>
import axios from 'axios';
import store from '../store';
import { RouterLink } from 'vue-router';

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

  mounted() {
    this.selectedTypes = this.$route.query.types
      ? this.$route.query.types.split(',')
      : [];
    this.getRestaurants();
    this.getTypes();
  },
};
</script>

<template>
  <div class="jumbo">
    <!-- Div Vuoto per -->
    <div class="overlay"></div>

    <!-- Video -->
    <video playsinline autoplay muted loop>
      <source src="/HeaderVideoSD.mp4" type="video/mp4" />
    </video>

    <!-- Contenuti Header -->
    <div class="container h-100 jumbotext">
      <div class="d-flex h-100 align-items-center justify-content-center">
        <div class="w-100 text-center text-white">
          <h1 class="display-3 fw-bold">
            Get delicious meals delivered fast, right to your door. Order now
            and satisfy your cravings in minutes!
          </h1>
        </div>
      </div>
    </div>
  </div>

  <div class="container">
    <!-- tipi -->
    <section>
      <h1 class="my-5 text-center">What you want to eat today?</h1>
    </section>
    <div class="container-filters">
      <ul class="d-flex justify-content-between p-0">
        <li v-for="(type, index) in types" class="list-unstyled" :key="index">
          <input
            type="checkbox"
            :id="`type-${type.name}`"
            v-model="selectedTypes"
            :value="type.name"
            class="type-checkbox"
          />
          <label :for="`type-${type.name}`" class="type-img-container">
            <img
              class="types-image"
              :src="store.api.mainUrl + type.img"
              :alt="type.name"
            />
            <div class="type-name">
              <b>{{ type.name.toUpperCase() }}</b>
            </div>
          </label>
        </li>
      </ul>
    </div>

    <!-- Ristoranti -->
    <h2 class="text-center">Restaurants</h2>
    <ul class="row list-unstyled">
      <li
        class="col-12 col-md-6 col-lg-4 g2"
        v-for="(restaurant, index) in restaurants"
        :key="index"
      >
        <RouterLink
          class="link-offset-2 link-underline link-underline-opacity-0 text-dark"
          :to="{ name: 'restaurant', params: { slug: restaurant.slug } }"
        >
          <div class="shadow p-3 mb-5 bg-white rounded text-center glass-card">
            <h2>{{ restaurant.name }}</h2>
            <div class="box">
              <img
                :src="
                  store.api.mainUrl +
                  store.api.storagePath +
                  restaurant.cover_img
                "
                alt=""
              />
            </div>
            <h6 class="mt-3 mb-1">Restaurant Types:</h6>
            <ul class="list-unstyled d-flex gap-3 justify-content-center">
              <li v-for="(type, index) in restaurant.types">{{ type.name }}</li>
            </ul>
          </div>
        </RouterLink>
      </li>
    </ul>
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
    height: 99.5%;
    width: 100%;
    background-color: black;
    opacity: 0.5;
    z-index: 1;
  }

  video {
    min-width: 100%;
    min-height: 100%;
    width: auto;
    height: auto;
    z-index: 0;
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
  border-radius: 20%;
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
.type-checkbox:checked + label .type-img-container {
  border-color: $orange;
}

.type-checkbox:checked + label .type-name {
  background-color: $orange;
  color: $beige;
}
.type-checkbox:checked + label .types-image {
  filter: grayscale(0);
}

/* Effetto hover */
.type-img-container:hover {
  width: 300px;
  border-color: orange;

  img {
    filter: grayscale(0);
  }
}
</style>
