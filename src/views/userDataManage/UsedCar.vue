<template>
    <van-form @submit="onSubmit">
        <van-cell-group inset>

            <van-row>
                <van-col span="14">
                    <van-field
                            v-model="form.user_name"
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
                            <van-radio-group v-model="form.sex" direction="horizontal">
                                <van-radio name="1">男</van-radio>
                                <van-radio name="0">女</van-radio>
                            </van-radio-group>
                        </template>
                    </van-field>
                </van-col>
            </van-row>

            <van-field
                    v-model="form.phone_number"
                    type="number"
                    required
                    name="phone_number"
                    label="联系电话"
                    placeholder="请填写联系电话"
                    @blur="batchUcheck"
                    :rules="[{ required: true,validator:validator, message: '请填写联系电话' }]"
            />
            <van-field
                    v-model="form.BrandTitle"
                    readonly
                    is-link
                    name="CartBrandID"
                    label="购车品牌"
                    placeholder="购车品牌"
                    @click="data.BrandshowPicker = true"
            />
            <van-field
                    v-model="form.province_city"
                    is-link
                    readonly
                    name="province_city"
                    label="购车地区"
                    placeholder="点击选择省市区"
                    @click="data.showArea = true"
            />


            <shuttle :active="props.active" @getSelectTtag="getSelectTtag"></shuttle>

            <div>
                <van-field required name="sales" label="售卖次数">
                    <template #input>
                        <van-radio-group v-model="data.sales" direction="horizontal">
                            <van-radio name="1">1 次</van-radio>
                            <van-radio name="2">2 次</van-radio>
                            <van-radio name="3">3 次</van-radio>
                        </van-radio-group>
                    </template>
                </van-field>
                <template v-for="(item, index) in (Number(data.sales))" :key="item">
                    <div style="display: flex;align-items: center;">
                        <van-field @blur="moneyCheck(item)" type="digit" :maxlength="4" required v-model="list[index]"
                                   :name="'unitPrice_'+index"
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

            </div>

        </van-cell-group>
        <div style="margin: 16px;">
            <van-button round block type="primary" native-type="submit">
                提交
            </van-button>
        </div>
    </van-form>

    <van-popup v-model:show="data.BrandshowPicker" round position="bottom">
        <van-picker :columns-field-names="{ text: 'name', value: 'id', children: 'children' }"
                    @confirm="queryBrandData"
                    title="汽车品牌" :columns="brand"/>
    </van-popup>

    <van-popup position="bottom" v-model:show="data.showArea">
        <van-picker
                @cancel="data.showArea = false" @confirm="onConfirm"
                title="请选择城市"
                :columns="city"
                :columns-field-names="{ text: 'text', value: 'id', children: 'children' }"/>
    </van-popup>
</template>

<script setup>
import {onMounted, reactive, ref, defineProps} from "vue";
import {useRouter} from "vue-router";
import cityOrBrand from '@/hooks/tools'
import shuttle from "@/components/Shuttle.vue";
import {showNotify} from "vant";
import {upOldCartData} from "@/api/oldCart";
import {batchUcheckData} from "@/api/clue";
import {recommend_priceData} from "@/api/order";


let props = defineProps(['active'])
console.log(props)

const router = useRouter()
let form = reactive({
    user_name: '',
    sex: '1',
    phone_number: '',
    CartBrandID: '',
    provinceID: '',
    cityID: '',
    sales: '',
    unitPrice_1: '',
    unitPrice_2: '',
    unitPrice_3: '',
    userTags: [],
})

let {city, brand} = cityOrBrand();
let list = reactive({0: null, 1: null, 2: null});// 多个输入框
let data = reactive({
    sales: '1',
    showArea: false,
    BrandshowPicker: false
})
let Price_data = ref({})

// 确认城市
function onConfirm({selectedOptions}) {
    form.provinceID = selectedOptions[0].id
    form.cityID = selectedOptions[0].id
    form.province_city = selectedOptions.map(item => item.text).join('/')
    data.showArea = false
    recommend_price(selectedOptions[0].id)
}

// 确认品牌
function queryBrandData({selectedOptions}) {
    form.CartBrandID = selectedOptions[0].id
    form.BrandTitle = selectedOptions[0].name
    data.BrandshowPicker = false
    recommend_price(selectedOptions[0].id)
}

// 提交上传数据
function onSubmit(e) {
    if (!priceValidator()) {
        return false;
    }
    let {CartBrandID, provinceID, cityID, userTags} = form
    let updata = {...e, CartBrandID, provinceID, cityID, userTags}
    console.log(updata)
    upOldCartData(updata).then(res => {
        let {code, mes} = res.data
        showNotify({
            type: code === 200 ? 'success' : 'danger',
            message: mes,
        })
        if (code === 200) {
            router.replace('/user_data')
        }
    })
}

/**
 * 验证手机号码是否存在 和 正确
 */
function batchUcheck() {
    let data = validator(form.phone_number)
    if (data) {
        batchUcheckData({phone_number: form.phone_number}).then(res => {
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

const getSelectTtag = e => form.userTags = e // 将标签数据传给 表单
const validator = (val) => /^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/.test(val); // 手机号验证

// 判断线索价格
function priceValidator() {
    let checkNum = Number(data.sales) - 1;
    let num = 0
    for (let i = 0; i <= checkNum; i++) {
        if (Number(list[i]) > 2000) {
            showNotify({type: 'danger', message: '线索金额不能大于 【2000】 元'});
            return false;
        }
        if (i > 0) {
            if (Number(list[i]) > num) {
                showNotify({type: 'danger', message: '价格不能高与上一次'});
                return false;
            }
        }
        num = Number(list[i])
    }
    return true;
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


// 向输入框插入价格
function pushPrice(index, money) {
    console.log(list, index)
    list[index] = money

}

// 价格推荐
function recommend_price(CartBrandID) {
    recommend_priceData({CartBrandID}).then(res => {
        Price_data.value = res.data.data
    })
}

onMounted(() => {
    recommend_price()
})

</script>


<style scoped lang="scss">
.Price_tag {
  width: 100px;
  height: 30px;
}
</style>