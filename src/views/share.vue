<template>
    <van-cell-group>
        <van-cell @click="getItemUser(item)" v-for="item in ShartData" :is-link="Boolean(item.total)" :key="item">
            <template #title>
                <div class="shart_list">
                    <van-image
                            width="35"
                            height="35"
                            fit="cover"
                            round
                            :src="item.headimgurl"
                    />
                    <span class="shart_name">{{ item.nickname }}</span>
                </div>

            </template>
        </van-cell>
    </van-cell-group>
</template>

<script setup>
import {getShareListData} from "@/api/share";
import {onMounted, ref} from "vue";
import {showNotify} from "vant";
import {useRouter} from "vue-router";

let ShartData = ref();
const router = useRouter();

function getShartList() {
    getShareListData().then(res => {
        let {data, code, mes} = res.data
        if (code !== 200) {
            showNotify({
                type: 'danger',
                message: mes,
            })
            return false;
        }
        ShartData.value = data
    })
}

function getItemUser(e) {
    if (!e.total) {
        showNotify({
            type: 'primary',
            message: '该好友还没有上传线索',
        })
    } else {
        router.push({
            path: '/shareUserList',
            query: {
                userid: e.userid
            }
        })
    }
}

onMounted(() => {
    getShartList()
})

</script>
<style scoped lang="scss">
.van-cell {
  align-items: center;
}

.shart_list {
  display: flex;
  align-items: center;
}

.shart_name {
  padding-left: 10px;
}
</style>