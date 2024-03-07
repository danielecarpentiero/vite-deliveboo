import { reactive } from 'vue';

const store = reactive({
  api: {
    mainUrl: 'http://127.0.0.1:8000/',
    storagePath: '/storage/',
    listUrl: {
      restaurants: 'api/restaurants/',
      types: 'api/types',
    },
  },
  restaurants: {
    currentPage: 1,
    searchKey: null,
  },
  error: [],
});

export default store;
