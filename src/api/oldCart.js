import axios from "@/utils/http";

const url = {
    upOldCart: "/OldCart/upOldCart",
}

// 上传二手车数据
export function upOldCartData(data) {
    return axios.post(url.upOldCart, data)
}