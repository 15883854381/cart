<template>
  <!--    v-if="flatActive"-->
    <van-notice-bar mode="closeable">购买后将显示线索的联系方式</van-notice-bar>
  <!--    <van-cell-group inset>-->
  <!--        <van-cell  title="" title-style="color:red;font-size:18px;font-weight:600;" />-->
  <!--    </van-cell-group>-->

    <div class="Detail">
        <div class="Detail_big_title">
            <!--            【四川.成都】 奔驰-->
            <span class="Detail_big_title_title">购车地区：</span>
            <span v-if="detail_data.provinceCity">【{{ detail_data.provinceCity }}】</span>
            <span v-if="detail_data.brandname">{{ detail_data.brandname }}</span>
        </div>
        <div class="Detail_text_box">
            <span class="Detail_title">联&nbsp;&nbsp;系&nbsp;&nbsp;人：</span>
            <span class="Detail_name">{{ detail_data.user_name }}</span>
            <span style="color: #333;float: right;margin-bottom: 2px" @click="Showshare" class="Detail_name">
                        <van-button icon="share-o" size="mini" type="primary">去分享</van-button>
                <!--<van-icon size="18" name="share-o"/>-->
                    </span>

        </div>

        <div class="Detail_text_box">
            <span class="Detail_title">联系方式：</span>
            <a class="Detail_num"
               v-if="detail_data.flat === 1 || detail_data.flat === 3 || detail_data.flat === 5 || detail_data.flat === 6"
               :href="'tel:'+ detail_data.Cluephone_number ">{{ detail_data.Cluephone_number }}</a>
            <span v-else class="Detail_num">{{ detail_data.Cluephone_number }}</span>
            <span class="Detail_num" style="color: #333333">【{{ detail_data.PhoneBelongingplace }}】</span>
        </div>

        <div class="user_tags">
            <span class="Detail_title">客户意向：</span>
            <van-tag plain type="primary" v-for="item in detail_data.tags" :key="item">{{ item.tagName }}</van-tag>
        </div>


        <div class="Detail_text_box" style="margin-top: 0">
            <span class="Detail_title">线索价格：</span>
            <span class="Detail_money" style="font-size: 18px;">{{ detail_data.Price }}元/条</span>
        </div>
        <div class="Detail_text_box" v-if="RecordingUrl"
             style="display: flex;justify-content: space-between;align-items: center;">
            <span class="Detail_title">线索录音：</span>
            <div style="width: 100%;flex: 1">
                <audios :key="timer" :src="RecordingUrl"></audios>
            </div>
            <!--            <div style="width: 100%;flex: 1" v-html="Reding"></div>-->
        </div>
        <div class="Detail_progres">
            <van-progress :pivot-text="`${detail_data.Tosell}/${detail_data.sales}`" :percentage="detail_data.progress"
                          color="#349C30" stroke-width="14"/>
            <small class="Detail_small_text">剩余【{{ residueNum }}】次购买机会，购买后可见</small>
        </div>
        <div class="Detail_buy_btn">
            <van-row gutter="20">
                <van-col span="12">
                    <!--                    flag == 3  表示 线索已下架-->
                    <van-button plain block v-if="detail_data.flag===3" disabled type="primary">线索已下架</van-button>

                    <van-button v-else block @click="getBuy(0)" plain :disabled="!residueNum" type="primary">
                        {{ residueNum <= 0 ? '已无购余额' : '买断剩余名额' }}
                    </van-button>
                </van-col>
                <van-col span="12">
                    <van-button v-if="detail_data.flag===3" block disabled type="primary">线索已下架</van-button>
                    <van-button v-else :disabled="flatActive? true:!residueNum" @click="getBuy(1)" block
                                type="primary">
                        {{ flatActive ? '已购买' : residueNum <= 0 ? '已无购余额' : '立即接单' }}
                    </van-button>
                </van-col>
            </van-row>
        </div>

        <div class="Detail_text_box">
            <span class="Detail_title">线索来源：</span>
            <span class="Detail_num" style="color: #333333">{{ detail_data.clueName }}</span>
        </div>
        <div class="Detail_text_box">
            <van-row>
                <van-col span="12">
                    <span class="Detail_title">已&nbsp;&nbsp;发&nbsp;&nbsp;布：</span>
                    <span style="color: #333" class="Detail_name">{{ detail_data.upClueNum }} 条</span>
                </van-col>
                <van-col span="12">
                    <span class="Detail_title">好评率：</span>
                    <span style="color: #333" class="Detail_name">{{ detail_data.percentage }}%</span>
                </van-col>
                <!--                <van-col span="8">-->
                <!--                    <span class="Detail_title">分享：</span>-->
                <!--                    <span style="color: #333" @click="Showshare" class="Detail_name">-->
                <!--                        <van-icon size="18" name="share-o"/>-->
                <!--                    </span>-->
                <!--                </van-col>-->
            </van-row>
        </div>

        <div v-if="BuyNumData">
            <table border="1" class="Detail_table">
                <tr>
                    <th>购买记录</th>
                    <th>购买时间</th>
                    <th>购买条数</th>
                </tr>
                <tr v-for="item in BuyNumData" :key="item">
                    <td>
                        <van-text-ellipsis :content="item.user_name"/>
                    </td>
                    <td>
                        <van-text-ellipsis :content="item.payment_time "/>
                    </td>
                    <td>{{ item.buy_num }}</td>
                </tr>
            </table>
        </div>


        <div class="new_list">
            <line_text title="最新可接单循盘"></line_text>
        </div>

    </div>

    <List_box @click="toUrl(item)" v-for="item in listData" :Cluedata="item" :key="item"></List_box>

    <van-share-sheet
            v-model:show="showShare"
            title="立即分享给好友"
            :options="options"
            @select="onSelect"
    />
    <shareArrowhead v-if="Cshow" @click="Cshow=false"></shareArrowhead>


