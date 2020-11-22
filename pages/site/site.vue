<template>
  <view class="site">
    <view class="impSite" maxlength="300" v-if="impSite">
      <u-input v-model="url" type="text" :border="true" placeholder="请输入 JSON 后缀的网址"/>
      <u-button :ripple="true" @click="importSiteEvent()">导入</u-button>
    </view>
    <view class="setting">
      <u-button class="importBtn" size="mini" :ripple="true" @click="openImpSite()">导入视频源</u-button>
      <u-checkbox v-model="R18" @change="R18Change">开启青少年模式</u-checkbox>
    </view>
    <u-cell-group>
      <u-cell-item
        v-for="(i, j) in siteList"
        :key="j"
        :title="i.name"
        :value="i.type"
        :arrow="false"
      >
        <u-button class="pushpin" size="mini" :ripple="true" @click="pushpinEvent(i, j)">置顶</u-button>
        <u-switch slot="right-icon" v-model="i.isActive" @change="switchChange(i)" size="40"></u-switch>
      </u-cell-item>
    </u-cell-group>
    <u-toast ref="uToast" />
  </view>
</template>

<script>
import db from "../../utils/database.js";
import http from "../../utils/request.js";
export default {
  data() {
    return {
      siteList: [],
      site: [],
      impSite: false,
      url: '',
      config: {},
      R18: false
    };
  },
  methods: {
    openImpSite () {
      this.url = ''
      this.impSite = !this.impSite
    },
    async importSiteEvent () {
      if (this.url === '') {
        return false
      }
      const res = await http.site(this.url)
      if (res && res.length > 0) {
        await db.removeAll('site')
        for (const i of res) {
          await db.add('site', i)
        }
        this.getAllSite();
        this.impSite = false
        this.$refs.uToast.show({ title: '导入成功', type: 'success', duration: '2300' })
        return false
      }
      this.$refs.uToast.show({ title: '导入失败', type: 'warning', duration: '2300' })
    },
    async R18Change (e) {
      this.config.R18 = e.value
      const res = await db.update('setting', this.config)
      if (res.flag) {
        this.$refs.uToast.show({ title: '修改成功', type: 'success', duration: '2300' })
      }
      this.getSettingConfig()
    },
    async pushpinEvent (i, index) {
      if (index === 0) {
        return false
      }
      this.siteList.sort(function (x, y) { return x.key === i.key ? -1 : y.key === i.key ? 1 : 0 })
      const res = await db.removeAll('site')
      if (res.flag) {
        for (const i of this.siteList) {
          await db.add('site', i)
        }
      }
      this.$refs.uToast.show({ title: '置顶成功', type: 'success', duration: '2300' })
    },
    openDetail(item) {
      const site = item.key.split("-")[0];
      const id = item.key.split("-")[1];
      const url = `/pages/detail/detail?site=${site}&id=${id}`;
      this.$u.route({ url: url });
    },
    async getAllSite() {
      const res = await db.getAll("site");
      if (res.flag) {
        if (res.data.length <= 0) {
          return false
        }
        this.siteList = res.data;
      }
    },
    async switchChange (e) {
      await db.remove('site', e.key)
      const res = await db.add('site', e)
      await this.getAllSite()
      if (res.flag) {
        this.$refs.uToast.show({ title: '修改成功', type: 'success', duration: '2300' })
      }
    },
    async getSettingConfig () {
      const res = await db.get('setting', 'config')
      this.config = res.data
      this.R18 = res.data.R18
    }
  },
  onLoad() {
    this.getAllSite();
    this.getSettingConfig();
  }
};
</script>
<style lang="scss" scoped>
.site{
  .impSite{
    display: flex;
  }
  .setting{
    height: 80rpx;
    line-height: 80rpx;
    .importBtn{
      margin-right: 120rpx;
      margin-left: 30rpx;
    }
  }
  .pushpin{
    margin-right: 30rpx;
  }
}
</style>
