<template>
  <div class="reportform app-container">
    <div class="header clearfix">
      <h5 class="fl title">
        <span style="padding-left:20px">举报登记</span>
      </h5>
    </div>
    <div class="contents" style="position: relative">
      <div class="form-box">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
          <div id="print_box" style="margin-left:30px;">
            <p style="text-align:center;padding:10px ">
              <el-radio-group v-model="ruleForm.report_type" @change="changeHandler">
                <el-radio :label="1">实名举报</el-radio>
                <el-radio :label="2">匿名举报</el-radio>
              </el-radio-group>
              <span class="hint">*选择匿名投诉时，在案件调查过程中将对您的个人信息进行保密</span>
            </p>

            <el-form-item label="来源:" prop="sources">
              <el-select v-model="ruleForm.sources" placeholder="请选择" style="width:100%;" clearable>
                <el-option v-for="(item,index) in report_source" :key="index" :label="item.NAME" :value="item.CODE">
                </el-option>
              </el-select>
            </el-form-item>

            <div style="height: 36px; margin:20px 0;">
              <div class="item-title">
                <p class="mini-title">举报人情况</p>
              </div>
            </div>

            <el-row>
              <el-col :span="12">
                <el-form-item label="姓名:" :rules="[{ required: elect, message: '请输入名字',  trigger: 'blur' },{ min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' } ]" prop="informant_name_1">
                  <el-input v-model="ruleForm.informant_name_1"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item :rules="[{ required: elect, message:'请选择性别',  trigger: 'blur' }, ]" label="性别:" prop="informant_sex">
                  <el-radio-group v-model="ruleForm.informant_sex">
                    <el-radio :label="1">男</el-radio>
                    <el-radio :label="2">女</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="联系电话:" prop="informant_phone">
                  <el-input v-model="ruleForm.informant_phone"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="邮编:" prop="informant_postcode">
                  <el-input v-model="ruleForm.informant_postcode"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col>
                <el-form-item :rules="[{ required: elect, message: '请输入地址', trigger: 'blur' }, ]" label="地址:" prop="informant_address">
                  <el-input v-model="ruleForm.informant_address"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="其他联系方式:" prop="informant_other_phone">
                  <el-input v-model="ruleForm.informant_other_phone"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <div style="height: 36px;margin:20px 0;">
              <div class="item-title">
                <p class="mini-title">被举报人情况</p>
              </div>
            </div>
            <el-row>
              <el-col :span="12" class="personal-name">
                <el-form-item label="单位名称或个人姓名:" label-width="160px" prop="re_informant_name" style="margin-left:-40px">
                  <el-input v-model="ruleForm.re_informant_name" style="width:100%"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <div class="search-btn">
                  <custom-button :btnMsg="btn.search" @click="searchInfo"></custom-button>
                </div>
                <span v-if="showInfo" class="info-dialog el-icon-info">企业主体库中不存在，是否<span class="info" @click="goDialog">新增企业主体</span></span>
              </el-col>
            </el-row>
            <el-form-item label="">
              <div class="checkbox-chooes">
                <el-checkbox v-model="checkboxItem">是否关联工程建设项目</el-checkbox>
              </div>
            </el-form-item>
            <el-form-item label="关联工程项目:" prop="project_name" v-show="checkboxItem">
              <el-col :span="20">
                <el-input v-model="ruleForm.project_name" style="width:100%;"></el-input>
              </el-col>
              <el-col :span="4">
                <el-button class="btn-btn" size="small" type="button" @click="chooseItem">选择项目</el-button>
              </el-col>
            </el-form-item>

            <el-form-item label="统一社会信用代码:" prop="re_credit_code" label-width="150px" style="margin:0 0 10px -30px">
              <el-input v-model="ruleForm.re_credit_code" disabled style="width:100%;"></el-input>
            </el-form-item>

            <el-row>
              <el-col :span="12">
                <el-form-item label="联系电话:" prop="re_informant_phone">
                  <el-input v-model="ruleForm.re_informant_phone"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="邮编:" prop="re_informant_postcode">
                  <el-input v-model="ruleForm.re_informant_postcode"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col>
                <el-form-item label="地址:" prop="re_informant_address">
                  <el-input v-model="ruleForm.re_informant_address"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="所属管辖:" prop="region_code">
                  <el-cascader v-model="ruleForm.region_code" :options="gridInfo" :props="{ checkStrictly: true }" style="width:100%;" placeholder="请选择区域" clearable></el-cascader>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="其他联系方式:" prop="re_informant_other_phone">
                  <el-input v-model="ruleForm.re_informant_other_phone"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col>
                <el-form-item>
                  <p>举报人认为被举报人在哪些方面存在违反劳动保障法律、法规或者规章的行为: (打√)</p>
                  <el-checkbox-group v-model="ruleForm.violation_type">
                    <el-checkbox label="rep_000000301">用人单位制定内部劳动保障规章制度情况</el-checkbox>
                    <el-checkbox label="rep_000000302">用人单位遵守禁止使用童工规定情况 </el-checkbox>
                    <el-checkbox label="rep_000000303">用人单位与劳动者订立或者解除劳动合同情况</el-checkbox>
                    <el-checkbox label="rep_000000304">用人单位遵守女职工和未成年工特殊劳动保障规定的情况 </el-checkbox>
                    <el-checkbox label="rep_000000305">用人单位遵守工作时间和休息休假规定情况 </el-checkbox>
                    <el-checkbox label="rep_000000306">用人单位支付劳动者工资和执行最低工资标准情况</el-checkbox>
                    <el-checkbox label="rep_000000307">用人单位参加社会保险和缴纳社会保险费情况</el-checkbox>
                    <el-checkbox label="rep_000000308">职业介绍机构、职业技能培训机构和职业技能考核 </el-checkbox>
                    <el-checkbox label="rep_000000309">鉴定机构遵守国家有关职业介绍、职业技能培训和职业技能考核鉴定的规定情况</el-checkbox>
                    <el-checkbox label="rep_000000310">用人单位、用工单位遵守劳务派遣规定情况</el-checkbox>
                    <el-checkbox label="rep_000000311">最低工资标准情况、相关单位遵守保障农民工工资支付规定情况</el-checkbox>
                    <el-checkbox label="12">其他：<el-input :disabled="ruleForm.violation_type.indexOf('12') == -1" v-model="ruleForm.violation_text"></el-input>
                    </el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
              </el-col>
            </el-row>
            <div style="height: 36px;margin:20px 0;">
              <div class="item-title">
                <p class="mini-title">案件举报信息</p>
              </div>
            </div>
            <el-form-item :label="`举报内容摘要:`" class="bg-label" style="margin: 0 0 15px 0px;" prop="content">
              <div>
                <el-input type="textarea" placeholder="请输入内容" v-model="ruleForm.content">
                </el-input>
              </div>
            </el-form-item>

            <el-form-item label="举报请求摘要:" class="bg-label" prop="request_content" style="margin: 0 0 15px 0px;">
              <div>
                <el-input type="textarea" placeholder="请输入内容" v-model="ruleForm.request_content">
                </el-input>
              </div>
            </el-form-item>
            <div v-if="elect">
              <div style="height: 36px;margin:20px 0;">
                <div class="item-title">
                  <p class="mini-title">共同举报人情况</p>
                </div>
              </div>
              <el-form-item label="共同举报人情况:">
                <div class="fr">
                  <i class="iconfont iconshouye"></i>
                  <el-button type="text" @click="addDomain" class="add fr"><i class="el-icon-plus"></i> 新增共同举报人
                  </el-button>
                </div>
              </el-form-item>

              <div v-for="(domain,index) in ruleForm.domains" :key="domain.key" class="add-domain">
                <el-form-item>
                  <p class="delete">
                    <el-button type="text" @click="delIndex(index)"> <i class="iconfont11 icongongzuotai-shanchu"></i>
                      删除</el-button>
                  </p>
                </el-form-item>

                <el-row>
                  <el-col :span="12">
                    <el-form-item label="姓名:" :prop="'domains.' + index + '.informant_name2'" :rules="[{ required: true, message: '请输入姓名', trigger: 'blur'    },{ min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }]">
                      <el-input v-model="domain.informant_name2"></el-input>
                    </el-form-item>
                  </el-col>

                  <el-col :span="12">
                    <el-form-item label="性别:" :prop="'domains.' + index + '.sex2'" :rules="{ required: true, message: '请选择性别', trigger: 'blur'    }">
                      <el-radio v-model="domain.sex2" label="1">男</el-radio>
                      <el-radio v-model="domain.sex2" label="2">女</el-radio>
                    </el-form-item>
                  </el-col>

                  <el-col :span="12">
                    <el-form-item label="联系电话:" :prop="'domains.' + index + '.informant_phone2'" :rules="[{ required: true, message: '请输入联系电话', trigger: 'blur'    },{  pattern: /^[1]([3-9])[0-9]{9}$/, message: '请输入正确的手机号', trigger: 'blur'}]">
                      <el-input v-model="domain.informant_phone2"></el-input>
                    </el-form-item>
                  </el-col>

                  <el-col :span="12">
                    <el-form-item label="邮编:" :prop="'domains.' + index + '.informant_postcode2'">
                      <el-input v-model="domain.informant_postcode2"></el-input>
                    </el-form-item>
                  </el-col>

                  <el-col>
                    <el-form-item label="地址:" :prop="'domains.' + index + '.informant_address2'" :rules="{ required: true, message: '请输入地址', trigger: 'blur'    }">
                      <el-input v-model="domain.informant_address2"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
            </div>
          </div>
          <div style="height: 36px;margin:20px 0;">
            <div class="item-title">
              <p class="mini-title">证据材料上传</p>
            </div>
          </div>
          <el-form-item label="证据材料上传:" prop="certificate" style="margin:20px 0 0 30px">
            <div class="upload">
              <MyUpload ref="myUpload" accept='png,jpg,jpeg' sizeLimit='50MB' :isPhoto="true" multiple :numLimit='10' @successCB='handleSuccess' />

              <div class="el-upload__tip">
                <p>*请提供投诉内容相关的材料，比如：身份证、欠条、劳动合同、工资条等信息</p>
                <p>支持png/jpg/jpeg格式，最多10张 单个文件上传大小不能超过3Mb</p>
              </div>
            </div>
            <Myimg v-for="url in ruleForm.certificate" :key="url" :url="url" />
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="operation-warper">
      <div class="footer-btn fr">
        <el-button v-print="'#print_box'">打印</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
      </div>
    </div>
    <!-- 选择项目弹窗 -->
    <first-dialog ref="firstVisible" @projectname="projectname"></first-dialog>
    <!-- 新增监管对象弹窗  -->
    <second-dialog ref="secondVisible"></second-dialog>
  </div>
