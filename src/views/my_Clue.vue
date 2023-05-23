<template>
    <van-notice-bar v-if="dataTable.length>0" mode="closeable">联系方式将在订单交易成功后显示</van-notice-bar>

    <Orderlist @click="tourl(item)" v-for="item in dataTable" :key="item" :item="item"></Orderlist>
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

        function tourl(e) {
            router.push(`list_Business_Detail?clue_id=${e.clue_id}&type=${e.cart_type}`)
        }

        return {
            dataTable,
            tourl
        }
    }
}
</script>

<style scoped>

</style>