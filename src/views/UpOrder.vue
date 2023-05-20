<template>
    <div class="box" v-for="(item,index) in data" :key="item.id">
        <div>
            <van-cell>
                <template #title>
                    <van-tag plain size="medium" type="primary">{{ item.cart_type === 1 ? '新车' : '二手车' }}</van-tag>
                </template>
                <template #value>
                    <span class="title_sub" :style="{color: item.flag ===1?'#42b983':'#D55324'}">
                    {{
                        item.flag === 1 ? '审核通过' : item.flag === 2 ? '审核中' : '无效线索'
                        }}
                    </span>
                </template>
            </van-cell>
        </div>
        <!--标题-->
        <div class="content">
            <div class="box_title box_public">
            <span class="box_title_title">
                <span v-if="item.user_name" style="color: #1D69A7">{{ item.user_name }}</span>
                <span v-if="item.province && item.city">【{{ item.province }}.{{ item.city }}】</span>
                <span v-if="item.brand" style="color:#ff9900">【{{ item.brand }}】</span></span>
                <!--                <span class="box_title_time">半小时前</span>-->
            </div>
            <div class="box_title_money">
                <span>{{ item.creat_time }}</span>
                <!--                <span class="money_color">{{ item.price }} <small>￥</small> </span>-->
                <span class="money_color"><span>合计：</span>{{ item.price }}<small>￥</small> </span>
            </div>
        </div>
        <div class="footer_btn">
            <van-button @click="DeleteClue(item,index)" plain round size="mini">&nbsp;删除线索&nbsp;</van-button>
            <van-button type="primary" @click="LookClue(item)" round size="mini" v-if="item.flag===1">&nbsp;查看线索&nbsp;</van-button>
        </div>
    </div>
  <!--    <div class="box">-->
  <!--        <div>-->
  <!--            <van-cell title="订单号：123456789456">-->
  <!--                <template #value>-->
  <!--                    <span class="title_sub" style="color: #42b983">审核通过</span>-->
  <!--                </template>-->
  <!--            </van-cell>-->
  <!--        </div>-->
  <!--        &lt;!&ndash;标题&ndash;&gt;-->
  <!--        <div class="content">-->
  <!--            <div class="box_title box_public">-->
  <!--            <span class="box_title_title"><span style="color: #1D69A7">李女士</span>【四川.成都】<span-->
  <!--                    style="color:#ff9900">【奔驰】</span></span>-->
  <!--                <span class="box_title_time">半小时前</span>-->
  <!--            </div>-->
  <!--            <div class="box_title_money">-->
  <!--                <span>2022.01.02</span>-->
  <!--                <span class="money_color"><span>合计：</span>80.00<small>￥</small> </span>-->
  <!--            </div>-->
  <!--        </div>-->
  <!--        <div class="footer_btn">-->
  <!--            <van-button plain round size="mini">&nbsp;删除线索&nbsp;</van-button>-->
  <!--            <van-button type="primary" round size="mini">&nbsp;查看线索&nbsp;</van-button>-->
  <!--        </div>-->
  <!--    </div>-->
</template>

<script>
import {getUpOrder} from '@/api/upOrder'
import {ref} from "vue";
import {useRouter} from "vue-router";
import {showConfirmDialog, showNotify} from "vant";
import {deleteCurlData} from "@/api/clue";

export default {
    name: "UpOrder",

    setup() {
        let data = ref();
        let router = useRouter()
        getUpOrder().then((res) => {
            if (res.data.code !== 200) {
                showNotify({type: 'primary', message: res.data.mes});
                return false
            }
            data.value = res.data.data
        })

        function LookClue(e) {
            router.replace({
                path: 'list_Business_Detail',
                query: {
                    clue_id: e.clue_id,
                    type: e.cart_type
                }
            })
        }

        // 删除个人线索
        function DeleteClue(e, index) {
            console.log(e)
            showConfirmDialog({
                title: '删除提醒',
                message:
                    `确认删除【${e.user_name}】【${e.province}.${e.city}】\n\r这条线索吗？删除后不可恢复，请谨慎操作`,
            }).then(() => {
                deleteCurlData({clue_id: e.clue_id, type: e.cart_type}).then(res => {
                    let {code, mes} = res.data
                    if (code === 200) {
                        data.value.splice(index, 1)
                    }
                    showNotify({
                        type: code === 200 ? 'success' : 'danger',
                        message: mes
                    })

                })
            }).catch(() => {
                showNotify({
                    type: 'primary',
                    message: '已取消删除'
                })
            });

        }

        return {
            data,
            LookClue,
            DeleteClue
        }
    }
}
</script>

<style lang="scss">
.box {
  border: 1px solid #ccc;
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

  span {
    font-size: 14px;
  }
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
</style>