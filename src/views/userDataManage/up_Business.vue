<template>


    <van-tabs v-model:active="active" @click-tab="onClickTab">
        <van-tab title="新车">
            <van-form @submit="onSubmit">
                <van-cell-group inset>
                    <van-row>
                        <van-col span="14">
                            <van-field
                                    v-model="user_name"
                                    name="user_name"
                                    required
                                    :maxlength="1"
                                    label="用户（姓）"
                                    placeholder="请填写用户（姓）"
                                    :rules="[{ required: true, message: '请填写用户（姓）' }]"
                            />
                        </van-col>
                        <van-col span="10">
                            <van-field required name="sex"
                                       :rules="[{ required: true, message: '请选择用户性别' }]">
                                <template #input>
                                    <van-radio-group v-model="sex" direction="horizontal">
                                        <van-radio name="1">男</van-radio>
                                        <van-radio name="0">女</van-radio>
                                    </van-radio-group>
                                </template>
                            </van-field>
                        </van-col>
                    </van-row>
                    <!--                    <van-field-->
                    <!--                            v-model="phone_number"-->
                    <!--                            required-->
                    <!--                            name="phone_number"-->
                    <!--                            label="联系电话"-->
                    <!--                            :maxlength="11"-->
                    <!--                            placeholder="请填写联系电话"-->
                    <!--                            type="number"-->
                    <!--                            :rules="[{ required: true,validator:validator, message: '请输入正确的用户手机号码' }]"-->
                    <!--                    />-->
                    <van-field
                            v-model="phone_number"
                            type="number"
                            required
                            name="phone_number"
                            label="联系电话"
                            placeholder="请填写联系电话"
                            @blur="batchUcheck"
                            :rules="[{ required: true,validator:validator, message: '请输入正确的用户手机号码' }]"
                    />

                    <van-field
                            v-model="BrandTitle"
                            readonly
                            is-link
                            name="BrandTitle"
                            label="购车品牌"
                            placeholder="购车品牌"
                            @click="getBrand"
                    />
                    <van-popup v-model:show="BrandshowPicker" round position="bottom">
                        <van-picker :columns-field-names="{ text: 'name', value: 'id', children: 'children' }"
                                    @confirm="queryBrandData"
                                    @change="selectBrand" title="汽车品牌" :columns="Brand_List"/>
                    </van-popup>


                    <van-field
                            v-model="province_city"
                            is-link
                            readonly
                            name="province_city"
                            label="购车地区"
                            placeholder="点击选择省市区"
                            @click="showArea = true"
                    />

                    <van-popup v-model:show="showArea" position="bottom">
                        <van-picker
                                @cancel="showArea = false" @confirm="onConfirm"
                                title="请选择城市"
                                :columns="city"
                                :columns-field-names="{ text: 'text', value: 'id', children: 'children' }"/>
                    </van-popup>


                    <shuttle @getSelectTtag="getSelectTtag" :active="active"></shuttle>
                    <van-field required name="radio" label="售卖次数">
                        <template #input>
                            <van-radio-group v-model="sales" direction="horizontal">
                                <van-radio name="1">1 次</van-radio>
                                <van-radio name="2">2 次</van-radio>
                                <van-radio name="3">3 次</van-radio>
                            </van-radio-group>
                        </template>
                    </van-field>
                    <template v-for="(item, index) in (Number(sales))" :key="item">
                        <div style="display: flex;align-items: center;">
                            <van-field @blur="moneyCheck(item)" type="digit" :maxlength="4" required
                                       v-model="list[index]"
                                       :name="'price_'+index"
                                       :label="`【${index + 1 }】次价`"
                                       :placeholder="`请填第【${index + 1 }】次价格`"
                                       :rules="[{ required: true, message: `请填第【${index + 1 }】次价格` }]"/>

                            <template v-if="Price_data !== null">
                                <van-tag
                                        @click="pushPrice(index,Price_data['unitPrice_' + (Number(index) + 1)])"
                                        class="Price_tag" type="primary" size="small">
                                    推荐：{{ Price_data['unitPrice_' + (Number(index) + 1)] }} 元
                                </van-tag>
                            </template>


                        </div>

                    </template>

                </van-cell-group>
                <div class="push_btn">
                    <van-button round block type="primary" :disabled="updisabled" native-type="submit">立即发布
                    </van-button>
                </div>
            </van-form>

        </van-tab>
        <van-tab title="二手车">
            <UsedCar :active="active"></UsedCar>
        </van-tab>
    </van-tabs>


</template>

<script>
import {ref, reactive, toRefs, onMounted} from "vue";
import {areaList} from '@vant/area-data';
import {showNotify, showToast} from 'vant';
import shuttle from "@/components/Shuttle.vue";
import {batchUcheckData, upClue} from "@/api/clue";
import {CartBand, City} from "@/api/utils";
import router from "@/router";
import UsedCar from "@/views/userDataManage/UsedCar.vue";
import {recommend_priceData} from "@/api/order";


