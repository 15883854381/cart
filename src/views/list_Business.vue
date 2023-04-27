<template>
  <!--    <van-search placeholder="请输入搜索关键词"/>-->

    <van-tabs v-model:active="active" @click-tab="onClickTab">
        <van-tab title="新车(线索)">
            <list_Business_NewBropdown @BropdownData="BropdownData"></list_Business_NewBropdown>
            <div class="business_box">
                <List_box v-for="item in clueList" @click="toUrl(item)" :Cluedata="item" :key="item"></List_box>
            </div>
        </van-tab>
        <van-tab title="二手车(线索)">
            <list_Business_NewBropdown @BropdownData="BropdownData"></list_Business_NewBropdown>
            <div class="business_box">
                <List_box :Cluedata="data" @click="toUrl"></List_box>
                <List_box :Cluedata="data"></List_box>
                <List_box :Cluedata="data"></List_box>
                <List_box :Cluedata="data"></List_box>
                <List_box :Cluedata="data"></List_box>
                <List_box :Cluedata="data"></List_box>
            </div>
        </van-tab>
    </van-tabs>


</template>

<script>
import {onMounted, ref} from 'vue';
import List_box from "@/components/List_box.vue";
import list_Business_NewBropdown from "@/components/list_Business_NewBropdown.vue";
import {useRouter} from "vue-router";
import {getClueList} from "@/api/clue";

export default {

    components: {
        List_box,
        list_Business_NewBropdown,
    },
    setup() {
        const router = useRouter();
        const active = ref(0);
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
        let clueList = ref([]);


        // 获取城市id
        const getCity = (item) => {
            console.log(item)
        };

        // 跳转详情页面
        function toUrl(item) {
            router.push({path: "/list_Business_Detail", query: {id: item.id}});
        }

        // 切换tabs内容
        function onClickTab(e) {
            console.log("用户切换tabs: ", e)
        }

        function BropdownData(e) {
            console.log(e)
            getdata(e);
        }

        function getdata(data = {}) {
            getClueList(data).then(res => {
                clueList.value = res.data.data
            })
        }

        onMounted(() => {
            getdata()
        })

        return {
            BropdownData,
            getCity,
            toUrl,
            onClickTab,
            data,
            clueList,
            active,


        };
    },
};
</script>

<style lang="scss">
:root {
  --van-tabs-line-height: 38px;
  --van-dropdown-menu-title-font-size: 14px
}

.dropdown_box {
  position: sticky;
  top: 0;
  z-index: 100;

  .van-button {
    border-radius: unset;
  }
}

.business_box {
  margin-bottom: 50px;
}
</style>