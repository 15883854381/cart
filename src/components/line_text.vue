<template>
    <div class="line_box">
        <span class="line_title"> {{ title }}</span>
    </div>

</template>

<script>
export default {
    name: "line_text",
    props:{
        color:{
            default:'#F4350B'
        },
        height:{
            default:'2'
        },
        bgColor:{
            default:'#F4350B'
        },
        title:{
            type:String,
            default:'我是下划线标题,使用 title="设置标题"'
        }
    },
}
</script>

<style scoped lang="scss">
.line_box {
  width: 100%;
  margin-bottom: 12px;
}

.line_title {
  font-size: 16px;
  color: red;
  position: relative;

  &::after {
    content: "";
    width: 100%;
    height: 2px;
    background-color: red;
    position: absolute;
    bottom: -4px;
    left: 0;
  }
}
</style>