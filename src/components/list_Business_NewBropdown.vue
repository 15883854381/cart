<template>
    <div class="dropdown_box">
        <van-dropdown-menu>
            <!--刷新频率-->
            <van-dropdown-item ref="down_item_1">
                <template #title>
                    <div class="dropdown_title">
                        <span>刷新频率</span>
                        <span class="dropdown_title_subTitle">{{ RefreshTimeTitle }}</span>
                    </div>
                </template>
                <van-cell-group>
                    <van-cell :key="item" :title="item.text" @click="getTime(item)" v-for="item in time_list">
                        <template v-if="RefreshTime === item.second" #right-icon>
                            <van-icon name="success" color="#1989fa"/>
                        </template>
                    </van-cell>
                </van-cell-group>
            </van-dropdown-item>
            <!--城市-->
            <van-dropdown-item ref="down_item_2">
                <template #title>
                    <div class="dropdown_title">
                        <span class="dropdown_title">城市</span>
                        <div class="dropdown_title_subTitle">{{ provinceIDTitle }}</div>
                    </div>
                </template>

                <van-cell title="全部" @click="getCity({id: 0, text:'全部'})">
                    <template #right-icon v-if="0 === provinceID">
                        <van-icon name="success" color="#1989fa"/>
                    </template>
                </van-cell>
                <van-cell :title="item.text" @click="getCity(item)" :key="item" v-for="item in city">
                    <template #right-icon v-if="item.id === provinceID">
                        <van-icon name="success" color="#1989fa"/>
                    </template>
                </van-cell>
            </van-dropdown-item>
            <!--购买名额-->
            <van-dropdown-item title="购买名额" ref="down_item_3">
                <template #title>
                    <div class="dropdown_title">
                        <span class="dropdown_title">购买名额</span>
                        <div class="dropdown_title_subTitle">{{ buyNumTitle }}</div>
                    </div>
                </template>
                <van-cell @click="buyNumClick(item)" :title="item.text" :key="item" v-for="item in buy_num">
                    <template #right-icon v-if="buyNum === item.id">
                        <van-icon name="success" color="#1989fa"/>
                    </template>
                </van-cell>
            </van-dropdown-item>
            <!--车型-->
            <van-dropdown-item title="车型" ref="down_item_4">
                <template #title>
                    <div class="dropdown_title">
                        <span class="dropdown_title">车型</span>
                        <div class="dropdown_title_subTitle">{{ CartBantIDTitle }}</div>
                    </div>
                </template>
                <van-list
                        v-model:loading="loading"
                        :finished="finished"
                        finished-text="没有更多了"
                        @load="onLoad">
                    <van-cell @click="CartBrandClick({id: 117, name: '全部'})" title="全部">
                        <template v-if="CartBantID === 0" #right-icon>
                            <van-icon name="success" color="#1989fa"/>
                        </template>
                    </van-cell>
                    <van-cell @click="CartBrandClick(item)" v-for="item in newBrand" :key="item" :title="item.name">
                        <template v-if="CartBantID === item.id" #right-icon>
                            <van-icon name="success" color="#1989fa"/>
                        </template>
                    </van-cell>
                </van-list>
            </van-dropdown-item>
        </van-dropdown-menu>
    </div>
</template>


<script>
import {onMounted, reactive, ref, toRefs} from 'vue';
// import {areaList} from '@vant/area-data';
import {CartBand, City} from "@/api/utils";

export default {
    name: 'list_Business_NewBropdown',
    emits: ['BropdownData'],
    setup(props, context) {

        const activeId = ref(1); // 城市选择器
        const activeIndex = ref(0); // 城市选择器
        let city = ref(null);
        let is_num = ref(0)
        const time_list = [
            {text: '不刷新', second: 0},
            {text: '30秒', second: 30},
            {text: '60秒', second: 60},
        ]; // 筛选的时间数据
        const buy_num = [
            {text: '全部', id: 0},
            {text: '有购买名额', id: 1},
            {text: '没有购买名额', id: 2},
        ]; // 筛选的时间数据

        let Bropdown = reactive({
            RefreshTime: 30,
            provinceID: 0,
            buyNum: 0,
            CartBantID: 0,
        });
        let BropdownTitle = reactive({
            RefreshTimeTitle: '30秒',
            provinceIDTitle: '全部',
            buyNumTitle: '全部',
            CartBantIDTitle: '全部',
        });

        const down_item = reactive({
            down_item_1: null,
            down_item_2: null,
            down_item_3: null,
            down_item_4: null,
        }); // 关闭下拉菜单

        const pull_data = () => {
            context.emit('BropdownData', Bropdown)
        }
        // =============  获取数据 ================
        // 获取城市id
        const getCity = (item) => {
            Bropdown.provinceID = item.id
            BropdownTitle.provinceIDTitle = item.text
            pull_data();
            down_item.down_item_2.toggle();

        };

        // 设置刷新频率
        function getTime(item) {

            Bropdown.RefreshTime = item.second
            BropdownTitle.RefreshTimeTitle = item.text
            down_item.down_item_1.toggle();
            pull_data();
        }

        // 获取是否有购买名额
        function buyNumClick(item) {
            Bropdown.buyNum = item.id
            BropdownTitle.buyNumTitle = item.text
            down_item.down_item_3.toggle();
            pull_data();
        }

        // 获取汽车品牌
        function CartBrandClick(item) {
            Bropdown.CartBantID = item.id
            BropdownTitle.CartBantIDTitle = item.name
            down_item.down_item_4.toggle();
            pull_data();
        }

        // =============  获取数据 结束================


        let Brandlist = ref([]);
        let newBrand = ref([]);
        const loading = ref(false);
        const finished = ref(false);
        const onLoad = () => {
            // 异步更新数据
            // 汽车品牌数据 数据在页面中酒加载
            setTimeout(() => {
                for (let i = 0; i < 10; i++) {
                    newBrand.value.push(Brandlist.value[is_num.value]);
                    is_num.value += 1
                }
                // 加载状态结束
                loading.value = false;
                let num = Brandlist.value.length - 2;
                // 数据全部加载完成
                if (is_num.value >= num) {
                    finished.value = true;
                }
            }, 1000);
        };

        async function get_CityOrCar() {
            // 城市数据
            City().then((res) => {
                city.value = res.data.data
            })
            // 汽车品牌数据
            CartBand().then((res) => {
                Brandlist.value = res.data.data
            });
        }

        onMounted(() => {
            get_CityOrCar()
        })

        // 重构城市数据结构 == 结束

        return {
            activeIndex,
            activeId,
            time_list,
            city,
            buyNumClick,
            ...toRefs(down_item),
            getCity,
            CartBrandClick,
            getTime,
            ...toRefs(Bropdown),
            ...toRefs(BropdownTitle),
            buy_num,
            onLoad,
            loading,
            finished,
            newBrand

        };
    },
};
</script>

<style scoped lang="scss">
:root {
  --van-dropdown-menu-height: 35px;
  //--van-dropdown-menu-title-line-height:50px
}

.dropdown_box {
  position: sticky;
  top: 0;
  z-index: 100;

  .van-button {
    border-radius: unset;
  }

}

:deep(.van-dropdown-menu__title:after) {
  top: 28% !important;
}

.dropdown_title {
  text-align: center;
  display: flex;
  flex-direction: column;

  &_subTitle {
    margin-top: -4px;
  }


}
</style>