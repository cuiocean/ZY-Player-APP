import ajax from 'uni-ajax'
import parser from 'fast-xml-parser'
import db from './database'

const http = {
  xmlConfig: {
    trimValues: true,
    textNodeName: '_t',
    ignoreAttributes: false,
    attributeNamePrefix: '_',
    parseAttributeValue: true
  },
  // 获取视频源详情
  async getSite (key) {
    const site = await db.get('site', key)
    if (site.flag) {
      return site.data
    }
    return false
  },
  // 获取视频源的分类
  async class (key) {
    const site = await this.getSite(key)
    try {
      const res = await ajax.post(site.api)
      const json = parser.parse(res.data, this.xmlConfig)
      const arr = []
      if (json.rss.class) {
        for (const i of json.rss.class.ty) {
          const j = {
            tid: i._id,
            name: i._t
          }
          arr.push(j)
        }
      }
      return arr
    } catch (err) {
      return err
    }
  },
  // 获取视频资源
  async list (key, pg = 1, t) {
    const site = await this.getSite(key)
    let url = null
    if (t) {
      url = `${site.api}?ac=videolist&t=${t}&pg=${pg}`
    } else {
      url = `${site.api}?ac=videolist&pg=${pg}`
    }
    try {
      const res = await ajax.post(url)
      const json = parser.parse(res.data, this.xmlConfig)
      return json.rss.list.video
    } catch (err) {
      return err
    }
  },
  // 获取总资源数, 以及页数
  async page (key, t) {
    const site = await this.getSite(key)
    let url = null
    if (t) {
      url = `${site.api}?ac=videolist&t=${t}`
    } else {
      url = `${site.api}?ac=videolist`
    }
    try {
      const res = await ajax.post(url)
      const json = parser.parse(res.data, this.xmlConfig)
      const pg = {
        page: json.rss.list._page,
        pagecount: json.rss.list._pagecount,
        pagesize: json.rss.list._pagesize,
        recordcount: json.rss.list._recordcount
      }
      return pg
    } catch (err) {
      return err
    }
  },
  // 搜索资源
  async search (key, wd) {
    const site = await this.getSite(key)
    wd = encodeURI(wd)
    const url = `${site.api}?wd=${wd}`
    try {
      const res = await ajax.post(url, { timeourt: 3000 })
      const json = parser.parse(res.data, this.xmlConfig)
      if (json && json.rss && json.rss.list) {
        const videoList = json.rss.list.video
        return videoList
      }
      return null
    } catch (err) {
      return err
    }
  },
  // 获取资源详情
  async detail (key, id) {
    const site = await this.getSite(key)
    const url = `${site.api}?ac=videolist&ids=${id}`
    try {
      const res = await ajax.post(url)
      const json = parser.parse(res.data, this.xmlConfig)
      if (json && json.rss && json.rss.list) {
        const videoList = json.rss.list.video
        let m3u8List = []
        const dd = videoList.dl.dd
        const type = Object.prototype.toString.call(dd)
        if (type === '[object Array]') {
          for (const i of dd) {
            if (i._flag.indexOf('m3u8') >= 0) {
              m3u8List = i._t.split('#')
            }
          }
        } else {
          m3u8List = dd._t.split('#')
        }
        videoList.m3u8List = m3u8List
        console.log(videoList, 'video list')
        return videoList
      }
      return null
    } catch (err) {
      return err
    }
  }
}

export default http
