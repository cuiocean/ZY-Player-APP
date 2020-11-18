<template>
  <view>
    <u-cell-group>
      <u-cell-item
        v-for="(i, j) in siteList"
        :key="j"
        :title="i.name"
        :arrow="false"
      >
        <u-switch slot="right-icon" v-model="i.isActive" @change="switchChange(i)"></u-switch>
      </u-cell-item>
    </u-cell-group>
    <u-toast ref="uToast" />
  </view>
</template>

<script>
import db from "../../utils/database.js";
export default {
  data() {
    return {
      siteList: [],
    };
  },
  methods: {
    openDetail(item) {
      const site = item.key.split("-")[0];
      const id = item.key.split("-")[1];
      const url = `/pages/detail/detail?site=${site}&id=${id}`;
      this.$u.route({ url: url });
    },
    async getAllSite() {
      const res = await db.getAll("site");
      if (res.flag) {
        this.siteList = res.data;
      }
    },
    async switchChange (e) {
      await db.remove('site', e.key)
      const res = await db.add('site', e)
      if (res.flag) {
        this.$refs.uToast.show({ title: '修改成功', type: 'success', duration: '2300' })
      }
    }
  },
  onLoad() {
    this.getAllSite();
  }
};
</script>
