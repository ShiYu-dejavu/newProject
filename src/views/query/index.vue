<template>
  <div class="app-container">
    <div class="header clearfix">
      <h5 class="fl title">举报投诉管理</h5>
      <div class="fr operation"></div>
    </div>

    <div class="contents">
      <div class="search clearfix">
        <div class="w-160 fl mr-10 mb">
          <el-cascader clearable size="small" v-model="searchList.REGION_CODE" :props="{ checkStrictly: true }"
            :options="gridInfo" placeholder="请选择管辖"></el-cascader>
        </div>

        <div class="w-160 fl mr-10 mb">
          <el-select v-model="searchList.report_type" placeholder="请选择类型" clearable size="small">
            <el-option v-for="(item, index) in reportType" :key="index" :value="index" :label="item"></el-option>
          </el-select>
        </div>

        <div class="w-160 fl mr-10 mb">
          <el-select v-model="searchList.status" placeholder="请选择状态" clearable size="small">
            <el-option v-for="(key, item) in dealStatusType" :key="item" :value="key.CODE" :label="key.NAME">
            </el-option>
          </el-select>
        </div>

        <div class="w-160 fl mr-10 mb">
          <el-input v-model="searchList.report_code" clearable size="small" placeholder="请输入编号"></el-input>
        </div>

        <div class="w-160 fl mr-10 mb">
          <el-input v-model="searchList.informant_name" clearable size="small" placeholder="请输入举报投诉人姓名"></el-input>
        </div>

        <div class="w-160 fl mr-10 mb">
          <el-input v-model="searchList.re_informant_name" clearable size="small" placeholder="请输入被举报投诉对象"></el-input>
        </div>

        <div class="w-160 fl mr-10 mb">
          <el-select v-model="searchList.sources" placeholder="请选择案件来源" clearable size="small">
            <el-option v-for="(key, item) in sourcesForm" :key="item" :value="key.CODE" :label="key.NAME">
            </el-option>
          </el-select>
        </div>

        <div class="mr-10 fl mb">
          <custom-button :btnMsg="btn.search" @click="searchInfo"></custom-button>
        </div>
        <custom-button :btnMsg="btn.reset" @click="clear" class="fl mr-10"></custom-button>
      </div>

      <div class="sheet">
        <el-tabs v-model="activeName" type="card">
          <el-tab-pane :label="'全部(' + totalLength + ')'" name="first"></el-tab-pane>
        </el-tabs>
        <el-table ref="multipletable" :height="tableHeight" :data="showList" @select-all="selectAll" @selection-change="handleSelectionChange" tooltip-effect="dark" style="width: 100%"
          border class="menu-table">
          <el-table-column type="selection" width="55"></el-table-column>

          <el-table-column type="index" label="序号" :index="indexMethod" width="55"></el-table-column>

          <el-table-column prop="report_code" label="编号" width="200">
            <template slot-scope="scope">
              <span @click="toDetail(1,scope.row)" style="color: #1a74ef; cursor: pointer">
                {{ scope.row.REPORT_CODE }}
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="idnumber" label="所属管辖">
            <template slot-scope="scope">
              <!-- <span v-if="scope.row.cityname"
                >{{ scope.row.cityname }}/{{ scope.row.districtname }}</span
              > -->
              <span>{{ scope.row.CODE_NAME }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="report_type" label="类型">
            <template slot-scope="scope">
              <span>{{ scope.row.REPORT_TYPE }}</span>
            </template>
          </el-table-column>

          <el-table-column prop="sources" label="来源">
            <template slot-scope="scope">
              <span>{{ scope.row.SOURCES }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="project_name" label="举报投诉人姓名">
            <template slot-scope="scope">
              <span>{{
                scope.row.INFORMANT_NAME ? scope.row.INFORMANT_NAME : "/"
              }}</span>
            </template>
          </el-table-column>

          <el-table-column prop="complaint_type_text" label="投诉举报人身份证">
            <template slot-scope="scope">
              <span>{{ scope.row.ID_NUMBER ? scope.row.ID_NUMBER : "/" }}</span>
            </template>
          </el-table-column>

          <el-table-column prop="deal_status_text" label="举报投诉对象">
            <template slot-scope="scope">
              <span>{{ scope.row.RE_INFORMANT_NAME }}</span>
            </template>
          </el-table-column>

          <el-table-column prop="objtype" label="状态">
            <template slot-scope="scope">
              <span>{{ scope.row.STATUS_TEXT }}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <div class="operation-warper">
      <custom-button :btnMsg="btn.edit2" v-hasBtnPermission="'btn_119002002001'" @click="edit" class="fl ml-10">
      </custom-button>
      <custom-button :btnMsg="btn.detail1" @click="toDetail(2)" class="fl ml-10">
      </custom-button>
      <custom-button :btnMsg="btn.audit1" v-hasBtnPermission="'btn_119002002002'" @click="audit" class="fl ml-10">
      </custom-button>
      <custom-button :btnMsg="btn.redeploy1" v-hasBtnPermission="'btn_119002002004'" @click="change" type="bgorg"
        class="fl ml-10"></custom-button>
      <custom-button :btnMsg="btn.delete" v-hasBtnPermission="'btn_119002002005'" @click="del" type="bgred"
        class="fl ml-10"></custom-button>
      <div class="pager-wrapper fr">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
          :page-sizes="pageSizes" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
          :total="totalLength"></el-pagination>
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
  </div>
</template>


<script>
  import * as api from "@/api/backpay";
  import mockData from "./mock.js";
  import {mixin} from "@/mixins/table.js"
  const baseApi = process.env.BASE_API;
  export default {
    mixins: [mixin],
    data() {
      return {
        regionCode:'',//初始化管辖
        gridInfo: [],
        totalLength: 0,
        currentPage: 1,
        totalLength1: 3,
        currentPage1: 1,
        pageSize1: 50,
        multipleSelection: [],
        activeName: "first",
        distCode: [],
        areaList: [],
        district_code: [],
        objType: {
          1: "工程建设领域拖欠劳动者工资",
          2: "非工程建设领域拖欠劳动者工资",
        },
        complaintModeType: {
          1: "实名投诉",
          2: "匿名投诉",
        },
        complaintType: [],
        dealStatusType: [],
        sourcesForm:[],
        acceptor: [],
        searchList: [],
        dataForm: [],
        recordForm: mockData.recordList,
        auditForm: [],
        rejectForm: [],
        postponeForm: [],
        endForm: [],
        changeForm: [],
        operationView: false,
        editView: false,
        auditView: false,
        resolveView: false,
        rejectView: false,
        postponeView: false,
        endView: false,
        changeView: false,
        dialogVisible: false,
        reportType: [],
      };
    },
    created() {
      this.getSearchList();
      this.getDataList();
     // this.regionList();
    },
    methods: {
      // 查看详情
      toDetail(type, row) {
        if (row) {
          this.$router.push({
            path: "/query/detail",
            query: {
              report_code: row.REPORT_CODE,
              status: row.STATUS,
              id: row.ID,
            },
          });
        } else {
          if (this.multipleSelection.length > 1) {
            this.$message.warning("最多选择一条记录");
          } else if (this.multipleSelection.length === 0) {
            this.$message.warning("请至少选择一条记录查看");
          } else {
            this.$router.push({
            path: "/query/detail",
            query: {
              report_code: this.multipleSelection[0].REPORT_CODE,
              status: this.multipleSelection[0].STATUS,
              id: this.multipleSelection[0].ID,
            },
          });
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
              this.sourcesForm = data.data.REPORT_SOURCE;
            }
          })
          .catch((err) => {
            console.log(err);
          });
      },
      // // 获取管辖
      // regionList() {
      //   api
      //     .getRegion()
      //     .then((res) => {
      //       let data = res.data.data;
      //       if (res.data.code == 201) {
      //         this.district_code = data.data.guanxia_list;
      //       }
      //     })
      //     .catch((err) => {
      //       console.log(err);
      //     });
      // },
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
        data.rows = this.pageSize;
        data.page = this.currentPage;
        this.$store.dispatch("showLoading");
        api
          .getsearchlist(data)
          .then((res) => {
            const data = res.data.data;
            if (res.data.code === 201) {
              this.dataForm = data.data;
              this.totalLength = data.tct;
              this.regionCode  = data.regionCode;
              this.getgridlist();
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
      // 获取一条数据
      getRecordList() {
        if (this.multipleSelection.length > 1) {
          this.$message({
            type: "warning",
            message: "最多选择一条记录~",
          });
        } else if (this.multipleSelection.length === 0) {
          this.$message({
            type: "warning",
            message: "请至少选择一条记录查看",
          });
        } else {
          this.operationView = true;
          let row = this.multipleSelection[0];
          let data = {
            id: row.id,
            rows: this.pageSize,
            page: this.currentPage,
          };
          this.$store.dispatch("showLoading");
          api
            .getrecordlist(data)
            .then((res) => {
              let data = res.data.data;
              if (res.data.code == 201) {
                // this.recordForm = data.data;
                // this.totalLength1 = data.tct;
                this.$store.dispatch("hideLoading");
              } else {
                // this.recordForm = [];
                // this.totalLength1 = 0;
                this.$store.dispatch("hideLoading");
              }
            })
            .catch((err) => {
              console.log(err);
              this.$store.dispatch("hideLoading");
            });
        }
      },
      // 编辑修改
      edit() {
        if (this.multipleSelection.length > 1) {
          this.$message.warning("最多选择一条记录");
        } else if (this.multipleSelection.length === 0) {
          this.$message.warning("请至少选择一条记录查看");
        } else {
          let row = this.multipleSelection[0];
          let str = row.REPORT_CODE.substring(0, 2);

          if (row.STATUS != "rep_000000201") {
            this.$message.warning("请选择状态为待受理的记录操作!");
            return;
          }

          if (str == "JB") {
            this.$router.push({
              path: "reportEdit",
              query: {
                report_code: row.REPORT_CODE,
              },
            });
          } else {
            this.$router.push({
              path: "complaintEdit",
              query: {
                report_code: row.REPORT_CODE,
              },
            });
          }
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
          this.auditView = true;
          this.auditForm = [];
          this.$router.push({
            path: '/query/acceptCase',
            query: {
              report_code: this.multipleSelection[0].REPORT_CODE
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

      getgridlist() {
        console.log(`/ycuploads/grid/${this.regionCode}/GRID.json`);
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
  .w-160{
    width: 160px;
  }

</style>
