<template>
    <div>
        <van-dropdown-menu ref="menuRef" :close-on-click-overlay="false" :close-on-click-outside="false">
            <van-dropdown-item title="地区" ref="itemRef1">
                <van-tree-select
                        v-model:active-id="form.cityId"
                        v-model:main-active-index="activeIndex"
                        :items="CityData"
                        @click-item="CityDataClick"
                />
                <div style="display: flex;justify-content: space-between">
                    <van-button type="default" block @click="reset(1)">重置</van-button>
                    <van-button type="primary" block @click="formData(1)">确认</van-button>
                </div>
            </van-dropdown-item>
            <van-dropdown-item title="品牌" ref="itemRef2">
                <div class="box_mex">
                    <van-checkbox-group v-model="form.brandId">
                        <van-cell-group inset>
                            <van-cell
                                    v-for="(item, index) in BrandData"
                                    clickable
                                    :key="item"
                                    :title="`${item.name}`"
                                    @click="getMenuBrandItem(item,index)">
                                <template #right-icon>
                                    <van-checkbox :name="item.id" :ref="el => checkboxRefs[index] = el"
                                                  @click.stop/>
                                </template>
                            </van-cell>
                        </van-cell-group>
                    </van-checkbox-group>
                </div>

                <div style="display: flex;justify-content: space-between">
                    <van-button type="default" block @click="reset(2)">重置</van-button>
                    <van-button type="primary" block @click="formData(2)">确认</van-button>
                </div>
            </van-dropdown-item>
            <van-dropdown-item title="其他" ref="itemRef3">
                <div class="margin_box">
                    <div class="box">
                        <div class="divs">
                            <van-row>
                                <van-col span="12">
                                    <van-field class="border" v-model="form.minPric" label="最小价格"/>
                                </van-col>
                                <van-col span="12">
                                    <van-field label="最大价格" class="border" v-model="form.maxPric"/>
                                </van-col>
                            </van-row>
                        </div>
                        <van-cell class="border bottom_box" title="日期范围" :value="form.activeDate"
                                  @click="Dialog.calendarBox = true"/>

                        <van-field name="radio" label="车辆类型">
                            <template #input>
                                <van-radio-group v-model="form.cartType" direction="horizontal">
                                    <van-radio name="1">新车</van-radio>
                                    <van-radio name="2">二手车</van-radio>
                                </van-radio-group>
                            </template>
                        </van-field>
                    </div>
                    <div style="display: flex;justify-content: space-between">
                        <van-button type="default" block @click="reset(3)">重置</van-button>
                        <van-button type="primary" block @click="formData(3)">确认</van-button>
                    </div>
                </div>
            </van-dropdown-item>

        </van-dropdown-menu>
        <van-calendar :min-date="calendar.minDate" :max-date="calendar.maxDate" v-model:show="Dialog.calendarBox"
                      first-day-of-week="2" type="range" @confirm="onConfirmDate"
                      :show-confirm="false"/>
    </div>
  <!-- 列表item   -->
    <div class="body_box" @scroll="pageScroll">
        <van-empty description="没有所筛选的数据" v-if="page.pageCount <= 0"/>
        <productlistItem v-for="item in list"
                         :key="item"
                         :user_name="item.user_name"
                         :sex="item.sex?'先生':'女士'"
                         :phone_number="item.phone_number"
                         :PhoneBelongingplace="item.PhoneBelongingplace"
                         :unitPrice_1="item.unitPrice_1"
                         :province="item.province"
                         :brand="item.brand"
                         :record_file_url="item.record_file_url"
                         :city="item.city"
                         :clue_id="item.clue_id"
                         :sales="item.sales"
                         @startAudio="(value)=>startAudio(value,item)"
                         @addCart="addCart(item)"
        >
            @click="playMusic(item)"

        </productlistItem>
    </div>
  <!-- 浮标   -->
    <div class="icon_car">
        <!--        <span>-->
        <!--            <van-icon name="orders-o" @click="cartBatch" size="30px" color="#333"/>-->

        <!--        </span>-->

        <span>
            <van-icon name="shop-o" @click="router.push('/Shoppingcart')" size="30px" color="#333"/>
        </span>
    </div>

  <!-- 圆角弹窗（底部） -->
    <van-popup
            v-model:show="Dialog.showBottom"
            round
            title="批量购买"
            position="bottom"
            :style="{ height: '60%' }"
    >
        <van-cell-group>
            <van-collapse v-model="activeName" accordion>
                <van-collapse-item title="地区" :value="'选中城市：'+combinationCity.size" name="1">
                    <span>{{ CityStr }}</span>
                </van-collapse-item>
                <van-collapse-item title="品牌" :value="'选中品牌：'+ combinationBrand.size" name="2">
                    <span>{{ BrandStr }}</span>
                </van-collapse-item>
            </van-collapse>
            <van-cell title="日期范围" :value="form.activeDate"/>
            <van-cell title="价格区间" :value="form.minPric + ' - ' + form.maxPric"/>
            <van-cell title="汽车类型" :value="form.cartType==='1'?'新车':'二手车'"/>
            <van-cell title="线索数量">
                <span class="price_font">{{ page.pageCount }}/条</span>
            </van-cell>
        </van-cell-group>
        <!--筛选面板-->
        <div class="saixun">
            <van-submit-bar :price="priceTotal" button-text="提交订单" @submit="Buynow"/>
        </div>
    </van-popup>
