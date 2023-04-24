<template>
  <div class="my-box">
    <div class="m-head">
      <div class="m-head-img">
        <van-image
          round
          width="55px"
          height="55px"
          src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
        />
        <!-- <u-avatar size="55" :src="userInfo.avatarUrl"></u-avatar> -->
      </div>
      <div class="m-head-user" v-if="userInfo.nickName">
        <div class="m-head-name">{{ userInfo.nickName }}</div>
        <div class="m-head-tag">158****4321</div>
      </div>
      <div class="m-head-user" v-else>
        <div
          class="m-head-name"
          @click="getUserProfile"
          type="button"
          open-type="chooseAvatar"
          @chooseavatar="getUserProfile"
        >
          登录/注册
        </div>
      </div>
      <div class="m-head-edit-user">
        <text class="m-head-edit-user-font">个人中心</text>
        <van-icon name="arrow" size="13" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      avatarUrl: "https://cdn.udivui.com/udiv/goods/5.jpg",
      userInfo: {
        nickName: "123",
        avatarUrl: "https://cdn.udivui.com/udiv/goods/5.jpg",
      },
    };
  },
  mounted() {
    this.getuserDetail();
  },
  methods: {
    getuserDetail() {
      console.log(789);
    },
    getUserProfile() {
      console.log(789);
    },
  },
};
</script>

<style lang="scss">
.m-head {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 13px 20px 0;

  .m-head-user {
    flex: 1;
    margin-left: 20px;

    .m-head-name {
      font-size: 17px;
      color: #000;
      font-weight: 600;
    }

    .m-head-tag {
      font-size: 13px;
      padding-top: 5px;
    }
  }

  .m-head-edit-user {
    display: flex;
    align-items: center;

    .m-head-edit-user-font {
      font-size: 13px;
      margin-right: 4px;
    }
  }
}

.grid-text {
  font-size: 14px;
  color: #8a9aa9;
}

.m-tem_box {
  box-shadow: 0 3px 3px #ccc;
  margin-bottom: 15px;
}

.tem_box {
  text-align: center;

  &_num {
    font-size: 14px;
    font-weight: 600;
  }

  &_font {
    font-size: 15px;
    margin-top: 4px;
  }
}
</style>
