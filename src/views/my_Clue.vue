<template>

    <Orderlist @click="tourl(item)" v-for="item in dataTable" :key="item" :item="item"></Orderlist>
</template>

<script>
import Orderlist from "@/components/Orderlist.vue";
import {getClueOlder} from "@/api/order"
import {onMounted, ref} from "vue";
import router from "@/router";

export default {
    name: "my_Clue",
    components: {Orderlist},
    setup() {
        let dataTable = ref([])
        onMounted(() => {
            getClueOlder().then((res) => {
                dataTable.value = res.data.data
            })
        })

        function tourl(e) {
            router.push(`list_Business_Detail?id=${e.clue_id}`)
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