</template>

<script>
import line_text from '@/components/line_text.vue'
import List_box from "@/components/List_box.vue";
import audios from '@/components/audioComopnnets.vue'
import shareArrowhead from '@/components/share_arrowhead.vue'
import {DetailPhoneRecordingData, getClueDetail, getClueList, SearchClueBuyNUmData} from "@/api/clue"
import {closeToast, showConfirmDialog, showLoadingToast, showNotify} from 'vant';
import dayjs from 'dayjs'

import {onMounted, ref, getCurrentInstance, computed, toRefs, reactive, nextTick} from "vue";
import {useRoute, useRouter} from "vue-router";

import {getUserId, loginVerify, shareClue} from "@/api/utils";
import {CeatedOrder} from "@/api/order";
import wx from 'weixin-js-sdk'

export default {
    name: "list_Business_Detail",
    components: {
        List_box,
        line_text,
        shareArrowhead,
        audios
    },

    setup() {
        const {proxy} = getCurrentInstance()
        let detail_data = ref([])
        const route = useRoute()
        const router = useRouter();
        let residueNum = ref(0);// 剩余下单次数
        let listData = ref([]);
        let showShare = ref(false);
        let BuyNumData = ref([]);
        let UserId = ref('')
        let Cshow = ref(false)
        const options = [
            {name: '微信', icon: 'wechat'},
            {name: '复制链接', icon: 'link'},
            // {name: '二维码', icon: 'qrcode'},
        ];
        let data_data = reactive({
            RecordingUrl: '',
        })
        let timer = ref("");

        const flatActive = computed({
            get: () => {
                let flatS = [1, 3, 4, 5, 6, 7];
                return flatS.includes(detail_data.value.flat)
            }
        })


        // vue调用微信的自定义分享
        function getShareInfo() {
            let time = new dayjs().format('YYYY-MM-DD HH:mm:ss');
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
                        title: `${detail_data.value.provinceCity ? `【${detail_data.value.provinceCity}】` : ''}${detail_data.value.brandname ? `【${detail_data.value.brandname}】` : ''}线索`,
                        desc: `${detail_data.value.user_name}有购买意向。    ${time}`,
                        link: location.href + UserId.value, // 分享后的地址
                        imgUrl: 'https://wx.qlogo.cn/mmopen/fc1ljSVWaib9pFQd4BSdYss8QmTcQX6p6NqicNGS6m7ABXqvgPNxKeW5KWvAmwIK229Nm7z5cWaPct8V5lhzQsEzGNUyLya01z/64',
                    };
                    //点击要去分享
                    wx.onMenuShareAppMessage(shareData);
                    // wx.updateTimelineShareData(shareData);
                });
            });
        }

        //
        function onSelect(option) {

            switch (option.name) {
                case '微信':
                    Cshow.value = true
                    break
                case '复制链接':
                    proxy.$copyText(window.location.href + UserId.value).then(() => {
                        showNotify({
                            type: 'success',
                            message: '复制成功'
                        })
                    })

                    break
                case '二维码':
                    break
            }
            showShare.value = false;
        }

        function Showshare() {
            showShare.value = true
        }

        // 用户ID
        function getUserIdBtn() {
            getUserId().then(res => {
                let {data, code} = res.data
                if (code === 200) {
                    UserId.value = '&userid=' + data.id
                } else {
                    UserId.value = ''
                }
            })
        }

        // 初始化页面数据
        function getDetail(clueid, cart_type) {
            let clue_id = clueid || route.query.clue_id;
            let type = cart_type || route.query.type
            getClueDetail({clue_id, type}).then((res) => {
                if (res.data.code !== 200 || res.data?.code === undefined) {
                    return false;
                }
                detail_data.value = res.data.data[0]
                residueNum.value = detail_data.value.sales - detail_data.value.Tosell
                getUserIdBtn();
                getShareInfo()
            })
            getClueList().then((res) => {
                listData.value = res.data.data.data;
                closeToast()
            })
        }

        // 跳转
        function toUrl(item) {
            showLoadingToast({
                message: '加载中...',
                forbidClick: true,
            });
            getDetail(item.clue_id, item.cart_type)
            DetailPhoneRecording(item.clue_id)
            setTimeout(() => {
                timer.value = new Date().getTime().toString()
            }, 500)
        }

        // 获取购买金额
        async function getBuy(buytype) {
            let res = PermissionValidation()
            if (!res) {
                return false;
            }

            let clue_id = route.query.clue_id
            let type = route.query.type

            showLoadingToast({
                message: '订单生成中...',
                forbidClick: true,
            });
            // 创建订单并存在数据库
            CeatedOrder({clue_id, type, buytype}).then((res) => {
                let data = res.data
                console.log(data)
                if (data.code === 200) {
                    router.push({
                        path: '/payment',
                        query: {
                            out_trade_no: data.data.out_trade_no  //参数
                        }
                    })
                } else {
                    showNotify({
                        type: 'danger',
                        message: data.mes
                    })
                }
                closeToast();
            })
        }

        // 权限验证
        async function PermissionValidation() {
            let res = await loginVerify()
            let {data, mes, code} = res.data
            if (code !== 200 && code !== 400) {
                switch (code) {
                    case 305:
                        showConfirmDialog({
                            title: '登录提醒',
                            message:
                                '您还未登录/注册，请先去登录【登录可查看更多】',
                        }).then(() => {
                            router.push('/user_data')
                        })
                        return false
                    case 401:
                    case 306:
                    case 307:
                        showConfirmDialog({
                            title: '资料审核',
                            message: mes
                        }).then(() => {
                            router.push('/upUserInfo')
                        })
                        return false;
                    case 308:
                        // showNotify(mes)
                        // showConfirmDialog({
                        //     title: '资料审核',
                        //     message: mes
                        // }).then(() => {
                        //     router.push('/upUserInfo')
                        // })
                        return false;
                    case 309:
                        console.log(code)
                        showNotify(mes)
                        return false;
                }
            } else {
                return true;
            }
        }

        // 分享线索
        function getUserid() {
            let userid = route.query?.userid;
            if (userid !== undefined) {
                localStorage.setItem('userid', userid)
            }
        }

        // 获取当前线索的购买订单
        function SearchClueBuyNUm() {
            let clue_id = route.query.clue_id;
            SearchClueBuyNUmData({clue_id}).then(res => {
                let {data} = res.data
                if (data !== []) {
                    BuyNumData.value = res.data.data
                }
            })
        }

        // 获取线索的通话录音
        function DetailPhoneRecording(item) {
            let clue_id = item || route.query.clue_id;
            DetailPhoneRecordingData({clue_id}).then(res => {
                let {code, data} = res.data
                if (code === 200) {
                    data_data.RecordingUrl = data.record_file_url
                }
            })

        }


        let music = ref(null);

        const Reding = computed({
            get: () => {
                return ` <audio id="music" preload controls style="width: 100%">
                             <source src="${data_data.RecordingUrl}" type="audio/wav">
                         </audio>`;
            }
        })

        DetailPhoneRecording()
        onMounted(() => {
            PermissionValidation()
            getDetail();
            getUserid()
            SearchClueBuyNUm()


        })

        return {
            detail_data,
            residueNum,
            listData,
            showShare,
            options,
            BuyNumData,
            Showshare,
            onSelect,
            toUrl,
            getBuy,
            flatActive,
            Cshow,
            Reding,
            music,
            timer,

            ...toRefs(data_data)
        }

    }
}
</script>

