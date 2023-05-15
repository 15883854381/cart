import axios from '../utils/http'

const url = {
    Usercustomer:'Admincustomer/Usercustomer'
}

export function Usercustomer(data){
    return axios.post(url.Usercustomer,data)
}