<template>
    <div class="box">
        <van-image
                class="img"
                width="5rem"
                height="5rem"
                fit="cover"
                position="center"
                :src="data.WatchCode"
        />
        <span class="nickname">{{ data.nickname }}</span>
    </div>

</template>

<script>
import {Usercustomer} from '@/api/customer'
import {onMounted, ref} from "vue";

export default {
    name: "customer",
    setup() {

        let data = ref({})

        function UsercustomerData() {
            Usercustomer().then(res => {
                data.value = res.data.data
            })
        }

        onMounted(() => {
            UsercustomerData()
        })

        return {
            data,

        }
    }

}
</script>

<style scoped lang="scss">
.box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin-top: -100px;


  .img {
    border: 1px solid #333;
  }

  .nickname {
    margin-top: 15px;
    font-size: 20px;
  }
}

</style>