</template>

<script setup>
//===== 组件 ==============
import productlistItem from '@/components/productlistItem.vue'
//===== 组件 ==============
// ======== 方法 start =========
import {onBeforeUpdate, onMounted, reactive, ref} from 'vue';
import CityBrand from "@/hooks/tools";
import dayjs from "dayjs";
import {BulkbuyingData, BuyNowData, errorNotifyBath, price_computeData} from "@/api/clue";
import {showDialog, showNotify} from "vant";
import {Howl} from "howler";
import wx from "weixin-js-sdk";
import WxPay from "@/utils/wxPay";
import {useRouter} from "vue-router";
import {addShopCartData} from "@/api/shopCart";
import {useMouse} from "@/hooks/Ulits";
// ======== 方法  end =========
const router = useRouter();
const menuRef = ref(null);
const itemRef1 = ref(null);
const itemRef2 = ref(null);
const itemRef3 = ref(null);
const activeIndex = ref(0);
const checkboxRefs = ref([]);
let list = ref([]);// 线索列表
const Dialog = reactive({calendarBox: false, showBottom: false}) // 弹窗的显示和隐藏
const form = reactive({
    minPric: 0,
    maxPric: 0,
    activeDate: '',
    brandId: [],
    cityId: [],
    cartType: '1',
})// 填写的表单数据

const page = reactive({
    pageSize: 10,
    pageNumber: 1,
    pageCount: 0,
})

// 日历的日期格式化 只需要半月的日期
const calendar = {
    minDate: new Date(dayjs().subtract(15, 'day').format('YYYY-MM-DD')),
    maxDate: new Date(dayjs().format('YYYY-MM-DD'))
}

// 格式化日期
const formatDate = (date) => dayjs(date).format('YYYY-MM-DD');
// 获取的日期数据
const onConfirmDate = (values) => {
    const [start, end] = values;
    Dialog.calendarBox = false;
    form.activeDate = `${formatDate(start)} - ${formatDate(end)}`;
};


let BrandStr = ref(""); // 将品牌数据拼接字符串
let combinationBrand = reactive(new Set([]));

// 获取品牌的ID
function getMenuBrandItem(item, index) {
    console.log(item)
    combinationBrand.has(item.name) ? combinationBrand.delete(item.name) : combinationBrand.add(item.name)
    BrandStr.value = Array.from(combinationBrand).join(' 、 ')
    checkboxRefs.value[index].toggle();
}

let CityStr = ref("");
let combinationCity = new Set([])

// 拼接 城市数据 成都、绵阳
function CityDataClick(item) {
    combinationCity.has(item.text) ? combinationCity.delete(item.text) : combinationCity.add(item.text)
    CityStr.value = Array.from(combinationCity).join(' 、 ')
}


// 获取所有的表单数据 并提交
function formData(num) {
    switch (num) {
        case 1:
            itemRef1.value.toggle();
            break
        case 2:
            itemRef2.value.toggle();
            break
        case 3:
            itemRef3.value.toggle();
            break
    }
    Bulkbuying(form)
}

// 重置数据
function reset(num) {
    switch (num) {
        case 1:
            form.cityId = []
            itemRef1.value.toggle();
            break
        case 2:
            form.brandId = []
            itemRef2.value.toggle();
            break
        case 3:
            form.maxPric = 0;
            form.minPric = 0;
            form.activeDate = ""
            form.cartType = '1'
            itemRef3.value.toggle();
            break
    }
    Bulkbuying(form)
}

// 请求数据
function Bulkbuying(data) {
    BulkbuyingData(data).then(res => {
        let {code, mes, data} = res.data
        if (code !== 200) {
            showNotify(mes)
            list.value = []
            page.pageCount = 0
            return false
        }
        list.value = data.data
        page.pageCount = data.total
    })
}

let playAudioData = {};
let sound = {};

