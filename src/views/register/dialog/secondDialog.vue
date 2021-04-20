<template>
  <el-dialog title="新增企业主体" :visible.sync="dialogVisible" top="50px" width="600px" >
    <main class="form-box">
      <el-form :model="ruleForm"  :rules="rules" ref="ruleForm" label-width="150px" :validate-on-rule-change="false" class="demo-ruleForm">
        <el-form-item label="企业名称：" prop="LEGAL_NAME">
          <el-input v-model="ruleForm.LEGAL_NAME" clearable></el-input>
        </el-form-item>
        <el-form-item label="请选择单位类型" prop="TYPE">
          <el-select v-model="ruleForm.TYPE" placeholder="请选择单位类型" style="width: 100%;" clearable>
            <el-option v-for="(item,index) in Typelist" :key="index" :value="item.CODE" :label="item.NAME"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="统一社会信用代码:" prop="LEGALID_CARD_NUMBER">
          <el-input v-model="ruleForm.LEGALID_CARD_NUMBER" clearable></el-input>
        </el-form-item>
        <el-form-item label="注册地:" prop="PLACE">
          <el-cascader placeholder="请选择注册地" clearable size="medium" style="width:100%" :props="{ checkStrictly: true }" v-model="ruleForm.PLACE" :options="Areaoptions" @change="handleChangeArea">
          </el-cascader>
        </el-form-item>
        <el-form-item label="注册日期:" prop="PLACE_TIME">
          <el-date-picker v-model="ruleForm.PLACE_TIME" value-format="yyyy-MM-dd" type="date" style="width:100%" size="small" placeholder="请选择"></el-date-picker>
        </el-form-item>
        <el-form-item label="注册地址:" prop="PLACE_ADDRESS">
          <el-input v-model="ruleForm.PLACE_ADDRESS" clearable></el-input>
        </el-form-item>
        <el-form-item label="办公地址:" prop="WORK_ADDRESS">
          <el-input v-model="ruleForm.WORK_ADDRESS" clearable></el-input>
        </el-form-item>
        <el-form-item label="法定代表人:" prop="LEGAL_PERSON_NAME">
          <el-input v-model="ruleForm.LEGAL_PERSON_NAME" clearable></el-input>
        </el-form-item>
        <el-form-item label="法定身份证号码:" prop="ID_NUMBER">
          <el-input v-model="ruleForm.ID_NUMBER" clearable></el-input>
        </el-form-item>
        <el-form-item label="法定代表人电话:" prop="PHONE">
          <el-input v-model="ruleForm.PHONE" clearable></el-input>
        </el-form-item>
        <div class="label-style">

          <el-form-item label="法人代表身份证件:（正面）" prop="ID_NUMBER_URL1">
            <el-row class="upload">
              <el-col :span="9" class="imgbox">
                <img :src="ZMURL?ZMURL:frontUrl" width="100" height="65" class="avatar" />
              </el-col>
              <el-col :span="12">
                <MyUpload ref="myUpload" accept='png,jpg,jpeg' sizeLimit='3MB' isPhoto @previewCB='previewCB1' @successCB='handleSuccess1' />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="法人代表身份证件:（背面）" prop="ID_NUMBER_URL2">
            <el-row class="upload">
              <el-col :span="9" class="imgbox">
                <img :src="FMURL?FMURL:frontUrl" width="100" height="65" class="avatar" />
              </el-col>
              <el-col :span="12">
                <MyUpload ref="myUpload" accept='png,jpg,jpeg' sizeLimit='3MB' isPhoto @previewCB='previewCB2' @successCB='handleSuccess2' />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="统一社会信用代码:（扫描/电子版）" prop="CP_ATTACH_URL">
            <el-row class="upload">
              <el-col :span="9" class="imgbox">
                <img :src="ATTACH_URL?ATTACH_URL:frontUrl" width="100" height="65" class="avatar" />
              </el-col>
              <el-col :span="12">
                <MyUpload ref="myUpload" accept='png,jpg,jpeg' sizeLimit='3MB' isPhoto @previewCB='previewCB3' @successCB='handleSuccess3' />
              </el-col>
            </el-row>
          </el-form-item>
        </div>
      </el-form>
    </main>
    <span slot="footer" class="dialog-footer">
      <button class="btn" type="button" @click="submitForm('ruleForm')">保 存</button>
    </span>
  </el-dialog>
</template>  

