<template>
	<view>
		<u-cell-group>
			<u-cell-item v-for="i in 50" :key="i" title="电影名称" value="资源来源" :arrow="false" @click="openDetail"></u-cell-item>
		</u-cell-group>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				site: 'kaka',
				uuid: 'haha'
			}
		},
		methods: {
			openDetail (item) {
				console.log('item')
				const url = `/pages/detail/detail?site=${this.site}&uuid=${this.uuid}`
				this.$u.route({url: url})
			}
		},
		onLoad() {}
	}
</script>

<style>

</style>
