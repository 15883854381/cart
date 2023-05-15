import axios from '../utils/http'

const url = {
    SelectSucessCase:'Success/SelectSucessCase'
}

export function SelectCase(data){
    return axios.post(url.SelectSucessCase,data)
}