// 播放和暂停 录音
function startAudio(state, item) {

    if (!item.record_file_url) {
        showNotify('没有录音')
        return false;
    }

    if (playAudioData.clue_id !== state.clue_id) {
        playAudioData.state = false
        if (Object.keys(sound).length !== 0) {
            sound.stop()
        }
    }
    state.state = !state.state
    playAudioData = state;

    if (state.state) {
        sound = new Howl({
            src: item.record_file_url,
            html5: true,
            onload: function () {
                showNotify({
                    type: 'success',
                    message: `开始播放【${item.user_name}${item.sex ? '先生' : '女士'}】的录音`
                })
            },
            onend() {
                showNotify({
                    type: 'success',
                    message: `【${item.user_name}${item.sex ? '先生' : '女士'}】录音播放完毕了`
                })
            },
        })
        sound.play()
    } else {
        sound.stop()
    }

}


let priceTotal = ref(0);

// 浮标 批量购买
function cartBatch() {
    // 获取当期筛选的线索价格
    price_computeData(form).then(res => {
        let {data} = res.data;
        priceTotal.value = data
    })
    Dialog.showBottom = true
}

// 立即购买
function Buynow() {

    if (!page.pageCount) {
        showNotify('没有数据')
        return false;
    }

    BuyNowData(form).then(res => {
        let {data} = res
        wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: data.appId, // 必填，公众号的唯一标识
            timestamp: data.timestamp, // 必填，生成签名的时间戳
            nonceStr: data.nonceStr, // 必填，生成签名的随机串
            signature: data.paySign, // 必填，签名，见附录1
            jsApiList: ["chooseWXPay"], // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        });
        // // 配置完成后返回一个resolve
        wx.ready(() => {
            wx.chooseWXPay({
                timestamp: data.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                nonceStr: data.nonceStr, // 支付签名随机串，不长于 32 位
                package: data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
                signType: data.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                paySign: data.paySign, // 支付签名
                success: (res) => {
                    router.push('/my_Clue');
                },
                cancel: (res) => {
                    // 取消支付后的回调函数
                    showNotify('已取消支付')
                    errorNotifyBath(data.notofyurl)
                    Dialog.showBottom = false
                },
                fail: (err) => {
                    // 支付失败得到回调
                    showNotify('支付失败')
                    errorNotifyBath(data.notofyurl)
                    Dialog.showBottom = false
                }
            })
        })
    })
}

// let carDataItem = reactive(new Set([]))

// 添加购物车
function addCart(item) {
    // carDataItem.add(item)
    addShopCartData({clue_id: item.clue_id}).then(res => {
        let {code, mes} = res.data
        if (code === 200) {
            showNotify({
                type: 'success',
                message: `【${item.user_name}${item.sex === 1 ? '先生' : '女士'}】线索成功添加到仓库`
            })
        } else {
            showNotify(mes)
        }
    })
}


let scrollTimr = null;

// 分页
function pageScroll(scroll) {
    if (page.pageCount > list.value.length) {
        useMouse(scroll).then(res => {
            clearTimeout(scrollTimr)
            scrollTimr = setTimeout(() => {
                if (res) {
                    page.pageNumber += 1;
                    BulkbuyingData({...page, ...form}).then(res => {
                        let {data} = res.data
                        list.value = [...list.value, ...data.data];
                        page.pageCount = data.total
                    })
                }
            }, 200)
        })
    }
}


let BrandData = []; // 品牌数据
let CityData = []; // 城市数据

onMounted(() => {
    // hooks 城市数据
    CityBrand().then(res => {
        BrandData = res.brand.value
        CityData = res.city.value
    })
    Bulkbuying();
})

onBeforeUpdate(() => {
    checkboxRefs.value = [];
});

const activeName = ref('');
</script>


<style scoped lang="scss">
.divs {
  align-items: center;
  padding: 10px 0;
}

.margin_box {
  padding-top: 10px;
}

.box {
  height: 180px;
  background-color: #F5F8F7;
  padding-top: 10px;

  .van-button {
    border-radius: unset;
  }
}

.bottom_box {
  margin-bottom: 10px;

  .van-button--block {
    border-radius: unset;
  }
}

.box_mex {
  height: 300px;
  overflow-y: scroll;
}

.body_box {
  height: calc(100vh - 52px - 50px);
  background-color: #F6F6F6;
  overflow-y: scroll;
}

.icon_car {
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  right: 15px;
  bottom: 125px;
  z-index: 100;
  background-color: rgba(204, 204, 204, 0.5);
  padding: 4px 0;
  border-radius: 5px;

  span {
    margin: 5px;
  }
}

.saixun {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;

  .van-button {
    border-radius: unset;
  }
}

.price_font {
  font-size: 16px;
  color: #E60000;
  font-weight: bold;
}
</style>