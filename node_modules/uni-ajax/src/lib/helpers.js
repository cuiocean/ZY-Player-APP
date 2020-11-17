/**
 * 分离请求对象
 * @param {string|object} url 请求地址 / 请求配置
 * @param {object} [data] 请求参数
 * @param {object} [config] 请求配置
 * @returns {object} 回调函数对象 去除回调的请求参数
 */
export function detachRequest(url, data, config) {
  let request = {}
  // 判断第一个参数是字符串还是对象
  if (typeof url === 'string') {
    request = { url, data }

    // 过滤参数 剔除 url data success fail complete
    for (const k in config) {
      if (!isCallback(k) && !request.hasOwnProperty(k)) {
        request[k] = config[k]
      }
    }
  } else {
    request = { ...url }
  }

  // 回调函数对象
  let callback = {}
  // 去除回调的请求参数
  let params = {}

  for (const k in request) {
    if (isCallback(k)) callback[k] = request[k]
    else params[k] = request[k]
  }

  return { callback, params }
}

/**
 * 判断参数是否含有回调参数 success / fail / complete 之一
 * @param {string} field 参数的 Key 值字符串
 * @returns {boolean} 返回判断值
 */
export function isCallback(field) {
  return ['success', 'fail', 'complete'].includes(field)
}

/**
 * 根据 baseURL 和 url 拼接
 * @param {string} baseURL 请求跟地址
 * @param {string} relativeURL 请求参数地址
 * @returns {string} 拼接后的地址
 */
export function combineURL(baseURL = '', relativeURL = '') {
  // 判断是否 http:// 或 https:// 开头
  if (/^https?:\/\//.test(relativeURL)) return relativeURL
  // 去除 baseURL 结尾斜杠，去除 relativeURL 开头斜杠，再判断拼接
  return relativeURL ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '') : baseURL
}

/**
 * 根据 baseURL 获取源地址
 * @param {string} baseURL 请求跟地址
 * @returns {string} 源地址
 */
export function originURL(baseURL = '') {
  // 判断是否 http:// 或 https:// 开头
  if (!/^https?:\/\//.test(baseURL)) return ''
  const u = baseURL.split('/')
  return u[0] + '//' + u[2]
}
