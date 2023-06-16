<template>
    <div class="all_box">
        <div class="header_box">
            <div class="header_pad">
                <div class="header_pad_mon">{{ totals }} <small>元</small></div>
                <div>累计收益</div>
            </div>
        </div>
        <div class="body_box">
            <div>
                <van-cell title="收益明细">
                    <template #title>
                        <span class="body_title">明细列表</span>
                    </template>
                </van-cell>
            </div>
            <div>
                <van-cell-group>
                    <van-cell :key="item" v-for="item in dataList"
                              :title="`${item.user_name}${item.sex===1?'先生':'女士'}` "
                              :label="item.payment_time">
                        <template #value>
                            <span class="body_num">+ {{ item.price }}</span>
                        </template>
                    </van-cell>


                </van-cell-group>
            </div>

        </div>
    </div>

</template>


<script setup>
import {incomeDetailData} from "@/api/order";
import {onMounted, ref} from "vue";
import {showNotify} from "vant";

let dataList = ref();
let totals = ref(0);

function incomeDetail() {
    incomeDetailData().then(res => {
        let {code, data: {data, total}, mes} = res.data
        if (code !== 200) {
            showNotify({
                type: "danger",
                message: mes
            })
            return false;
        }
        totals.value = total
        dataList.value = data
    })
}

onMounted(() => {
    incomeDetail()
})


</script>
<style scoped lang="scss">
.all_box {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 60px);
  background-color: #F6F6F6;
}

.header_box {
  margin: 10px;
  height: 110px;
  border: 1px solid #00D4B1;
  border-radius: 4px;
  background-color: #00D4B1;
  display: flex;
  align-items: center;
  justify-content: center;

  .header_pad {
    color: #ffffff;
    font-size: 14px;
    text-align: center;

    .header_pad_mon {
      font-weight: bold;
      font-size: 24px;
    }
  }
}

.body_box {
  //border: 1px solid;
    border-radius: 4px;
  margin: 0 10px;
  flex: 1;
  overflow: auto;
  background-color: #ffffff;

  .body_title {
    font-size: 15px;
    font-weight: bold;
  }

  .body_num {
    color: #00D4B1;
    font-size: 15px;
  }
}
</style>