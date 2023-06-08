<template>
    <van-notice-bar v-if="dataTable.length>0" mode="closeable">购买成功后将在详情页面展示联系方式</van-notice-bar>

    <Orderlist  v-for="item in dataTable" :key="item" :item="item"></Orderlist>
</template>

<script>
import Orderlist from "@/components/Orderlist.vue";
import {getClueOlder} from "@/api/order"
import {onMounted, ref} from "vue";
import router from "@/router";
import {showNotify} from "vant";

export default {
    name: "my_Clue",
    components: {Orderlist},
    setup() {
        let dataTable = ref([])
        onMounted(() => {
            getClueOlder().then((res) => {
                let {code, data, mes} = res.data
                if (code !== 200) {
                    showNotify({
                        type: 'primary',
                        message: mes
                    })
                } else {
                    dataTable.value = data
                }

            })
        })



        return {
            dataTable,

        }
    }
}
</script>

<style scoped>

</style>