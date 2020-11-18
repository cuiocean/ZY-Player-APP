<template>
  <view>
    <u-cell-group>
      <u-cell-item
        v-for="(i, j) in historyList"
        :key="j"
        :title="i.name"
        :value="i.type"
        :arrow="false"
        @click="openDetail(i)"
      ></u-cell-item>
    </u-cell-group>
  </view>
</template>

<script>
import db from "../../utils/database.js";
export default {
  data() {
    return {
      historyList: [],
    };
  },
  methods: {
    openDetail(item) {
      const site = item.key.split("-")[0];
      const id = item.key.split("-")[1];
      const url = `/pages/detail/detail?site=${site}&id=${id}`;
      this.$u.route({ url: url });
    },
    async getAllHistory() {
      const res = await db.getAll("history");
      if (res.flag) {
        this.historyList = res.data;
      }
    },
  },
  onLoad() {
    this.getAllHistory();
  },
  onTabItemTap() {
    this.getAllHistory();
  }
};
</script>
