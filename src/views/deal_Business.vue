<template>
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item>
            <van-image
                    src="https://img.zcool.cn/community/01e4745b79fb3ea801218d321115e0.jpg@1280w_1l_2o_100sh.jpg"></van-image>
        </van-swipe-item>
        <van-swipe-item>
            <van-image
                    src="https://img.zcool.cn/community/0136c65dc04a1da8012163ba304efa.jpg?x-oss-process=image/resize,h_600/format,jpg"></van-image>
        </van-swipe-item>
        <van-swipe-item>
            <van-image
                    src="https://img.zcool.cn/community/012c3c584cf430a8012060c8f940f6.jpg@1280w_1l_2o_100sh.jpg"></van-image>
        </van-swipe-item>
        <van-swipe-item>
            <van-image
                    src="https://img.zcool.cn/community/013993585de4e3a801219c7769c197.jpg@2o.jpg"></van-image>
        </van-swipe-item>
    </van-swipe>
  <!--成功案例-->
    <van-cell-group>
        <van-cell @click="goItem(item)" :key="item.title" v-for="item in data" is-link>
            <template #title>
                <van-text-ellipsis :content="item.title"/>

            </template>
        </van-cell>
    </van-cell-group>
</template>

<script>
import {SelectCase} from "@/api/deal";
import {onMounted, provide, reactive, ref} from "vue";
import router from "@/router";

export default {
    name: 'deal_Business',

    setup() {
        let data = ref([])
        onMounted(() => {
            SelectCase().then(res => {
                data.value = res.data.data
            })
        })

        provide("x", '456');

        function goItem(item) {
            router.push({
                path: 'success_content',
                query: {
                    id: item.id
                },
            })
        }

        return {
            data,
            goItem
        }
    }

}
</script>

<style lang="scss">


.text {
  font-size: 15px;
  padding: 5px;
  border-bottom: 1px solid #ccc;
}
</style>