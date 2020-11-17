export const METHOD = ['get', 'post', 'put', 'delete', 'connect', 'head', 'options', 'trace']

export default {
  method: 'GET',
  timeout: 30000,
  dataType: 'json',
  responseType: 'text',
  sslVerify: true,
  withCredentials: false,
  firstIpv4: false
}
