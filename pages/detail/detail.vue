<template>
	<view class="detail">
		<view class="status_bar"></view>
		<view class="header">
			<u-icon name="arrow-left"></u-icon>
			<u-select v-model="moreShow" :list="list"></u-select>
			<u-icon @click="moreShowEvent" name="more-dot-fill"></u-icon>
		</view>
		<view class="bgImg">
			<img src="http://pic1.sc.chinaz.com/Files/pic/pic9/202002/zzpic23344_s.jpg" alt="">
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				site: '',
				uuid: '',
				moreShow: false,
				list: [
					{
						value: 'star',
						label: '收藏'
					},
					{
						value: 'share',
						label: '分享'
					}
				]
			}
		},
		methods: {
			moreShowEvent () {
				this.moreShow = !this.moreShow
			}
		},
		onLoad(opt) {
			this.site = opt.site
			this.uuid = opt.uuid
		}
	}
</script>

<style lang="scss" scoped>
.detail{
	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
	}
	.header{
		padding: 0 20px;
		height: 20px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		z-index: 5;
		background-color: #fff;
	}
	.bgImg{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		z-index: 4;
		img{
			width: 100%;
			height: auto;
		}
	}
}
</style>
