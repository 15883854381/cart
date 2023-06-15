<template>

    <div class="box">
        <div>
            <!--                        {{dataItem}}-->
            <van-cell :title="`订单号:${dataItem.out_trade_no}`">
                <template #title>
                    <span class="title_sub_title">订单号:{{ dataItem.out_trade_no }}</span>
                </template>
                <template #value>
                    <span class="title_sub">{{ dataItem.title }}</span>
                    <!--                    1 交易成功 2 未付款  3 取消交易-->
                </template>
            </van-cell>
        </div>
        <!--标题-->
        <div class="content">
            <div class="box_title box_public">
            <span class="box_title_title">
                <span style="color: #1D69A7">{{ dataItem.user_name }}</span>
                <span v-if="dataItem.provinceCity">【{{ dataItem.provinceCity }}】</span>
                <span v-if="dataItem.brandname" style="color:#ff9900">【{{ dataItem.brandname }}】</span></span>
                <!--                <span class="box_title_time">半小时前</span>-->
            </div>
            <div class="box_title_money">
                <span>{{ dataItem.creat_time }}</span>
                <span class="money_color">{{ dataItem.price }} <small>￥</small> </span>
            </div>
        </div>
        <div class="footer_btn">
            <van-button @click="tourl(item)" type="primary" round size="mini">&nbsp;查看线索&nbsp;</van-button>
            <van-button @click="callPhoneNumber(item)" type="success"
                        v-if="dataItem.flat===1 || dataItem.flat===3|| dataItem.flat===6" round size="mini">&nbsp;拨打电话&nbsp;
            </van-button>
        </div>

        <!--        <div class="footer_btn" v-if="dataItem.flat===4">-->
        <!--            <van-button plain round size="mini" @click.stop="refund_reason">&nbsp;订单申述&nbsp;</van-button>-->
        <!--            <van-button type="primary" round size="mini" @click.stop="OrderEditQueryBtn">&nbsp;订单有效&nbsp;-->
        <!--            </van-button>-->
        <!--            <van-button type="success" :disabled="dataItem.callPhoneNumber<=0" @click.stop="callPhone(dataItem)" round-->
        <!--                        size="mini">&nbsp;拨打次数剩余【{{ dataItem.callPhoneNumber }}】次-->
        <!--            </van-button>-->
        <!--        </div>-->

        <!--        <div class="footer_btn" v-if="dataItem.flat===1 || dataItem.flat===3 || dataItem.flat===6">-->
        <!--            &lt;!&ndash;            {{ dataItem.callPhoneNumber }}&ndash;&gt;-->
        <!--            <van-button :disabled="dataItem.callPhoneNumber<=0" type="success" @click.stop="callPhone(dataItem)" round-->
        <!--                        size="mini">-->
        <!--                &nbsp;拨打次数剩余【{{ dataItem.callPhoneNumber }}】次-->
        <!--            </van-button>-->
        <!--        </div>-->
    </div>
</template>
<script>
import {CallingPhone} from "@/api/phone";
import {getPhone_numberData, OrderEditQuery} from "@/api/order"
import {showConfirmDialog, showDialog, showNotify} from "vant";
import {computed, reactive} from "vue";
import router from "@/router";

export default {
    props: ['item'],
    setup({item}) {
        let items = reactive(item)

        function callPhone(e) {

            showDialog({
                title: '来电提醒',
                message: '电话接通中，【 请注意来电提醒 】，请勿重复拨打。若2分钟未接听到电话，请重新拨打或联系客服解决',
                confirmButtonText: '立即拨打',
                closeOnClickOverlay: true
            }).then(() => {

                CallingPhone({
                    clue_id: e.clue_id,
                    out_trade_no: e.out_trade_no,
                    cart_type: e.cart_type,
                }).then(res => {
                    if (res.data.code !== 200) {
                        showNotify({
                            type: 'danger',
                            message: res.data.mes
                        })
                        return false;
                    }
                    items.callPhoneNumber -= 1
                })
            });
        }

        function tourl() {
            console.log(item)
            router.push(`list_Business_Detail?clue_id=${item.clue_id}&type=${item.cart_type}`)
        }

        function refund_reason() {
            router.push({
                path: '/Ordernotes',
                query: {
                    id: item.id
                }
            })
        }

        let dataItem = computed({
            get: () => {
                let data = items
                switch (item.flat) {
                    case 1:
                        data.title = "交易完成"
                        break
                    case 2:
                        data.title = "未付款"
                        break
                    case 3:
                        data.title = "交易进行中"
                        break
                    case 4:
                        data.title = "已拨打"
                        break
                    case 5:
                        data.title = "申述中"
                        break
                    case 6:
                        data.title = "申述失败"
                        break
                    case 7:
                        data.title = "申述成功"
                        break
                    case 8:
                        data.title = "交易关闭"
                        break
                    case 9:
                        data.title = "退款成功"
                        break
                }
                return data;
            },
        })


        function OrderEditQueryBtn() {
            showConfirmDialog({
                title: '订单确认提醒',
                message: '确认订单有效后，将不再申述，请确认',
            }).then(() => {
                OrderEditQuery({id: item.id}).then(res => {
                    showNotify({
                        type: res.data.code !== 200 ? 'danger' : 'success',
                        message: res.data.mes
                    })
                    items.flat = 1
                })

            })
        }

        // 跳转拨打电话界面 不是axb
        function callPhoneNumber(e) {
            getPhone_numberData({out_trade_no: e.out_trade_no}).then(res => {
                let {code, data, mes} = res.data
                console.log(data)
                if (code !== 200) {
                    showNotify({
                        type: 'danger',
                        message: mes
                    })
                    return false;
                }
                window.location.href = 'tel:' + data[0]['phone_number']
            })


        }


        return {
            callPhone,
            dataItem,
            OrderEditQueryBtn,
            refund_reason,
            tourl,
            callPhoneNumber
        }
    }

}

</script>

<style lang="scss">
.box {
  border: 1px solid #ccc;
  //padding: 5px 10px;
  margin: 5px 10px;
  border-radius: 4px;
  margin-bottom: 8px;

  &_public {
    margin: 5px 0;
  }

  .box_title_money {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 15px;
    padding-top: 10px;
    padding-bottom: 5px;
    color: #888;
  }


  &_title {
    display: flex;
    justify-content: space-between;
    align-items: center;

    &_title {
      font-size: 16px;
      color: #D55324;
      font-weight: bold;
    }

    &_time {
      font-size: 12px;
      color: #CECECE;
    }
  }


  &_footer {
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &_icon {
      flex: 1;
      display: flex;
      justify-content: start;

      span {
        margin-right: 10px;
      }

    }
  }

}

.content {
  border-top: 1px #ccc dotted;
  border-bottom: 1px #ccc dotted;
  padding: 0 10px;
}

.money_color {
  font-size: 18px;
  color: #F74603;
}

.footer_btn {
  display: flex;
  padding: 8px;
  justify-content: flex-end;
}

.title_sub {
  color: #D55324;
  font-size: 12px
}

.title_sub_title {
  font-size: 12px;
}
</style>