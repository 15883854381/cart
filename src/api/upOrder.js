import axios from '../utils/http'


export function getUpOrder(){
   return  axios.post('/UpOrder/getUpOrder')
}

