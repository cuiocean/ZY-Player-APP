import Interceptor from './interceptor'
import defaults, { METHOD } from './defaults'
import { detachRequest, originURL } from './helpers'
import { forEach, merge } from './utils'
import { handleRequest, handleResponse, requestRejected } from './handle'

export default class Ajax {
  constructor(config) {
    this.config = merge(defaults, config)

    // 挂载拦截器
    this.request.interceptors = { request: new Interceptor(), response: new Interceptor() }

    // 挂载接口根地址 baseURL
    this.request.baseURL = this.config.baseURL || ''

    // 挂载接口根地址的源地址 origin
    this.request.origin = originURL(this.config.baseURL)

    // 挂载对应的 method 方法
    forEach(
      METHOD,
      method =>
        (this.request[method] = (url, data, config) =>
          this.request(
            ...(typeof url === 'string' ? [url, data, { ...config, method }] : [{ ...url, method }])
          ))
    )
  }
  request = (...args) => {
    // 分类请求参数
    const { callback, params } = detachRequest(...args)
    // 回调函数字段
    const fields = Object.keys(callback)
    // 定义 RequestTask 所需字段
    let aborted, requestTask, onHeadRcvd, offHeadRcvd

    // 继承 Promise 封装 RequestTask 的一些方法
    class Request extends Promise {
      // 中断请求任务
      abort() {
        aborted = true
        requestTask?.abort()
        return this
      }
      // 监听 HTTP Response Header 事件
      onHeadersReceived(fn) {
        onHeadRcvd = fn
        requestTask?.onHeadersReceived(fn)
        return this
      }
      // 取消监听 HTTP Response Header 事件
      offHeadersReceived(fn) {
        offHeadRcvd = fn
        requestTask?.offHeadersReceived(fn)
        return this
      }
    }

    return new Request(async (resolve, reject) => {
      // 统一处理请求错误
      try {
        // 请求拦截后的配置和回调
        var config = await handleRequest.call(this, params)
        // 判断是否被取消请求
        if (aborted) return await requestRejected.call(this, config, 'request:fail abort')
      } catch (error) {
        // 如果有回调参数 异步执行 fail / complete
        if (fields.includes('fail')) (async () => callback.fail(error))()
        if (fields.includes('complete')) (async () => callback.complete(error))()
        // 没有回调参数时抛出请求错误
        return !fields.length && reject(error)
      }

      // 发起请求
      requestTask = uni.request({
        ...config,
        complete: handleResponse.call(this, config, callback, resolve, reject)
      })

      // 当传入 success / fail / complete 之一时，返回 requestTask 对象
      fields.length && resolve(requestTask)

      // 判断是否执行监听 HTTP Response Header 事件
      onHeadRcvd && requestTask?.onHeadersReceived(onHeadRcvd)
      offHeadRcvd && requestTask?.offHeadersReceived(offHeadRcvd)
    })
  }
}
