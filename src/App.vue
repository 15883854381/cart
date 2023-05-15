<template>
    <div>
        <div class="view_content">
            <router-view></router-view>
        </div>

        <van-tabbar style="border-top: 1px solid #ccc;margin-top: 50px" v-model="active">
            <van-tabbar-item @click="getRouter('/list_Business')" icon="home-o">购车线索</van-tabbar-item>
            <!--            <van-tabbar-item @click="getRouter('/my_Business')" icon="search">我的线索</van-tabbar-item>-->
            <van-tabbar-item @click="getRouter('/deal_Business')" icon="friends-o">成交案例</van-tabbar-item>
            <van-tabbar-item @click="getRouter('/user_data')" icon="setting-o">个人设置</van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
import {useRoute} from 'vue-router'
import {onMounted, ref} from "vue";
import router from "@/router";

export default {
    name: 'App',

    setup() {


        // const route = useRoute()
        // const routerKey = computed(() => route.path + Math.random())
        // return {routerKey}
        let active = ref(0);
        const route = useRoute();
        const routerList = [
            "/list_Business",
            "/my_Business",
            "/deal_Business",
            "/user_data",
        ];

        function getRouter(e) {
            router.push(e)

        }

        onMounted(() => {
            active.value = routerList.findIndex((item) => item === route.path);
        });
        return {
            active,
            getRouter
        };
    }

}
</script>

<style>
@import "//at.alicdn.com/t/c/font_4027755_ethzpxfw6ju.css";

.view_content {
    margin-bottom: 60px
}
</style>
