import Ajax from './lib/ajax'

function createInstance(defaultConfig) {
  return new Ajax(defaultConfig).request
}

const ajax = createInstance()

ajax.create = function create(instanceConfig) {
  return createInstance(instanceConfig)
}

export default ajax
