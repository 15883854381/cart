<template>
    <div>
        <div class="view_content">
            <router-view></router-view>
        </div>

        <van-tabbar style="border-top: 1px solid #ccc;margin-top: 50px" v-model="active">
            <van-tabbar-item to="/list_Business" icon="home-o">购车线索</van-tabbar-item>
            <van-tabbar-item to="/my_Business" icon="search">我的线索</van-tabbar-item>
            <van-tabbar-item to="/deal_Business" icon="friends-o">成交案例</van-tabbar-item>
            <van-tabbar-item to="/user_data" icon="setting-o">个人设置</van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
import {useRoute, useRouter} from 'vue-router'
import {computed, onMounted, ref} from "vue";
import {showConfirmDialog} from "vant";

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
        onMounted(() => {
            active.value = routerList.findIndex((item) => item === route.path);
        });
        return {
            active,
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
