<template>
    <div>
<!--        <router-view :key="routerKey" ></router-view>-->
        <router-view ></router-view>
    </div>
</template>

<script>
import {useRoute} from 'vue-router'
import {computed} from "vue";

export default {
    name: 'App',

    setup() {
        // const route = useRoute()
        // const routerKey = computed(() => route.path + Math.random())
        // return {routerKey}
    }

}
</script>

<style>
@import "//at.alicdn.com/t/c/font_4027755_ethzpxfw6ju.css";

</style>
