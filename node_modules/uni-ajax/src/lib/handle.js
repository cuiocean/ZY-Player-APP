import { METHOD } from './defaults'
import { combineURL, isCallback } from './helpers'
import { forEach, merge } from './utils'

/**
 * 请求错误
 * @param {object} config 请求配置
 * @param {string} errMsg 错误信息
 * @returns {Promise} 返回 Promise reject
 */
export async function requestRejected(config, errMsg) {
  const error = await this.request.interceptors.request.rejected({ config, errMsg })
  return Promise.reject(error)
}

/**
 * 处理请求前
 * @param {object} request 请求参数
 * @returns {object} 处理后的请求参数对象
 */
export async function handleRequest(request) {
  let params = merge(this.config, request)
  params.method = params.method.toUpperCase()
  params.header = request.header || {}

  // 给请求头加上对应的请求方式 用于请求拦截器中给请求方式加上请求头
  forEach(METHOD, method => (params.header[method] = {}))

  // 拦截后的请求参数
  let config = await this.request.interceptors.request.fulfilled(params)

  // 判断请求拦截返回是否为对象
  if (Object.prototype.toString.call(config) !== '[object Object]') {
    return requestRejected.call(this, config, 'request:fail interrupted')
  }

  // 拼接 url
  config.url = combineURL(config.baseURL, config.url)

  // header 调整优先级
  const method = config.method.toLowerCase()
  config.header = merge(
    this.config.header,
    this.config.header?.[method],
    config.header?.[method],
    config.header
  )

  // 清除多余的请求头
  forEach(METHOD, method => delete config.header[method])

  // 清除回调函数
  forEach(config, (fun, key) => isCallback(key) && delete config[key])

  return config
}

/**
 * 处理响应后
 * @param {object} config 请求配置
 * @param {object} callback 回调函数对象
 * @param {function} resolve Promise 的 resolve 方法
 * @param {function} reject Promise 的 reject 方法
 * @returns {function} 处理后的 complete 方法
 */
export function handleResponse(config, callback, resolve, reject) {
  return async res => {
    try {
      // 根据状态码判断要执行的回调和拦截器
      const interceptor = res.statusCode >= 200 && res.statusCode < 300 ? 'fulfilled' : 'rejected'
      var result = await this.request.interceptors.response[interceptor]({ config, ...res })
      var field = interceptor === 'fulfilled' ? 'success' : 'fail'
    } catch (error) {
      // 拦截器返回错误
      result = error
      field = 'fail'
    }

    const fields = Object.keys(callback)
    // 请求参数没有回调函数
    if (!fields.length) return field === 'success' ? resolve(result) : reject(result)
    // 异步执行回调函数
    if (fields.includes(field)) (async () => callback[field](result))()
    if (fields.includes('complete')) (async () => callback.complete(result))()
  }
}
