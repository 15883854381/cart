<template>
  <div>
<!--    <router-view></router-view>-->

<!--    <van-tabbar style="border-top: 1px solid #ccc" @change="jump" v-model="active">-->
<!--      <van-tabbar-item icon="home-o">购车线索</van-tabbar-item>-->
<!--      <van-tabbar-item icon="search">我的线索</van-tabbar-item>-->
<!--      <van-tabbar-item icon="friends-o">成交案例</van-tabbar-item>-->
<!--      <van-tabbar-item icon="setting-o">个人设置</van-tabbar-item>-->
<!--    </van-tabbar>-->
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

export default {
  setup() {
    let active = ref(0);
    const router = useRouter();
    const route = useRoute();
    const routerList = [
      "/list_Business",
      "/my_Business",
      "/deal_Business",
      "/user_data",
    ];
    function jump(e) {
      console.log(route.path);
      // to="/list_Business"
      router.push(routerList[e]);
    }

    onMounted(() => {
      active.value = routerList.findIndex((item) => item === route.path);
    });
    return {
      active,
      jump,
    };
  },
};
</script>

<style></style>