<style scoped lang="scss">
.Detail {
  padding: 0 10px;
  font-size: 15px;

  &_big_title {
    color: red;
    font-size: 18px;
    font-weight: 600;
  }

  &_title {
    font-size: 13px;
    color: #999999;
    //margin-right: 10px;
  }

  &_name {
    font-size: 15px;
    font-weight: bold;
  }

  &_num {
    color: #E60000;
    font-weight: bold;
  }

  &_money {
    color: #1D69A7;
    font-weight: bold;
  }

  &_progres {
    //margin-top: 25px;
  }

  .Detail_text_box {
    margin: 7px 0;
  }

  .Detail_small_text {
    margin-top: 10px;
    display: flex;
    color: #848587;
  }

  &_buy_btn {
    margin-top: 10px;
  }

  &_content {
    font-size: 13px;
    line-height: 22px;
    color: #333;
    font-weight: bold;
  }

  &_table {
    width: 100%;
    text-align: center;
    border: 1px solid #E4E4E6;
    border-collapse: collapse;

    padding-bottom: 5px;

    tr {
      color: #666666;
    }

    tr:nth-child(odd) {
      background-color: #F6F6F6;
    }

  }

}

.new_list {
  margin-top: 12px;

  &_bx {
    border: 1px solid #D7D7D7;
    height: 50px;
    display: flex;
    padding: 0 8px;
    justify-content: space-around;
    flex-direction: column;
    border-radius: 2px;
    margin-bottom: 10px;

  }

  &_box {
    display: flex;
    justify-content: space-between;

    &_title {
      font-size: 15px;
      font-weight: bold;
      color: #333333;
    }

    &_time {
      font-size: 12px;
      color: #959595;
    }

    &_city {
      color: #739E7B;
      font-size: 13px;
    }

    &_num {
      color: #739E7B;
      font-size: 13px;
    }
  }
}

.user_tags {
  //margin-bottom: 10px;

  .van-tag {
    margin-bottom: 8px;
    margin-right: 5px;
  }
}

.Detail_big_title_title {
  color: #999;
  font-size: 12px
}

</style>