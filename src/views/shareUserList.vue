<template>
    <div class="margin_box">


        <div class="padding_box" v-for="item in datas">
            <div class="box">
                <span class="title">用户称呼</span>
                <span class="content">{{ item.user_name }}</span>
            </div>
            <div class="box">
                <span class="title">联系方式</span>
                <span class="content"><small
                        style="color: #E60000;font-size: 15px">{{
                    item.Cluephone_number
                    }}</small>  【{{ item.PhoneBelongingplace }}】</span>
            </div>
            <div class="box">
                <span class="title">购车地址</span>
                <span class="content">{{ item.provinceCity }}</span>
            </div>
            <div class="box">
                <span class="title">购车品牌</span>
                <span class="content">{{ item.brandname }}</span>
            </div>
            <div class="box">
                <span class="title">线索价格</span>
                <span class="content"><small style="color: #E60000;font-size: 15px">{{ item.Price }}.00</small></span>
                <span class="title"><van-button type="primary" @click="toUrl(item)"
                                                size="mini">去购买</van-button></span>
            </div>
        </div>
        <!--        <div class="padding_box">-->
        <!--            <div class="box">-->
        <!--                <span class="title">用户称呼</span>-->
        <!--                <span class="content">张先生</span>-->
        <!--            </div>-->
        <!--            <div class="box">-->
        <!--                <span class="title">联系方式</span>-->
        <!--                <span class="content"><small-->
        <!--                        style="color: #E60000;font-size: 15px">137*******</small>  【四川德阳】</span>-->
        <!--            </div>-->
        <!--            <div class="box">-->
        <!--                <span class="title">购车地址</span>-->
        <!--                <span class="content">四川.成都</span>-->
        <!--            </div>-->
        <!--            <div class="box">-->
        <!--                <span class="title">购车品牌</span>-->
        <!--                <span class="content">宝马</span>-->
        <!--            </div>-->
        <!--            <div class="box">-->
        <!--                <span class="title">线索价格</span>-->
        <!--                <span class="content"><small style="color: #E60000;font-size: 15px">1.00</small></span>-->
        <!--                <span class="title"><van-button type="primary" size="mini">去购买</van-button></span>-->
        <!--            </div>-->
        <!--        </div>-->
    </div>
</template>
<script setup>

import {getShareDetailData} from "@/api/share";
import {onMounted, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import {showNotify} from "vant";

const route = useRoute();
const router = useRouter();

let datas = ref();
if (route.query?.userid === undefined) {
    router.replace('/share')
}


function getShareDetail() {
    getShareDetailData({userid: route.query.userid}).then(res => {
        let {data, code, mes} = res.data
        if (code !== 200) {
            showNotify({
                type: 'danger',
                message: mes
            })
        } else {
            datas.value = data
        }
    })
}

function toUrl(e) {
    router.replace({
        path: 'list_Business_Detail',
        query: {
            id: e.id
        }
    })
}

onMounted(() => {
    getShareDetail()
})

</script>

<style scoped lang="scss">
.margin_box {
  background-color: #f7f7f7;
}

.padding_box {
  padding: 10px;
  margin: 15px 10px 10px;
  border-radius: 3px;
  border: 1px solid #fff;
  background-color: #fff;
  box-shadow: 0 0 8px #ccc;
}

.box {
  font-size: 13px;
  padding: 6px 0;
  display: flex;
  justify-content: space-around;
  align-items: center;

  .title {
    padding-right: 8px;
    color: #8F8F8F;
  }

  .content {
    flex: 1;
    color: #373737;
    font-weight: bold;
  }

}
</style>