import axios from "@/utils/http";

const url = {
    'upUserProcess': 'AdminUserProcess/upUserProcess',
    'getState': 'AdminUserProcess/getState'
};


// 上传用户的审核信息
export function UpUserInfo(data) {
    return axios({
        method: 'post',
        url: url.upUserProcess,
        data,
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    })
}

export function getStateData() {
    return axios.post(url.getState)
}