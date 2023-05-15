import axios from '../utils/http'


// 查询用户购买订单
export function getClueOlder() {
    return axios.post('/orderSelect')
}

// 创建订单
export function CeatedOrder(data) {
    return axios({
        method: 'post',
        url: '/Order/order',
        data
    })

}

// 确认订单有效
export function OrderEditQuery(data) {
    return axios({
        method: 'post',
        url: '/Order/OrderEditQuery',
        data
    })
}
// 申述订单
export function refundReason(data) {
    return axios({
        method: 'post',
        url: '/Order/refund_reason',
        data
    })
}
// 查询单个订单是否有效
export function orderDetail(data) {
    return axios({
        method: 'post',
        url: '/Order/orderDetail',
        data
    })
}


