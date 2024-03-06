import { reactive } from "vue";

const store = reactive({

    api: {
        MainUrl: 'http://127.0.0.1:8000',
        storagePath: '/storage/',
        LIstUrl: {
            restaurants: 'api/restaurants'
        }
    },
    restaurants: {
        currentPage: 1,
        searchKey: null
    },
    error: [],
});

export default store;