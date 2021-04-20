import request from '@/common/utils/request';

//获取站点设置
export function getSiteMsg(data) {
  return request({
    url: '/st_plan/setting/sitelist.jsp',
    method: 'post',
    data
  })
}