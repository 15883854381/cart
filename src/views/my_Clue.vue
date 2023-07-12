<template>
    <van-notice-bar v-if="dataTable.length>0" mode="closeable">购买成功后将在详情页面展示联系方式</van-notice-bar>

    <Orderlist v-for="item in dataTable" :key="item" :item="item"></Orderlist>

    <div class="float_icon">
        <span @click="DownFileExcelClue"><van-icon class="iconfont" class-prefix="my-icon" name="xiazai" size="25"
                                                   color="#333"/></span>
    </div>

</template>

<script setup>
import Orderlist from "@/components/Orderlist.vue";
import {getClueOlder} from "@/api/order"
import {onMounted, ref} from "vue";
import router from "@/router";
import {showNotify} from "vant";
import {DownFileExcelClueData} from "@/api/clue";

// 下载订单数据
function DownFileExcelClue() {
    DownFileExcelClueData().then(res => {
        let {code, data, mes} = res.data
        if (code !== 200) {
            showNotify(mes)
        } else {
            location.href = data.url
        }
    })
}


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
</script>

<style scoped>
.float_icon {
    position: fixed;
    right: 5px;
    bottom: 100px;
    padding: 5px;
    border-radius: 4px;
    z-index: 10;
    background-color: rgba(224, 224, 224, 0.6);

}
</style>