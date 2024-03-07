<script>
import axios from 'axios';
import store from '../store';
import RestaurantCard from '../components/RestaurantCard.vue';
import { RouterLink } from 'vue-router';

export default {
	name: 'AppHome',
	components: {
		RestaurantCard,
	},
	data() {
		return {
			restaurants: [],
			store,
			types: [],
		};
	},
	methods: {
		getRestaurants() {
			axios
				.get(this.store.api.mainUrl + this.store.api.listUrl.restaurants)
				.then((response) => {
					this.restaurants = response.data.results.data;
				})
				.catch((error) => {
					console.log(error);
				});
		},

		getTypes() {
			axios
				.get(this.store.api.mainUrl + this.store.api.listUrl.types)
				.then((response) => {
					this.types = response.data.results;
					console.log(this.types);
				})
				.catch((error) => {
					console.log(error);
				});
		},
	},
	created() {
		this.getRestaurants();
		this.getTypes();
	},
};
</script>

<template>
	<div class="container">
		<!-- tipi -->
		<section>
			<h1>what would you like to eat?</h1>
		</section>

		<h2>choose your type of restaurant</h2>
		<ul class="d-flex flex-wrap gap-4 p-0">
			<li v-for="(type, index) in types" class="list-unstyled">
				<div class="form-check">
					<input class="form-check-input" type="checkbox" value="" :id="index">
					<label class="form-check-label" :for="index">
						{{ type.name }}
					</label>
					<div class="type-img-container">
						<img class="types-image" :src="store.api.mainUrl + type.img" :alt="type.name">
					</div>
				</div>
			</li>
		</ul>
		<!-- Ristoranti -->
		<h2 class="text-center">Restaurants</h2>
		<ul class="row list-unstyled">
			<li class="col-12 col-md-6 col-lg-4 g2" v-for="(  restaurant, index  ) in   restaurants  " :key="index">
				<RouterLink class="link-offset-2 link-underline link-underline-opacity-0 text-dark"
					:to="{ name: 'restaurant', params: { slug: restaurant.slug } }">
					<div class="shadow p-3 mb-5 bg-body-tertiary rounded text-center glass-card">
						<h2>{{ restaurant.name }}</h2>
						<div class="box"></div>
						<h6 class="mt-3 mb-1">Restaurant Types:</h6>
						<ul class="list-unstyled d-flex gap-3 justify-content-center">
							<li v-for="(  type, index  ) in   restaurant.types  ">{{ type.name }}</li>
						</ul>
					</div>
				</RouterLink>
			</li>
		</ul>
	</div>
</template>

<style scoped lang="scss">
.box {
	height: 300px;
	background-color: aqua;
}

.type-img-container {
	width: 50px;
	height: 50px;
	overflow: hidden;
	border-radius: 50%;
}

.types-image {
	width: 100%;
	height: 100%;
}
</style>
