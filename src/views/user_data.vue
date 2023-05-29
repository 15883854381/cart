<template>
    <div class="margin_box">


        <!-- <a
          href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxf02c02843479d12a&redirect_uri=http%3A%2F%2F192.168.0.112%3A8082%2Fuser_data&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect"
          >455655665</a
        > -->
        <div class="my-box" v-cloak>
            <div class="m-head">
                <div class="m-head-img">
                    <van-image round width="55px" height="55px" :src="userInfo.headimgurl"/>
                </div>
                <div class="m-head-user" v-if="userInfo.nickName">
                    <div class="m-head-name">{{ userInfo.nickName }}</div>
                    <div class="m-head-tag">{{ userInfo.phone_number }}</div>
                </div>
                <div class="m-head-user" v-else>
                    <div
                            class="m-head-name"
                            @click="getUserProfile"
                            type="button"
                            open-type="chooseAvatar">
                        登录/注册
                    </div>
                </div>
                <div class="m-head-edit-user"
                     @click="jumpUserCenter"
                     v-if="userInfo.nickName">
                    <text class="m-head-edit-user-font"></text>
                </div>
            </div>

            <div class="user_info_money">
                <div class="user_padding_box">
                    <div class="user_num">{{ UserInfoD.clueCount || 0 }}</div>
                    <div class="user_text">发布</div>
                </div>
                <div class="user_padding_box">
                    <div class="user_num" style="color:red;">
                        {{ UserInfoD.orderCount ? `${UserInfoD.orderCount}.00` : '0.00' }}
                    </div>
                    <div class="user_text">收益</div>
                </div>
                <div class="user_padding_box">
                    <div class="user_num">{{ UserInfoD.shareCount || 0 }}</div>
                    <div class="user_text">分享</div>
                </div>
            </div>

            <div class="box_menu">
                <van-grid :border="false">
                    <van-grid-item icon="upgrade" @click="toUrl('/up_Business')" text="上传线索"/>
                    <van-grid-item icon="orders-o" @click="toUrl('/my_Clue')" text="我的订单"/>
                    <van-grid-item icon="coupon-o" @click="toUrl('/UpOrder')" text="我的线索"/>
                    <van-grid-item icon="balance-o" @click="toUrl('/income')" text="累计收益"/>
                    <van-grid-item icon="share-o" @click="toUrl('/share')" text="我的分享"/>
                    <van-grid-item icon="edit" @click="toUrl('/upUserInfo')" text="审核信息"/>
                    <van-grid-item icon="service-o" to="/customer" text="联系客服"/>
                    <van-grid-item icon="replay" @click="clearData" text="退出登录"/>
                </van-grid>
            </div>
            <!--            <div class="logout">-->
            <!--                <van-button @click="clearData" color="linear-gradient(to right, #ff6034, #ee0a24)" block>退出登录-->
            <!--                </van-button>-->
            <!--            </div>-->


            <!-- 充值盒子 -->
            <!--        <div class="Topup">-->
            <!--            &lt;!&ndash; 余额 &ndash;&gt;-->
            <!--            <van-cell title="账户余额">-->
            <!--                <template v-slot:value>-->
            <!--          <span class="money-font"-->
            <!--          >{{ userInfo.balance || "0.00" }}&nbsp;元</span-->
            <!--          >-->
            <!--                </template>-->
            <!--            </van-cell>-->
            <!--            &lt;!&ndash; 支付 &ndash;&gt;-->
            <!--            <van-row class="money_input">-->
            <!--                <van-col span="18">-->
            <!--                    <van-field-->
            <!--                            class="money_input-border"-->
            <!--                            value="0.00"-->
            <!--                            type="number"-->
            <!--                            label="充值金额"-->
            <!--                            placeholder="请选择充值金额"/>-->
            <!--                </van-col>-->
            <!--                <van-col span="6" class="money_input_btn">-->
            <!--                    <van-button type="primary">立即支付</van-button>-->
            <!--                </van-col>-->
            <!--            </van-row>-->


            <!--            <div>-->
            <!--                <van-row gutter="20" class="tag_box">-->
            <!--                    <van-col span="8" class="tag_content">-->
            <!--                        <van-tag plain class="tag_size" type="success">39元</van-tag>-->
            <!--                    </van-col>-->
            <!--                    <van-col span="8" class="tag_content">-->
            <!--                        <van-tag plain class="tag_size" type="success">39元</van-tag>-->
            <!--                    </van-col>-->
            <!--                    <van-col span="8" class="tag_content">-->
            <!--                        <van-tag plain class="tag_size" type="success">39元</van-tag>-->
            <!--                    </van-col>-->
            <!--                    <van-col span="8" class="tag_content">-->
            <!--                        <van-tag plain class="tag_size" type="success">39元</van-tag>-->
            <!--                    </van-col>-->
            <!--                    <van-col span="8" class="tag_content">-->
            <!--                        <van-tag plain class="tag_size" type="success">39元</van-tag>-->
            <!--                    </van-col>-->
            <!--                    <van-col span="8" class="tag_content">-->
            <!--                        <van-tag plain class="tag_size" type="success">39元</van-tag>-->
            <!--                    </van-col>-->
            <!--                </van-row>-->
            <!--            </div>-->
            <!--        </div>-->


            <!--        <van-cell-group>-->
            <!--            <van-cell title="上传线索" @click="toUrl('/up_Business')" is-link/>-->
            <!--            <van-cell title="我的购买订单" @click="toUrl('/my_Clue')" is-link/>-->
            <!--            <van-cell title="我上传的线索" @click="toUrl('/UpOrder')" is-link/>-->
            <!--            <van-cell title="我的分享" @click="toUrl('/share')" is-link/>-->
            <!--            <van-cell title="上传审核信息" to="/upUserInfo" is-link/>-->
            <!--            <van-cell title="联系客服" to="/customer" is-link/>-->
            <!--            <van-cell title="关于我们" is-link/>-->
            <!--            <van-cell title="退出登录" @click="clearData" is-link/>-->
            <!--            &lt;!&ndash;            <van-cell title="测试用" to="/test" is-link/>&ndash;&gt;-->
            <!--        </van-cell-group>-->
            <!-- 弹出层 confirmBtn 确认按钮 -->
            <van-dialog
                    v-model:show="shows"
                    title="登录/注册"
                    @confirm="confirmBtn"
                    show-cancel-button
                    :before-close="confirmBtn">
                <van-cell-group inset>
                    <van-field
                            v-model="userInfo.phone_number"
                            required
                            type="number"
                            label="手机号"
                            placeholder="请输入手机号"/>

                    <van-field
                            v-model="userInfo.code"
                            center
                            clearable
                            required
                            label="短信验证码"
                            placeholder="请输入短信验证码"
                    >
                        <template #button>
                            <van-button
                                    class="defalt_edit_btn"
                                    :disabled="codeBtnDisabled"
                                    @click="sendCodeBtn"
                                    size="small"
                                    type="primary"
                            >{{
                                timeNumber < 60 ? timeNumber + "  s" : "发送验证码"
                                }}
                            </van-button
                            >
                        </template>
                    </van-field>
                    <div class="van-cell van-cell--center van-field">
                        <van-checkbox v-model="empower" icon-size="15px"><small>同意授权信息</small></van-checkbox>
                        <span @click="showempowerBox" style="color:#0077aa;">【信息安全法】</span>
                    </div>

                </van-cell-group>
            </van-dialog>
        </div>
    </div>
