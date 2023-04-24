<template>
    <div class="anchor_box">
        <van-index-bar>
            <van-index-anchor index="A"/>
            <van-cell @click="getBrand" title="文本"/>
            <van-cell title="文本"/>
            <van-cell title="文本"/>
            <div>
                <van-index-anchor index="B"/>
                <van-cell title="文本"/>
                <van-cell title="文本"/>
                <van-cell title="文本"/>
            </div>

        </van-index-bar>
    </div>
</template>

<script>
import {provide} from "vue";


export default {
    name: "up_userBand",
    setup(props, context) {
        provide('Brand', 'info')

        function getBrand() {
            context.emit('getBrand', {Brand: '1', BrandTitle: '现代'})

        }

        return {
            getBrand
        }
    }
}
</script>

<style scoped>
.anchor_box {
    background-color: #fff;
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
}

</style>