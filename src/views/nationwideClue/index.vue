<template>
  <div class="app-container">
    <div class="header clearfix">
      <h5 class="fl title">全国平台线索管理</h5>
      <div class="fr operation">
        <custom-button :btnMsg="btn.export" @click="importData" class="fl ml-10">
        </custom-button>
      </div>
    </div>

    <div class="contents">
      <div class="search clearfix">
        <div class="w-160 fl mr-10 mb">
          <el-cascader clearable size="small" v-model="searchList.region_code" :props="{ checkStrictly: true }"
            :options="gridInfo" placeholder="请选择管辖"></el-cascader>
        </div>
        <div class="w-160 fl mr-10 mb">
          <el-input v-model="searchList.clue_code" clearable size="small" placeholder="请输入线索编号"></el-input>
        </div>
        <div class="w-160 fl mr-10 mb">
          <el-input v-model="searchList.reflect_person_name" clearable size="small" placeholder="请输入反映人姓名"></el-input>
        </div>
        <div class="w-160 fl mr-10 mb">
          <el-input v-model="searchList.reflect_person_card" clearable size="small" placeholder="请输入反映人身份证号码">
          </el-input>
        </div>
        <div class="w-160 fl mr-10 mb">
          <el-input v-model="searchList.backpay_project" clearable size="small" placeholder="请输入拖欠工资项目名称"></el-input>
        </div>
        <div class="w-160 fl mr-10 mb">
          <el-input v-model="searchList.build_company" clearable size="small" placeholder="请输入建设单位名称"></el-input>
        </div>
        <div class="w-160 fl mr-10 mb">
          <el-select v-model="searchList.status" placeholder="请选择状态" clearable size="small">
            <el-option v-for="(key, item) in dealStatusType" :key="item" :value="key.CODE" :label="key.NAME">
            </el-option>
          </el-select>
        </div>


        <div class="mr-10 fl mb">
          <custom-button :btnMsg="btn.search" @click="searchInfo"></custom-button>
        </div>
        <custom-button :btnMsg="btn.reset" @click="clear" class="fl mr-10"></custom-button>
      </div>

      <div class="sheet">
        <el-tabs v-model="industry_field_num" type="card" @tab-click="changeTab">
          <el-tab-pane :label="'工程建设领域(' + totalLength1 + ')'" name="1"></el-tab-pane>
          <el-tab-pane :label="'非工程建设领域(' + totalLength2 + ')'" name="2"></el-tab-pane>
        </el-tabs>
        <el-table ref="multipletable" :height="tableHeight" :data="showList" @select-all="selectAll" @selection-change="handleSelectionChange" tooltip-effect="dark" style="width: 100%"
          border class="menu-table">
          <el-table-column type="selection" width="55"></el-table-column>

          <el-table-column type="index" label="序号" :index="indexMethod" width="55"></el-table-column>

          <el-table-column prop="CLUE_CODE" label="线索编号">
            <template slot-scope="scope">
              <span @click="toDetail(1,scope.row)" style="color: #1a74ef; cursor: pointer">
                {{ scope.row.CLUE_CODE }}
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="REGION_CODE_TEXT" label="所属管辖">
            <template slot-scope="scope">
              <span>
                {{ scope.row.REGION_CODE_TEXT }}
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="CLUE_SOURCE" label="线索来源">
            <template slot-scope="scope">
              <span>
                {{ scope.row.CLUE_SOURCE }}
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="REFLECT_PERSON_NAME" label="反映人姓名">
            <template slot-scope="scope">
              <span>
                {{ scope.row.REFLECT_PERSON_NAME }}
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="REFLECT_PERSON_CARD" label="反映人姓名身份证">
            <template slot-scope="scope">
              <span>
                {{ scope.row.REFLECT_PERSON_CARD }}
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="BACKPAY_PROJECT" label="拖欠工资项目名称" v-if="industry_field_num=='1'">
            <template slot-scope="scope">
              <span>
                {{ scope.row.BACKPAY_PROJECT }}
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="BE_REPORTED_COMPANY" label="拖欠工资单位" v-else>
            <template slot-scope="scope">
              <span>
                {{ scope.row.BE_REPORTED_COMPANY }}
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="BUILD_COMPANY" label="建设单位名称" v-if="industry_field_num=='1'">
            <template slot-scope="scope">
              <span>
                {{ scope.row.BUILD_COMPANY }}
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="COMPANY_PERSON" label="拖欠工资单位负责人" v-else>
            <template slot-scope="scope">
              <span>
                {{ scope.row.COMPANY_PERSON }}
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="GENERAL_CONTRACTOR" label="总承包单位名称" v-if="industry_field_num=='1'">
            <template slot-scope="scope">
              <span>
                {{ scope.row.GENERAL_CONTRACTOR }}
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="COMPANY_PHONE" label="拖欠工资单位电话" v-else>
            <template slot-scope="scope">
              <span>
                {{ scope.row.COMPANY_PHONE }}
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="STATUS_TEXT" label="状态">
            <template slot-scope="scope">
              <span>
                {{ scope.row.STATUS_TEXT }}
              </span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <div class="operation-warper">
      <custom-button :btnMsg="btn.detail1" @click="toDetail(2)" class="fl ml-10">
      </custom-button>
      <custom-button :btnMsg="btn.audit1" @click="audit" class="fl ml-10">
      </custom-button>
      <custom-button :btnMsg="btn.redeploy1" @click="change" type="bgorg" class="fl ml-10"></custom-button>
      <div class="pager-wrapper fr">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
          :page-sizes="pageSizes" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
          :total="totalLength3"></el-pagination>
      </div>
    </div>
    <el-dialog title="转案件" :visible.sync="changeView" width="550px">
      <i class="el-icon-info" style="color: #faad14"></i>
      <span>确定将此举报（投诉）转为案件？</span>
      <div slot="footer" class="dialog-footer">
        <br />
        <el-button type="info" @click="changeView = false" size="small">关闭</el-button>
        <el-button type="primary" @click="changeSave(1)" size="small">确定</el-button>
      </div>
    </el-dialog>
    <!-- 导入弹窗 -->
    <el-dialog title="导入" width="500px" :visible.sync="importView">
      <div style="padding-left:100px">
        <el-radio-group v-model="radio">
          <el-radio :label="1" style="margin-bottom:20px">工程建设领域</el-radio><br />
          <el-radio :label="2">非工程建设领域</el-radio>
        </el-radio-group>
        <div class="upload">
          <MyUpload
            ref="myUpload"
            accept='xls,xlsx'
            sizeLimit='10MB'
            :numLimit='1'
            @successCB='successCB'
          />

          <div class="el-upload__tip">
            <p>仅支持excel文件<br/>上传大小不能超过10Mb</p>
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size='small' @click="importView = false">取 消</el-button>
        <el-button size='small' type="primary" @click="insertExcel">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>


