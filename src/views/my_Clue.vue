<template>

    <Orderlist></Orderlist>
</template>

<script>
import Orderlist from "@/components/Orderlist.vue";

export default {
    name: "my_Clue",
    components: {Orderlist},
    setup() {
        let data = {
            "id": 34,
            "sales": 2,
            "Tosell": 1,
            "user_name": "罗先生",
            "sex": "男",
            "Cluephone_number": "158*********",
            "cartName": "宝骏",
            "provinceCity": "辽宁省.邯郸市",
            "progress": "50",
            "Price": "1.00",
            "upClueNum": 1,
            "nclueName": "^o^    คิดถึง",
            "child": [
                {
                    "clue_id": 34,
                    "tagName": "急用"
                },
                {
                    "clue_id": 34,
                    "tagName": "全款"
                }
            ]
        }
        return {
            data
        }
    }
}
</script>

<style scoped>

</style>