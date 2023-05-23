import axios from '../utils/http'

// 获取城市数据
export function City() {
    return axios.post('Ulits/city')
}

// 获取汽车品牌数据
export function CartBand() {
    return axios.post('Ulits/CarBrand')
}


// 获取用户标签
export function userTags(data) {
    return axios.post('Ulits/userTags', data)
}

// 验证用户是否登录
export function loginVerify() {
    return axios.post('Ulits/loginVerify')
}

// 分享线索
export function shareClue() {
    return axios.post('Clue/shareClue')
}

// 分享线索
export function getUserId() {
    return axios.post('Ulits/UserId')
}
