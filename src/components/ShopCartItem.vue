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
    nonstock: Number,

})

const audioState = reactive({
    state: false,
    clue_id: props.clue_id
})

const emits = defineEmits(['startAudio', 'deleteCar'])

function startAudio() {
    emits('startAudio', audioState)
}

function deleteCar() {
    emits('deleteCar')
}

// defineEmits({
//     startAudio
// })


</script>

<template>
    <div class="item_box" :class="{'nonstock':(nonstock===0)}">
        <div class="title_0">
            <span>{{ user_name }}{{ sex }}</span>
            <span v-if="province">【{{ province }}.{{ city }}】</span>
            <span v-if="brand">【{{ brand }}】</span>
        </div>

        <div class="title_1">
            <span class="buy_num">
                {{ phone_number }} 【{{ PhoneBelongingplace }}】
                <span v-if="nonstock===0" class="nonstock_color">无库存</span>
            </span>
            <span class="price" :class="{'nonstock_price_font':(nonstock===0)}">{{ unitPrice_1 }}.00</span>
        </div>
        <div class="title_2">
            <span>
                <span v-if="record_file_url">
                <van-icon @click="startAudio" v-if="audioState.state" name="pause-circle-o" size="28"/>
                <van-icon @click="startAudio" v-else name="play-circle-o" size="28"/>
</span>
            </span>
            <span class="btn_span">
                <van-icon name="delete-o" @click="deleteCar" size="0.58rem" color="red"/>
            </span>
        </div>
    </div>
</template>

<style scoped lang="scss">
.nonstock {
  color: #c0c4cc;
  cursor: not-allowed;
  background-image: none;
  background-color: #fff !important;
  border-color: #ebeef5;
}

.nonstock_color {
  color: #E60000;
  font-weight: bold;
}

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

    .nonstock_price_font {
      color: #c0c4cc !important;
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