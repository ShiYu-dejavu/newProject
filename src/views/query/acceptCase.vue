<template>
  <div class="app-container">

    <el-row :gutter="20" class="main-container">
      <el-col :span="16">
        <el-card class="card-container">
          <h5>{{title}}</h5>
          <el-divider></el-divider>
          <table class="tb-content">
            <tr>
              <td class="tb-title">举报投诉编号</td>
              <td>{{dataForm.REPORT_CODE}}</td>
              <td class="tb-title">所属管辖</td>
              <td>{{dataForm.REGION_CODE_TEXT}}</td>
            </tr>
            <tr>
              <td class="tb-title">类型</td>
              <td>{{dataForm.REPORT_TYPE}}</td>
              <td class="tb-title">被举报投诉对象</td>
              <td>{{dataForm.RE_INFORMANT_NAME}}</td>
            </tr>
            <tr>
              <td class="tb-title">举报投诉人姓名</td>
              <td colspan="3">{{dataForm.INFORMANT_NAME}}</td>
            </tr>
          </table>
          <div class="form-box">
            <el-form ref="form" :model="form" label-width="100px">
              <el-form-item label="">
                <el-radio-group v-model="form.status">
                  <el-radio label="1">受理</el-radio>
                  <el-radio label="2">不予受理</el-radio>
                  <el-radio label="3">并案</el-radio>
                </el-radio-group>
              </el-form-item>
              <div v-if="form.status == 2 || form.status == 1">
                <el-row>
                  <el-col :span='12'>
                    <el-form-item label="受理人：">
                      <el-select v-model="form.audit_person" placeholder="请选择受理人" size='small' clearable style="width:95%">
                        <el-option v-for="(item,index) in personForm" :key="index" :label="item.NAME" :value="item.CODE">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span='12'>
                    <el-form-item label="受理时间：">
                      <el-date-picker style="width:100%" v-model="form.auth_time" value-format="yyyy-MM-dd" type="date" placeholder="请选择受理时间" clearable size='small'>
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-form-item label="审核备注：">
                  <el-input type="textarea" v-model="form.reason" clearable size='small'></el-input>
                </el-form-item>
                <el-form-item label="附件：" v-if="form.status == 2">
                  <span class="fujian" @click="showDialog">劳动保障监察不予受理决定书</span>
                </el-form-item>
              </div>
              <div v-else>
                <span class="fl mr-10 ">案件查询</span>
                <div class="w-200 fl mr-10 mb">
                  <el-input v-model="searchList.case_number" clearable size="small" placeholder="请输入线索编号"></el-input>
                </div>
                <div class="w-200 fl mr-10 mb">
                  <el-input v-model="searchList.name" clearable size="small" placeholder="请输入涉案单位（个人）"></el-input>
                </div>
                <div class="mr-10 fl mb">
                  <custom-button :btnMsg="btn.search" @click="searchInfo"></custom-button>
                </div>
                <div class="case-box search-case">
                    <el-row :gutter="10">
                      <el-col :span="12"  v-for="(item,index) in searchAlikeForm" :key="index">
                        <div class="case-item">
                          <h6>
                            <span class="index-item">{{index+1}}</span>案件<span>{{index+1}}</span>
                            <el-button type="text" class="fr" style="margin-right:20px" @click="mergeCase(item.CASE_NUMBER)">并案</el-button>
                          </h6>
                          <el-form label-width="40%" >
                            <el-form-item label="举报投诉编号：">
                              <span>{{item.CASE_NUMBER}}</span>
                            </el-form-item>
                            <el-form-item label="所属管辖：">
                              <span>{{item.DISTRICT_CODE}}</span>
                            </el-form-item>
                            <el-form-item label="涉案单位(个人)：">
                              <span>{{item.NAME}}</span>
                            </el-form-item>
                            <el-form-item label="状态：">
                              <span>{{item.TOTAL_STATE}}</span>
                            </el-form-item>
                            <el-form-item label="案由：">
                              <p style=" -webkit-box-orient: vertical;">{{item.CAUSE}}</p>
                            </el-form-item>
                          </el-form>
                        </div>
                      </el-col>
                    </el-row>
                </div>
              </div>
            </el-form>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card  class="card-container">
          <h5>相似案件</h5>
          <el-divider></el-divider>
          <div class="case-box">
              <div class="case-item" v-if="!showAll&&alikeForm.length>0">
                <h6>
                  <span class="index-item">1</span>案件1
                  <el-button type="text" class="fr" style="margin-right:20px" @click="mergeCase(alikeForm[0].CASE_NUMBER)">并案</el-button>
                </h6>
                <el-form label-width="40%">
                  <el-form-item label="案件编号：">
                    <span>{{alikeForm[0].CASE_NUMBER}}</span>
                  </el-form-item>
                  <el-form-item label="所属管辖：">
                    <span>{{alikeForm[0].DISTRICT_CODE}}</span>
                  </el-form-item>
                  <el-form-item label="涉案单位(个人)：">
                    <span>{{alikeForm[0].NAME}}</span>
                  </el-form-item>
                  <el-form-item label="状态：">
                    <span>{{alikeForm[0].TOTAL_STATE}}</span>
                  </el-form-item>
                  <el-form-item label="案由：">
                    <p style=" -webkit-box-orient: vertical;">{{alikeForm[0].CAUSE}} </p>
                  </el-form-item>
                </el-form>
                <div class="load-all" @click="loadAll">
                  查看全部
                </div>
              </div>
              <div class="case-item" v-for="(item,index) in alikeForm" :key="index" v-else>
                <h6>
                  <span class="index-item">{{index+1}}</span>案件<span>{{index+1}}</span>
                  <el-button type="text" class="fr" style="margin-right:20px" @click="mergeCase(item.CASE_NUMBER)">并案</el-button>
                </h6>
                <el-form label-width="40%">
                  <el-form-item label="举报投诉编号：">
                    <span>{{item.CASE_NUMBER}}</span>
                  </el-form-item>
                  <el-form-item label="所属管辖：">
                    <span>{{item.DISTRICT_CODE}}</span>
                  </el-form-item>
                  <el-form-item label="涉案单位(个人)：">
                    <span>{{item.NAME}}</span>
                  </el-form-item>
                  <el-form-item label="状态：">
                    <span>{{item.TOTAL_STATE}}</span>
                  </el-form-item>
                  <el-form-item label="案由：">
                    <p style=" -webkit-box-orient: vertical;">{{item.CAUSE}}</p>
                  </el-form-item>
                </el-form>
              </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <div class="operation-warper">
      <div class="float-btn">
        <el-button size="small" @click="cancel">取消</el-button>
        <el-button size="small" type="primary" @click="saveAuth">确定</el-button>
      </div>
    </div>
    <RejectDialog ref='RejectDialog' @setForm='setForm' />
  </div>
