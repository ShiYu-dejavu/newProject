import request from '@/common/utils/request'
export function getMsg(data) {
  return request({
    url: '/yc_test/test/getmsg.jsp',
    method: 'post',
    data
  })
}
