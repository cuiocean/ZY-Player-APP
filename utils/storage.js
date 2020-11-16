const db = {
  siteKeyAdd (key) {
    const doc = JSON.stringify(key)
    return new Promise((resolve, reject) => {
      uni.setStorage({
        key: 'siteKey',
        data: doc,
        success: () => {
          resolve(true)
        },
        fail: () => {
          reject(false)
        }
      })
    })
  },
  siteGetAll () {
    return new Promise((resolve, reject) => {
      uni.getStorage({
        key: 'site',
        success: res => {
          const doc = JSON.parse(res.data)
          resolve(doc)
        },
        fail: () => {
          reject(false)
        }
      })
    })
  }
}

export default db
