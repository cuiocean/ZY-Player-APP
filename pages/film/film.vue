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
      <u-button @click="openSiteSelect" size="medium">网站</u-button>
      <u-button @click="openSiteSelect" size="medium">分类</u-button>
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
              threshold="-450"
              border-radius="4"
              :image="item.image"
              :index="index"
            ></u-lazy-load>
            <view class="box-name">{{ item.name }}</view>
            <view class="box-info">
              <view class="box-class">{{ item.class }}</view>
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
              :image="item.image"
              :index="index"
            ></u-lazy-load>
            <view class="box-name">{{ item.name }}</view>
            <view class="box-info">
              <view class="box-class">{{ item.class }}</view>
              <view class="box-year">{{ item.year }}</view>
            </view>
          </view>
        </template>
      </u-waterfall>
      <u-loadmore
        bg-color="#f8f8f8"
        :status="loadStatus"
        @loadmore="addRandomData"
      ></u-loadmore>
    </view>
    <u-back-top :scroll-top="scrollTop" icon="search"></u-back-top>
		<u-select v-model="siteShow" :list="siteList" value-name="key" label-name="name" :default-value="[site.id]" @confirm="siteConfirm"></u-select>
    <u-top-tips ref="uTips"></u-top-tips>
  </view>
</template>

<script>
import db from "../../utils/database.js";
export default {
  data() {
    return {
      search: "",
			site: {
				id: 1,
				key: 'ki',
				name: 'ok'
			},
			siteShow: false,
      siteList: [],
      type: {},
      typeList: [
        {
          label: 'lala',
          value: 'lala'
        }
      ],
      flowList: [],
      list: [
        {
          year: 35,
          name: "北国风光，千里冰封，万里雪飘",
          class: "李白杜甫白居易",
          image:
            "http://pic.sc.chinaz.com/Files/pic/pic9/202002/zzpic23327_s.jpg",
        },
        {
          year: 75,
          name: "望长城内外，惟余莽莽",
          class: "李白杜甫白居易",
          image:
            "http://pic.sc.chinaz.com/Files/pic/pic9/202002/zzpic23325_s.jpg",
        },
        {
          year: 385,
          name: "大河上下，顿失滔滔",
          class: "李白杜甫白居易",
          image:
            "http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2119_s.jpg",
        },
        {
          year: 784,
          name: "欲与天公试比高",
          class: "李白杜甫白居易",
          image:
            "http://pic2.sc.chinaz.com/Files/pic/pic9/202002/zzpic23369_s.jpg",
        },
        {
          year: 7891,
          name: "须晴日，看红装素裹，分外妖娆",
          class: "李白杜甫白居易",
          image:
            "http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2130_s.jpg",
        },
        {
          year: 2341,
          class: "李白杜甫白居易",
          name: "江山如此多娇，引无数英雄竞折腰",
          image:
            "http://pic1.sc.chinaz.com/Files/pic/pic9/202002/zzpic23346_s.jpg",
        },
        {
          year: 661,
          class: "李白杜甫白居易",
          name: "惜秦皇汉武，略输文采",
          image:
            "http://pic1.sc.chinaz.com/Files/pic/pic9/202002/zzpic23344_s.jpg",
        },
      ],
      loadStatus: "loadmore",
      scrollTop: 0,
      res: null,
    };
  },
  methods: {
    async searchEvent() {
      const site = {
        key: "okzyw",
        name: "ok资源网",
        api: "https://www.okzyw.com/inc/api.php",
        isActive: true,
      };
      // const data = await db.add('site', site)
      // const data = await db.remove('site', site.key)
      // const data = await db.get('site', 'okzy')
      // const data = await db.init('site')
      const data = await db.removeAll("site");
      // const data = await db.checkSiteKey('zdzyw')
      console.log(data, "film.vue");
      // db.addSiteKey(site.key, site)
      //   .then((res) => {
      //     console.log(res);
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
      // this.$refs.uTips.show({
      // 	title: 'lala',
      // 	type: 'success',
      // 	duration: '20000'
      // })
    },
    searchClearEvent() {
      console.log("search clear event");
    },
    addRandomData() {
      for (let i = 0; i < 10; i++) {
        let index = this.$u.random(0, this.list.length - 1);
        // 先转成字符串再转成对象，避免数组对象引用导致数据混乱
        let item = JSON.parse(JSON.stringify(this.list[index]));
        item.id = this.$u.guid();
        this.flowList.push(item);
      }
    },
    openSiteSelect () {
			this.siteShow = true
		},
		async siteConfirm (e) {
			console.log(e, 'eeeeeeee')
			const db = await db.get
		},
    openDetail(item) {
      const url = `/pages/detail/detail?site=${this.site}&uuid=${item.id}`;
      this.$u.route({ url: url });
    },
    async getSite() {
			const res = await db.getAll('site')
			if (res.flag) {
				this.siteList = res.data
			}
			const setting = await db.getAll('setting')
			console.log(setting)
		},
    getClass() {
      // console.log("get class");
    },
  },
  onPageScroll(e) {
    this.scrollTop = e.scrollTop;
  },
  onLoad() {
		this.getSite()
    this.getClass();
    this.addRandomData();
  },
  onReachBottom() {
    this.loadStatus = "loading";
    // 模拟数据加载
    setTimeout(() => {
      this.addRandomData();
      this.loadStatus = "loadmore";
    }, 1000);
  },
};
</script>

<style lang="scss" scoped>
.film {
  padding: 20rpx 20rpx;
  background-color: #f8f8f8;
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
}
</style>