</template>

<script>
import {onMounted, reactive, ref, toRaw} from "vue";
import {getQueryString, verification} from "../utils/tool";
import {showConfirmDialog, showDialog, showNotify} from "vant";
import {useRouter} from "vue-router";
import {getUserInfo, getcode, sendcode, UserInfoData} from "../api/user_data";
import {logVer} from "@/utils/tool";
import {appid, wwwUrl} from "@/utils/constant";
import {loginVerify} from "@/api/utils";

export default {
    setup() {

        const router = useRouter();
        let userInfo = reactive({
            nickName: "",
            headimgurl: "",
            phone_number: "",
            balance: 0.0,
            code: "", // 验证码
        });
        let empower = ref(false)
        let codeBtnDisabled = ref(false);
        let timeNumber = ref(60); // 倒计时
        let shows = ref(false);
        let stateShow = ref(false);
        let UserInfoD = ref({});

        // 确认按钮 confirmBtn
        function confirmBtn(action) {
            //  弹出关闭前进行验证 并阻止关闭弹出  默认关闭弹出   开始
            if (action !== "confirm") {
                return true;
            }

            if (!empower.value) {
                showNotify('你还没有同意授权信息');
                return false
            }
            //  结束

            // 页面跳转授权时，返回当前页面时 之前填写的数据会丢失 == 开始
            localStorage.setItem("userInfo", JSON.stringify(toRaw(userInfo)));
            // 页面跳转授权时，返回当前页面时 之前填写的数据会丢失 == 结束

            // feedback 反馈状态
            if (!verification(["phone_number", "code"], userInfo)) return false;
            // 判断locastrage中是否存在 userid
            if (localStorage.getItem('userid')) {
                userInfo.userid = localStorage.getItem('userid')
            }

            // 向后端发送请求 验证 code 并跳转到 头像授权页面
            getcode(userInfo).then((res) => {
                let {code} = res.data;
                // 200 表示登录成功  201 验证成功并跳转
                switch (code) {
                    case 200:
                        // 如果用户在登录时，查询数据库是否存在，存在就直接从数据库取出
                        // userInfo = { userInfo, ...res.data.data };
                        // eslint-disable-next-line no-case-declarations
                        let {token} = res.data.data;
                        localStorage.setItem("token", token); // 取出登录 token
                        localStorage.setItem("userInfo", JSON.stringify(toRaw(res.data.data))
                        ); // 登录成功后 将数据存放在 localStorage
                        // router.go(0)
                        console.log(res.data.data);
                        // eslint-disable-next-line no-case-declarations
                        let {nickname, balance, headimgurl, phone_number} = res.data.data;
                        userInfo.nickName = nickname;
                        userInfo.balance = balance;
                        userInfo.headimgurl = headimgurl;
                        userInfo.phone_number = phone_number;
                        shows.value = false;
                        UserInfo()// 登录成功后获取用户基本信息 收益 发布数量
                        return true;
                    case 201:
                        location.href =
                            "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + appid + "&redirect_uri="
                            + encodeURIComponent(wwwUrl + '/#/user_data') + "&response_type=code&scope=snsapi_userinfo&state=" +
                            userInfo.phone_number + "#wechat_redirect";
                        break;
                    case 304:
                        showNotify({type: 'danger', message: res.data.mes});
                        break
                }
            });
        }

        // 显示输入界面
        function getUserProfile() {
            shows.value = true;
        }

        /**
         * 发送验证码
         */
        function sendCodeBtn() {

            if (!empower.value) {
                showNotify('你还没有同意授权信息');
                return false
            }

            // feedback 反馈状态
            if (!verification(["phone_number"], userInfo)) return false;
            // 请求发送验证码接口
            sendcode({
                phone_number: userInfo.phone_number,
            }).then((res) => {
                showNotify({
                    type: res.data.code !== 200 ? "danger" : "success",
                    message: res.data.mes,
                });
                if (res.data.code !== 200) {
                    return false;
                }

                codeBtnDisabled.value = true;
                //  验证码倒计时== 开始
                let timer = setInterval(() => {
                    timeNumber.value -= 1;
                    if (timeNumber.value <= 0) {
                        clearInterval(timer);
                        timeNumber.value = 60;
                        codeBtnDisabled.value = false;
                    }
                }, 1000);
                //  验证码倒计时== 结束
                // 从端口获取到的 验证码
                userInfo.code = res.data.data;
            });
        }


        /**
         * 进入页面 获取用户的基本信息
         */
        function getuserInfo_fun() {
            // 用于授权跳转时，返回当前页面时 数据丢失问题
            let userData = {}
            if (localStorage.getItem("userInfo")) {
                userData = JSON.parse(localStorage.getItem("userInfo"))
                let {nickname, balance, headimgurl, phone_number} = userData;
                userInfo.nickName = nickname;
                userInfo.balance = balance;
                userInfo.headimgurl = headimgurl;
                userInfo.phone_number = phone_number;
            } else {
                userData = userInfo
            }

            let weixinCode = getQueryString('code');
            if (!weixinCode) return false; // 验证是否有 url 地址是否存在 code 参数
            // 获取用户授权后的code，并返回后端
            getUserInfo({...{weixinCode}, ...userData}).then((res) => {
                // 登录成功后
                // try {
                if (res.data.code === 200) {

                    if (res.data.data?.token !== undefined) {
                        localStorage.setItem("token", res.data.data.token); // 首次
                        localStorage.setItem("userInfo", JSON.stringify(toRaw(res.data.data))); // 登录成功后 将数据存放在 localStorage
                    }

                    let {nickname, balance, headimgurl, phone_number} = res.data.data;
                    userInfo.nickName = nickname;
                    userInfo.balance = balance;
                    userInfo.headimgurl = headimgurl;
                    userInfo.phone_number = phone_number;
                } else {
                    showNotify({type: 'danger', message: res.data.mes});
                    localStorage.clear();
                }
                setTimeout(() => {
                    location.href = wwwUrl + '/#/user_data'
                }, 1000)
            });
        }

        function jumpUserCenter() {
            router.push("/Individual");
        }

        // 上传线索做跳转前 进行验证
        async function toUrl(url) {
            let res = await PermissionValidation(url);
            if (!res) {
                return false;
            }
            await router.push(url)

            // let state = await logVer()
            // if (url === '/up_Business' && state === 3061) {
            //     showNotify("你还不具备上传条件，若需上传请联系客服");
            //     return false
            // }
            //
            // switch (state) {
            //     case 3058:
            //         return false
            //     case 3059:
            //         shows.value = true
            //         return false
            //     default:
            //         await router.push(url)
            // }
            // console.log(state)
        }

        // 权限验证
        async function PermissionValidation(url) {
            let res = await loginVerify()
            let {mes, code} = res.data
            if (code !== 200 && code !== 309) {
                switch (code) {
                    case 305:
                        shows.value = true
                        return false
                    case 401:
                    case 306:
                    case 307:
                        showConfirmDialog({
                            title: '资料审核',
                            message: mes,
                        }).then(() => {
                            router.push('/upUserInfo')
                        })
                        return false;
                    case 308:
                        showNotify({
                            type: 'primary',
                            message: mes
                        })


                        return false;
                    case 400:
                        if ('/up_Business' === url) {
                            showNotify(mes)
                            return false;
                        } else {
                            return true;
                        }
                }
            } else {
                return true;
            }
        }


        function UserInfo() {
            UserInfoData().then(res => {
                let {data, code} = res.data
                if (code === 200) {
                    UserInfoD.value = data
                }

            })
        }

        onMounted(() => {
            getuserInfo_fun();
            let weixinCode = getQueryString('code');
            UserInfo()
            if (!weixinCode) {
                setTimeout(async () => {
                    let resCOde = await logVer();
                    console.log(resCOde)
                    switch (resCOde) {
                        case 3058:
                            return false
                        case 3059:
                            shows.value = true
                            return false
                    }
                    console.log(resCOde)
                    // shows.value = !([305, 304] in resCOde.data.code);

                    console.log(shows.value)
                }, 200)
            }

        });

        function clearData() {
            localStorage.clear()
            router.go(0)
        }


        function showempowerBox() {
            showDialog({
                message: '授权书分为厂家给代理商的授权，或者公司给个人的授权，使用场合大多在招投标中，当然也会有其他的场合，不过格式上大同小异。\n' +
                    '\n' +
                    '对于制造商给代理商的授权书一般用在进口货物的场合，代理商负责制造厂家在中国地区的贸易，那么就需要授权书，有一个通用的格式。1.致。\n' +
                    '\n' +
                    '：开头部分需要指明针对的具体项目；2.第一段正文部分，需要介绍制造商的公司名字，成立地点；3.被授权公司的名字，成立地点。\n' +
                    '\n' +
                    '授权事项的正文部分属于授权书的核心内容，需要将授权的详细内容按照条目顺序依依列举出来。最后就是授权书的签名部分，因为国外的制造商没有所谓的公章，比较常用的是个人签名。\n' +
                    '\n' +
                    '公司给个人的授权书相对而言有些许不同，具体内容有三部分：1.授权人的姓名、职务；2.被授权人的姓名、职务；3.授权的具体项目内容。最后在页脚部分加上授权人和被授权人的手写签名，这样针对个人的授权书还没有完成，需要加上公司的公章才算正式生效。',
            }).then(() => {
                // on close
            });
        }


        return {
            confirmBtn,
            getUserProfile,
            sendCodeBtn,
            jumpUserCenter,
            userInfo,
            shows,
            timeNumber,
            codeBtnDisabled,
            clearData,
            stateShow,
            toUrl,
            empower,
            showempowerBox,
            UserInfoD
        };
    },
};
</script>

