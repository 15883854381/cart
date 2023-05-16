<template>

  <!--    <van-cell-group inset>-->
  <!--        <van-cell  title="" title-style="color:red;font-size:18px;font-weight:600;" />-->
  <!--    </van-cell-group>-->

    <div class="Detail">
        <div class="Detail_big_title">
            <!--            【四川.成都】 奔驰-->
            【{{ detail_data.provinceCity }}】 {{ detail_data.brandname }}
        </div>
        <div class="Detail_text_box">
            <span class="Detail_title">联系人：</span>
            <span class="Detail_name">{{ detail_data.user_name }}</span>
        </div>

        <div class="Detail_text_box">
            <span class="Detail_title">联系方式：</span>
            <span class="Detail_num">{{ detail_data.Cluephone_number }}</span>
            &nbsp;
            <span class="Detail_num" style="color: #333333">【{{ detail_data.PhoneBelongingplace }}】</span>
        </div>
        <!--        <div class="Detail_text_box">-->
        <!--            <span class="Detail_title">号码归属地：</span>-->
        <!--            <span class="Detail_num" style="color: #333333" >四川省成都市</span>-->
        <!--        </div>-->

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
                    <van-button block @click="getBuy" plain :disabled="!residueNum" type="primary">
                        {{ residueNum <= 0 ? '已无购余额' : '买断剩余名额' }}
                    </van-button>
                </van-col>
                <van-col span="12">
                    <van-button @click="getBuy" block :disabled="!residueNum" type="primary">
                        {{ detail_data.count > 0 ? '已购买' : residueNum <= 0 ? '已无购余额' : '立即接单'}}
                    </van-button>
                </van-col>
            </van-row>
        </div>
        <!--        <van-divider/>-->

        <div class="Detail_text_box">
            <span class="Detail_title">线索来源：</span>
            <span class="Detail_num" style="color: #333333">{{ detail_data.clueName }}</span>
        </div>
        <div class="Detail_text_box">
            <van-row>
                <van-col span="12">
                    <span class="Detail_title">已发布：</span>
                    <span style="color: #333" class="Detail_name">{{ detail_data.upClueNum }} 条</span>
                </van-col>
                <van-col span="12">
                    <span class="Detail_title">好评率：</span>
                    <span style="color: #333" class="Detail_name">80%</span>
                </van-col>

            </van-row>


        </div>

        <div>
            <table border="1" class="Detail_table">
                <tr>
                    <th>购买记录</th>
                    <th>购买时间</th>
                    <th>购买条数</th>
                </tr>
                <tr>
                    <td>A***</td>
                    <td>2022-04-01</td>
                    <td>2</td>
                </tr>
                <tr>
                    <td>A***</td>
                    <td>2022-04-01</td>
                    <td>2</td>
                </tr>
                <tr>
                    <td>A***</td>
                    <td>2022-04-01</td>
                    <td>2</td>
                </tr>
            </table>
        </div>
        <div class="new_list">
            <line_text title="最新可接单循盘"></line_text>
        </div>

    </div>

    <List_box @click="toUrl(item)" v-for="item in listData" :Cluedata="item" :key="item"></List_box>
  <!--    <List_box></List_box>-->


</template>

<script>
import line_text from '@/components/line_text.vue'
import List_box from "@/components/List_box.vue";
import {getClueDetail, getClueList} from "@/api/clue"
import {closeToast, showConfirmDialog, showLoadingToast, showNotify} from 'vant';

import {onMounted, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import {logVer} from "@/utils/tool";
import {loginVerify} from "@/api/utils";
import {CeatedOrder} from "@/api/order";
import router from "@/router";

export default {
    name: "list_Business_Detail",
    components: {
        List_box,
        line_text
    },
    setup() {
        let detail_data = ref([])
        const route = useRoute()
        let residueNum = ref(0);// 剩余下单次数
        let listData = ref([]);

        // 初始化页面数据
        function getDetail(clueid) {
            let id = clueid || route.query.id;
            getClueDetail({id}).then((res) => {
                if (res.data.code !== 200 || res.data?.code === undefined) {
                    return false;
                }
                detail_data.value = res.data.data[0]
                residueNum.value = detail_data.value.sales - detail_data.value.Tosell
            })
            getClueList().then((res) => {
                listData.value = res.data.data;
                closeToast()
            })
        }


        function toUrl(item) {
            showLoadingToast({
                message: '加载中...',
                forbidClick: true,
            });
            getDetail(item.id)
        }

        async function getBuy() {

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

            let clue_id = route.query.id
            // 创建订单并存在数据库
            CeatedOrder({clue_id}).then((res) => {
                // console.log(res.data.data) // 订单号
                let data = res.data
                console.log(data)
                if(data.code === 200){
                    router.push({
                        path:'/payment',
                        query: {
                            out_trade_no : data.data.out_trade_no  //参数
                        }
                    })
                }else {
                    showNotify({
                        type:'danger',
                        message:data.mes
                    })
                }
            })
            //     成功后执行的方法
        }


        onMounted(() => {
            getDetail();
        })

        return {
            detail_data,
            residueNum,
            listData,
            toUrl,
            getBuy
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