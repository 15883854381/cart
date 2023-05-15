<template>
  <!--    <van-search placeholder="请输入搜索关键词"/>-->

    <van-tabs v-model:active="active">
        <van-tab title="新车(线索)">
            <list_Business_NewBropdown @BropdownData="BropdownData"></list_Business_NewBropdown>

            <div class="business_box">
                <List_box v-for="item in clueList" @click="toUrl(item)" :Cluedata="item" :key="item.id"></List_box>
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
import {onBeforeUnmount, onMounted, onUnmounted, reactive, ref} from 'vue';
import List_box from "@/components/List_box.vue";
import list_Business_NewBropdown from "@/components/list_Business_NewBropdown.vue";
import {useRouter} from "vue-router";
import {getClueCount, getClueList} from "@/api/clue";
import {showLoadingToast} from "vant";

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
        let pageNum = ref(1);
        const loading = ref(false);
        const finished = ref(false);
        let ClueCOunt = ref(0);
        let timeTrue = null;
        let RefreshTime = 30;

        // 跳转详情页面
        function toUrl(item) {
            router.push({path: "/list_Business_Detail", query: {id: item.id}});
        }


        function BropdownData(e) {
            RefreshTime = e.RefreshTime
            getdata(e);
            if (e.RefreshTime === 0) {
                clearInterval(timeTrue)
            }
        }

        function getdata(data = {}) {
            getClueList(data).then(res => {
                clueList.value = res.data.data
                pageNum.value = 1
            })

        }

        // 获取线索总数量
        function getClueCountFun() {
            getClueCount().then((e) => {
                ClueCOunt.value = e.data.data
            })
        }


        // 监听用是否下拉
        function handleScroll() {
            //变量scrollTop是滚动条滚动时，距离顶部的距离
            let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            //变量windowHeight是可视区的高度
            let windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
            //变量scrollHeight是滚动条的总高度
            let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
            // 监听用户是否滚动界面
            if (timeTrue !== null) {
                clearInterval(timeTrue)
            }
            console.log(RefreshTime)
            if (RefreshTime !== 0) {
                timeTrue = setInterval(() => {
                    showLoadingToast({
                        message: '更新数据中...',
                        forbidClick: true,
                    });
                }, RefreshTime * 1000)
            } else {
                clearInterval(timeTrue)
            }

            //滚动条到底部的条件
            if ((Math.ceil(scrollTop + windowHeight) === parseInt(scrollHeight)) && scrollTop !== 0) {
                console.log('我触底了==1');
                if (ClueCOunt.value > clueList.value.length) {
                    console.log('我触底了==2')
                    pageNum.value += 1
                    getClueList({pageNum: pageNum.value}).then(res => {
                        for (let item in res.data.data) {
                            clueList.value.push(res.data.data[item])
                        }
                    })
                }
            }
        }

        onMounted(() => {
            getdata()
            getClueCountFun()
            window.addEventListener('scroll', handleScroll)
        })

        onBeforeUnmount(() => {
            clearTimeout(timeTrue)
            window.removeEventListener('scroll', handleScroll)
        });


        return {
            BropdownData,
            toUrl,
            data,
            clueList,
            active,
            loading,
            finished,
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