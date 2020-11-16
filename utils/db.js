const db = {
  // 获取所有视频源的 key
  async getAllSiteKey () {
    try {
      const res = uni.getStorageSync('siteKey')
      return { flag: true, data: res, msg: '获取到所有视频源的key' }
    } catch (err) {
      return { flag: false, data: null, msg: err }
    }
  },
  // 检查视频源的 key 是否存在
  async checkSiteKey (key) {
    const res = await this.getAllSiteKey()
    if (res.data.length > 0) {
      for (const i of res.data) {
        if (i === key) {
          return { flag: false, data: null, msg: `${key} 已存在` }
        }
      }
    }
    return { flag: true, data: null, msg: `${key} 不存在` }
  },
  // 添加视频源的 key
  async addSiteKey (key) {
    const res = await this.checkSiteKey(key)
    if (res.flag) {
      const keys = await this.getAllSiteKey()
      let arr = []
      if (keys.data && keys.data.length > 0) {
        arr = [...keys.data]
      }
      arr.push(key)
      try {
        uni.setStorageSync('siteKey', arr)
        return { flag: true, data: key, msg: '保存成功' }
      } catch(err) {
        return { flag: false, data: key, msg: err }
      }
    } else {
      return res
    }
  },
  // 添加视频源
  async addSite (site) {
    const res = await this.addSiteKey(site.key)
    if (res && res.flag) {
      try {
        uni.setStorageSync(`site-${site.key}`, site)
        return { flag: true, data: {...site}, msg: '保存成功' }
      } catch(err) {
        return err
      }
    } else {
      return res
    }
  },
  // 查询获取单个视频源
  async getSite (key) {
    try {
      const res = uni.getStorageSync(`site-${key}`)
      if (res) {
        return { flag: true, data: {...res}, msg: `查询到 ${key} 值的视频源` }
      }
    } catch (err) {
      return { flag: false, data: null, msg: {...err} }
    }
  },
  // 查询获取所有视频源
  async getAllSite () {
    const res = await this.getAllSiteKey()
    if (res.data.length > 0) {
      let arr = []
      for (const i of res.data) {
        const data = await this.getSite(i)
        arr.push(data.data)
      }
      return { flag: true, data: arr, msg: '已查找所有视频源' }
    } else {
      return res
    }
  },
  // 移除单个视频源
  async removeSite (key) {
    const res = await this.getAllSiteKey()
    if (res.data.length <= 0) {
      return { flag: false, data: null, msg: '视频源为空' }
    } else {
      let arr = [...res.data]
      const index = arr.indexOf(key)
      if (index >= 0) {
        arr.splice(index, 1)
        try {
          uni.setStorageSync('siteKey', arr)
          uni.removeStorageSync(`site-${key}`)
          return { flag: true, data: key, msg: `${key} 移除成功` }
        } catch(err) {
          return { flag: false, data: key, msg: err }
        }
      }
    }
  },
  // 移除所有视频源
  async removeAllSite () {
    const res = await this.getAllSiteKey()
    if (res.data.length <= 0) {
      return { flag: false, data: null, msg: '视频源为空' }
    } else {
      let arr = [...res.data]
      for (const i of arr) {
        await this.removeSite(i)
      }
      try {
        uni.removeStorageSync('siteKey')
        return { flag: true, data: null, msg: '清空数据库成功' }
      } catch (err) {
        return { flag: false, data: null, msg: '清空数据库失败' }
      }
    }
  },
  // 初始化数据库
  async initSite () {},
  // 重置数据库
  async resetSite () {}
}

export default db
