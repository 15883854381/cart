<template>
    <div class="dropdown_box">
        <van-dropdown-menu>
            <!--刷新频率-->
            <van-dropdown-item title="刷新频率" ref="down_item_1">
                <van-cell-group>
                    <van-cell :key="item" :title="item.text" @click="getTime(item)" v-for="item in time_list">
                        <template v-if="Selected_day === item.day" #right-icon>
                            <van-icon name="success" color="#1989fa"/>
                        </template>
                    </van-cell>
                </van-cell-group>

                <van-row>
                    <van-col span="12">
                        <van-button size="large" @click="ConfirmSelectionTime" type="primary">确认</van-button>
                    </van-col>
                    <van-col span="12">
                        <van-button @click="onConfirm('down_item_1')" size="large">取消</van-button>
                    </van-col>
                </van-row>
            </van-dropdown-item>

            <!--城市-->
            <van-dropdown-item title="城市" ref="down_item_3">
                <van-tree-select
                        @click-nav="getCity"
                        v-model:active-id="activeId"
                        v-model:main-active-index="activeIndex"
                        :items="provincials"/>
                <div>
                    <van-row>
                        <van-col span="12">
                            <van-button size="large" type="primary">确认</van-button>
                        </van-col>
                        <van-col span="12">
                            <van-button @click="onConfirm('down_item_3')" size="large">取消</van-button>
                        </van-col>
                    </van-row>
                </div>
            </van-dropdown-item>

            <van-dropdown-item title="购买名额" ref="down_item_2">
                <van-row>
                    <van-col span="12">
                        <van-button size="large" type="primary">确认</van-button>
                    </van-col>
                    <van-col span="12">
                        <van-button @click="onConfirm('down_item_2')" size="large">取消</van-button>
                    </van-col>
                </van-row>
            </van-dropdown-item>


            <van-dropdown-item title="车型" ref="down_item_2">
                <van-row>
                    <van-col span="12">
                        <van-button size="large" type="primary">确认</van-button>
                    </van-col>
                    <van-col span="12">
                        <van-button @click="onConfirm('down_item_2')" size="large">取消</van-button>
                    </van-col>
                </van-row>
            </van-dropdown-item>
        </van-dropdown-menu>
    </div>
</template>


<script>
import {reactive, ref, toRefs} from 'vue';
import {areaList} from '@vant/area-data';

export default {
    name:'list_Business_NewBropdown',

    setup() {

        const activeId = ref(1); // 城市选择器
        const activeIndex = ref(0); // 城市选择器


        const time_list = [
            {text: '全部', day: 0},
            {text: '一天内', day: 1},
            {text: '一周内', day: 7},
            {text: '半月内', day: 15},
            {text: '一月内', day: 30},
            {text: '三月内', day: 90},
            {text: '半年内', day: 182},
            {text: '一年内', day: 365},
        ]; // 筛选的时间数据

        const down_item = reactive({
            down_item_1: null,
            down_item_2: null,
            down_item_3: null,
        }); // 关闭下拉菜单

        let Selected_day = ref(0) // 当前选中的时间

        let provincials = reactive([{text: '全国', id: 1, children: [{text: '全国', id: '2'}]}]); // 城市列表
        // 用于关闭下拉菜单
        const onConfirm = (item) => {
            down_item[item].toggle();
        };

        // 获取城市id
        const getCity = (item) => {
            console.log(item)
        };

        // 设置选中时间
        function getTime(day) {
            Selected_day.value = day.day
        }

        // 确认选择时间
        function ConfirmSelectionTime() {
            console.log('当前选择时间：', Selected_day.value)
        }



        // 重构城市数据结构 == 开始
        for (let item in areaList.province_list) {
            let provincial = {id: item, text: areaList.province_list[item], children: []}
            let startStr = item.slice(0, 2)
            for (let it in areaList.city_list) {
                if (it.startsWith(startStr)) {
                    provincial.children.push({
                        text: areaList.city_list[it],
                        id: it
                    })
                }
            }
            provincials.push(provincial)
        }
        // 重构城市数据结构 == 结束

        return {
            provincials,
            activeIndex,
            activeId,
            time_list,
            Selected_day,


            ...toRefs(down_item),
            onConfirm,
            getCity,
            getTime,
            ConfirmSelectionTime,


        };
    },
};
</script>

<style scoped>
.dropdown_box {
    position: sticky;
    top: 0;
    z-index: 100;

    .van-button {
        border-radius: unset;
    }
}
</style>