<script>
const baseApi = process.env.BASE_API;
import * as api from "@/api/backpay"
export default {
  name: '',
  data() {
    return {
      frontUrl: require('@/assets/icons/head-img.png'),
      uploadUrl: baseApi + "/webuser/upload/uploadfile.jsp",
      fileList: [],
      currentPage: 1,
      searchForm: [],
      emergencyCode: [],
      dialogVisible: false,
      ruleForm: {
        CP_ATTACH_URL:[],
        ID_NUMBER_URL1:[],
        ID_NUMBER_URL2:[],
      },
      Areaoptions: [],
      Typelist: [],
      ATTACH_URL: '',
      ZMURL: '',
      FMURL: '',
      rules: {      },
    }
  },
  created() {
    this.actionDictionary();
    this.getFindtreelistvalue();
    this.getRegExp(); // 请求校验规则
  },
  methods: {
    //保存
    addSave() {
      if (!this.ruleForm.ID_NUMBER_URL1) {
        this.$message({
          type: "warning",
          message: '身份证证件正面照片必须点击上传',
        });
        return;
      }
      if (!this.ruleForm.ID_NUMBER_URL2) {
        this.$message({
          type: "warning",
          message: '身份证证件反面照片必须点击上传',
        });
        return;
      }
      if (!this.ruleForm.CP_ATTACH_URL) {
        this.$message({
          type: "warning",
          message: '统一社会信用代码照片必须点击上传',
        });
        return;
      }

      this.$store.dispatch("showLoading");
      let data = this.ruleForm;
      api.actionUserCompany(data)
        .then((res) => {
          this.$store.dispatch("hideLoading");
          let data = res.data.data;
          if (res.data.code == 201) {
            this.$message({
              type: "success",
              message: '提交成功',
            });
            //清空
            this.ruleForm = {};
            this.ATTACH_URL = '';
            this.ZMURL = '';
            this.FMURL = '';
            //隐藏
            this.dialogVisible = false;

          } else {
            this.$message({
              type: "warning",
              message: data.message,
            });
            this.$store.dispatch("hideLoading");
          }
        })
        .catch((err) => {
          console.log(err);
          this.$store.dispatch("hideLoading");
        });
    },



    handleAvatarSuccess(res, file) {
      this.frontUrl = URL.createObjectURL(file.raw);
      // this.formData.id_number_url1 = res.data.path;

    },
    handleChangeArea() {

    },
    //--附件加密上传
    handleSuccess1(res) {
      this.ruleForm.ID_NUMBER_URL1 = res[0].file_path;
      this.$refs.ruleForm.validateField('ID_NUMBER_URL1');
    },
    previewCB1(file) {
      this.ZMURL = URL.createObjectURL(file.raw)
    },
    handleSuccess2(res) {
      this.ruleForm.ID_NUMBER_URL2 = res[0].file_path;
      this.$refs.ruleForm.validateField('ID_NUMBER_URL2');
    },
    previewCB2(file) {
      this.FMURL = URL.createObjectURL(file.raw)
    },
    handleSuccess3(res) {
      this.ruleForm.CP_ATTACH_URL = res[0].file_path;
      this.$refs.ruleForm.validateField('CP_ATTACH_URL');
    },
    previewCB3(file) {
      this.ATTACH_URL = URL.createObjectURL(file.raw)
    },

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addSave();
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    // 查询
    searchinfo(v) {
      this.currentPage = 1;
    },
    // 清除
    clear() {
      this.searchForm = [];
    },
    cellStyle() {
      return 'text-align:center;'
    },
    headerCellStyle() {
      return 'text-align:center;'
    },

    //获取注册地列表
    getFindtreelistvalue() {
      var param = {};
      api.getFindtreelistvalue(param)
        .then((res) => {
          if (res.data.code == 201) {
            this.Areaoptions = res.data.data.data;
          } else {
            this.Areaoptions = [];
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //选择注册地
    handleChangeArea(area) {
      var length = area.length;
      var index = length - 1;
      this.ruleForm.PLACE = area[index];
    },
    //数据字典
    actionDictionary() {
      this.$store.dispatch("showLoading");
      let data = {
        id: this.auth_id,
        auth_remark: this.auth_remark,
      };
      api.actionDictionary(data)
        .then((res) => {
          if (res.data.code == 201) {
            this.auth_status = res.data.data.data.AUTH_STATUS;
            this.id_type_list = res.data.data.data.AUTH_ID_TYPE;
            this.nationType = res.data.data.data.NATION,
              this.areaList = res.data.data.data.NATIONNALITY;
            this.Typelist = res.data.data.data.AUTH_TYPE,
              this.$store.dispatch("hideLoading");
          } else {
            this.$store.dispatch("hideLoading");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getRegExp() {
      this.$axios.get('./static/regExp/secondDialog.json').then( res => {
        let data = res.data;
        this.rules =  {
          LEGAL_NAME: [
            {
              required: data.LEGAL_NAME,
              trigger: "blur",
              message: "请输入公司名称",
            },
            {
              pattern: data.LEGAL_NAME_FLAG,
              trigger: "blur",
              message: data.LEGAL_NAME_FLAG_MSG,
            }
          ],
          TYPE: [
            {
              required: data.TYPE,
              trigger: "change",
              message: "请选择单位类型",
            }
          ],
          LEGALID_CARD_NUMBER: [
            {
              required: data.LEGALID_CARD_NUMBER,
              trigger: "blur",
              message: "请输入统一社会信用代码",
            },
            {
              pattern: data.LEGALID_CARD_NUMBER_FLAG,
              trigger: "blur",
              message: data.LEGALID_CARD_NUMBER_FLAG_MSG,
            }
          ],
          PLACE: [
            {
              required: data.PLACE,
              trigger: "change",
              message: "请选择注册地",
            },
          ],
          PLACE_TIME: [
            {
              required: data.PLACE_TIME,
              trigger: "change",
              message: "注册日期",
            },
          ],
          LEGAL_PERSON_NAME: [
            {
              required: data.LEGAL_PERSON_NAME,
              trigger: "blur",
              message: "请输入法定代表人",
            },
            {
              pattern: data.LEGAL_PERSON_NAME_FLAG,
              trigger: "blur",
              message: data.LEGAL_PERSON_NAME_FLAG_MSG,
            }
          ],
          PLACE_ADDRESS: [
            {
              required: data.PLACE_ADDRESS,
              trigger: "blur",
              message: "请输入注册地址",
            },
            {
              pattern: data.PLACE_ADDRESS_FLAG,
              trigger: "blur",
              message: data.PLACE_ADDRESS_FLAG_MSG,
            }

          ],
          WORK_ADDRESS: [
            {
              required: data.WORK_ADDRESS,
              trigger: "blur",
              message: "请输入办公地址",
            },
            {
              pattern: data.WORK_ADDRESS_FLAG,
              trigger: "blur",
              message: data.WORK_ADDRESS_FLAG_MSG,
            }
          ],
          ID_NUMBER: [
            {
              required: data.ID_NUMBER,
              trigger: "blur",
              message: "请输入证件号码",
            },
            {
              pattern: data.ID_NUMBER_FLAG,
              trigger: "blur",
              message: data.ID_NUMBER_FLAG_MSG,
            }
          ],
          PHONE: [
            {
              required: data.PHONE,
              trigger: "blur",
              message: "请输入手机号",
            },
            {
              pattern: data.PHONE_FLAG,
              trigger: "blur",
              message: data.PHONE_FLAG_MSG,
            }
          ],

          ID_NUMBER_URL1: [
            {
              required: true,
              trigger: "change",
              message: "请上传图片",
            },
          ],

          ID_NUMBER_URL2: [
            {
              required: true,
              trigger: "change",
              message: "请上传图片",
            },
          ],
          CP_ATTACH_URL: [
            {
              required: true,
              trigger: "change",
              message: "请上传图片",
            },
          ],

        };
      })
    },
  },

  computed: {
  },
  mounted() {
  },

}
</script>

<style lang="scss" scoped>
/deep/ .el-dialog__body {
  border-top: 1px solid #d8d8d8;
  border-bottom: 1px solid #d8d8d8;
  padding-right: 90px;
}
/deep/ .el-form-item {
  margin-bottom: 14px !important;
}
.search {
  margin-bottom: 20px;
  .el-input,
  .el-cascader,
  .el-select {
    line-height: 32px;
    width: 160px;
    height: 32px;
    /deep/ .el-input__icon {
      line-height: 32px;
    }
    /deep/ .el-input__inner {
      height: 32px;
    }
  }
}
.label-style {
  /deep/ .el-form-item__label {
    line-height: 20px;
    padding-top: 5px;
    padding-left: 12px;
    text-align: center;
  }
}
.btn-box {
  width: 60px;
  height: 32px;
  margin-top: 30px;
  background: #e6f1fc;
  border-radius: 2px;
  border: 1px solid rgba(29, 103, 187, 0.47);
}
</style>