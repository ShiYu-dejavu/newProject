import request from '@/common/utils/request'
// 举报投诉界面


//新增界面管辖字典
export function getDic() {
  return request({
    url: '/ec_jbts/report/getdictionary.jsp',
    method: 'post',
    
  })
}

//查看详情页面(可编辑)
export function reportinfo(data) {
  return request({
    url: '/ec_jbts/report/reportdetails.jsp',
    method: 'post',
    data
  })
}

//查看详情页面(不可编辑)
export function getReportMsg(data) {
  return request({
    url: '/ec_jbts/report/reportmessage.jsp',
    method: 'post',
    data
  })
}
//获取共同举报人信息
export function reportpersoninfo(data) {
  return request({
    url: '/ec_jbts/report/reportpersondetails.jsp',
    method: 'post',
    data
  })
}
//获取案件进度记录
export function proceedInfo(data) {
  return request({
    url: '/ec_jbts/report/proceedinfo.jsp',
    method: 'post',
    data
  })
}
//存储受理信息(存2个表)
export function editAuthMsg(data) {
  return request({
    url: '/ec_jbts/report/editauth.jsp',
    method: 'post',
    data
  })
}

//存转案件信息(存2个表)
export function turncase(data) {
  return request({
    url: '/ec_jbts/report/turncase.jsp',
    method: 'post',
    data
  })
}

//加入回收站(撤回)
export function recycleinfo(data) {
  return request({
    url: '/ec_jbts/report/recycleinfo.jsp',
    method: 'post',
    data
  })
}

// 新增(修改)数据页面
export function getonenaturalperson(data) {
  return request({
    url: '/ec_jbts/report/editreport.jsp',
    method: 'post',
    data
  })
}

// 查询举报投诉列表下拉框
export function getsearchinfo(data) {
  return request({
    url: '/ec_jbts/report/getdictionary.jsp',
    method: 'post',
    data
  })
}
// 查询举报投诉列表(初始化)
export function getsearchlist(data) {
  return request({
    url: '/ec_jbts/report/reportlist.jsp',
    method: 'post',
    data
  })
}

//查询线索列表(初始化)
export function getcluelist(data) {
  return request({
    url: '/ec_jbts/report/cluelist.jsp',
    method: 'post',
    data
  })
}

// 举报投诉回收站列表接口
export function recyclelist(data) {
  return request({
    url: '/ec_jbts/report/recyclelist.jsp',
    method: 'post',
    data
  })
}
// 举报投诉回收站列表还原、彻底删除
export function restore(data) {
  return request({
    url: '/ec_jbts/report/restore.jsp',
    method: 'post',
    data
  })
}
// 举报投诉 追加证据接口
export function addPic(data) {
  return request({
    url: '/ec_jbts/report/addpic.jsp',
    method: 'post',
    data
  })
}



// 添加电子文书记录(不予受理决定书)
export function editBookInfo(data) {
  return request({
    url: '/ec_jbts/report/editrejectbook.jsp',
    method: 'post',
    data
  })
}


// 查询企业社会信用代码
export function getComnum(data) {
  return request({
    url: '/ec_jbts/report/selectcompanynum.jsp',
    method: 'post',
    data
  })
}

// 查询企业信息列表
export function findProjectMsg(data) {
  return request({
    url: '/ec_jbts/report/projectlist.jsp',
    method: 'post',
    data
  })
}

// 查询线索记录详情
export function getClueDetail(data) {
  return request({
    url: '/ec_jbts/report/getcluedetails.jsp',
    method: 'post',
    data
  })
}


// 查询线索记录受理界面
export function getallmsg(data) {
  return request({
    url: '/ec_jbts/report/findcluecase.jsp',
    method: 'post',
    data
  })
}

// 查询举报投诉受理界面
export function getreportmsg(data) {
  return request({
    url: '/ec_jbts/report/findalikecase.jsp',
    method: 'post',
    data
  })
}

// 手动查询线索--关联案件
export function getsearchAlike(data) {
  return request({
    url: '/ec_jbts/report/getsearchalike.jsp',
    method: 'post',
    data
  })
}

// 手动查询举报投诉--关联案件
export function searchReportAlike(data) {
  return request({
    url: '/ec_jbts/report/getreportalike.jsp',
    method: 'post',
    data
  })
}

// 线索管理--受理、不予受理、并案
export function saveAuthMsg(data) {
  return request({
    url: '/ec_jbts/report/cluedeal.jsp',
    method: 'post',
    data
  })
}
//线索管理平台导入excel
export function importExcel(data) {
  return request({
    url: '/ec_jbts/report/insertdata.jsp',
    method: 'post',
    data
  })
}








//以下未用！！！
// 举报投诉回收站列表彻底删除接口
export function delectmark(data) {
  return request({
    url: '/ec_backpay/backpay/delectmark.jsp',
    method: 'post',
    data
  })
}
// 举报投诉 验证码
export function captcha(data) {
  return request({
    url: '/ec_backpay/backpay/captcha.jsp?refresh=1',
    method: 'post',
    data
  })
}
// 举报投诉详情接口
export function backpayinfo(data) {
  return request({
    url: '/ec_backpay/backpay/backpayinfo.jsp',
    method: 'post',
    data
  })
}
// 举报投诉 审核及不予受理及办结及延期处理
export function ajaxdealbackpay(data) {
  return request({
    url: '/ec_backpay/backpay/ajaxdealbackpay.jsp',
    method: 'post',
    data
  })
}
// 举报投诉 操作记录
export function getrecordlist(data) {
  return request({
    url: '/ec_backpay/backpay/getrecordlist.jsp',
    method: 'post',
    data
  })
}

//注册地列表
export function getFindtreelistvalue( data ) {
  return request({
      url : '/auth_entication/authentication/findtreelistvalue.jsp',
      method : 'post',
      data,
  })
}

//法人单位-数据字典
export function actionDictionary(data) {
  return request({
    url: '/auth_person/useraccount/dictionary.jsp',
    method: 'post',
    data,
  })
}

//法人单位新增
export function actionUserCompany( data ) {
  return request({
      url : '/auth_entication/authentication/usercompany.jsp',
      method : 'post',
      data,
  })
}

// 查询管辖五级
export function getRegion() {
  return request({
    url: '/ec_jbts/report/getregion.jsp',
    method: 'post',
  })
}


