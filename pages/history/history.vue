<template>
  <view>
    <u-cell-group>
      <u-cell-item
        v-for="(i, j) in historyList"
        :key="j"
        :title="i.name"
		:label="getProgress(i)"
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
	  getProgress (item) {
      if(item.currentTime && item.duration) {
        return (100*item.currentTime/item.duration).toFixed(0) + "%"
      } else {
        return ""
      }
  	},
    playVideo(item) {
      const site = item.key.split("-")[0];
      const id = item.key.split("-")[1];
      // item.label为播放器上方的title，电影的话就是电影名，电视剧则为“第n集”
      const url = `/pages/play/play?site=${site}&id=${id}&name=${item.label}&url=${item.url}&initialtime=${item.currentTime}`;
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
