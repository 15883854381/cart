<script setup>
import {deleteShopCarData, SelectShopCartData, submitOrderData} from "@/api/shopCart";
import {onMounted, reactive, ref} from "vue";
import {showNotify} from "vant";
import ShopCartItem from "@/components/ShopCartItem.vue";
import wx from "weixin-js-sdk";
import {errorNotifyBath} from "@/api/clue";
import {useRouter} from "vue-router";
import {Howl} from "howler";
import {useMouse} from "@/hooks/Ulits";

const router = useRouter();
const list = ref([]); // 初始化数据
const priceTotal = ref(0);
const page = reactive({
    pageSize: 10,
    pageNumber: 1,
    pageCount: 0,
})


// 获取仓库数据
function SelectShopCart(data) {
    SelectShopCartData(data).then(res => {
        let {data, mes, code} = res.data
        if (code !== 200) {
            showNotify(mes)
            list.value = []
            priceTotal.value = 0
            return false;
        }
        priceTotal.value = data.priceTotal
        page.pageCount = data.pageTotal
        list.value = [...list.value, ...data.data]
    })
}

// 删除数据
function deleteCartShop(item) {
    deleteShopCarData({clue_id: item['clue_id']}).then(res => {
        let {code, mes} = res.data
        showNotify({
            type: code !== 200 ? 'danger' : 'success',
            message: mes
        })
        if (code === 200) {
            SelectShopCartData().then(res => {
                let {data, code} = res.data
                if (code !== 200) {
                    priceTotal.value = 0
                    page.pageCount = 0
                    list.value = [];
                } else {
                    priceTotal.value = data.priceTotal
                    page.pageCount = data.pageTotal
                    list.value = data.data;
                }

            })
        }
    })
}

let submitBtnLoding = ref(false)

// 提交
function onSubmit() {
    submitBtnLoding.value = true
    submitOrderData().then(res => {
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
                },
                fail: (err) => {
                    // 支付失败得到回调
                    showNotify('支付失败')
                    errorNotifyBath(data.notofyurl)
                }
            })
        })
        submitBtnLoding.value = false
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


let scrollTimr = null;

// 分页
function pageScroll(scroll) {
    if (page.pageCount > list.value.length) {
        useMouse(scroll).then(res => {
            clearTimeout(scrollTimr)
            scrollTimr = setTimeout(() => {

                if (res) {
                    console.log(res)
                    console.log(page)
                    page.pageNumber += 1;
                    SelectShopCart(page)
                }
            }, 200)
        })
    }
}


onMounted(() => {
    SelectShopCart()
})
</script>

<template>
    <div>

        <div class="body_box" @scroll="pageScroll">

            <van-empty description="购物车还没有数据" v-if="priceTotal <= 0"/>
            <ShopCartItem v-for="item in list"
                          :key="item"
                          :user_name="item.user_name"
                          :sex="item.sex?'先生':'女士'"
                          :phone_number="item.phone_number"
                          :PhoneBelongingplace="item.PhoneBelongingplace"
                          :record_file_url="item.record_file_url"
                          :unitPrice_1="item.unitPrice_1"
                          :province="item.province"
                          :brand="item.brand"
                          :city="item.city"
                          :clue_id="item.clue_id"
                          :sales="item.sales"
                          :nonstock="item.nonstock"
                          @deleteCar="deleteCartShop(item)"
                          @startAudio="(value)=>startAudio(value,item)"
            >
            </ShopCartItem>
        </div>
        <div class="botom">
            <van-submit-bar :disabled="priceTotal <= 0" :price="priceTotal" :loading="submitBtnLoding"
                            button-text="立即付款" @submit="onSubmit">
                <template #tip>
                    可能存在多人购买线索的情况，请即时支付购物车中的线索
                </template>
            </van-submit-bar>
        </div>

    </div>
</template>

<style scoped lang="scss">
.body_box {
  height: calc(100vh - 130px);
  background-color: #F6F6F6;
  overflow-y: scroll;
}

.botom {
  .van-submit-bar {
    bottom: 51px;
  }
}
</style>