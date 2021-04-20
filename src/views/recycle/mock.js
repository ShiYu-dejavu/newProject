//案件管理
const list = [{
    base_condition: '马志诚欠薪案',
    reson: '工地几个月没有发工资了，领导欠钱不给',
    setting_time: '2020-8-2',
    deal_time: '2020-8-5',
    close_mathod: '裁定终结执行',
    close_remark: '生效法律文书确定的内容全部执行',
    close_man: '五道杠总队长',
    close_time: '2020-8-9',
    area: '湖北省/武汉市/洪山区'
  }, {
    base_condition: '宇龙花城欠薪案',
    reson: '反映人诉求',
    setting_time: '2020-5-11',
    deal_time: '2020-6-12',
    close_mathod: '裁定不予执行',
    close_remark: '无效',
    close_man: '五道杠总队长',
    close_time: '2020-8-19',
    area: '湖北省/武汉市/青山区'
  }, {
    base_condition: '五里庙棚户区改造南区一标欠薪案',
    reson: '工程烂尾',
    setting_time: '2020-4-7',
    deal_time: '2020-5-8',
    close_mathod: '裁定立即执行',
    close_remark: '立即解决欠薪问题',
    close_man: '五道杠总队长',
    close_time: '2020-8-22',
    area: '湖北省/武汉市/东西湖区'
  }, {
    base_condition: '安泰理想城欠薪案',
    reson: '工程烂尾',
    setting_time: '2020-3-2',
    deal_time: '2020-4-3',
    close_mathod: '裁定立即执行',
    close_remark: '立即解决欠薪问题',
    close_man: '五道杠总队长',
    close_time: '2020-8-12',
    area: '湖北省/武汉市/江夏区'
  }, {
    base_condition: '碧桂园中央公园欠薪案',
    reson: '公司破产，老板跳楼',
    setting_time: '2020-1-3',
    deal_time: '2020-3-5',
    close_mathod: '裁定暂停执行',
    close_remark: '清算公司财产',
    close_man: '五道杠总队长',
    close_time: '2020-8-11',
    area: '湖北省/武汉市/汉口区'
  }, {
    base_condition: '虎岭锦绣城3#4#5#欠薪案',
    reson: '连续暴雨导致工程无法继续施工',
    setting_time: '2020-1-3',
    deal_time: '2020-3-5',
    close_mathod: '裁定暂停执行',
    close_remark: '延期处理',
    close_man: '五道杠总队长',
    close_time: '2020-6-11',
    area: '湖北省/武汉市/武昌区'
  },

]
const recordList = [{
  title: '受理',
  uid: '周阳',
  department: '监管部门',
  create_time: '2020-1-3'
}, {
  title: '二次报审',
  uid: '周阳',
  department: '监管部门',
  create_time: '2020-2-4'
}, {
  title: '案件合并',
  uid: '周阳',
  department: '监管部门',
  create_time: '2020-3-5'
}, ]
export default {
  list,
  recordList
}