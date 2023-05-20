<template>
    <van-form @submit="onSubmit" v-if="state==='2' || state==='0'">
        <van-cell-group inset>
            <van-field name="type" label="类型">
                <template #input>
                    <van-radio-group @change="getType" v-model="form.type" direction="horizontal">
                        <van-radio name="1">个人</van-radio>
                        <van-radio name="2">企业</van-radio>
                    </van-radio-group>
                </template>
            </van-field>

            <van-field
                    v-model="form.username"
                    name="username"
                    label="联系人"
                    placeholder="请填写联系人"
                    :rules="[{ required: true, message: '请填写联系人' }]"
            />
            <van-field
                    v-model="form.phone_number"
                    name="phone_number"
                    label="联系号码"
                    placeholder="请填写联系号码"
                    :rules="[{ required: true, message: '请填写联系号码' }]"
            />
            <div v-if="form.type==='2'">
                <van-field
                        v-model="form.companyName"
                        name="companyName"
                        label="公司名称"
                        placeholder="请填写公司名称"
                        :rules="[{ required: true, message: '请填写公司名称' }]"
                />
                <van-field name="fileList" label="文件上传"
                           :rules="[{ required: true, message: '请填写上传营业执照' }]">
                    <template #input>
                        <van-uploader v-model="form.fileList" multiple :max-count="2"/>
                    </template>
                </van-field>
            </div>
        </van-cell-group>
        <div style="margin: 16px;">
            <van-button round block type="primary" native-type="submit">
                提交
            </van-button>
        </div>
    </van-form>
    <van-empty v-else :description="state=='1'?'审核成功':'资料还在审核中...'"/>
</template>
<script setup>
import {reactive, ref} from "vue";
import {getStateData, UpUserInfo} from "@/api/upUserInfo";
import router from "@/router";
import {showNotify} from "vant";

let form = reactive({
    companyName: '',
    fileList: [],
    type: '1',
    username: '',
    phone_number: '',
});
let userInfo = JSON.parse(localStorage.getItem('userInfo'));

let state = ref('0')

// 判断是  个人认证 或 公司认证
function getType(e) {
    form.type = e
}

// 获取提交数据
function onSubmit(itemData) {
    const formData = new FormData();
    for (let k in itemData) {
        if (k === 'fileList') {
            for (let i in itemData[k]) {
                formData.append(`file[]`, itemData[k][i].file);
            }
            continue
        }
        formData.append(k, itemData[k]);
    }
    UpUserInfo(formData).then(res => {
        let {code, mes} = res.data
        if (code === 200) {
            router.replace('/user_data')
        }
        showNotify({
            type: code === 200 ? 'success' : 'danger',
            message: mes
        })
    })
}

function getState() {
    getStateData().then(res => {
        let {code, data} = res.data
        if (code === 200) {
            state.value = data.flag
        }
        console.log(data)
    })
}


form.phone_number = userInfo.phone_number

getState()

</script>

<style scoped lang="scss">

</style>