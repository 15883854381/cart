import {showConfirmDialog, showNotify, showToast} from "vant";
import {loginVerify} from "@/api/utils";
import * as constant from "@/utils/constant";
import router from "@/router";
import {uin_base64, wwwUrl} from "@/utils/constant";
import {WechatAttentionVerification} from "@/api/user_data";
import {useRoute} from 'vue-router'
import {showLoadingToast, closeToast} from 'vant';

/**
 *
 * @param {Array} userDaa 需要验证的字段
 *  @param {Object} data 数据
 * @returns  Boolean
 */
export function verification(userDaa, data) {
    // let userDaa = ["username", "phone_number", "sms"];
    let verification = userDaa.every((item) => {
        return data[item].trim() === "" ? false : true;
    });
    if (!verification) {
        showNotify({type: "danger", message: "请填写完整信息"});
        return false;
    } else {
        return true;
    }
}


//dateTimeStamp是一个时间毫秒，注意时间戳是秒的形式，在这个毫秒的基础上除以1000，就是十位数的时间戳。13位数的都是时间毫秒。

export function timeago(dateTimeStamp) {
    let minute = 1000 * 60;      //把分，时，天，周，半个月，一个月用毫秒表示
    let hour = minute * 60;
    let day = hour * 24;
    let week = day * 7;
    let halfamonth = day * 15;
    let month = day * 30;
    let now = new Date().getTime();   //获取当前时间毫秒
    let diffValue = now - dateTimeStamp;//时间差

    if (diffValue < 0) {
        return;
    }
    let minC = diffValue / minute;  //计算时间差的分，时，天，周，月
    let hourC = diffValue / hour;
    let dayC = diffValue / day;
    let weekC = diffValue / week;
    let monthC = diffValue / month;
    let result = null;
    if (monthC >= 1 && monthC <= 3) {
        result = " " + '2' + "天前"
    } else if (weekC >= 1 && weekC <= 3) {
        result = " " + '2' + "天前"
    } else if (dayC >= 1 && dayC <= 6) {
        result = " " + parseInt(dayC) + "天前"
    } else if (hourC >= 1 && hourC <= 23) {
        result = " " + parseInt(hourC) + "小时前"
    } else if (minC >= 1 && minC <= 59) {
        result = " " + parseInt(minC) + "分钟前"
    } else if (diffValue >= 0 && diffValue <= minute) {
        result = "刚刚"
    } else {
        result = " " + '2' + "天前"
        //  var datetime = new Date();
        //  datetime.setTime(dateTimeStamp);
        // let Nyear = datetime.getFullYear();
        // let Nmonth = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
        // let Ndate = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
        // let Nhour = datetime.getHours() < 10 ? "0" + datetime.getHours() : datetime.getHours();
        // let Nminute = datetime.getMinutes() < 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
        // let Nsecond = datetime.getSeconds() < 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();
        //  result = Nyear + "-" + Nmonth + "-" + Ndate
    }
    return result;
}

// 获取get参数
export function getQueryString(name) {
    const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    const result = window.location.search.substring(1).match(reg);
    if (result != null) {
        return decodeURIComponent(result[2]);
    }
    return null;
}

// 登录状态验证
export async function logVer() {

    let res = await loginVerify()
    switch (res.data.code) {
        case 401:
        case 306:
        case 307:
            showConfirmDialog({
                title: '资料未审核',
                message: `${res.data.mes}`
            }).then(() => {
                router.push('/customer') // /upUserInfo
            })
            return 3058;
        case 308:
            // showDialog({
            //     message: res.data.mes,
            // }).then(() => {
            //     // on close
            // });
            // showNotify({
            //     type: "primary",
            //     message: res.data.mes
            // })
            return 3058;
        case 305:
        case 304:
            if (router.currentRoute.value.path !== '/user_data') {
                showConfirmDialog({
                    title: '登录提醒',
                    message:
                        '您还未登录/注册，请先去登录【登录可查看更多】',
                }).then(() => {
                    router.push('/user_data')
                })
            }
            return 3059;
        case 309:
            // showNotify("你还不具备购买条件，若需购买请联系客服");
            return 3060;
        case 400:
            // showNotify("你还不具备上传条件，若需上传请联系客服");
            return 3061;
        case 200:
            return true;

        // case 306:
        //     showConfirmDialog({
        //         title: '资料审核',
        //         message: `${res.data.mes}`
        //     }).then(() => {
        //         console.log('跳转页面')
        //         // router.push('/user_data')
        //     })
        //     return false;
        //
        // case 305 || 304:
        //     if (router.currentRoute.value.path !== '/user_data') {
        //         showConfirmDialog({
        //             title: '登录提醒',
        //             message:
        //                 '您还未登录/注册，请先去登录【登录可查看更多】',
        //         }).then(() => {
        //             router.push('/user_data')
        //         })
        //     }
        //     return true;
        // case 200:
        //     return true
    }

}

// 判断是否关注关注号
export function followWechat() {
    return new Promise((resolve, reject) => {
        if (sessionStorage.getItem('WechatAttentionVerification')) {
            return false;
        }
        let code = getQueryString('code')
        let route = useRoute();
        let type = route.query.type
        let clue_id = route.query.clue_id
        let url = `${wwwUrl}/#/list_Business_Detail?type=${type}&clue_id=${clue_id}`;
        if (!code) {
            location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${constant.appid}&redirect_uri=${encodeURIComponent(url)}&response_type=code&scope=snsapi_base&state=123#wechat_redi`;
        } else {
            WechatAttentionVerification({code}).then(res => {

                if (res.data.code !== 200) {
                    const toast = showLoadingToast({
                        duration: 0,
                        forbidClick: true,
                        message: '未关注公众号,请先关注公众号\r\n倒计时 3 秒',
                        className: 'LoadingToast',
                        closeOnClick: true
                    });

                    let second = 3;
                    const timer = setInterval(() => {
                        second--;
                        if (second) {
                            toast.message = `未关注公众号,请先关注公众号\r\n倒计时 ${second} 秒`;
                        } else {

                            clearInterval(timer);
                            closeToast();
                            window.location.href = 'https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=' + uin_base64 + '&scene=110#wechat_redirect';
                        }
                    }, 1000);
                    resolve(false)
                } else {
                    sessionStorage.setItem('WechatAttentionVerification', '1')
                    resolve(true)
                }

            })
        }
        console.log(code)
    })
}
