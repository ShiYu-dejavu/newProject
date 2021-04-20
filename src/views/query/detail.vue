<template>
  <div class="app-container">
    <div class="header clearfix">
      <h5 class="fl title">
        <el-button  @click="$router.go(-1)" size="small" class="el-icon-arrow-left">返回</el-button>
        <span style="padding-left:20px"></span>
        举报投诉详情<span v-if="$route.query.report_code" class="reqort-code">案件编号：{{$route.query.report_code}}</span>
      </h5>
    </div>
    <div class="contents">
      <div class="remarks">
        <h4><span>举报投诉人</span></h4>
      </div>

      <table class="tb-content">
        <tr>
          <td class="tb-title">举报/投诉</td>
          <td colspan="3">{{dataForm.REPORT_TYPE}}</td>
         
        </tr>
        <tr>
          <td class="tb-title">姓名</td>
          <td>{{dataForm.INFORMANT_NAME?dataForm.INFORMANT_NAME:'/'}}</td>
          <td class="tb-title">性别</td>
          <td>{{dataForm.INFORMANT_SEX?dataForm.INFORMANT_SEX:'/'}}</td>
        </tr>
        <tr>
          <td class="tb-title">证件类型</td>
          <td>{{dataForm.ID_TYPE?dataForm.ID_TYPE:'/'}}</td>
          <td class="tb-title">证件号码</td>
          <td>{{dataForm.ID_NUMBER?dataForm.ID_NUMBER:'/'}}</td>
        </tr>
        <tr>
          <td class="tb-title">邮编</td>
          <td>{{dataForm.INFORMANT_POSTCODE?dataForm.INFORMANT_POSTCODE:'/'}}</td>
          <td class="tb-title">电话</td>
          <td>{{dataForm.INFORMANT_PHONE?dataForm.INFORMANT_PHONE:'/'}}</td>
        </tr>
        <tr>
          <td class="tb-title">其他联系方式</td>
          <td>{{dataForm.INFORMANT_OTHER_PHONE?dataForm.INFORMANT_OTHER_PHONE:'/'}}</td>
          <td class="tb-title">地址</td>
          <td>{{dataForm.INFORMANT_ADDRESS?dataForm.INFORMANT_ADDRESS:'/'}}</td>
        </tr>
      </table>

      <div class="remarks">
        <h4><span>被举报投诉对象</span></h4>
      </div>

      <table class="tb-content">
        <tr>
          <td class="tb-title">单位名称或个人姓名</td>
          <td>{{dataForm.RE_INFORMANT_NAME?dataForm.RE_INFORMANT_NAME:'/'}}</td>
          <td class="tb-title">统一社会信用代码</td>
          <td>{{dataForm.RE_CREDIT_CODE?dataForm.RE_CREDIT_CODE:'/'}}</td>
        </tr>
        <tr>
          <td class="tb-title">地址</td>
          <td>{{dataForm.RE_INFORMANT_ADDRESS?dataForm.RE_INFORMANT_ADDRESS:'/'}}</td>
          <td class="tb-title">所属管辖</td>
          <td>{{dataForm.CODE_NAME?dataForm.CODE_NAME:'/'}}</td>
        </tr>
        <tr>
          <td class="tb-title">主要负责人</td>
          <td>{{dataForm.RE_CHARGE_NAME?dataForm.RE_CHARGE_NAME:'/'}}</td>
          <td class="tb-title">邮编</td>
          <td>{{dataForm.RE_INFORMANT_POSTCODE?dataForm.RE_INFORMANT_POSTCODE:'/'}}</td>
        </tr>
        <tr>
          <td class="tb-title">职务</td>
          <td>{{dataForm.RE_JOB?dataForm.RE_JOB:'/'}}</td>
          <td class="tb-title">电话</td>
          <td>{{dataForm.RE_INFORMANT_PHONE?dataForm.RE_INFORMANT_PHONE:'/'}}</td>
        </tr>
        <tr>
          <td class="tb-title">其他联系方式</td>
          <td colspan="3">{{dataForm.RE_INFORMANT_OTHER_PHONE?dataForm.RE_INFORMANT_OTHER_PHONE:'/'}}</td>
        </tr>
      </table>

      <div class="remarks">
        <h4><span>违法行为</span></h4>
      </div>

      <div class="message-box">
        <p v-for="(item,index) in dataForm.VIOLATION_TYPE" :key="index">{{index+1}}.{{item}}</p>
        </div>

      <div class="remarks">
        <h4><span>投诉内容摘要</span></h4>
      </div>

      <div class="message-box">{{dataForm.CONTENT?dataForm.CONTENT:'/'}}</div>

      <div class="remarks">
        <h4><span>投诉请求摘要</span></h4>
      </div>

      <div class="message-box">{{dataForm.REQUEST_CONTENT?dataForm.REQUEST_CONTENT:'/'}}</div>

      <div class="remarks">
        <h4><span>证据材料</span></h4>
      </div>

      <div class="message-box">
        <Myimg
          :url="item"
          v-for="(item,index) in dataForm.CERTIFICATE"
          :key="'img_' + index"
        />

      </div>

      <div class="remarks">
        <h4><span>追加证据</span></h4>
      </div>

      <div class="message-box ">
        <!-- <el-upload class="upload-demo" :action="uploadUrl" :on-success="successHandler" :on-preview="handlePreview"
          multiple name="imgFile[]" :on-remove="handleRemove" :before-remove="beforeRemove" :limit="3"
          :on-exceed="handleExceed" :file-list="fileList">
          <el-button size="small" type="primary">点击上传</el-button>
          <p>支持png/jpg/gif/jpg/bmp格式，最多10张</p>
          <p>单个文件上传大小不能超过3Mb</p>
          <p style="margin-top:10px">*请提供投诉内容相关的材料，比如：身份证、欠条、劳动合同、工资条等信息</p>
        </el-upload> -->

        <MyUpload
          ref="myUpload"
          accept='png,jpg,jpeg'
          sizeLimit='50MB'
          :isPhoto="true"
          multiple
          :numLimit='10'
          @previewCB='previewCB'
          @successCB='handleSuccess'
        />

        <div class="el-upload__tip">
          <p>支持png/jpg/gif/jpg/bmp格式，最多10张单个文件上传大小不能超过3Mb</p>
          <p>*请提供投诉内容相关的材料，比如：身份证、欠条、劳动合同、工资条等信息</p>
        </div>

        <img v-for="(item,index) in imgList" :key="index" :src="item" width="100" class="previewImg">
      </div>

      <div class="remarks">
        <h4><span>案件进度</span></h4>
      </div>

      <el-table :data="tableList" tooltip-effect="dark" style="width: 100%" border class="menu-table">
        <el-table-column prop="deal_status_text" label="案件编号">
          <template slot-scope="scope">
            <span>{{scope.row.CASE_NUMBER}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="deal_remark" label="案件进度">
          <template slot-scope="scope">
            <span>{{scope.row.STATE}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="deal_man_id" label="操作人">
          <template slot-scope="scope">
            <span>{{scope.row.OPERATOR}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="create_time" label="操作时间">
          <template slot-scope="scope">
            <span>{{scope.row.OP_TIME}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="deal_department" label="所在部门">
          <template slot-scope="scope">
            <span>{{scope.row.REGISTE_NAME}}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- <div class="btn-group">
      <custom-button :btnMsg="btn.edit2" v-hasBtnPermission="'btn_119002002001'" @click="edit" class="fl ml-10"></custom-button>
      <custom-button :btnMsg="btn.audit1"  v-hasBtnPermission="'btn_119002002002'"  @click="audit" class="fl ml-10"></custom-button>
      <custom-button :btnMsg="btn.dismissal" v-hasBtnPermission="'btn_119002002003'"  @click="reject" class="fl ml-10"></custom-button>
      <custom-button :btnMsg="btn.redeploy1" v-hasBtnPermission="'btn_119002002004'"  @click="change" type="bgorg" class="fl ml-10"></custom-button>
      <custom-button :btnMsg="btn.delete" v-hasBtnPermission="'btn_119002002005'"  @click="del" type="bgred" class="fl ml-10"></custom-button>
    </div> -->
    <!-- 不予受理弹窗 -->
    <el-dialog title="不予受理" :visible.sync="myDialogVisible" width="500px">
      <el-form size="default" label-width="100px">
        <el-row>
          <el-col :xs="10" :sm="20">
            <el-form-item label="操作人:">
              <el-input v-model="auditForm.audit_person" row="5" clearable size="mini"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="20" :sm="20">
            <el-form-item label="时间:">
              <el-input v-model="auditForm.status_time" row="5" clearable size="mini"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="20" :sm="20">
            <el-form-item label="备注:">
              <el-input v-model="auditForm.reason" type="textarea" row="5" clearable size="mini"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="myDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="unauditSave(1,reportCode)">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 受理弹窗 -->
    <el-dialog title="受理" width="500px" :visible.sync="auditView">
      <el-form size="default" label-width="100px">
        <el-row>
          <el-col :xs="10" :sm="20">
            <el-form-item label="操作人:">
              <el-input v-model="auditForm.audit_person" row="5" clearable size="mini"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="20" :sm="20">
            <el-form-item label="时间:">
              <el-input v-model="auditForm.status_time" row="5" clearable size="mini"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="20" :sm="20">
            <el-form-item label="备注:">
              <el-input v-model="auditForm.reason" type="textarea" row="5" clearable size="mini"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer audit">
        <button @click="auditView = false">取消</button>
        <button @click="auditSave(1,reportCode)">确认</button>
      </div>
    </el-dialog>
    <!-- 客户前段展示的不予受理决定书 
        <RejectDialog ref="rejectDialog" /> -->
    <el-dialog title="转案件" :visible.sync="changeView" width="550px">
      <i class="el-icon-info" style="color:#FAAD14"></i>
      <span>确定将此举报（投诉）转为案件？</span>
      <div slot="footer" class="dialog-footer">
        <br />
        <el-button type="info" @click="changeView = false" size="small">关闭</el-button>
        <el-button type="primary" @click="changeSave(1,reportCode)" size="small">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import Myimg from "@/components/AESfile/getUrl";

  import * as api from "@/api/backpay";
  import RejectDialog from "./dialog/reject";
  import mockData from "./mock.js";
  const baseApi = process.env.BASE_API

  export default {
    components: {
      RejectDialog,
      Myimg,
    },
    data() {
      return {
        baseApi:baseApi,
        uploadUrl: baseApi + '/ec_publicity/notice/uploadfile.jsp',
        totalLength: 0,
        currentPage: 1,
        pageSize: 10,
        multipleSelection: [],
        dataForm: [],
        planForm: [],
        type: "",
        recordForm: mockData.recordList,
        auditForm: [],
        rejectForm: [],
        postponeForm: [],
        endForm: [],
        changeForm: [],
        myDialogVisible: false,
        operationView: false,
        editView: false,
        auditView: false,
        resolveView: false,
        rejectView: false,
        postponeView: false,
        endView: false,
        changeView: false,
        fileList: [],
        reportCode: [],
        tableList: [],

        // 图片上传预览
        imgList: [],
      };
    },
    created() {
      this.getDataList();
      this.ProceedList();
    },
    methods: {
      handleExceed(files, fileList) {
        this.$message.warning(
          `当前限制选择 3 个文件，本次选择了 ${
                    files.length
                } 个文件，共选择了 ${files.length + fileList.length} 个文件`
        );
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${file.name}？`);
      },
      successHandler(response, file, fileList) {
        let data = response.data[0];
        data.report_code = this.$route.query.report_code;
        api
        .addPic(data)
        .then(res => {
          let data = res.data.data;
          if (res.data.code === 201) {
            this.$message.success("操作成功");
            this.$store.dispatch("hideLoading");
          } else {
            this.$message.warning("操作失败");
            this.$store.dispatch("hideLoading");
          }
        })
        .catch(err => {
          console.log(err);
          this.$store.dispatch("hideLoading");
        });

      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      //获取详情数据
      getDataList() {
        const data = this.$route.query;
        data.report_code = this.$route.query.report_code;
        this.reportCode.report_code = this.$route.query.report_code;
        this.reportCode.status = this.$route.query.status;
        this.$store.dispatch("showLoading");
        api.getReportMsg(data)
          .then((res) => {
            let data = res.data.data;
            if (res.data.code === 201) {
              this.dataForm = data.data;
              this.$store.dispatch("hideLoading");
            } else {
              this.dataForm = [];
              this.$store.dispatch("hideLoading");
            }
          })
          .catch((err) => {
            console.log(err);
            this.$store.dispatch("hideLoading");
          });
      },

      //获取案件进度
      ProceedList() {
        let data = this.reportCode;
        api.proceedInfo(data)
          .then((res) => {
            let data = res.data.data;
            if (res.data.code === 201) {
              this.tableList = data.data;
              this.$store.dispatch("hideLoading");
            } else {
              this.tableList = [];
              this.$store.dispatch("hideLoading");
            }
          })
          .catch((err) => {
            console.log(err);
            this.$store.dispatch("hideLoading");
          });
      },

      // 返回
      goBack() {
        this.$router.push({
          path: "/index"
        });
      },

      //转案件(往案件表存数据)
      changeSave(v, reportCode) {
        this.$store.dispatch("showLoading");
        let data = [];
        data.report_code = this.reportCode.report_code;
        data.case = 'case_000000104';
        if (v === 1) {
          api.turncase(data)
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
      // 修改
      edit() {
        let str = this.$route.query.report_code.substring(0, 2);
        if (str == 'JB') {
          this.$router.push({
            path: "/add",
            query: {
              report_code: this.$route.query.report_code
            }
          });
        } else {
          this.$router.push({
            path: "/secondAdd",
            query: {
              report_code: this.$route.query.report_code
            }
          });
        }

      },
      // 受理
      audit() {
        let status = this.reportCode.status;
        console.log(status);
        if (status === 'rep_000000201') {
          this.auditView = true;
        } else {
          this.$message.warning("请选择状态为待受理的记录操作");
        }

      },
      //受理信息保存入操作表(2张表都要存)
      auditSave(v, reportCode) {
        this.$store.dispatch("showLoading");
        let data = this.auditForm;
        data.report_code = this.reportCode.report_code;
        data.auditStatus = v;
        if (v === 1) {
          data.status = 'rep_000000202'; //已受理立案
          api.editAuthMsg(data)
            .then((res) => {
              let data = res.data.data;
              if (res.data.code === 201) {
                this.$message.success(data.message);
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
        } else {
          this.auditView = false;
        }
      },

      // 不予受理
      reject() {
        let status = this.reportCode.status;
        if (status === 'rep_000000201') {
          this.myDialogVisible = true;
        } else {
          this.$message.warning("请选择状态为待受理的记录操作");
        }

      },
      //不予受理信息保存入操作表(2张表都要存)
      unauditSave(v,reportCode) {
        this.$store.dispatch("showLoading");
        let data = this.auditForm;
        data.report_code = this.reportCode.report_code;
        data.auditStatus = v;
        if (v === 1) {//确定
          data.status = 'rep_000000203'; //不予立案
          api.editAuthMsg(data)
            .then((res) => {
              let data = res.data.data;
              if (res.data.code === 201) {
                this.$message.success(data.message);
                this.$store.dispatch("hideLoading");
                this.$router.push({
                  path: "/list"
                });
              } else {
                this.$message.warning(data.message);
                this.$store.dispatch("hideLoading");
              }
            })
            .catch((err) => {
              console.log(err);
              this.$store.dispatch("hideLoading");
            });
        } else {
          this.auditView = false;
        }
      },

      // 转案件
      change() {
        let status = this.reportCode.status;
        if (status === 'rep_000000204') {
          this.changeView = true;
        } else {
          this.$message.warning("请选择状态为立案审核的记录操作");
        }

      },
      // 放入回收站
      del() {
        let status = this.reportCode.status;
        if (status === 'rep_000000204') {
          this.$message.warning("已立案的记录不能进行删除操作");
        } else {
          this.$confirm("确定删除此数据?", "提示", {
              confirmbuttontext: "确定",
              cancelbuttontext: "取消",
              type: "info",
            })
            .then(() => {
              this.$store.dispatch("showLoading");
              let data = [];
              data.report_code = this.reportCode.report_code;
              data.is_reacll = '1';
              api.recycleinfo(data)
                .then((res) => {
                  if (res.data.code == 201) {
                    this.$message({
                      type: "success",
                      message: res.data.data.message,
                    });
                    this.$store.dispatch("hideLoading");
                    this.$router.push({
                      path: "/list"
                    });
                    this.getDataList();
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
        }

      },

      previewCB(file) {
        this.imgList.push(URL.createObjectURL(file.raw))
      },
      handleSuccess(fileData) {
        let data = fileData[0];
        data.path = data.file_path;
        data.size = data.file_size;
        data.report_code = this.$route.query.report_code;
        api
        .addPic(data)
        .then(res => {
          let data = res.data.data;
          if (res.data.code === 201) {
            this.$message.success("操作成功");
            this.$store.dispatch("hideLoading");
          } else {
            this.$message.warning("操作失败");
            this.$store.dispatch("hideLoading");
          }
        })
        .catch(err => {
          console.log(err);
          this.$store.dispatch("hideLoading");
        });
        
        // let path = data.file_path;
        // this.ruleForm.certificate.push(path);
      },
    },
  };

</script>

<style lang="scss" scoped>
  .upload-demo {
    text-align: center;

    .el-button {
      background-color: #1a74ef;
      color: #fff;
      border-color: #1a74ef;

      &:hover {
        opacity: 0.6;
      }
    }

    p {
      font-size: 12px;
      color: #999;
      line-height: 20px;
    }
  }

  .padding-bpttom {
    margin-bottom: 40px;
  }

  /deep/ .el-dialog__header {
    border-bottom: 1px solid rgba(0, 0, 0, 0.09);
  }

  /deep/ .el-input--suffix .el-input__inner {
    height: 32px;
    line-height: 32px;
  }

  /deep/ .el-dialog__footer {
    border-top: 1px solid rgba(0, 0, 0, 0.09);
  }

  .module {
    width: 100%;
    padding-bottom: 5px;
    margin: 18px 0 15px;

    .module-title {
      position: relative;
      min-width: 30px;
      padding: 5px 5px 5px 18px;
      color: #333;
      font-weight: 600;
    }

    .module-title::after {
      content: "";
      position: absolute;
      left: 0;
      top: 2px;
      width: 5px;
      height: 22px;
      background-color: #1a74ef;
    }
  }

  .pager-wrapper {
    margin-top: 25px;
    text-align: right;
  }

  .tb-content {
    width: 100%;
    border: 1px solid #dcdfe6;

    td {
      border: 1px solid #dcdfe6;
      height: 40px;
      width: 25%;
      padding-left: 8px;
    }

    .tb-title {
        background-color:#f5f7fa;
        border-color: #dcdfe6;
    }
  }

  .app-container {
    position: relative;

    .btn-group {
      position: absolute;
      top: 16px;
      right: 20px;
    }
  }

  .message-box {
    position: relative;
    min-height: 100px;
    border: 1px solid #dbdfe6;
    padding: 10px 20px;
    border-radius: 4px;
  }
  .el-upload__tip{
    position: absolute;
    left: 130px;
    top: 3px;

  }
.reqort-code{
  padding: 3px 14px;
  margin-left: 15px;
  height: 26px;
  font-size: 14px;
  font-weight: 400;
  background: #F5F7FA;
  border-radius: 13px;
  border: 1px solid #DCDFE6;
}

</style>