<style lang="scss" scoped>
[v-cloak] {
  display: none !important;
}

.my-box {
  margin-bottom: 50px;
}

.m-head {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 13px 20px 0;

  .m-head-user {
    flex: 1;
    margin-left: 20px;

    .m-head-name {
      font-size: 17px;
      color: #000;
      font-weight: 600;
    }

    .m-head-tag {
      font-size: 13px;
      padding-top: 5px;
    }
  }

  .m-head-edit-user {
    display: flex;
    align-items: center;

    .m-head-edit-user-font {
      font-size: 13px;
      margin-right: 4px;
    }
  }
}

.grid-text {
  font-size: 14px;
  color: #8a9aa9;
}

.m-tem_box {
  box-shadow: 0 3px 3px #ccc;
  margin-bottom: 15px;
}

.tem_box {
  text-align: center;

  &_num {
    font-size: 14px;
    font-weight: 600;
  }

  &_font {
    font-size: 15px;
    margin-top: 4px;
  }
}

// Topup 充值盒子
.Topup {
  width: 100%;
  box-sizing: border-box;
  margin-top: 15px;

  .money_input {
    // background-color: #fff;
    padding: 0 5px;
    align-items: flex-end;
  }

  .money_input-border {
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  .money-font {
    font-size: 20px;
    color: #ff9900;
  }

  .tag_box {
    box-sizing: content-box;
    padding: 5px;
  }

  .tag_content {
    text-align: center;
    margin-top: 5px;
    margin-bottom: 5px;

    .tag_size {
      width: 93%;
      height: 35px;
      display: grid;
    }
  }
}

.money_input_btn {
  text-align: center;
}

.defalt_edit_btn {
  width: 78px !important;
}


.user_info_money {
  display: flex;
  justify-content: space-around;
  border: 1px solid #ccc;
  box-shadow: 0 0 4px #ccc;
  margin: 10px;
  padding: 10px;
  border-radius: 5px;
  background-color: #ffffff;
}

.user_padding_box {
  font-size: 14px;
  text-align: center;
}

.user_num {
  font-size: 16px;
  font-weight: bold;
  padding: 4px 0;
  color: #2C3041;
}

.user_text {
  color: #9D9D9D;
  font-size: 13px;
}

.box_menu {
  margin: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  overflow: hidden;
  background-color: #ffffff;
}

.margin_box {
  //background-color: #F6F7F8;
  height: 90vh;
}

.logout {
  position: absolute;
  bottom: 60px;
  left: 0;
  right: 0;
}
</style>
