import axios from 'axios'
import { Message } from 'element-ui'
import qs from 'qs'
import {processingData} from './interface'
import { getToken, getPHPSESSION } from '@/common/utils/auth'
import Cookies from "js-cookie";
// create an axios instance
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 0 // request timeout
})
let pushData = {}
if(Cookies.get('PRIVATE_USER_NAME')){
  pushData.userName = Cookies.get('PRIVATE_USER_NAME')
  pushData.userId = Cookies.get('PRIVATE_ACCOUNT_ID')
}
// 添加请求拦截器
service.interceptors.request.use(function(config) {
  // Do something before request is sent
  pushData.content = config.url
  if (config.method === 'post') {
    config.data = processingData(config.data)
    config.data = qs.stringify(config.data)
    pushData.requestData = config.data
  }
  if (getToken()) {
    config.headers['token'] = getToken()
    config.headers['set-cookie'] = getPHPSESSION('PHPSESSID')
  }
  return config;
}, function(error) {
  return Promise.reject(error);
});

// 添加响应拦截器
service.interceptors.response.use(function(response) {
  // 推送日志
  if(response.data.code == '201'){
    pushData.returnCode = 1
  }else{
    pushData.returnCode = 2
  }
  if(pushData.content !== "/public_login/public/uploadfile.jsp"){
    fnPushData(pushData)
  }
  return response;
}, function(error) {
  return Promise.reject(error);
});

function fnPushData(data){
  axios.post('http://192.168.100.245:8080/activemqTest/activeMq/recordLog/getOperate',qs.stringify(data))
}
export default service