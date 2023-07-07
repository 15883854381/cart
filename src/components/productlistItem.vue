<script setup>
import {defineProps, defineEmits, reactive} from 'vue'

const props = defineProps({
    PhoneBelongingplace: String,
    // Tosell: Number,
    brand: String,
    // cart_type: Number,
    city: String,
    phone_number: String,
    province: String,
    record_file_url: String,
    sales: Number,
    sex: {
        type: String,
        default(sex) {
            return sex === 1 ? '先生' : '女士'
        }
    },
    clue_id: String,
    unitPrice_1: String,
    unitPrice_2: String,
    unitPrice_3: String,
    user_name: String,

})

const audioState = reactive({
    state: false,
    clue_id: props.clue_id
})

const emits = defineEmits(['startAudio', 'addCart'])

function startAudio() {
    emits('startAudio', audioState)
}

function addCart() {
    emits('addCart')
}

// defineEmits({
//     startAudio
// })


</script>

<template>
    <div class="item_box">
        <div class="title_0">
            <span>{{ user_name }}{{ sex }}</span>
            <span v-if="province">【{{ province }}.{{ city }}】</span>
            <span v-if="brand" >【{{ brand }}】</span>
        </div>

        <div class="title_1">
            <span class="buy_num">{{ phone_number }} 【{{ PhoneBelongingplace }}】</span>
            <span class="price">{{ unitPrice_1 }}.00</span>
        </div>
        <div class="title_2">
            <span>
                <span v-if="record_file_url">
                <van-icon @click="startAudio" v-if="audioState.state" name="pause-circle-o" size="28"/>
                <van-icon @click="startAudio" v-else name="play-circle-o" size="28"/>
                </span>


            </span>
            <span class="btn_span">
<!--                <van-button type="primary" v-if="sales>1" size="small">买断线索</van-button>-->
                <!--                <van-button type="primary" size="small">添加线索</van-button>-->
                <van-icon name="add" @click="addCart" size="0.6rem" color="#1989fa"/>
            </span>
        </div>
    </div>
</template>

<style scoped lang="scss">
.item_box {
  background-color: #ffffff;
  box-shadow: 0 0 5px #cccccc;
  margin: 8px;
  height: 100px;
  padding: 12px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;


  .title_0 {
    font-size: 17px;
    font-weight: bold;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .title_1 {
    font-size: 18px;
    display: flex;
    justify-content: space-between;

    .buy_num {
      font-size: 15px;
    }

    .price {
      font-size: 18px;
      color: #E60000;
      font-weight: 700;
    }
  }

  .title_2 {
    font-size: 18px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .btn_span {
      display: flex;
      align-items: center;

      .van-button {
        margin-left: 5px;
      }
    }
  }
}

</style>