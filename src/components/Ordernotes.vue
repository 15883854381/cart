<template>
    <div>
        <van-notice-bar mode="closeable">若没有申述原因，可直接提交</van-notice-bar>
        <div class="border">
            <van-cell-group inset>
                <van-field
                        v-model="refund_reason"
                        rows="5"
                        autosize
                        label="申述原因"
                        type="textarea"
                        maxlength="500"
                        placeholder="请输入申述原因"
                        show-word-limit
                />
            </van-cell-group>
        </div>
        <div class="tjiao">
            <van-button type="primary" @click="submitOrder" round size="large">提交申述</van-button>
        </div>
    </div>
</template>

<script>
import {ref} from "vue";
import {refundReason} from "@/api/order";
import {useRoute, useRouter} from "vue-router";
import {showNotify} from "vant";

export default {
    name: "Ordernotes",
    setup() {
        let refund_reason = ref("");
        const route = useRoute();
        const router = useRouter();

        if (route.query?.id === undefined) {
            router.replace('/my_Clue')
        }

        function submitOrder() {
            let updata = {
                refund_reason: refund_reason.value,
                id: route.query.id
            }
            refundReason(updata).then(res => {
                let {code, mes} = res.data
                showNotify({type: code === 200 ? 'success' : 'danger', message: mes});
                if (code === 200) {
                    router.replace('/my_Clue')
                }
            })
        }

        return {
            refund_reason,
            submitOrder
        }
    }
}
</script>

<style scoped lang="scss">

.border {
  margin: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.tjiao {
  position: absolute;
  bottom: 60px;
  left: 0;
  right: 0;
}
</style>