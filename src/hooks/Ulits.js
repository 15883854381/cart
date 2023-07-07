import {shareClue} from "@/api/utils";
import wx from "weixin-js-sdk";

// 触底加载
export function useMouse(e) {

    return new Promise((resolve) => {
        let scrollTop = e.target.scrollTop
        let windowHeight = e.target.clientHeight
        let scrollHeight = e.target.scrollHeight


        if (Math.ceil(scrollTop + windowHeight) >= parseInt(scrollHeight)) {
            resolve(true)
        } else {
            resolve(false)
        }

    })

}

// 分享功能
export function UlitsShare(){
    let save = {
        url: location.href.split('#')[0] // 只需要传当前页面地址
    };
    shareClue(save).then(res => {
        let {data, code} = res.data;
        if (code !== 200) {
            return false;
        }
        wx.config({
            debug: false,
            appId: data.appId,  // appID 公众号的唯一标识
            timestamp: data.timestamp, // 生成签名的时间戳
            nonceStr: data.noncestr, //  生成签名的随机串
            signature: data.signature, // 生成的签名
            jsApiList: ['onMenuShareAppMessage']
        });

        wx.ready(() => {
            let shareData = {
                title: `汽车线索助手联盟`,
                desc: `汽车购车线索共享平台`,
                link: location.href, // 分享后的地址
                imgUrl: 'https://wx.qlogo.cn/mmopen/fc1ljSVWaib9pFQd4BSdYss8QmTcQX6p6NqicNGS6m7ABXqvgPNxKeW5KWvAmwIK229Nm7z5cWaPct8V5lhzQsEzGNUyLya01z/64',
            };
            //点击要去分享
            wx.onMenuShareAppMessage(shareData);
            // wx.updateTimelineShareData(shareData);
        });
    });
}