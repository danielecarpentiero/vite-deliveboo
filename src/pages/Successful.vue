<script>

import { RouterLink } from 'vue-router';

export default{
    name:'successful'
}
</script>
<template>
    <div class="container d-flex justify-content-center">
        <div class="d-flex flex-wrap p-2 justify-content-center mt-5 mb-5 gap-3 " style="width: 500px;" >
           <div class="text-center rounded">Your order was successful,Thank you for ordering,you should be receiving a mail with a summary of your order.</div>
           <router-link :to="{name:'home',params:{}}" class="btn btn-primary">Back to restaurants</router-link>
        </div>
    </div>
</template>
<style>



</style>