<template>
    <div class="box">
        <!--标题-->
        <div class="box_title box_public">
            <span class="box_title_title">[四川.成都] 奔驰</span>
            <span class="box_title_time">半小时前</span>
        </div>

        <!--收获地址和发布时间-->
        <div class="box_city box_public">
            <span class="box_city_title">李女士</span>
            <span class="box_city_time">号码归属地：四川省成都市</span>
        </div>


        <div class="box_tag">
            <van-tag size="medium" type="primary">分期</van-tag>
            <van-tag size="medium" type="primary">全款</van-tag>
            <van-tag size="medium" type="primary">急需</van-tag>
            <van-tag size="medium" type="primary">2月内购买</van-tag>
            <van-tag size="medium" type="primary">定金</van-tag>
        </div>

        <!--进度条 -->
        <div class="box_progress">
            <van-progress pivot-text="2/4" :percentage="50" color="#349C30" stroke-width="8"/>
        </div>

        <div class="box_footer">
            <div>
                <span>V1</span> <span>已发布 500 条</span> <span>好评率：80%</span>
            </div>
            <div>
                成都**汽贸有限公司
            </div>

        </div>


    </div>
</template>

<script>
export default {
    name: "List_box"
}
</script>

<style scoped lang="scss">
.box {
  border: 1px solid #ccc;
  padding: 10px;
  margin: 10px;
  border-radius: 4px;
  margin-bottom: 15px;

  &_public {
    margin: 5px 0;
  }

  &_tag {
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
  }

  &_title {
    display: flex;
    justify-content: space-between;

    &_title {
      font-size: 16px;
      color: #D55324;
      font-weight: bold;
    }

    &_time {
      font-size: 12px;
      color: #CECECE;
    }
  }

  &_city {
    font-size: 14px;
    margin: 8px 0;
    display: flex;
    justify-content: space-between;
    color: #74A876;

    &_title {
      font-size: 13px;
    }

    &_time {
      font-size: 13px;
      color: #CECECE;
    }
  }

  &_describe {
    font-size: 14px;
    color: #505050;
    margin-bottom: 15px;
  }

  &_progress {

    margin: 10px auto;
  }

  &_footer {
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}


</style>