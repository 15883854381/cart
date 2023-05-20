import {ref} from "vue";
import {CartBand, City} from "@/api/utils";

export default function () {
    let city = ref();
    let brand = ref();

    function CityData() {
        // 城市数据
        City().then((res) => {
            city.value = res.data.data
        })
        // 汽车品牌数据
        CartBand().then((res) => {
            brand.value = res.data.data
        });
    }
    CityData();

    return {city, brand}


}