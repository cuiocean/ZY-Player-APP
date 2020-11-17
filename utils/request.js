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
  }
}

export default http
