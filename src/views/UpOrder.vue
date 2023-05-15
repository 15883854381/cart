<template>
    <div class="box" v-for="item in data">
        <div>
            <van-cell title="订单号：123456789456">
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
            <span class="box_title_title"><span
                    style="color: #1D69A7">{{ item.user_name }}</span>【{{ item.province }}.{{ item.city }}】<span
                    style="color:#ff9900">【{{ item.brand }}】</span></span>
                <!--                <span class="box_title_time">半小时前</span>-->
            </div>
            <div class="box_title_money">
                <span>{{ item.creat_time }}</span>
                <!--                <span class="money_color">{{ item.price }} <small>￥</small> </span>-->
                <span class="money_color"><span>合计：</span>{{ item.price }}<small>￥</small> </span>
            </div>
        </div>
        <div class="footer_btn">
            <van-button plain round size="mini">&nbsp;删除线索&nbsp;</van-button>
            <van-button type="primary" @click="LookClue(item.id)" round size="mini" v-if="item.flag===1">&nbsp;查看线索&nbsp;</van-button>
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
import {showNotify} from "vant";

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
                    id: e
                }
            })
        }
        return {
            data,
            LookClue
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