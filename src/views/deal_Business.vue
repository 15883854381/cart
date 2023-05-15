<template>
  <!--成功案例-->
    <van-cell-group>
        <van-cell @click="goItem(item)" :key="item.title" v-for="item in data" is-link>
            <template #title>
                <van-text-ellipsis :content="item.title"/>

            </template>
        </van-cell>
    </van-cell-group>
</template>

<script>
import {SelectCase} from "@/api/deal";
import {onMounted, provide, reactive, ref} from "vue";
import router from "@/router";

export default {
    name: 'deal_Business',

    setup() {
        let data = ref([])
        onMounted(() => {
            SelectCase().then(res => {
                data.value = res.data.data
            })
        })

        provide("x", '456');

        function goItem(item) {
            router.push({
                path: 'success_content',
                query: {
                    id: item.id
                },
            })
        }

        return {
            data,
            goItem
        }
    }

}
</script>

<style lang="scss">

.text {
  font-size: 15px;
  padding: 5px;
  border-bottom: 1px solid #ccc;
}
</style>