</template>

<script>
import RejectDialog from './dialog/reject'
import * as api from "@/api/backpay";
export default {
  components: {
    RejectDialog,
  },
  data() {
    return {
      title: '举报投诉受理',
      form: {
        status: '1',
        audit_person: '',
      },
      options: [],
      showAll: false,
      searchList: {},
      rejectForm: {},//不予受理决定书
      dataForm: {},
      alikeForm: [],
      searchAlikeForm: [],
      personForm: [],
    }
  },
  created() {
    this.getAllMsg();
    this.getPerson();
  },
  methods: {
    //相似案件显示全部
    loadAll() {
      this.showAll = true
    },
    //案件查询
    searchInfo() {
      this.getsearchAlike();
    },
    //显示不予受理弹窗
    showDialog() {
      this.$refs.RejectDialog.dialogVisible = true
    },
    //不予受理表单数据处理
    setForm(data) {
      this.rejectForm = data;
    },
    //取消
    cancel() {
      this.$router.push('/query/index')
    },

    //获取信息初始化
    getAllMsg() {
      this.$store.dispatch("showLoading");
      let data = [];
      data.report_code = this.$route.query.report_code; //举报投诉编号
      api
        .getreportmsg(data)
        .then(res => {
          let data = res.data.data;
          if (res.data.code === 201) {
            this.dataForm = data.data1;
            this.alikeForm = data.data2;
            this.$store.dispatch("hideLoading");
          } else {
            this.dataForm = {};
            this.alikeForm = [];
            this.$store.dispatch("hideLoading");
          }
        })
        .catch(err => {
          console.log(err);
          this.$store.dispatch("hideLoading");
        });
    },
    //查询相似案件
    getsearchAlike() {
      this.$store.dispatch("showLoading");
      let data = [];
      data = this.searchList;
      api
        .searchReportAlike(data)
        .then(res => {
          let data = res.data.data;
          if (res.data.code === 201) {
            this.searchAlikeForm = data.data3;
            this.$store.dispatch("hideLoading");
          } else {
            this.searchAlikeForm = [];
            this.$store.dispatch("hideLoading");
          }
        })
        .catch(err => {
          console.log(err);
          this.$store.dispatch("hideLoading");
        });
    },

    //获取受理人信息
    getPerson() {
      api
        .getDic()
        .then(res => {
          let data = res.data.data;
          if (res.data.code === 201) {
            this.personForm = data.data.DEPARTMENT_USER;
            this.form.audit_person = data.data.OWN_CODE;
            this.$store.dispatch("hideLoading");
          } else {
            this.personForm = [];
            this.$store.dispatch("hideLoading");
          }
        })
        .catch(err => {
          console.log(err);
          this.$store.dispatch("hideLoading");
        });
    },

    //受理,不予受理
    saveAuth() {
      this.$store.dispatch("showLoading");
      if (this.form.status == '1') { //受理
        this.form.status = 'rep_000000202';
        this.form.report_code = this.dataForm.REPORT_CODE;
        api
          .editAuthMsg(this.form)
          .then(res => {
            if (res.data.code === 201) {
              this.$message({
                type: "success",
                message: "操作成功",
              });
              this.$router.push({
                name: "query/index",
              });
              this.$store.dispatch("hideLoading");
            } else {
              this.$message({
                type: "error",
                message: "操作失败",
              });
              this.$store.dispatch("hideLoading");
            }
          })
          .catch(err => {
            console.log(err);
            this.$store.dispatch("hideLoading");
          });
      } else if (this.form.status == '2') { //不予受理
        let data = [];
        data.msg = this.rejectForm;
        data.type_code = this.dataForm.REPORT_CODE;
        data.district_code = this.dataForm.REGION_CODE;
        api
          .editBookInfo(data)
          .then(res => {
            if (res.data.code === 201) {  //文书存入成功，则存主记录审核记录
              this.form.status = 'rep_000000203'; //不予受理
              this.form.report_code = this.dataForm.REPORT_CODE;
              api
                .editAuthMsg(this.form)
                .then(res => {
                  if (res.data.code === 201) {
                    this.$message({
                      type: "success",
                      message: "操作成功",
                    });
                    this.$router.push({
                      name: "query/index",
                    });
                    this.$store.dispatch("hideLoading");
                  } else {
                    this.$message({
                      type: "error",
                      message: "操作失败",
                    });
                    this.$store.dispatch("hideLoading");
                  }
                })
                .catch(err => {
                  console.log(err);
                  this.$store.dispatch("hideLoading");
                });
              this.$store.dispatch("hideLoading");
            } else {
              this.$message({
                type: "error",
                message: "操作失败",
              });
              this.$store.dispatch("hideLoading");
            }
          })
          .catch(err => {
            console.log(err);
            this.$store.dispatch("hideLoading");
          });
      }
    },

    //并案
    mergeCase(caseNum) {
      this.$confirm(`是否将此举报投诉并案到编号${caseNum}的的案件中?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch("showLoading");
        let data = [];
        data.case_number = caseNum;
        data.status = 'rep_000000209';//并案状态
        data.report_code = this.dataForm.REPORT_CODE;
        api
          .editAuthMsg(data)
          .then(res => {
            if (res.data.code === 201) {
              this.$message({
                type: "success",
                message: "操作成功",
              });
              this.$router.push({
                name: "query/index",
              });
              this.$store.dispatch("hideLoading");
            } else {
              this.$message({
                type: "error",
                message: "操作失败",
              });
              this.$store.dispatch("hideLoading");
            }
          })
          .catch(err => {
            console.log(err);
            this.$store.dispatch("hideLoading");
          });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });



    },
  }
}

</script>

<style lang='scss' scoped>
.app-container {
  background: #e9eef3;
  margin-bottom: 60px;
  .card-container{
    height: calc(100vh - 190px);
    overflow-y: auto;
  }
  h5 {
    font-size: 20px;
  }
}

.operation-warper {
  width: 120%;
  height: 30px;
}

.float-btn {
  position: fixed;
  z-index: 20;
  right: 20px;
  bottom: 10px;
}

.tb-content {
  width: 100%;
  font-size: 14px;

  td {
    border: 1px solid #e5e5e5;
    height: 40px;
    width: 25%;
    padding-left: 8px;
  }

  .tb-title {
    background-color: #f5f7fa;
    border-color: #dcdfe6;
  }
}

.form-box {
  margin-top: 20px;
  width: 100%;
}

.fujian {
  color: #1a74ef;
  cursor: pointer;
  text-decoration: underline;
}

.case-box {
  width: 100%;
  min-height: 300px;

  .case-item {
    
    border: 1px solid #e5e5e5;
    margin-bottom: 20px;

    h6 {
      font-size: 14px;
      line-height: 40px;
      padding-left: 24px;
      font-weight: 500;
      border-bottom: 1px solid #e5e5e5;
      margin-bottom: 10px;
    }

    .index-item {
      display: inline-block;
      margin-right: 10px;
      width: 24px;
      height: 24px;
      line-height: 24px;
      border-radius: 12px;
      background: #1a74ef;
      color: #fff;
      text-align: center;
    }

    /deep/ .el-form-item {
      margin-bottom: 0;
    }

    /deep/ .el-form-item__label {
      line-height: 34px;
    }

    /deep/ .el-form-item__content {
      line-height: 34px;
    }

    span {
      color: #909399;
    }

    p {
      color: #909399;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }

    .load-all {
      width: 100%;
      line-height: 40px;
      text-align: center;
      font-size: 14px;
      color: #303133;
      background: #e5e5e5;
      cursor: pointer;
    }
  }
}
.search-case {
  min-height: 267px;
  float: left;
  width: 100%;
}

/deep/ .el-card {
  border-radius: 0;
}

/deep/ .el-card__body {
  padding: 16px;
}

/deep/ .el-radio__input.is-checked + .el-radio__label {
  color: #1a74ef;
}

/deep/ .el-scrollbar__wrap {
  overflow-x: hidden;
}

/deep/ .el-divider--horizontal {
  margin: 16px 0;
}
</style>
