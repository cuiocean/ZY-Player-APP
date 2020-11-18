<template>
  <view class="me">
    <view class="status_bar"></view>
    <view class="logo">
      <img src="static/images/logo.png" alt="" />
    </view>
    <view class="name"> ZY Player Andriod </view>
    <u-cell-group>
			<u-cell-item
        title="播放记录"
        value="TODO（未完成）"
        :arrow="false"
        @click="openHistoryPage()"
      ></u-cell-item>
			<u-cell-item
        title="视频源管理"
        value="TODO（未完成）"
        :arrow="false"
        @click="siteEdite()"
      ></u-cell-item>
			<u-cell-item
        title="清空播放记录"
        value="清空播放记录数据"
        :arrow="false"
        @click="clearHistory()"
      ></u-cell-item>
      <u-cell-item
        title="清空收藏夹"
        value="清空收藏夹数据"
        :arrow="false"
        @click="clearStar()"
      ></u-cell-item>
      <u-cell-item
        title="重置软件"
        value="清空所有数据, 慎点"
        :arrow="false"
        @click="resetApp()"
      ></u-cell-item>
      <u-cell-item
        title="版本更新"
        value="0.1.0"
        :arrow="false"
        @click="itemClickEvent(i)"
      ></u-cell-item>
      <u-cell-item
        title="关于"
        value=""
        :arrow="false"
        @click="itemClickEvent(i)"
      ></u-cell-item>
    </u-cell-group>
    <view class="tips">
      所有资源来自网上, 该软件不参与任何制作, 上传, 储存等内容,
      禁止传播违法资源. 该软件仅供学习参考, 请于安装后24小时内删除.
    </view>
		<u-toast ref="uToast" />
		<u-modal v-model="modalShow" :content="modalContent" @confirm="resetAppconfirm" :mask-close-able="true" show-cancel-button @cancel="resetAppCancel"></u-modal>
  </view>
</template>

<script>
import db from "../../utils/database.js";
export default {
  data() {
    return {
			modalShow: false,
			modalContent: ''
		};
  },
  methods: {
		openHistoryPage () {
			this.$refs.uToast.show({ title: '播放记录努力开发中...', type: 'warning', duration: '2300' })
		},
		siteEdite () {
			this.$refs.uToast.show({ title: '视频源管理努力开发中...', type: 'warning', duration: '2300' })
      this.$u.route({ url: '/pages/site/site' });
		},
		async clearHistory () {
			const res = await db.removeAll('history')
			if (res.flag) {
				this.$refs.uToast.show({ title: '清空播放数据成功', type: 'success', duration: '2300' })
			} else {
				this.$refs.uToast.show({ title: '清空播放数据失败', type: 'warning', duration: '2300' })
			}
		},
    async clearStar() {
			const res = await db.removeAll('star')
			if (res.flag) {
				this.$refs.uToast.show({ title: '清空收藏夹数据成功', type: 'success', duration: '2300' })
			} else {
				this.$refs.uToast.show({ title: '清空收藏夹数据失败', type: 'warning', duration: '2300' })
			}
		},
		async resetApp() {
			this.modalContent = '重置软件会清空：收藏夹数据，历史记录，导入的视频源等。恢复默认设置，以及默认的视频源。'
			this.modalShow = true
		},
		async resetAppconfirm () {
			await db.clearDB()
			await db.reset('site')
			await db.reset('setting')
			this.modalShow = false
			this.$refs.uToast.show({ title: '软件重置成功', type: 'success', duration: '2300' })
		},
		resetAppCancel () {
			this.modalShow = false
		},
    itemClickEvent(item) {},
  },
};
</script>

<style lang="scss" scoped>
.me {
  .status_bar {
    height: var(--status-bar-height);
    width: 100%;
  }
  .logo {
    margin-top: 10px;
    width: 100%;
    text-align: center;
    img {
      width: 26%;
    }
  }
  .name {
    margin-top: 10px;
    text-align: center;
    font-size: 20px;
    margin-bottom: 10px;
  }
  .tips {
    color: #ff4445;
    padding: 15px;
  }
}
</style>
