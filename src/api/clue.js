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
    console.log(id)
    return axios.post('Clue/getClueDetail', id)
}

// 删除线索
export function deleteCurlData(id) {
    console.log(id)
    return axios.post('Clue/deleteCurl', id)
}
