<template>
  <view class="detail">
    <view class="status_bar"></view>
    <view class="header">
      <view class="header-icon" @click="BackEvent">
        <u-icon class="icon" name="arrow-left"></u-icon>
      </view>
      <u-select
        class="moreSelect"
        v-model="moreShow"
        :list="moreList"
        @confirm="moreConfirm"
      ></u-select>
      <view class="header-icon" @click="moreShowEvent">
        <u-icon class="icon" name="more-dot-fill"></u-icon>
      </view>
    </view>
    <view class="bgImg">
      <img :src="detail.pic" />
    </view>
    <view class="box-info">
      <view class="play-btn" @click="playEvent">
        <u-icon name="play-circle" size="100"></u-icon>
      </view>
      <view class="name-box">
        <text class="name">{{ detail.name }}</text>
      </view>
      <view class="info-box">
        <text>{{ detail.area }}</text>
        <text class="gap">|</text>
        <text>{{ detail.lang }}</text>
        <text class="gap">|</text>
        <text>{{ detail.type }}</text>
        <text class="gap">|</text>
        <text>{{ detail.year }}</text>
        <text class="gap">|</text>
        <text>{{ detail.note }}</text>
      </view>
      <view class="info-box">
        <text>导演: {{ detail.director }}</text>
      </view>
      <view class="info-box">
        <text>演员: {{ detail.actor }}</text>
      </view>
      <view class="info-box">
        <text>简介: {{ detail.des }}</text>
      </view>
    </view>
    <view>
      <u-select
        v-model="playShow"
        :list="playList"
        confirm-text="播放"
        @confirm="playConfirm"
      ></u-select>
    </view>
  </view>
</template>

<script>
import db from "../../utils/database.js";
import http from "../../utils/request.js";
export default {
  data() {
    return {
      siteKey: "",
      id: "",
      detail: {},
      moreShow: false,
      moreList: [
        {
          value: "star",
          label: "收藏",
        },
        {
          value: "share",
          label: "分享",
        },
      ],
      playShow: false,
      playList: [],
    };
  },
  methods: {
    BackEvent() {
      uni.navigateBack();
    },
    moreShowEvent() {
      this.moreShow = !this.moreShow;
    },
    moreConfirm(e) {
      const val = e[0].value;
      if (val === "share") {
      }
      console.log(e, "eeee");
    },
    playEvent() {
      if (this.playList.length <= 1) {
        const d = this.playList[0];
        const url = `/pages/play/play?site=${d.extra.site}&id=${d.extra.id}&url=${d.value}`;
        this.$u.route({ url: url });
      } else {
        this.playShow = !this.playShow;
      }
    },
    playConfirm(e) {
      const d = e[0];
      const url = `/pages/play/play?site=${d.extra.site}&id=${d.extra.id}&url=${d.value}`;
      this.$u.route({ url: url });
    },
    async getDetail(key, id) {
      const res = await http.detail(key, id);
      this.detail = res;
      const arr = [];
      for (const i of res.m3u8List) {
        const j = i.split("$");
        let d = {
          value: j[1],
          label: j[0],
          extra: {
            site: key,
            id: id,
          },
        };
        arr.push(d);
      }
      this.playList = arr;
    },
  },
  onLoad(opt) {
    this.siteKey = opt.site;
    this.id = opt.id;
    this.getDetail(opt.site, opt.id);
  },
};
</script>
<style lang="scss" scoped>
.detail {
  .status_bar {
    height: var(--status-bar-height);
    width: 100%;
  }
  .header {
    position: absolute;
    top: var(--status-bar-height);
    left: 0;
    padding: 0 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    z-index: 2;
    width: 100%;
    margin-top: 10px;
    .header-icon {
      width: 30px;
      height: 30px;
      background-color: rgba(255, 255, 255, 0.7);
      text-align: center;
      line-height: 30px;
      border-radius: 50%;
    }
  }
  .bgImg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 0;
    img {
      width: 100%;
      height: auto;
    }
  }
  .box-info {
    width: 100%;
    height: auto;
    padding: 40px 30px;
    border-radius: 30px;
    background-color: #FFFFFF;
    position: absolute;
    margin-top: 50vh;
    z-index: 1;
    .play-btn {
      position: absolute;
      top: -80rpx;
      right: 50px;
      padding: 20rpx;
      border-radius: 50%;
      background-color: #FFFFFF;
      border: 1px solid #f8f8f8;
    }
    .name-box {
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      .name {
        font-size: 40rpx;
      }
    }
    .info-box {
      margin-top: 20rpx;
      .gap {
        margin: 0 10rpx;
      }
    }
  }
}
</style>
