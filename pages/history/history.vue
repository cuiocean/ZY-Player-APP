<template>
  <view>
    <u-cell-group>
      <u-cell-item
        v-for="(i, j) in historyList"
        :key="j"
        :title="i.name"
        :value="i.type"
        :arrow="false"
        @click="playVideo(i)"
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
    playVideo(item) {
      const site = item.key.split("-")[0];
      const id = item.key.split("-")[1];
      const url = `/pages/play/play?site=${site}&id=${id}&name=${item.label}&url=${item.url}`;
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
