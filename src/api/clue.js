import axios from '../utils/http'

// 获取基本信息
export function upClue(data){
    return axios.post('upClue',data)
}
// 获取基本信息
export function getClueList(){
    return axios.post('Clue/getClueList')
}
