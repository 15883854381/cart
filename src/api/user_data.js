import axios from '../utils/http'

// 获取基本信息
export function getUserInfo(data){
    return axios.post('User/index',data)
}

// 获取验证码
export function sendcode(data){
    return axios.post('Ulits/sendcode',data)
}
// 验证验证码
export function getcode(data){
    return axios.post('User/getcode',data)
}