import {ref} from "vue";
import {CartBand, City} from "@/api/utils";

export default async function CityBrand() {
    //创建2个响应式变量来储存用户鼠标x轴和y轴的位置

    let city = ref([]);
    let brand = ref([]);

    // 城市数据
    let citydata = await City();
    city.value = citydata.data.data
    let brandata = await CartBand();
    brand.value = brandata.data.data

    return {city, brand}
}

