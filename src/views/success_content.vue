<template>
    <div class="content_box">
        <div>
            <span class="Content_title">{{ data.title }}</span>
        </div>
        <div class="Content_time">
            <span>{{ data.create_time }}</span>
            <span class="Content_subTitle">汽车共享联盟</span>
        </div>
        <div class="content">
            <div v-html="data.content"></div>
        </div>
    </div>

  <!--    {{data}}-->


</template>

<script>
import {onMounted, reactive, ref} from "vue";
import {SelectCase} from "@/api/deal";
import {useRoute, useRouter} from "vue-router";

export default {
    name: "success_content",
    setup() {
        const route = useRoute();
        const router = useRouter();
        let data = ref({})
        console.log(route.query)
        if (route.query?.id === undefined) {
            router.replace('/deal_Business')
        }
        let id = route.query;
        onMounted(() => {
            SelectCase(id).then(res => {
                console.log(res.data.data)
                data.value = res.data.data[0]
            })
        })

        return {
            data
        }
    }
}
</script>

<style scoped>
.content_box {
    padding: 10px;
}

.content {
    width: 100%;
    overflow: auto;
    word-wrap: break-word
}

.Content_title {
    font-size: 25px;
    font-weight: bold;
}

.Content_time {
    margin: 10px 0;
    font-size: 14px;
}

.Content_subTitle {
    margin-left: 10px;
    color: #0077aa;
}

</style>