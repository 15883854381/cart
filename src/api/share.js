import axios from '../utils/http'


const url = {
    getShareList: '/Share/getShareList',
    getUserDetail: '/Share/getUserDetail'
}


// 获取分享列表
export function getShareListData() {
    return axios({
        url: url.getShareList,
        method: 'post'
    })
}
// 获取单个用户的所有订单
export function getShareDetailData(data) {
    return axios({
        url: url.getUserDetail,
        method: 'post',
        data
    })
}