<script>
  import * as api from "@/api/backpay";
  import {mixin} from "@/mixins/table.js"
  const baseApi = process.env.BASE_API;
  export default {
    mixins: [mixin],
    components: {},
    data() {
      return {
        regionCode:'',  //初始登录人管辖
        industry_field_num: '1',
        gridInfo: [],
        totalLength: 0,
        currentPage: 1,
        totalLength1: 0,
        totalLength2: 0,
        totalLength3:0,
        multipleSelection: [],
        district_code: [],
        dealStatusType: [],
        acceptor: [],
        searchList: [],
        dataForm: [],
        recordForm: [],
        auditForm: [],
        changeForm: [],
        operationView: false,
        auditView: false,
        importView: false,
        changeView: false,
        dialogVisible: false,
        reportType: [],
        radio: 1,
        pathForm:{
          excelPath:[],
        },//导入路径容器
      };
    },
    created() {
      this.getSearchList();
      this.getDataList();   
    },
    methods: {
      //tab标签切换(工程与非工程)
      changeTab() {
        this.getDataList();
      },
      //导入
      importData() {
        this.importView = true
      },
      successCB(data){
        let path = data[0].file_path;
        this.pathForm.excelPath.push(path);
      },
      // 查看详情
      toDetail(type, row) {
        if (row) {
          this.$router.push({
            path: "/nationwideClue/detail",
            query: {
              clue_code: row.CLUE_CODE,
              type: this.industry_field_num
            },
          });
        } else {
          if (this.multipleSelection.length > 1) {
            this.$message.warning("最多选择一条记录");
          } else if (this.multipleSelection.length === 0) {
            this.$message.warning("请至少选择一条记录查看");
          }else {
            this.$router.push({
              path: '/nationwideClue/detail',
              query: {
              clue_code: this.multipleSelection[0].CLUE_CODE,
              type: this.industry_field_num
            },
            })
          }
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      //改变分页条数大小
      handleSizeChange(pagesize) {
        this.pageSize = pagesize;
        this.getDataList();
      },
      //翻页
      handleCurrentChange(currentPage) {
        this.currentPage = currentPage;
        this.getDataList();
      },
      indexMethod(index) {
        return (this.currentPage - 1) * this.pageSize + index + 1;
      },
      // 获取搜索框默认值
      getSearchList() {
        api
          .getsearchinfo()
          .then((res) => {
            let data = res.data.data;
            if (res.data.code == 201) {
              this.reportType = data.data.REPORT_TYPE;
              this.dealStatusType = data.data.REPORT_STATUS;
              this.acceptor = data.data.DEPARTMENT_USER;
              this.district_code = data.data.guanxia_list;
            }
          })
          .catch((err) => {
            console.log(err);
          });
      },
      //查询条件查询
      searchInfo(v) {
        this.currentPage = 1;
        this.getDataList();
      },
      //清空查询条件
      clear() {
        this.searchList = [];
      },
      // 获取数据列表
      getDataList() {
        let data = this.searchList;
        data.industry_field_num = this.industry_field_num;
        data.rows = this.pageSize;
        data.page = this.currentPage;
        this.$store.dispatch("showLoading");
        api
          .getcluelist(data)
          .then((res) => {
            const data = res.data.data;
            if (res.data.code === 201) {
              this.dataForm = data.data;
              this.totalLength1 = data.tct1;
              this.totalLength2 = data.tct2;
              this.totalLength3 = data.tct3;
              this.regionCode = data.regionCode;
              this.getgridlist()
              this.$store.dispatch("hideLoading");
            } else {
              this.dataForm = [];
              this.totalLength = 0;
              this.$store.dispatch("hideLoading");
            }
            let list = this.dataForm;
            this.allList = this.reSetData(list, 20);
            this.showList = this.allList[0];
            this.resetTable()
          })
          .catch((err) => {
            console.log(err);
            this.$store.dispatch("hideLoading");
          });
      },

      //转案件存储
      changeSave(v) {
        this.$store.dispatch("showLoading");
        let data = [];
        let row = this.multipleSelection[0];
        data.report_code = row.REPORT_CODE;
        data.case = "case_000000104";
        if (v === 1) {
          api
            .turncase(data)
            .then((res) => {
              let data = res.data.data;
              if (res.data.code === 201) {
                this.$message.success(data.message);
                this.getDataList();
                this.$store.dispatch("hideLoading");
              } else {
                this.$message.warning(data.message);
                this.$store.dispatch("hideLoading");
              }
            })
            .catch((err) => {
              console.log(err);
              this.$store.dispatch("hideLoading");
            });
          this.changeView = false;
        } else {
          this.changeView = false;
        }
      },
      // 受理
      audit() {
        if (this.multipleSelection.length > 1) {
          this.$message.warning("最多选择一条记录");
        } else if (this.multipleSelection.length === 0) {
          this.$message.warning("请至少选择一条记录查看");
          //案件进度
        } else if (this.multipleSelection[0]["STATUS"] != "rep_000000201") {
          this.$message.warning("请选择状态为待受理的记录操作");
        } else {
          this.auditForm = [];
          this.$router.push({
            path: '/nationwideClue/acceptCase',
            query: {
              clue_code: this.multipleSelection[0].CLUE_CODE
            }
          })
        }
      },
      // 转案件
      change() {
        if (this.multipleSelection.length > 1) {
          this.$message.warning("最多选择一条记录");
        } else if (this.multipleSelection.length === 0) {
          this.$message.warning("请至少选择一条记录查看");
          //案件进度
        } else if (this.multipleSelection[0]["STATUS_TEXT"] !== "已受理") {
          this.$message.warning("请选择已受理记录");
        } else {
          this.changeView = true;
          this.changeForm = [];
        }
      },

      //放入回收站
      del() {
        if (this.multipleSelection.length < 1) {
          this.$message({
            type: "warning",
            message: "请至少选择一条记录查看~",
          });
          return false;
        } else if (this.multipleSelection.length > 1) {
          this.$message({
            type: "warning",
            message: "最多选择一条记录~",
          });
          return false;
        }
        this.$confirm("确定删除此数据?", "提示", {
            confirmbuttontext: "确定",
            cancelbuttontext: "取消",
            type: "info",
          })
          .then(() => {
            this.$store.dispatch("showLoading");
            let row = this.multipleSelection[0];
            let data = {
              report_code: row.REPORT_CODE,
              is_reacll: "1",
            };
            api
              .recycleinfo(data)
              .then((res) => {
                if (res.data.code == 201) {
                  this.$message({
                    type: "success",
                    message: res.data.data.message,
                  });
                  this.getDataList();
                  this.$store.dispatch("hideLoading");
                } else {
                  this.$message({
                    type: "warning",
                    message: res.data.data.message,
                  });
                  this.$store.dispatch("hideLoading");
                }
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch(() => {});
      },
      
      //数据导入获取文件路径
      insertExcel(){
          let data = this.pathForm;
          data.industry_field = this.radio;  //工程和非工程
          this.$store.dispatch("showLoading");
          api
            .importExcel(data)
            .then(res => {
              let data = res.data.data;
              if (res.data.code === 201) {
                  this.$message({
                    type: "success",
                    message: "操作成功",
                  });
                  this.getDataList();
                  this.importView = false;
                this.$store.dispatch("hideLoading");
              } else {
                this.$message({
                    type: "error",
                    message: "操作失败",
                  });
                  this.importView = false;
                this.$store.dispatch("hideLoading");
              }
            })
            .catch(err => {
              console.log(err);
              this.$store.dispatch("hideLoading");
            });
      },

      //获取文件管辖
      getgridlist() {
        this.$axios
          .get(baseApi + `/ycuploads/grid/${this.regionCode}/GRID.json`)
          .then((response) => {
            this.gridInfo = response.data;
          })
          .catch(function (error) {
            console.log(error);
          });
      },

    },
  };

</script>

<style lang="scss" scoped>
  .app-container {
    margin-bottom: 70px;
  }

  /deep/ .el-tabs__item {
    height: 32px;
    line-height: 32px;
  }

  /deep/ .el-dialog__footer {
    border-top: 1px solid rgba(0, 0, 0, 0.09);
    padding: 10px 20px 10px;
  }

  /deep/ .el-dialog__header {
    border-bottom: 1px solid rgba(0, 0, 0, 0.09);
  }

  .audit {
    button:nth-child(1) {
      width: 110px;
      height: 30px;
      background: rgba(250, 148, 79, 1);
      border: 0;
      margin-right: 6px;
      color: white;
    }

    button:nth-child(2) {
      width: 110px;
      height: 30px;
      background: rgba(33, 96, 225, 1);
      border: 0;
      color: white;
    }
  }

  .postpone {
    color: #fa944f;
    line-height: 20px;
    width: 300px;
    margin-top: 6px;
  }

  .operation-warper {
    width: 120%;
  }

  .pager-wrapper {
    position: fixed;
    bottom: 8px;
    right: 8px;
  }
.upload {
    margin-top: 10px;
    /deep/ .el-upload {
      float: left;
      margin-right: 10px;
    }
    .el-upload__tip {
      display: inline-block;
      margin-top: 0px;
    }
    .el-button {
      background-color: #1a74ef;
      color: #fff;
    }
    P {
      line-height: 18px;
    }
  }
  .w-160{
    width: 160px;
  }
</style>
