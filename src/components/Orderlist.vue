<template>
    <div class="box">
        <div>
            <van-cell title="订单号：123456789456">
                <template #value>

                    <span class="title_sub">未付款</span>
                </template>
            </van-cell>
        </div>
        <!--标题-->
        <div class="content">
            <div class="box_title box_public">
            <span class="box_title_title"><span style="color: #1D69A7">李女士</span>【四川.成都】<span
                    style="color:#ff9900">【奔驰】</span></span>
                <span class="box_title_time">半小时前</span>
            </div>
            <div class="box_title_money">
                <span>2022.01.02</span>
                <span class="money_color">80.00 <small>￥</small> </span>
            </div>
        </div>
        <div class="footer_btn">
            <van-button plain round size="mini">&nbsp;取消订单&nbsp;</van-button>
            <van-button type="primary" round size="mini">&nbsp;立即付款&nbsp;
            </van-button>
        </div>
    </div>
    <div class="box">
        <div>
            <van-cell title="订单号：123456789456">
                <template #value>
                    <span class="title_sub">交易取消</span>
                </template>
            </van-cell>
        </div>
        <!--标题-->
        <div class="content">
            <div class="box_title box_public">
            <span class="box_title_title"><span style="color: #1D69A7">李女士</span>【四川.成都】<span
                    style="color:#ff9900">【奔驰】</span></span>
                <span class="box_title_time">半小时前</span>
            </div>
            <div class="box_title_money">
                <span>2022.01.02</span>
                <span class="money_color">80.00 <small>￥</small> </span>
            </div>
        </div>
        <div class="footer_btn">
            <van-button type="primary" round size="mini">&nbsp;重新下单&nbsp;</van-button>
        </div>
    </div>
    <div class="box">
        <div>
            <van-cell title="订单号：123456789456">
                <template #value>
                    <span class="title_sub">交易成功</span>
                </template>
            </van-cell>
        </div>
        <!--标题-->
        <div class="content">
            <div class="box_title box_public">
            <span class="box_title_title"><span style="color: #1D69A7">李女士</span>【四川.成都】<span
                    style="color:#ff9900">【奔驰】</span></span>
                <span class="box_title_time">半小时前</span>
            </div>
            <div class="box_title_money">
                <span>2022.01.02</span>
                <span class="money_color">80.00 <small>￥</small> </span>
            </div>
        </div>
        <div class="footer_btn">
            <van-button  plain round size="mini">&nbsp;订单申述&nbsp;</van-button>
            <van-button type="primary"  round size="mini">&nbsp;订单有效&nbsp;</van-button>
        </div>
    </div>
</template>
<script>

</script>

<style lang="scss">
.box {
  border: 1px solid #ccc;
  //padding: 5px 10px;
  margin: 5px 10px;
  border-radius: 4px;
  margin-bottom: 8px;

  &_public {
    margin: 5px 0;
  }

  .box_title_money {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 15px;
    padding-top: 10px;
    padding-bottom: 5px;
    color: #888;
  }


  &_tag {
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
  }

  &_title {
    display: flex;
    justify-content: space-between;
    align-items: center;

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

.content {
  border-top: 1px #ccc dotted;
  border-bottom: 1px #ccc dotted;
  padding: 0 10px;
}

.money_color {
  font-size: 18px;
  color: #F74603;
}

.footer_btn {
  display: flex;
  padding: 8px;
  justify-content: flex-end;
}
.title_sub{
    color: #D55324;font-size: 12px
}
</style>