import axios from '../utils/http'

// 获取基本信息
export function upClue(data) {
    return axios.post('upClue', data)
}

// 获取基本信息
export function getClueList(data) {
    return axios.post('Clue/getClueList', data)
}

// 获取线索数量
export function getClueCount() {
    return axios.post('Clue/getClueCount')
}


// 获取线索详情
export function getClueDetail(id) {
    return axios.post('Clue/getClueDetail', id)
}

// 删除线索
export function deleteCurlData(data) {
    return axios.post('Clue/deleteCurl', data)
}


// 二手车
export function SelectCartData(data) {
    return axios.post('OldCart/SelectCart', data)
}

// 获取线索购买订单
export function SearchClueBuyNUmData(data) {
    return axios.post('Clue/SearchClueBuyNUm', data)
}


// 检查手机号码
export function batchUcheckData(data) {
    return axios.post('/Clue/Phonecheck', data)
}

// 获取线索详情页的录音
export function DetailPhoneRecordingData(data) {
    return axios.post('/Clue/DetailPhoneRecording', data)
}

// 线索推荐列表
export function ClueRecommendedData(data) {
    return axios.post('/Clue/ClueRecommended', data)
}

// 批量购查询线索接口
export function BulkbuyingData(data) {
    return axios.post('/Clue/Bulkbuying', data)
}

// 批量购查 查询价格
export function price_computeData(data) {
    return axios.post('/Clue/price_compute', data)
}

// 批量购查 下单
export function BuyNowData(data) {
    return axios.post('/Clue/BuyNow', data)
}

// 支付失败的回调
export function errorNotifyBath($url) {
    return axios.post($url)
}