export default {
    name: "up_Business",
    components: {
        shuttle,
        UsedCar
    },
    setup() {
        let city = ref(null);


        const active = ref(0);
        let show = ref(true)
        const showArea = ref(false);
        let checked = ref('1'); // 售卖次数的价格
        let list = reactive({0: null, 1: null, 2: null});// 多个输入框
        let upData = reactive({
            user_name: '',
            phone_number: '',
            sex: '1',
            CartBrandID: '',
            BrandTitle: '',
            provinceID: '',
            cityID: '',
            province_city: '',
            sales: '1',
            userTags: [],
        }) // 表单数据
        let updisabled = ref(false);
        let BrandshowPicker = ref(false)
        let Brand_List = ref([]);
        let Price_data = ref({});

        // 城市数据 重构
        const onConfirm = ({selectedOptions}) => {
            showArea.value = false;
            upData.provinceID = selectedOptions[0].id
            upData.cityID = selectedOptions[0].id
            upData.province_city = selectedOptions.map(item => item.text).join('/')
        };

        // tab 切换
        const onClickTab = ({title}) => showToast(title);

        // 显示汽车品牌弹窗
        function getBrand() {
            BrandshowPicker.value = true
        }

        function getSelectTtag(e) {
            upData.userTags = e
        }

        // ==============  处理 品牌 ============== 开始
        // 监听 品牌的选中
        function selectBrand({selectedOptions}) {
            upData.CartBrandID = selectedOptions[0].id
            upData.BrandTitle = selectedOptions[0].name
            recommend_price(upData.CartBrandID)
        }

        // 确认 品牌的选中
        function queryBrandData({selectedOptions}) {
            upData.CartBrandID = selectedOptions[0].id
            upData.BrandTitle = selectedOptions[0].name
            BrandshowPicker.value = false
            recommend_price(upData.CartBrandID)

        }

        // ==============  处理 品牌 ============== 结束

        // 表单提交数据
        function onSubmit() {
            updisabled.value = true;
            let checkNum = Number(upData.sales) - 1;
            let num = 0
            for (let i = 0; i <= checkNum; i++) {
                console.log(list[i])
                if (Number(list[i]) > 2000) {
                    showNotify({type: 'danger', message: '线索金额不能大于 【2000】 元'});
                    updisabled.value = false;
                    return false;
                }
                upData[`unitPrice_${i + 1}`] = list[i]
                if (i > 0) {
                    if (Number(list[i]) > num) {
                        showNotify({type: 'danger', message: '价格不能高与上一次'});
                        updisabled.value = false;
                        return false;
                    }
                }
                num = Number(list[i])
            }
            console.log(upData)
            // 上传线索
            upClue(upData).then((res) => {
                let {code, mes} = res.data
                if (!(code === '200')) {
                    showNotify({type: 'danger', message: mes});
                    updisabled.value = false;
                } else {
                    showNotify({type: 'success', message: mes});
                    router.replace('/user_data')
                }
            })
        }

        /**
         * 验证手机号码是否存在 和 正确
         */
        function batchUcheck() {
            let data = validator(upData.phone_number)
            if (data) {
                batchUcheckData({phone_number: upData.phone_number}).then(res => {
                    let {code, mes} = res.data
                    if (code !== 200) {
                        showNotify({
                            type: "danger",
                            message: mes
                        })
                    }
                })
            }
        }

        async function get_CityOrCar() {
            // 城市数据
            City().then((res) => {

                city.value = res.data.data
            })
            // 汽车品牌数据
            CartBand().then((res) => {
                Brand_List.value = res.data.data
            });
        }

        // 验证金额 是否正确
        function moneyCheck(e) {
            let k = 1;
            let money = 0;
            for (let i in list) {
                if (Number(list[i]) > money && money !== 0) {
                    showNotify({
                        type: 'danger',
                        message: `当前金额不能大于第【${i}】次`,
                    })
                    break
                }
                money = Number(list[i])
                console.log(list[i])
                if (e === k) {
                    break
                }
                k += 1
            }
        }

        // 价格推荐
        function recommend_price(CartBrandID) {
            recommend_priceData({CartBrandID}).then(res => {
                console.log(res)
                Price_data.value = res.data.data
            })
        }

        onMounted(() => {
            get_CityOrCar()
            recommend_price()
        })

        // 向输入框插入价格
        function pushPrice(index, money) {
            list[index] = money

        }

        // 验证 ================= 开始
        // 手机号码验证 (号段)
        const validator = (val) => /^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/.test(val);
        // 用户名验证
        const Uservalidator = (val) => (val.length < 2);
        // 表单验证 ================= 结束

        return {
            areaList,// 城市数据
            getBrand,
            onSubmit,
            onConfirm,
            validator,
            Uservalidator,
            onClickTab,
            queryBrandData,
            getSelectTtag,
            updisabled,
            showArea,
            active,
            show,
            checked,
            list,
            Brand_List,
            BrandshowPicker,
            selectBrand,
            ...toRefs(upData),
            city,
            batchUcheck,
            moneyCheck,
            Price_data,
            pushPrice


        }
    }
}
</script>

<style scoped>
.push_btn {
    position: fixed;
    bottom: 65px;
    left: 0;
    right: 0;
}

.Price_tag {
    width: 100px;
    height: 30px;
}
</style>