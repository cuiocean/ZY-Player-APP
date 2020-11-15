<template>
	<view class="u-demo">
		<view class="u-demo-wrap">
			<view class="u-demo-title">演示效果</view>
			<view class="u-demo-area">
				<view class="no-mode-here">
					请求结果为：
				</view>
				<view class="u-demo-result-line">
					{{JSON.stringify(result)}}
				</view>
			</view>
		</view>
		<view class="u-config-wrap">
			<view class="u-config-title u-border-bottom">
				参数配置
			</view>
			<view class="u-config-item">
				<view class="u-item-title">请求方式</view>
				<u-subsection vibrateShort :list="['get', 'post']" @change="getResult"></u-subsection>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				result: {}
			}
		},
		onLoad() {
			this.getGet();
		},
		methods: {
			getGet() {
				this.$u.get('/ebapi/store_api/hot_search', {
					id: 2
				}).then(res => {
					this.result = res;
				})
			},
			getPost() {
				this.$u.post('http://192.168.2.21:7001/manager/login', {
					"userName": "yiruiwen3",
					"password": "123456"
				}).then(res => {
					this.result = res.banner;
				})
			},
			getResult(index) {
				index == 0 ? this.getGet() : this.getPost();
			}
		}
	}
</script>

<style lang="scss" scoped>
	.u-demo {}
</style>
