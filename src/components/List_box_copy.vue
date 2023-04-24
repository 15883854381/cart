<template>
    <div class="box">
        <!--标题-->
        <div class="box_title box_public">
            <span class="box_title_title"><span style="color: #1D69A7">李女士</span>【四川.成都】<span
                    style="color:#ff9900">【奔驰】</span></span>
            <span class="box_title_time">半小时前</span>
        </div>

        <!--收获地址和发布时间-->
        <!--        <div class="box_city box_public">-->
        <!--            &lt;!&ndash;            <span class="box_city_title">李女士</span>&ndash;&gt;-->
        <!--            &lt;!&ndash;            <span class="box_city_time">归属地：<span class="box_city_time_city" >四川省成都市</span></span>&ndash;&gt;-->
        <!--            &lt;!&ndash;            <span class="box_city_money"> 200 <small style="font-size: 12px" >￥</small> </span>&ndash;&gt;-->
        <!--        </div>-->
        <div class="tag_box">

            <div class="tag_box_tag">
                <span style="font-size: 13px"><b>意向：</b></span>
                <van-tag plain type="primary">二手车</van-tag>
                <van-tag plain type="primary">全款</van-tag>
                <van-tag plain type="primary">分期购</van-tag>
                <van-tag plain type="primary">定金</van-tag>
                <van-tag plain type="primary">二手</van-tag>
                <van-tag plain type="primary">二手</van-tag>
                <van-tag plain type="primary">二手</van-tag>
            </div>

            <div class="tag_box_money">
                <span class="box_city_money">
                    200 <small class="box_city_￥">￥</small>
                </span>
            </div>

        </div>
        <!--进度条 -->
        <div class="box_progress">
            <van-progress pivot-text="2/4" :percentage="50" color="#349C30" stroke-width="14"/>
        </div>

        <div class="box_footer">
            <div class="box_footer_icon">
                <span>
                   <van-icon class="iconfont" color="#F0D9AB" class-prefix="my-icon" name="v11"/>
                </span>
                <span>
                    <van-icon class="iconfont" class-prefix="my-icon" name="fabucheliang"/> 500 条
                </span>
                <span>
                    <van-icon class="iconfont" class-prefix="my-icon" name="dianzan"/> 80%
                </span>
            </div>
            <div>
                成都**汽贸有限公司
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "List_box",
    props: {
        user_name: {
            type: String,
            default: '',
        },
        cartName: {
            type: String,
            default: '',
        },
        Cluephone_number: {
            type: String,
            default: '',
        },
        Tosell: {
            type: String,
            default: '',
        },
        clueName: {
            type: String,
            default: '',
        },
        provinceCity:{
            type: String,
            default: '',
        }
    }
}
</script>

<style scoped lang="scss">

.box {
  border: 1px solid #ccc;
  padding: 5px 10px;
  margin: 5px 10px;
  border-radius: 4px;
  margin-bottom: 8px;

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
    align-items: baseline;
    font-weight: bold;
    color: #74A876;

    &_money {
      font-size: 18px;
      color: #F74603;

      .box_city_￥ {
        font-size: 12px;
      }
    }

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

    &_icon {
      flex: 1;
      display: flex;
      justify-content: start;

      span {
        margin-right: 10px;
      }

    }
  }

}

.tag_box {
  display: flex;
  justify-content: space-between;

  &_tag {
    flex: 1;
  }

  &_money {
    padding-left: 5px;
  }

  .van-tag {
    margin-right: 5px;
  }
}


</style>