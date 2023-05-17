<template>
    <div class="box">
        <div class="content">
            <div class="box_title box_public">
            <span class="box_title_title"><span
                    style="color: #1D69A7">{{ item.user_name }}</span>【{{ item.provinceCity }}】<span
                    style="color:#ff9900">【{{ item.brandname }}】</span></span>
                <!--                <span class="box_title_time">半小时前</span>-->
            </div>
            <div class="box_title_money">
                <span>{{ item.creat_time }}</span>
                <span class="money_color">{{ item.price }} <small>￥</small> </span>
            </div>
        </div>
    </div>
    <div class="content_item">
        <div class="item">
            <span class="item_title">订单编号：</span>
            <span>{{ item.out_trade_no }}</span>
        </div>
        <div class="item">
            <span class="item_title">订单创建时间：</span>
            <span>{{ item.creat_time }}</span>
        </div>
        <div class="item">
            <span class="item_title">订单状态：</span>
            <span>未付款</span>
        </div>
    </div>

    <div class="footer_btn">
        <van-cell title="合计金额">
            <template #value>
                <span class="money_color">{{ item.price }} <small>￥</small> </span>
            </template>
        </van-cell>
        <van-button type="primary" size="large" @click="payemtBtn">立即购买</van-button>
    </div>

</template>

<script>
import {useRoute, useRouter} from "vue-router";
import {onMounted, ref} from 'vue'
import WxPay from "@/utils/wxPay";
import {orderDetail} from '@/api/order'

export default {
    name: "payment",
    setup() {
        const route = useRoute()
        const router = useRouter()

        let item = ref({});

        if (route.query?.out_trade_no === undefined) {
            router.replace('/')
        }

        function getOrderDetail() {
            orderDetail({out_trade_no: route.query.out_trade_no}).then(res => {
                console.log(res)
                let {data} = res.data
                item.value = data
            })
        }

        onMounted(() => {
            getOrderDetail()

        })

        function payemtBtn() {
            WxPay.getWxPaySign(route.query).then((data) => {
                console.log("我是请求第一个接口后的参数", data)
                // 配置成功后发起微信支付
                goPay(data)
            })
        }

        function goPay(data) {
            let res = {
                timestamp: data.timestamp,
                nonceStr: data.nonceStr,
                package: data.package,
                signType: data.signType,
                paySign: data.paySign
            }
            WxPay.wxPay(res).then((res) => {
                // alert("我成功了")
                router.replace('/my_Clue')
                // 支付成功
                console.log(res)
            }).catch((err) => {
                alert("失败了")
                // 支付失败
                console.log(err)
            })
        }

        return {
            payemtBtn,
            item
        }


    }
}
</script>


<style lang="scss" scoped>
.box {
  border: 1px solid #e5e5e5;
  padding: 5px 10px;
  margin: 5px 10px;
  margin-bottom: 8px;
  border-radius: 4px;

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


}


.money_color {
  font-size: 18px;
  color: #F74603;
}


.title_sub {
  color: #D55324;
  font-size: 12px
}

.content_item {
  padding: 10px;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  margin: 0 10px;

  .item {
    display: flex;
    justify-content: start;
    font-size: 14px;
    margin: 15px 0;
    color: #3B3B3B;

    .item_title {
      width: 100px;
      font-size: 13px;
    }
  }
}

.footer_btn {
  position: absolute;
  bottom: 60px;
  left: 0;
  right: 0;
}


</style>