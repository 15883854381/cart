<template>
  <!--    <van-search placeholder="请输入搜索关键词"/>-->

    <van-tabs v-model:active="active">
        <van-tab title="新车(线索)">
            <list_Business_NewBropdown @BropdownData="BropdownData"></list_Business_NewBropdown>

            <div class="business_box">
                <List_box v-for="item in clueList" @click="toUrl(item)" :Cluedata="item" :key="item.clue_id"></List_box>
            </div>
        </van-tab>
        <van-tab title="二手车(线索)">
            <list_Business_NewBropdown @BropdownData="OldBropdownData"></list_Business_NewBropdown>
            <div class="business_box">
                <List_box :key="item.clue_id" :Cluedata="item" v-for="item in oleClue" @click="toUrl(item)"></List_box>
            </div>
        </van-tab>
    </van-tabs>


</template>

<script>
import {onBeforeUnmount, onMounted, ref} from 'vue';
import List_box from "@/components/List_box.vue";
import list_Business_NewBropdown from "@/components/list_Business_NewBropdown.vue";
import {useRouter} from "vue-router";
import {getClueCount, getClueList, SelectCartData} from "@/api/clue";
import {showLoadingToast} from "vant";

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
                    type: active.value ? '2' : '1',
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

                if (active.value === 0) {
                    // 在此处判断是否为 新车 二手车
                    if (ClueCOunt.value > clueList.value.length) {
                        console.log('新车触底了==2')
                        pageNum.value += 1
                        getClueList({pageNum: pageNum.value}).then(res => {
                            let {data, count} = res.data.data
                            ClueCOunt.value = count
                            for (let item in data) {
                                clueList.value.push(data[item])
                            }
                        })
                    }
                } else {
                    console.log('二手车')
                    if (oldCartCount.value > oleClue.value.length) {
                        oldPageNum.value += 1
                        SelectCartData({PageNum: oldPageNum}).then(res => {
                            let {data, count} = res.data.data
                            oldCartCount.value = count
                            for (let item in data) {
                                oleClue.value.push(data[item])
                            }
                        })
                    }
                }

            }
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


        onMounted(() => {
            getdata()
            // getClueCountFun()
            window.addEventListener('scroll', handleScroll)
            //     ===== 二手车 =======
            SelectCart()
        })

        onBeforeUnmount(() => {
            clearTimeout(timeTrue)
            window.removeEventListener('scroll', handleScroll)
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
            oleClue
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