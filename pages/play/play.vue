<template>
  <view class="play">
    <view class="play-box">
      <video class="player" :autoplay="true" :src="url"></video>
    </view>
    <view class="icon-box">
      <u-icon name="star" size="60"></u-icon>
      <u-icon name="star-fill" size="60"></u-icon>
      <u-icon name="share" size="60" style="margin-left: 20rpx"></u-icon>
    </view>
    <view class="btn-box">
      <u-button class="playBtn" plain :ripple="true" @click="selectPlay"
        >选集播放</u-button
      >
    </view>
    <u-select
      v-model="playShow"
      :list="playList"
      confirm-text="播放"
      @confirm="playConfirm"
    ></u-select>
  </view>
</template>

<script>
import http from "../../utils/request.js";
export default {
  data() {
    return {
      siteKey: "",
      id: "",
      name: "",
      url: "",
      playShow: false,
      playList: [],
    };
  },
  methods: {
    selectPlay() {
      this.playShow = !this.playShow;
    },
    playConfirm(e) {
      console.log(e)
      const d = e[0];
      this.url = d.value
      uni.setNavigationBarTitle({ title: d.label });
    },
    async getDetail(key, id) {
      const res = await http.detail(key, id);
      const arr = [];
      for (const i of res.m3u8List) {
        const j = i.split("$");
        let d = {
          index: i,
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
    this.name = opt.name;
    this.url = opt.url;
    this.getDetail(this.siteKey, this.id)
    uni.setNavigationBarTitle({ title: opt.name });
  }
};
</script>

<style lang="scss" scoped>
.play {
  .play-box {
    .player {
      width: 100vw;
    }
  }
  .icon-box {
    padding: 20px 10%;
    display: flex;
    justify-content: flex-end;
  }
  .btn-box {
    position: absolute;
    bottom: 20px;
    left: 0;
    width: 100%;
    .playBtn {
      width: 80%;
      margin: 0 auto;
    }
  }
}
</style>
