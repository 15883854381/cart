import axios from "@/utils/http";

// 添加购物车
export function addShopCartData(data) {
    return axios.post('/ShopCart/addShopCar', data)
}

// 查询购物车
export function SelectShopCartData(data) {
    return axios.post('/ShopCart/SelectShopCart', data)
}

// 删除购物车
export function deleteShopCarData(data) {
    return axios.post('/ShopCart/deleteShopCar', data)
}
// 提交订单 并支付
export function submitOrderData(){
    return axios.post('/ShopCart/submitOrder')
}