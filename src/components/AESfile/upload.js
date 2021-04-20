import request from '@/common/utils/request'

//上传文件
export function myUpload(data) {
  return request({
    url: '/public_login/public/uploadfile.jsp',
    method: 'post',
    data
  })
}

// //下载文件
// export function myDownload(data) {
//   return request({
//     url: '/public_login/public/uploadfile.jsp',
//     method: 'post',
//     data
//   })
// }

//获取公钥私钥
export function getKey(data) {
  return request({
    url: '/public_login/public/getfilekeys.jsp',
    method: 'post',
    data
  })
}