</template>

<script>
// import { getonenaturalperson } from "@/api/reportform";
import * as api from "@/api/backpay"
import Myimg from '@/components/AESfile/getUrl';
import firstDialog from "./dialog/firstDialog"
import secondDialog from "./dialog/secondDialog"
const baseApi = process.env.BASE_API;
export default {
  name: "",
  components: {
    firstDialog,
    secondDialog,
    Myimg
  },
  data() {
    return {
      regioncode: '',
      gridInfo: [], // 管辖
      district_code: [],
      report_source: [], // 来源
      showInfo: false, // 新增企业主体
      checkboxItem: false,
      searchForm: [], // 
      baseApi: baseApi,
      ruleForm: {
        region_code: "",
        report_source: '',
        project_name: "",
        informant_name_1: "",
        informant_sex: '',
        informant_phone: "",
        informant_postcode: "",
        informant_address: "",
        informant_other_phone: "",
        re_informant_name: "",
        re_informant_phone: "",
        re_informant_postcode: "",
        re_informant_other_phone: "",
        re_informant_address: "",
        report_type: 1,
        request_content: '',
        area: "",
        sources: "",
        re_credit_code: "",
        textarea: "",
        content: "",
        type: [],
        certificate: [],
        domains: [],
        violation_type: [], //复选框
        violation_text: '',//复选框自定义内容
      },
      elect: true, // 判断实名还是匿名举报 true为实名 false为匿名
      rules: {
        sources: [{
          required: true,
          message: '请选择举报来源',
          trigger: 'blur'
        },],
        informant_phone: [{
          required: true,
          message: '请输入电话号码',
          trigger: 'blur'
        }, {
          pattern: /^[1]([3-9])[0-9]{9}$/,
          message: '请输入正确的手机号',
          trigger: "blur",
        },],
        informant_postcode: [],
        informant_other_phone: [],
        re_informant_name: [{
          required: true,
          message: '单位名称或个人姓名',
          trigger: 'blur'
        },],
        re_informant_phone: [{
          required: true,
          message: '请输入联系电话',
          trigger: 'blur'
        }, {
          pattern: /^[1]([3-9])[0-9]{9}$/,
          message: '请输入正确的手机号',
          trigger: "blur",
        },],
        re_informant_postcode: [

        ],
        re_informant_other_phone: [

        ],
        re_informant_address: [{
          required: true,
          message: '请输入地址',
          trigger: 'blur'
        },],

        region_code: [{
          required: true,
          message: '请选择区域',
          trigger: 'blur'
        },

        ],
        textarea: [{
          required: true,
          message: '请输入活动名称',
          trigger: 'blur'
        },],
        content: [{
          required: true,
          message: '请输入投诉举报内容',
          trigger: 'blur'
        },],
        certificate: [],
        request_content: [{
          required: true,
          message: '请输入请求摘要',
          trigger: 'blur'
        },],
        informant_name: [{
          required: true,
          message: '请输入单位名称或个人姓名',
          trigger: 'blur'
        }, {
          min: 2,
          max: 5,
          message: '长度在 2 到 5 个字符',
          trigger: 'blur'
        }],

        informant_address: [{
          required: true,
          message: '请输入地址',
          trigger: 'blur'
        },]
      },

    };
  },
  computed: {},
  watch: {},
  created() {
    this.ruleForm.report_type = 1;
    this.searchList(); // 来源列表
    this.regionList(); // 获取管辖
  },
  methods: {
    // 打开企业主体 弹窗
    goDialog() {
      this.$refs.secondVisible.dialogVisible = true;
    },
    // 打开选择项目弹窗
    chooseItem() {
      this.$refs.firstVisible.dialogVisible = true;
      this.$refs['firstVisible'].init(this.regioncode);
    },
    projectname(row) {
      this.ruleForm.project_name = row;
    },
    // 查询
    searchInfo(v) {
      this.currentPage = 1;
      this.searchComNum();
    },

    // 获取来源列表
    searchList() {
      api
        .getDic()
        .then(res => {
          let data = res.data.data;
          console.log(data);
          if (res.data.code === 201) {
            this.searchForm = data.data.GUANXIA_LIST;
            this.report_source = data.data.REPORT_SOURCE_IN;
          } else {
            this.dataForm = [];
          }
          this.$store.dispatch("hideLoading");
        })
        .catch(err => {
          console.log(err);
          this.$store.dispatch("hideLoading");
        });
    },

    // 获取管辖
    getgridlist() {
      this.$axios
        .get(baseApi + `/ycuploads/grid/${this.regioncode}/GRID.json`)
        .then((response) => {
          this.gridInfo = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },


    //查询单位统一信用代码
    searchComNum() {
      this.$store.dispatch("showLoading");
      //获取信息
      let data = [];
      data.company_name = this.ruleForm.re_informant_name;
      api.getComnum(data)
        .then((res) => {
          let data = res.data.data;
          if (res.data.code == 201) {
            this.ruleForm.re_credit_code = data.data.LEGALID_CARD_NUMBER;
          } else {
            this.ruleForm.re_credit_code = '';
            this.showInfo = true;
          }
          this.$store.dispatch("hideLoading");
        })
        .catch((err) => {
          this.$store.dispatch("hideLoading");
          console.log(err);
        });
    },

    //数据提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$store.dispatch("showLoading");
          //保存信息
          let data = this.ruleForm;
          api.getonenaturalperson(data)
            .then((res) => {
              console.log(res);
              if (res.data.code == 201) {
                let data = res.data.data;
                this.$message({
                  type: "success",
                  message: "操作成功",
                });
                //this.getrouteinfo();
                this.ruleForm = [];
                this.$router.push({
                  path: "/query/index"
                });
              } else {
                this.$message({
                  type: "error",
                  message: "操作失败",
                });
              }
              this.$store.dispatch("hideLoading");
            })
            .catch((err) => {
              this.$store.dispatch("hideLoading");
              console.log(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.checkboxItem = true;
    },
    //共同举报人
    addDomain() {
      this.ruleForm.domains.push({
        informant_name2: "", //姓名
        informant_phone2: "", //电话
        informant_postcode2: "", //邮编
        sex2: "",
        informant_address2: "",
      });
    },
    // 删除共同举报人
    delIndex(index) {
      this.ruleForm.domains.splice(index, 1);
    },

    // 切换实名匿名
    changeHandler(value) {
      // console.log(value)
      if (value == 1) {
        this.elect = true;
        // this.ruleForm= { report_type: 1, informant_sex: '' }
      } else {
        this.elect = false;
        // this.ruleForm= { report_type: 2, informant_sex: '' }
      }
      this.ruleForm.checkList = []
      this.ruleForm.otherValue = ''
      this.checkboxItem = false;
      this.$refs.ruleForm.resetFields();
      // this.$refs.upload.clearFiles();
    },

    // 获取管辖
    regionList() {
      api
        .getRegion()
        .then((res) => {
          let data = res.data.data;
          if (res.data.code == 201) {
            this.district_code = data.data.guanxia_list;
            this.regioncode = data.regioncode;
            this.getgridlist();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 文件上传
    handleSuccess(data) {
      let path = data[0].file_path
      this.ruleForm.certificate.push(path);
    },
  },
};

</script>

<style lang="scss" scoped>
.app-container {
  margin-bottom: 90px;
}

.reportform {
  overflow: hidden;
}

.delete {
  .el-button {
    float: right;
    // margin-right: 70px;
    color: #1a74ef;
  }
}

.add-domain {
  margin-top: 10px;
  padding: 15px;
  background: #f5f7fa;
}

.add {
  color: #1a74ef;

  &:hover {
    opacity: 0.3;
  }
}

.btns {
  text-align: center;

  .active {
    background-color: #1a74ef;
    color: #fff;
  }
}

.ensure {
  display: inline-block;
  margin: 20px 300px 60px;
  text-align: center;

  .el-checkbox {
    display: block;
    margin-bottom: 20px;
  }

  .el-button {
    width: 112px;
  }
}

.form-box {
  width: 800px;
  margin: 0 auto;

  .info-dialog {
    font-size: 12px;
    font-family: MicrosoftYaHei;
    color: #c0c4cc;

    .info {
      color: #1a74ef;
      cursor: pointer;

      &:hover {
        opacity: 0.3;
      }
    }
  }

  .search-btn {
    display: inline-block !important;
    line-height: 18px;
    width: 80px;
    margin: 4px 10px;
  }

  .checkbox-chooes {
    display: inline-block;
  }

  .btn-btn {
    float: right;
    margin-top: 4px;
    text-align: center;
    background: #e6f1fc;
    color: #1a74ef;
    border: 1px solid rgba(29, 103, 187, 0.47);
  }

  .hint {
    font-size: 12px;
    font-family: MicrosoftYaHei;
    color: #909399;
  }

  .upload {
    // margin: 10px 0 0 0px;

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
      line-height: 20px;
    }
  }

  /deep/ .el-upload-list--picture .el-upload-list__item {
    width: 130px;
    float: left;
    margin-right: 10px;
  }
}

.footer-btn {
  margin-top: 10px;
  margin-right: 30px;

  .el-button {
    &:last-child {
      background-color: #1a74ef;
      border: none;
      color: #fff;

      &:hover {
        opacity: 0.6;
      }
    }
  }
}

>>> .el-input__inner {
  height: 32px;
}

.el-checkbox {
  display: block;
}

/deep/ .el-checkbox__label {
  line-height: 22px;
}

/deep/ .el-form-item {
  margin-bottom: 0px;
}

.el-col {
  margin-bottom: 10px;
}

/deep/ .el-form-item__error {
  padding: 0;
  line-height: 1;
}

.previewImg {
  width: 100px;
  height: 100px;
  margin-right: 10px;
  margin-bottom: 10px;
}
.reqort-code {
  padding: 3px 14px;
  margin-left: 15px;
  height: 26px;
  font-size: 14px;
  font-weight: 400;
  background: #f5f7fa;
  border-radius: 13px;
  border: 1px solid #dcdfe6;
}
.item-title {
  position: absolute;
  left: 20px;
  width: calc(100% - 40px);
  border-bottom: 2px solid #1a74ef;
  .mini-title {
    position: relative;
    display: inline-block;
    padding: 5px 20px;
    font-size: 14px;
    background: #1a74ef;
    color: #fff;
    border-top-left-radius: 5px;
    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      right: -40px;
      border-width: 0px 40px 29px 0px;
      border-style: solid;
      border-color: transparent transparent #1a74ef transparent;
    }
  }
}
.operation-warper {
  width: 100%;
  min-height: 40px;
  .footer-btn {
    position: fixed;
    bottom: 8px;
    right: 20px;
  }
}
</style>
