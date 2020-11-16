<template>
	<view class="play">
    <view class="play-box">
      <video class="player" src="https://yuledy.helanzuida.com/20200914/10914_1fd2fcf5/index.m3u8"></video>
    </view>
    <view class="icon-box">
      <u-icon name="star" size="60"></u-icon>
      <u-icon name="star-fill" size="60"></u-icon>
      <u-icon name="share" size="60" style="margin-left: 20rpx;"></u-icon>
    </view>
    <view class="btn-box">
      <u-button class="playBtn" plain :ripple="true" @click="selectPlay">选集播放</u-button>
    </view>
    <u-select v-model="playShow" :list="playList" confirm-text="播放" @confirm="playConfirm"></u-select>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				site: '',
        uuid: '',
        url: '',
        playShow: false,
        playList: []
			}
		},
		methods: {
      selectPlay () {
        this.playShow = !this.playShow;
      },
			playConfirm (e) {}
		},
    onLoad (opt) {
      this.site = opt.site
      this.uuid = opt.uuid
      this.url = opt.url
      uni.setNavigationBarTitle({ title: '名字' })
    }
	}
</script>

<style lang="scss" scoped>
.play{
  .play-box{
    .player{
      width: 100vw;
    }    
  }
  .icon-box{
    padding: 20px 10%;
    display: flex;
    justify-content: flex-end;
  }
  .btn-box{
    position: absolute;
    bottom: 20px;
    left: 0;
    width: 100%;
    .playBtn{
      width: 80%;
      margin: 0 auto;
    }
  }
}
</style>
