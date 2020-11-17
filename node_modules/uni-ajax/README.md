## ✨ 特性

- 支持 Promise API
- 加入请求拦截器、响应拦截器
- 可以配置接口根地址、默认参数
- 支持 method 方法请求
- 支持 RequestTask 操作

## 🍟 文档

**[uniajax.ponjs.com](https://uniajax.ponjs.com)**

## 🥗 安装

### 下载安装

- 在 uni-app 插件市场右上角选择`使用HBuilder X 导入插件`或者`下载插件ZIP`
- 如果您的项目是由 HBuilder X 创建的标准 uni-app 项目，将下载解压后的`uni-ajax`文件夹，复制到项目根目录
- 如果您的项目是由 vue-cli 模式创建的， 请将下载后的`uni-ajax`文件夹放到项目的`src`文件夹中即可

### npm 安装

```
// 如果您的项目是HBuilder X创建的，根目录又没有package.json文件的话，请先执行如下命令：
// npm init -y

// 安装
npm install uni-ajax

// 更新
npm update uni-ajax
```

## 🥐 引入

新建`ajax.js`文件（文件名自定义）用于处理拦截器、接口根地址、默认参数等，详细配置请[查看文档][1]

```JavaScript
// ajax.js

import ajax from 'uni-ajax'                             // 引入 uni-ajax 模块

const _ajax = ajax.create(config)                       // 创建请求实例 可配置默认项

_ajax.interceptors.request.use(fulfilled, rejected)     // 添加请求拦截器
_ajax.interceptors.response.use(fulfilled, rejected)    // 添加响应拦截器

export default _ajax                                    // 导出创建后的实例
```

然后在`main.js`引入该`ajax.js`

```JavaScript
// main.js

import ajax from './utils/ajax'    // 路径需根据项目实际情况
Vue.prototype.$ajax = ajax         // 挂载在 Vue 原型链上（通过 this.$ajax 调用）
```

## 🥪 使用

### 方法

**请求方法**

```JavaScript
// 常规使用
ajax()

// 请求方式使用
ajax.get()
ajax.post()
ajax.put()
ajax.delete()
```

**RequestTask 方法**

```JavaScript
const request = ajax()            // 常规使用或请求方式使用

request.abort()                   // 中断请求任务
request.onHeadersReceived(fn)     // 监听 HTTP Response Header 事件
request.offHeadersReceived(fn)    // 取消监听 HTTP Response Header 事件
```

**其他属性**

```JavaScript
ajax.baseURL    // 获取配置的接口根地址 baseURL
ajax.origin     // 根据配置的接口根地址获取源地址 origin
```

### 参数

上面的请求方法中，传参方式有`config`或`url[, data[, config]]`，直接返回都是封装后的[Promise 对象][2]，并支持[RequestTask 方法][3]

- [config][4]
  - `resolve` &nbsp;响应成功对象 / RequestTask 对象
  - `reject` &nbsp;&nbsp;&nbsp;请求或响应失败对象 / 无

* [url[, data[, config]]][5]
  - `resolve` &nbsp;响应成功对象
  - `reject` &nbsp;&nbsp;&nbsp;请求或响应失败对象

[1]: https://uniajax.ponjs.com/config.html
[2]: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise
[3]: https://uniajax.ponjs.com/usage.html#requesttask
[4]: https://uniajax.ponjs.com/usage.html#config
[5]: https://uniajax.ponjs.com/usage.html#url-data-config
