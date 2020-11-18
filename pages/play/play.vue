<template>
  <view class="play">
    <view class="play-box">
      <video class="player" :autoplay="true" :src="url"></video>
    </view>
    <view class="icon-box">
      <u-icon name="share" size="60" color="#1e88e5" style="margin-right: 30rpx"></u-icon>
      <u-icon v-if="!starShow" name="star" size="60" @click="addStar()"></u-icon>
      <u-icon v-if="starShow" name="star-fill" color="#ff4445" size="60" @click="removeStar()"></u-icon>
      <u-icon name="play-circle" size="70" color="#6dd143" @click="selectPlay()" style="margin-left: 30rpx"></u-icon>
    </view>
    <view class="box-info">
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
    <u-select
      v-model="playShow"
      :list="playList"
      confirm-text="播放"
      @confirm="playConfirm"
    ></u-select>
    <u-toast ref="uToast" />
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
      name: "",
      url: "",
      playShow: false,
      playList: [],
      detail: {},
      starShow: true
    };
  },
  methods: {
    selectPlay() {
      this.playShow = !this.playShow;
    },
    playConfirm(e) {
      const d = e[0];
      this.url = d.value
      uni.setNavigationBarTitle({ title: d.label });
    },
    async getDetail(key, id) {
      const res = await http.detail(key, id);
      this.detail = res;
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
    async checkStar () {
      const res = await db.get('star', `${this.siteKey}-${this.id}`)
      this.starShow = res.flag
    },
    async removeStar () {
      const res = await db.remove('star', `${this.siteKey}-${this.id}`)
      if (res.flag) {
        this.$refs.uToast.show({ title: '移除收藏成功', type: 'success', duration: '2300' })
      } else {
        this.$refs.uToast.show({ title: '移除收藏失败', type: 'warning', duration: '2300' })
      }
      this.checkStar()
    },
    async addStar () {
      let s = {...this.detail}
      s.key = `${this.siteKey}-${this.id}`
      const res = await db.add('star', s)
      if (res.flag) {
        this.$refs.uToast.show({ title: '添加收藏成功', type: 'success', duration: '2300' })
      } else {
        this.$refs.uToast.show({ title: '添加收藏失败', type: 'warning', duration: '2300' })
      }
      this.checkStar()
    }
  },
  onLoad(opt) {
    this.siteKey = opt.site;
    this.id = opt.id;
    this.name = opt.name;
    this.url = opt.url;
    this.getDetail(this.siteKey, this.id)
    this.checkStar()
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
  .box-info {
    padding: 0 10% 10px;
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
