import axios from '../utils/http'


export function getUpOrder(data){
   return  axios.post('/UpOrder/getUpOrder',data)
}

