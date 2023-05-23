<template>
    <van-notice-bar v-if="flatActive" mode="closeable">订单交易成功后将展示当前线索的联系方式
    </van-notice-bar>
  <!--    <van-cell-group inset>-->
  <!--        <van-cell  title="" title-style="color:red;font-size:18px;font-weight:600;" />-->
  <!--    </van-cell-group>-->

    <div class="Detail">
        <div class="Detail_big_title">
            <!--            【四川.成都】 奔驰-->
            <span v-if="detail_data.provinceCity">【{{ detail_data.provinceCity }}】</span>
            <span v-if="detail_data.brandname">{{ detail_data.brandname }}</span>
        </div>
        <div class="Detail_text_box">
            <span class="Detail_title">联系人：</span>
            <span class="Detail_name">{{ detail_data.user_name }}</span>
        </div>

        <div class="Detail_text_box">
            <span class="Detail_title">联系方式：</span>
            <a class="Detail_num" v-if="detail_data.count"
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

                    <van-button v-else block @click.once="getBuy(0)" plain :disabled="!residueNum" type="primary">
                        {{ residueNum <= 0 ? '已无购余额' : '买断剩余名额' }}
                    </van-button>
                </van-col>
                <van-col span="12">
                    <van-button v-if="detail_data.flag===3" block disabled type="primary">线索已下架</van-button>
                    <van-button v-else :disabled="flatActive? true:!residueNum" @click.once="getBuy(1)" block
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
                <van-col span="8">
                    <span class="Detail_title">已发布：</span>
                    <span style="color: #333" class="Detail_name">{{ detail_data.upClueNum }} 条</span>
                </van-col>
                <van-col span="8">
                    <span class="Detail_title">好评率：</span>
                    <span style="color: #333" class="Detail_name">80%</span>
                </van-col>
                <van-col span="8">
                    <span class="Detail_title">分享：</span>
                    <span style="color: #333" @click="Showshare" class="Detail_name">
                        <van-icon size="18" name="share-o"/>
                    </span>
                </van-col>
            </van-row>
        </div>

        <div v-if="BuyNumData.length">
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


</template>

<script>
import line_text from '@/components/line_text.vue'
import List_box from "@/components/List_box.vue";
import {getClueDetail, getClueList, SearchClueBuyNUmData} from "@/api/clue"
import {closeToast, showLoadingToast, showNotify} from 'vant';

import {onMounted, ref, getCurrentInstance, computed} from "vue";
import {useRoute, useRouter} from "vue-router";

import {logVer} from "@/utils/tool";
import {getUserId, shareClue} from "@/api/utils";
import {CeatedOrder} from "@/api/order";
import wx from 'weixin-js-sdk'

export default {
    name: "list_Business_Detail",
    components: {
        List_box,
        line_text
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
        const options = [
            {name: '微信', icon: 'wechat'},
            {name: '复制链接', icon: 'link'},
            {name: '二维码', icon: 'qrcode'},
        ];

        const flatActive = computed({
            get: () => {
                let flatS = [1, 3, 4, 5, 6, 7];
                return flatS.includes(detail_data.value.flat)
            }
        })

        //
        function onSelect(option) {

            switch (option.name) {
                case '微信':
                    shareClue().then(res => {
                        let {data, code} = res.data
                        wx.config({
                            debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                            appId: data.appId, // 必填，公众号的唯一标识
                            timestamp: data.timestamp, // 必填，生成签名的时间戳
                            nonceStr: data.noncestr, // 必填，生成签名的随机串
                            signature: data.signature,// 必填，签名
                            jsApiList: [
                                'updateAppMessageShareData',
                                'updateTimelineShareData',
                                'checkJsApi',
                                'onMenuShareTimeline',
                                'onMenuShareAppMessage', //分享给微信朋友
                                'showOptionMenu']// 必填，需要使用的JS接口列表
                        })

                        wx.ready(function () {   //需在用户可能点击分享按钮前就先调用
                            wx.updateAppMessageShareData({
                                title: '1', // 分享标题
                                desc: '1', // 分享描述
                                link: encodeURIComponent('http://h.199909.xyz'), // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                                success: function () {
                                    // 设置成功
                                }
                            })
                        });
                        wx.error(function (e) {
                            console.log(e)
                        })

                    })
                    break
                case '复制链接':
                    getUserId().then(res => {
                        let {data, code} = res.data
                        let location = window.location.href
                        if (code === 200) {
                            location = window.location.href + '&userid=' + data.id
                        }
                        proxy.$copyText(location).then(() => {
                            showNotify({
                                type: 'success',
                                message: '复制成功'
                            })
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


        // 初始化页面数据
        function getDetail(clueid) {
            let clue_id = clueid || route.query.clue_id;
            let type = route.query.type
            getClueDetail({clue_id, type}).then((res) => {
                if (res.data.code !== 200 || res.data?.code === undefined) {
                    return false;
                }
                detail_data.value = res.data.data[0]
                residueNum.value = detail_data.value.sales - detail_data.value.Tosell
                console.log(residueNum.value)
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
            getDetail(item.clue_id)
        }

        // 获取购买金额
        async function getBuy(buytype) {

            let state = await logVer();
            switch (state) {
                case 3060:
                    showNotify("你还不具备购买条件，若需购买请联系客服")
                    return false
                case 3058:
                    return false
                case 3059:
                    return false
            }

            let clue_id = route.query.clue_id
            let type = route.query.type

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
            })
            //     成功后执行的方法
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
                console.log(res)

                BuyNumData.value = res.data.data
            })
        }

        onMounted(() => {
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
            flatActive
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
    margin-right: 10px;
  }

  &_name {
    font-size: 15px;
    font-weight: bold;
    //display: flex;
    //justify-content: center;
    //flex-direction:column;
    //align-items: center;
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
</style>