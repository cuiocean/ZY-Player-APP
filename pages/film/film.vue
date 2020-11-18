<template>
  <view class="film">
    <view class="header">
      <u-search
        v-model="search"
        @search="searchEvent"
        @custom="searchEvent"
        :clearabled="true"
        @clear="searchClearEvent"
      ></u-search>
    </view>
    <view class="btns">
      <u-button @click="openSiteSelect" size="mini"
        >网站: {{ site.name }}</u-button
      >
      <u-button @click="openTypeSelect" size="mini"
        >分类: {{ type.name }}</u-button
      >
      <text>共: {{recordcount}} 资源</text>
    </view>
    <view class="body">
      <u-waterfall v-model="flowList" ref="uWaterfall">
        <template v-slot:left="{ leftList }">
          <view
            class="box-warter left-box-warter"
            v-for="(item, index) in leftList"
            :key="index"
            @click="openDetail(item)"
          >
            <u-lazy-load
              border-radius="4"
              :image="item.pic"
              :index="index"
            ></u-lazy-load>
            <view class="box-name">{{ item.name }}</view>
            <view class="box-info">
              <view class="box-class">{{ item.type }}</view>
              <view class="box-year">{{ item.year }}</view>
            </view>
          </view>
        </template>
        <template v-slot:right="{ rightList }">
          <view
            class="box-warter right-box-warter"
            v-for="(item, index) in rightList"
            :key="index"
            @click="openDetail(item)"
          >
            <u-lazy-load
              threshold="-450"
              border-radius="4"
              :image="item.pic"
              :index="index"
            ></u-lazy-load>
            <view class="box-name">{{ item.name }}</view>
            <view class="box-info">
              <view class="box-class">{{ item.type }}</view>
              <view class="box-year">{{ item.year }}</view>
            </view>
          </view>
        </template>
      </u-waterfall>
      <u-loadmore
        bg-color="#f8f8f8"
        :status="loadStatus"
        @loadmore="addData"
      ></u-loadmore>
    </view>
    <u-back-top :scroll-top="scrollTop" icon="search"></u-back-top>
    <u-select
      v-model="siteShow"
      :list="siteList"
      value-name="key"
      label-name="name"
      :default-value="siteDefault"
      @confirm="siteConfirm"
    ></u-select>
    <u-select
      v-model="typeShow"
      :list="typeList"
      value-name="tid"
      label-name="name"
      :default-value="typeDefault"
      @confirm="typeConfirm"
    ></u-select>
    <u-top-tips ref="uTips"></u-top-tips>
    <u-mask :show="mask" @tap.stop>
      <view class="mask">
        <u-loading mode="flower" size="80"></u-loading>
      </view>
    </u-mask>
  </view>
</template>

<script>
import db from "../../utils/database.js";
import http from "../../utils/request.js";
export default {
  data() {
    return {
      search: "",
      site: {},
      siteShow: false,
      siteDefault: [],
      siteList: [],
      type: {},
      typeShow: false,
      typeDefault: [],
      typeList: [],
      flowList: [],
      list: [],
      loadStatus: "loadmore",
      scrollTop: 0,
      pageCount: 0,
      recordcount: 0,
      mask: false
    };
  },
  methods: {
    async searchEvent() {
      const res = await db.clearDB();
      console.log(res, "res");
    },
    searchClearEvent() {
      console.log("search clear event");
    },
    async openSiteSelect() {
      this.siteShow = true;
      const site = await db.get("site", this.site.key);
      this.siteDefault = [site.data.id - 1];
    },
    async siteConfirm(e) {
      this.mask = true
      this.list = []
      this.flowList = []
      this.$refs.uWaterfall.clear();
      const site = await db.get("site", e[0].value);
      this.site = site.data;
      this.siteDefault = [site.id];
      await this.getPage()
      await this.getClass(this.site.key)
      this.addData(this.site.key, this.pageCount)
      this.mask = false
    },
    openTypeSelect () {
      this.typeShow = true
    },
    typeConfirm() {},
    openDetail(item) {
      const url = `/pages/detail/detail?site=${this.site.key}&id=${item.id}`;
      this.$u.route({ url: url });
    },
    async getSite() {
      const res = await db.getAll("site");
      if (res.flag) {
        this.siteList = res.data;
      }
      const setting = await db.get("setting", "config");
      const site = await db.get("site", setting.data.site);
      this.site = site.data;
      this.siteDefault = [site.id];
      await this.getPage()
      await this.getClass(this.site.key)
      this.addData(this.site.key, this.pageCount)
    },
    async getPage (type) {
      const res = await http.page(this.site.key, type)
      this.pageCount = res.pagecount
      this.recordcount = res.recordcount
    },
    async getClass(key) {
      const res = await http.class(key)
      const allClass = [{ name: '最新', tid: 0 }]
      this.typeList = allClass.concat(res)
      this.type = { name: '最新', tid: 0 }
      this.typeDefault = [0]
    },
    async addData(key, page, t) {
      const res = await http.list(key, page, t);
      for (let i = 0; i < res.length; i++) {
        let item = res[i];
        this.flowList.push(item);
      }
    }
  },
  onPageScroll(e) {
    this.scrollTop = e.scrollTop;
  },
  onLoad() {
    this.getSite();
  },
  async onReachBottom() {
    this.loadStatus = "loading";
    this.pageCount--
    await this.addData(this.site.key, this.pageCount, this.type.tid);
    this.loadStatus = "loadmore";
  },
};
</script>

<style lang="scss" scoped>
.film {
  padding: 20rpx 20rpx;
  background-color: #f8f8f8;
  .btns {
    margin-top: 10rpx;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .body {
    .box-warter {
      border-radius: 8rpx;
      padding: 14rpx;
      background-color: #fff;
      .box-info {
        margin-top: 10rpx;
        display: flex;
        justify-content: space-between;
        font-size: 12px;
      }
    }
    .left-box-warter {
      margin: 10rpx 10rpx 10rpx 0;
    }
    .right-box-warter {
      margin: 10rpx 0rpx 10rpx 10rpx;
    }
  }
  .mask{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
