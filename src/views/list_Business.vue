<template>
  <!--    <van-search placeholder="请输入搜索关键词"/>-->

    <van-tabs v-model:active="active" @click-tab="onClickTab">
        <van-tab title="新车(线索)">
            <list_Business_NewBropdown @BropdownData="BropdownData"></list_Business_NewBropdown>
            <div class="margin_business_box" @scroll="getScode">
                <div class="business_box">
                    <List_box v-for="item in clueList" @click="toUrl(item)" :Cluedata="item"
                              :key="item.clue_id"></List_box>
                </div>
            </div>
        </van-tab>
        <van-tab title="二手车(线索)">
            <list_Business_NewBropdown @BropdownData="OldBropdownData"></list_Business_NewBropdown>
            <div class="margin_business_box" id="wrapper" @scroll="getScode">
                <div class="business_box">
                    <List_box :key="item.clue_id" :Cluedata="item" v-for="item in oleClue"
                              @click="toUrl(item)"></List_box>
                </div>
            </div>

        </van-tab>
    </van-tabs>


</template>

<script>
import {onBeforeUnmount, onMounted, ref} from 'vue';
import List_box from "@/components/List_box.vue";
import list_Business_NewBropdown from "@/components/list_Business_NewBropdown.vue";
import {useRouter} from "vue-router";
import {getClueList, SelectCartData} from "@/api/clue";
import {closeToast, showLoadingToast} from "vant";
// import JRoll from 'jroll-lite'

export default {

    components: {
        List_box,
        list_Business_NewBropdown,
    },
    setup() {

        const router = useRouter();
        const active = ref(0);
        let data = {}
        let clueList = ref([]);
        let pageNum = ref(1);
        let oldPageNum = ref(1);
        const loading = ref(false);
        const finished = ref(false);
        let ClueCOunt = ref(0);
        let timeTrue = null;
        let RefreshTime = 30;
        let oldCartCount = ref(0)


        // 跳转详情页面
        function toUrl(item) {
            router.push({
                path: "/list_Business_Detail",
                query: {
                    type: item.cart_type,
                    clue_id: item.clue_id,
                }
            });
        }


        function BropdownData(e) {
            RefreshTime = e.RefreshTime
            getdata(e);
            if (e.RefreshTime === 0) {
                clearInterval(timeTrue)
            }
        }

        function OldBropdownData(e) {
            RefreshTime = e.RefreshTime
            SelectCart(e)
            if (e.RefreshTime === 0) {
                clearInterval(timeTrue)
            }
        }


        function getdata(data = {}) {
            getClueList(data).then(res => {
                let {data, count} = res.data.data
                clueList.value = data
                ClueCOunt.value = count
                pageNum.value = 1
            })
        }


        // =============== 二手车 ===================

        let oleClue = ref();

        // 二手车的数据
        function SelectCart(data) {
            SelectCartData(data).then(res => {
                let {data, count} = res.data.data
                oleClue.value = data
                oldCartCount.value = count
            })
        }

        function getScode(e) {
            let scrollTop = e.target.scrollTop
            let windowHeight = e.target.clientHeight
            let scrollHeight = e.target.scrollHeight
            if (Math.ceil(scrollTop + windowHeight) >= parseInt(scrollHeight)) {
                if (active.value === 0) {
                    if (ClueCOunt.value > clueList.value.length) {

                        pageNum.value += 1
                        showLoadingToast({
                            message: '加载中...',
                            forbidClick: true,
                        });
                        getClueList({pageNum: pageNum.value}).then(res => {
                            let {data, count} = res.data.data
                            ClueCOunt.value = count
                            for (let item in data) {
                                clueList.value.push(data[item])
                            }
                            closeToast();
                        })
                    }
                } else {
                    if (oldCartCount.value > oleClue.value.length) {
                        oldPageNum.value += 1
                        showLoadingToast({
                            message: '加载中...',
                            forbidClick: true,
                        });
                        SelectCartData({PageNum: oldPageNum.value}).then(res => {
                            let {data, count} = res.data.data
                            oldCartCount.value = count
                            for (let item in data) {
                                oleClue.value.push(data[item])
                            }
                            closeToast();
                        })
                    }
                }

            }
        }

        async function onClickTab(e) {

            if (e.name === 1) {
                if (!oleClue.value) {
                    showLoadingToast({
                        message: '加载中...',
                        forbidClick: true,
                    });
                    await SelectCart({PageNum: oldPageNum.value})
                    closeToast();
                }

            }
        }


        onMounted(() => {
            getdata()

            //     ===== 二手车 =======

        })

        onBeforeUnmount(() => {
            clearTimeout(timeTrue)
        });


        return {
            BropdownData,
            OldBropdownData,
            toUrl,
            data,
            clueList,
            active,
            loading,
            finished,
            oleClue,
            getScode,
            onClickTab

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
  //margin-bottom: 50px;
}

.margin_box {
  //display: flex;
  //flex-direction: column;
}

.margin_business_box_old {
  //border: 1px solid;
  height: calc(100vh - 48px - 38px - 55px);
  overflow: auto;
  box-sizing: border-box;
}

.margin_business_box {
  height: calc(100vh - 48px - 38px - 55px);
  overflow: auto;
}
</style>