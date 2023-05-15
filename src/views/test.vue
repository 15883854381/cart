<template>
    <div>
        <van-button type="primary" @click="test">立即支付</van-button>
        <van-button type="primary" @click="city">获取物理位置</van-button>
    </div>

</template>

<script>
import axios from '../utils/http'
import WxPay from "@/utils/wxPay";
import wx from 'weixin-js-sdk'

export default {
    name: "test",
    setup() {
        let prepay_id = '';

        function test() {
            axios.post('/Payment/getCode').then(res => {
                console.log(res)
                WxPay.getWxPaySign({
                    prepay_id: res.data
                }).then((data) => {
                    console.log("我是请求第一个接口后的参数", data)
                    // 配置成功后发起微信支付
                    goPay(data, res.data)
                })
            })
        }

        function goPay(data, package_id) {
            let res = {
                timestamp: data.timestamp,
                nonceStr: data.nonceStr,
                package: "prepay_id=" + package_id.replace(/\"/g, ""),
                signType: data.signType,
                paySign: data.paySign
            }
            WxPay.wxPay(res).then((res) => {
                alert("我成功了")
                // 支付成功
                console.log(res)
            }).catch((err) => {
                alert("失败了")
                // 支付失败
                console.log(err)
            })
        }

        function city() {
            wx.getLocation({
                type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                success: function (res) {
                    console.log(res)
                    alert(res.latitude)

                }
            });
        }


        return {
            test,
            prepay_id,
            city
        };
    }
}
</script>

<style scoped>

</style>