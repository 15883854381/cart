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

// 获取用户的基本信息
export function UserInfoData(data){
    return axios.post('User/UserInfo',data)
}

// 验证是否关注关注号
export function WechatAttentionVerification(data){
    return axios.post('User/WechatAttentionVerification',data)
}