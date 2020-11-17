/**
 * 遍历
 * @param {object|array} obj 要迭代的对象
 * @param {function} fn 为每个项调用的回调
 */
export function forEach(obj, fn) {
  if (obj === null || typeof obj === 'undefined') return
  if (typeof obj !== 'object') obj = [obj]
  if (Object.prototype.toString.call(obj) === '[object Array]') {
    for (let i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj)
    }
  } else {
    for (const k in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, k)) {
        fn.call(null, obj[k], k, obj)
      }
    }
  }
}

/**
 * 对象深合并
 * @param  {...object} args 对象
 * @returns {object} 合并后的对象
 */
export function merge(...args) {
  let result = {}
  for (let i = 0, l = args.length; i < l; i++) {
    forEach(
      args[i] || {},
      (val, key) =>
        (result[key] =
          typeof result[key] === 'object' && typeof val === 'object'
            ? merge(result[key], val)
            : val)
    )
  }
  return result
}
