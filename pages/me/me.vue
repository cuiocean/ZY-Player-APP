<template>
	<view class="me">
		<view class="status_bar"></view>
		<view class="logo">
			<img src="static/images/logo.png" alt="">
		</view>
		<view class="name">
			ZY Player Andriod
		</view>
		<u-cell-group>
      <u-cell-item title="清空收藏夹" value="清空收藏夹数据" :arrow="false" @click="itemClickEvent(i)"></u-cell-item>
      <u-cell-item title="重置软件" value="清空所有数据, 慎点" :arrow="false" @click="itemClickEvent(i)"></u-cell-item>
      <u-cell-item title="版本更新" value="0.1.0" :arrow="false" @click="itemClickEvent(i)"></u-cell-item>
      <u-cell-item title="关于" value="" :arrow="false" @click="itemClickEvent(i)"></u-cell-item>
    </u-cell-group>
		<view class="tips">
			所有资源来自网上, 该软件不参与任何制作, 上传, 储存等内容, 禁止传播违法资源. 该软件仅供学习参考, 请于安装后24小时内删除.
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			itemClickEvent(item) {}
		}
	}
</script>

<style lang="scss" scoped>
.me{
	.status_bar {
    height: var(--status-bar-height);
    width: 100%;
  }
	.logo{
		margin-top: 10px;
		width: 100%;
		text-align: center;
		img{
			width: 26%;
		}
	}
	.name{
		margin-top: 10px;
		text-align: center;
		font-size: 20px;
		margin-bottom: 10px;
	}
	.tips{
		color: #ff4445;
		padding: 15px;
	}
}
</style>
