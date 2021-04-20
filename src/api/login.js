import request from '@/common/utils/request'

export function logout(data) {
  return request({
    url: '/public_login/public/logout.jsp',
    method: 'post',
    data
  })
}

export function getUserInfo(data) {
  return request({
    url: '/public_login/public/rolemodeltwo.jsp',
    method: 'post',
    data
  })
}

//消息列表
export function getmessagelist(data) {
  return request({
    url: '/workbench/home/getmessagelist.jsp',
    method: 'post',
    data
  })
}