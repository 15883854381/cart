<template>
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
            <div
                    class="m-head-edit-user"
                    @click="jumpUserCenter"
                    v-if="userInfo.nickName"
            >
                <text class="m-head-edit-user-font">个人中心</text>
                <van-icon name="arrow" size="13"/>
            </div>
        </div>

        <!-- 充值盒子 -->
        <div class="Topup">
            <!-- 余额 -->
            <van-cell title="账户余额">
                <template v-slot:value>
          <span class="money-font"
          >{{ userInfo.balance || "0.00" }}&nbsp;元</span
          >
                </template>
            </van-cell>
            <!-- 支付 -->
            <van-row class="money_input">
                <van-col span="18">
                    <van-field
                            class="money_input-border"
                            value="0.00"
                            type="number"
                            label="充值金额"
                            placeholder="请选择充值金额"/>
                </van-col>
                <van-col span="6" class="money_input_btn">
                    <van-button type="primary">立即支付</van-button>
                </van-col>
            </van-row>

            <div>
                <van-row gutter="20" class="tag_box">
                    <van-col span="8" class="tag_content">
                        <van-tag plain class="tag_size" type="success">39元</van-tag>
                    </van-col>
                    <van-col span="8" class="tag_content">
                        <van-tag plain class="tag_size" type="success">39元</van-tag>
                    </van-col>
                    <van-col span="8" class="tag_content">
                        <van-tag plain class="tag_size" type="success">39元</van-tag>
                    </van-col>
                    <van-col span="8" class="tag_content">
                        <van-tag plain class="tag_size" type="success">39元</van-tag>
                    </van-col>
                    <van-col span="8" class="tag_content">
                        <van-tag plain class="tag_size" type="success">39元</van-tag>
                    </van-col>
                    <van-col span="8" class="tag_content">
                        <van-tag plain class="tag_size" type="success">39元</van-tag>
                    </van-col>
                </van-row>
            </div>
        </div>
        <van-cell-group title="分组1">
            <van-cell title="上传商机" to="/up_Business" is-link/>
            <van-cell title="定制商机" is-link/>
            <van-cell title="设置提醒时段及区域" is-link/>
            <van-cell title="设置个人资料" is-link/>
        </van-cell-group>
        <van-cell-group title="分组1">
            <van-cell title="账户明细" is-link/>
            <van-cell title="我的商机" is-link/>
            <van-cell title="我的申诉退款" is-link/>
        </van-cell-group>
        <van-cell-group title="分组1">
            <van-cell title="已购买服务" is-link/>
            <van-cell title="金牌会员" is-link/>
        </van-cell-group>
        <van-cell-group title="分组1">
            <van-cell title="对公账户" is-link/>
            <van-cell title="意见反馈" is-link/>
            <van-cell title="关于我们" is-link/>
        </van-cell-group>

        <!-- 弹出层 confirmBtn 确认按钮 -->
        <van-dialog
                v-model:show="shows"
                title="填写信息"
                @confirm="confirmBtn"
                show-cancel-button
                :before-close="confirmBtn"
        >
            <van-cell-group inset>
                <van-field
                        v-model="userInfo.phone_number"
                        required
                        label="手机号"
                        placeholder="请输入手机号"
                />

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
            </van-cell-group>
        </van-dialog>
    </div>
</template>

<script>
import {onMounted, reactive, ref, toRefs, toRaw} from "vue";
import {getQueryString, verification} from "../utils/tool";
import {showNotify} from "vant";
import {useRoute, useRouter} from "vue-router";
import {getUserInfo, getcode, sendcode} from "../api/user_data";

export default {
    setup() {
        const route = useRoute();
        const router = useRouter();
        let userInfo = reactive({
            nickName: "",
            headimgurl: "",
            phone_number: "",
            balance: 0.0,
            code: "", // 验证码
        });
        let codeBtnDisabled = ref(false);
        let timeNumber = ref(60); // 倒计时
        let shows = ref(false);

        // 确认按钮 confirmBtn
        function confirmBtn(action) {
            //  弹出关闭前进行验证 并阻止关闭弹出  默认关闭弹出   开始
            if (action !== "confirm") {
                return true;
            }
            //  结束

            // 页面跳转授权时，返回当前页面时 之前填写的数据会丢失 == 开始
            localStorage.setItem("userInfo", JSON.stringify(toRaw(userInfo)));
            // 页面跳转授权时，返回当前页面时 之前填写的数据会丢失 == 结束

            // feedback 反馈状态
            if (!verification(["phone_number", "code"], userInfo)) return false;

            // 向后端发送请求 验证 code 并跳转到 头像授权页面
            getcode(userInfo).then((res) => {
                let {code} = res.data;
                console.log(res)
                // 200 表示登录成功  201 验证成功并跳转
                switch (code) {
                    case 200:
                        // 如果用户在登录时，查询数据库是否存在，存在就直接从数据库取出
                        // userInfo = { userInfo, ...res.data.data };
                        let {token} = res.data.data;
                        localStorage.setItem("token", token); // 取出登录 token
                        localStorage.setItem("userInfo", JSON.stringify(toRaw(res.data.data))
                        ); // 登录成功后 将数据存放在 localStorage
                        // router.go(0)
                        console.log(res.data.data);
                        let {nickname, balance, headimgurl, phone_number} = res.data.data;
                        userInfo.nickName = nickname;
                        userInfo.balance = balance;
                        userInfo.headimgurl = headimgurl;
                        userInfo.phone_number = phone_number;
                        shows.value = false;
                        return true;
                    case 201:
                        location.href =
                            "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxf02c02843479d12a&redirect_uri=" + encodeURIComponent('http://172.16.13.219:8080/#/user_data') + "&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
                        break;
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
                    location.href = 'http://172.16.13.219:8080/#/user_data'
                }, 3000)

            });
        }

        function jumpUserCenter() {
            router.push("/Individual");
        }

        onMounted(() => {
            getuserInfo_fun();
        });

        return {
            confirmBtn,
            getUserProfile,
            sendCodeBtn,
            jumpUserCenter,
            userInfo,
            shows,
            timeNumber,
            codeBtnDisabled,
        };
    },
};
</script>

<style lang="scss">
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
</style>
