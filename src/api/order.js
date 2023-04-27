import axios from '../utils/http'


// 查询用户购买订单
export function getClueOlder() {
    return axios.post('/CallingPhone')
}