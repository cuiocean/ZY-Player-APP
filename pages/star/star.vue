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
				id: 'haha'
			}
		},
		methods: {
			openDetail (item) {
				const url = `/pages/detail/detail?site=${this.site}&id=${this.id}&name=${item.label}&url=${item.value}`
				this.$u.route({url: url})
			}
		},
		onLoad() {}
	}
</script>

<style>

</style>
