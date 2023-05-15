import wx from 'weixin-js-sdk'
import http from '../utils/http'

export default {
    // 获取微信支付SDK的签名
    getWxPaySign(params) {
        return new Promise((resolve) => {
            // 发起请求获取签名
            http.post('/Order/queryOrder', params).then((data) => {
                data = data.data
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
                    resolve(data)
                })
            })
        })
    },

    // 发起微信支付
    wxPay(params) {
        return new Promise((resolve, reject) => {
            // 调用微信支付
            wx.chooseWXPay({
                timestamp: params.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                nonceStr: params.nonceStr, // 支付签名随机串，不长于 32 位
                package: params.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
                signType: params.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                paySign: params.paySign, // 支付签名
                success: (res) => {
                    // 支付成功时返回resolve
                    resolve(res)
                },
                fail: (err) => {
                    // 支付失败时返回reject
                    reject(err)
                }
            })
        })
    }
}