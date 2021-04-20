<template>
  <div class="reportform app-container">
    <div class="header clearfix">
      <h5 class="fl title">
        <el-button  size="small" @click="$router.go(-1)" class="el-icon-arrow-left">返回</el-button><span
          style="padding-left:20px">{{$route.query.report_code?'编辑':'新增'}}</span>投诉登记<span class="reqort-code" 
          >案件编号：{{$route.query.report_code}}</span> 
      </h5>
    </div>
    <div class="contents" style="position: relative">
      <div class="form-box">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
          <div id="print_box" style="margin-left:30px;">
            <el-form-item label="来源:" prop="sources">
              <el-select v-model="ruleForm.sources" placeholder="请选择" style="width:100%;" clearable>
                <el-option v-for="(item,index) in report_source" :key="index" :label="item.NAME" :value="item.CODE">
                </el-option>
              </el-select>
            </el-form-item>
             <div style="height: 36px; margin:20px 0;">
                <div class="item-title">
                  <p class="mini-title">投诉人情况</p> 
                </div>
              </div>
            <el-row>
              <el-col :span="12">
                <el-form-item prop="informant_name_1" label="姓名:" >
                  <el-input v-model="ruleForm.informant_name_1"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="性别:" prop="informant_sex" >
                  <el-radio-group v-model="ruleForm.informant_sex">
                    <el-radio :label="1">男</el-radio>
                    <el-radio :label="2">女</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop="informant_phone" label="联系电话:">
                  <el-input v-model="ruleForm.informant_phone"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="邮编:" prop="informant_postcode">
                  <el-input v-model="ruleForm.informant_postcode"></el-input>
                </el-form-item>
              </el-col>
              <el-col>

                <el-form-item prop="informant_address" label="地址:">
                  <el-input v-model="ruleForm.informant_address"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="其他联系方式:" prop="informant_other_phone">
                  <el-input v-model="ruleForm.informant_other_phone"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="身份证件种类:" prop="id_type">
                  <el-select v-model="ruleForm.id_type" placeholder="请选择" style="width:100%;" clearable>
                    <el-option v-for="(item,index) in id_type" :key="index" :label="item.NAME" :value="item.CODE">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="证件号码:"  prop="id_number">
                  <el-input v-model="ruleForm.id_number"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <div style="height: 36px;margin:20px 0;">
              <div class="item-title">
                <p class="mini-title">被投诉人情况</p> 
              </div>
            </div>
            <el-row style="margin-left:-41px">
              <el-col :span="12" class="personal-name">
                <el-form-item label="单位名称或个人姓名:" prop="re_informant_name" label-width="160px">
                  <el-input v-model="ruleForm.re_informant_name" style="width:108%"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <div class="search">
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
            <el-form-item label="关联工程项目:" v-show="checkboxItem">
              <el-col :span="20">
                <el-input v-model="ruleForm.project_name" style="width:100%;"></el-input>
              </el-col>
              <el-col :span="4">
                <button class="btn-btn" type="button" @click="chooseItem">选择项目</button>
              </el-col>
            </el-form-item>
            <el-form-item label="统一社会信用代码:" label-width="150px" style="margin-left:-30px">
              <el-input v-model="ruleForm.re_credit_code" disabled style="width:100%;"></el-input>
            </el-form-item>
            <el-form-item prop="re_informant_address" label="地址:" style="margin: 10px 0">
              <el-input v-model="ruleForm.re_informant_address"></el-input>
            </el-form-item>
            <el-row style="line-hieght:50px">
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

              <el-col :span="12">
                <el-form-item label="主要负责人姓名:" prop="re_charge_name" label-width="130px" style="margin-left:-10px">
                  <el-input v-model="ruleForm.re_charge_name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="职务:" prop="re_job">
                  <el-input v-model="ruleForm.re_job"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item prop="region_code" label="所属管辖:">
                  <el-cascader clearable v-model="ruleForm.region_code" :props="{ checkStrictly: true }" :options="gridInfo" style="width:100%;" placeholder="请选择区域"></el-cascader>
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
                    <el-checkbox label="12">其他：<el-input :disabled="ruleForm.violation_type.indexOf('12') == -1" v-model="ruleForm.violation_text"></el-input></el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
              </el-col>
            </el-row>
            <div style="height: 36px;margin:20px 0;">
              <div class="item-title">
                <p class="mini-title">案件投诉信息</p> 
              </div>
            </div>
            <el-form-item class="bg-label" label="投诉内容摘要:" label-width="119px" prop="content" style="margin: 0 0 15px 0px;">
              <div>
                <el-input type="textarea" placeholder="请输入内容" v-model="ruleForm.content">
                </el-input>
              </div>
            </el-form-item>

            <el-form-item class="bg-label" label="投诉请求摘要:" label-width="119px" prop="request_content" style="margin: 0 0 15px 0;">
              <div >
                <el-input type="textarea" placeholder="请输入内容" v-model="ruleForm.request_content">
                </el-input>
              </div>
            </el-form-item>
            <div style="height: 36px;margin:20px 0;">
                <div class="item-title">
                  <p class="mini-title">共同投诉人情况</p> 
                </div>
            </div>
            <el-form-item label="共同投诉人情况:" >
              <div class="fr">

                <i class="iconfont iconshouye"></i>
                <el-button type="text" @click="addDomain" class="add fr"><i class="el-icon-plus"></i> 新增共同投诉人</el-button>
              </div>
            </el-form-item>
            <div v-for="(domain,index) in ruleForm.domains" :key="index" class="add-domain">
              <el-row>
                <p class="delete">
                  <el-button type="text" @click="delIndex(index)"> <i class="iconfont11 icongongzuotai-shanchu"></i> 删除</el-button>
                </p>
                <el-col :span="12">
                  <el-form-item label="姓名:" :prop="`domains.${index}.informant_name2`" :rules="{ required: true, message: '请输入姓名', trigger: 'blur'}">
                    <el-input v-model="domain.informant_name2"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="性别:" :prop="`domains.${index}.sex2`" :rules="{ required: true, message: '请选择性别', trigger: 'blur'}">
                    <el-radio v-model="domain.sex2" label="1">男</el-radio>
                    <el-radio v-model="domain.sex2" label="2">女</el-radio>
                  </el-form-item>
                </el-col>

                <el-col :span="12">
                  <el-form-item label="联系电话:" :prop="`domains.${index}.informant_phone2`" :rules="{ required: true, message: '请输入联系方式', trigger: 'blur'}">
                    <el-input v-model="domain.informant_phone2"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="邮编:" :prop="`domains.${index}.informant_postcode2`">
                    <el-input v-model="domain.informant_postcode2"></el-input>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="地址:" :prop="`domains.${index}.informant_address2`" :rules="{ required: true, message: '请输入地址', trigger: 'blur'}">
                    <el-input v-model="domain.informant_address2"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <!-- :rules="{ required: true, message: '请选择证件种类', trigger: 'blur'    }" -->
                  <el-form-item label="身份证件种类:" :prop="`domains.${index}.id_type2`"  :rules="{ required: true, message: '请输入地址', trigger: 'blur'}">
                    <el-select v-model="domain.id_type2" placeholder="请选择" style="width:100%;" clearable>
                      <el-option v-for="(item,index) in id_type" :key="index" :label="item.NAME" :value="item.CODE">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="证件号码:" :prop="`domains.${index}.id_number2`" :rules="{ required: true, message: '请输入号码', trigger: 'blur'}">
                    <el-input v-model="domain.id_number2"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </div>
          <div style="height: 36px;margin:20px 0;">
              <div class="item-title">
                <p class="mini-title">证据材料上传</p> 
              </div>
            </div>
          <el-form-item label="证据材料上传:" prop="proveUrlList" style="margin: 0 0 15px 30px;">
            <div class="upload">
              <MyUpload
                ref="myUpload"
                accept='png,jpg,jpeg'
                sizeLimit='5MB'
                :isPhoto="true"
                multiple
                :numLimit='10'
                @previewCB='previewCB'
                @successCB='handleSuccess'
              />

              <div class="el-upload__tip">
                <p>*请提供投诉内容相关的材料，比如：身份证、欠条、劳动合同、工资条等信息</p>
                <p>支持png/jpg/jpeg格式，最多10张 单个文件上传大小不能超过3Mb</p>
              </div>
            </div>
            <Myimg v-for="url in ruleForm.certificate" :key="url" :url="url"/>
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
const baseApi = process.env.BASE_API;
import Myimg from '@/components/AESfile/getUrl';
import * as api from "@/api/backpay";
import firstDialog from "./dialog/firstDialog"
import secondDialog from "./dialog/secondDialog"

export default {
  name: "",
  components: {
    firstDialog,
    secondDialog,
    Myimg
  },
  data() {
    return {
      regioncode:'',
      gridInfo:[],
      district_code:[],
      checkboxItem: false,
      showInfo: false,
      id_type:[],
      secondOptions: [
      ],
      value: '',
      uploadUrl: baseApi + "/webuser/upload/uploadfile.jsp",
      searchForm: [],
      show: 3,
      options: [],
      originForm: [],
      originPersonForm: [],
      reortForm: [],
      form: { type: [] },
      radios: true,
      title: "举报",
      title1: "请求",
      complaint: true,
      proveUrlList: [],
      baseApi: baseApi,
      violation_type:[],
      sources:'',
      report_source:[], //案件来源
      ruleForm: {
        violation_type:[],
        request_content:'',
        project_name:"",
        re_job:"",
        re_charge_name:"",
        id_type:"",
        informant_name_1: "",
        informant_sex: "",
        informant_phone: "",
        informant_postcode: "",
        informant_address: "",
        informant_other_phone: "",
        re_informant_name: "",
        re_informant_phone: "",
        re_informant_postcode: "",
        re_informant_other_phone: "",
        re_informant_address: "",
        is_real_name: "",
        region_code: "",
        textarea: "",
        content: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
        certificate: [],
        domains: [],
        violation_text:'',
        sources:'',
      },
      uploadUrl: baseApi + "/webuser/upload/uploadfile.jsp",
      rules: {
        sources: [
          { required: true, message: '请选择来源',  trigger: 'change' },
        ],
        informant_name_1:[
          { required: true, message: '请输入名字',  trigger: 'blur' },
          { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
        ],
        
        violation_type: [
          { required: true, message: '请选择类型', trigger: 'change' },
        ],
        informant_name: [
          { required: true, message: '请输入姓名', trigger: 'change' },
        ],
        informant_sex: [
          { required: true, message: '请选择性别', trigger: 'blur' },
        ],
        informant_phone: [
          { required: true, message: '请输入电话号码', trigger: 'change' },
        ],

        informant_address: [
          { required: true, message: '请输入地址', trigger: 'change' },
        ],
        informant_other_phone: [],
        re_informant_name: [
          { required: true, message: '请输入单位名称或个人姓名', trigger: 'change' },
        ],
        re_informant_phone: [
          { required: true, message: '请输入联系电话', trigger: 'change' },
        ],
        re_informant_postcode: [

        ],

        re_informant_address: [
          { required: true, message: '请输入地址', trigger: 'change' },
        ],

        region_code: [
          { required: true, message: '请选择区域', trigger: 'change' },

        ],

        content: [
          { required: true, message: '请输入内容摘要', trigger: 'change' },
        ],
        request_content: [
          { required: true, message: '请输入请求摘要', trigger: 'change' },
        ],

        delivery: false,
        type: [],

        certificate: [],

        informant_name: [
          { required: true, message: '请输入姓名', trigger: 'change' },
        ],
        informant_name2: [
          { required: true, message: '请输入姓名', trigger: 'change' },
        ]
      },
      radio: '1',
      textarea: "",
      addpersons: {

      },

      // 图片预览
      imgList: [],
    };
  },
  computed: {},
  created() {
    this.getForm();
    this.getpersonForm();
    this.searchList();
    this.regionList();
  },
  mounted() { },
  methods: {
    goDialog() {
      this.$refs.secondVisible.dialogVisible = true;
    },
    chooseItem() {
      this.$refs.firstVisible.dialogVisible = true;
      this.$refs['firstVisible'].init(this.regioncode); 
    },
    // 查询
    searchInfo(v) {
      this.currentPage = 1;
      this.searchComNum();
    },

    projectname(row) {
      this.ruleForm.project_name = row;
    },
    searchList() {
      api
        .getDic()
        .then(res => {
          let data = res.data.data;
          if (res.data.code === 201) {
            this.searchForm = data.data.GUANXIA_LIST;
            this.violation_type = data.data.VIOLATION_TYPE;
            this.id_type = data.data.PROJECT_MONITOR_TYPE;
            this.report_source = data.data.REPORT_SOURCE;
            // this.report_source = data.data.REPORT_SOURCE_IN;
            this.$store.dispatch("hideLoading");
          } else {
            this.dataForm = [];
            this.$store.dispatch("hideLoading");
          }
        })
        .catch(err => {
          console.log(err);
          this.$store.dispatch("hideLoading");
        });
    },
    handleChange(value) {
      console.log(value);
    },
    delIndex(index) {
      console.log(index)
      this.ruleForm.domains.splice(index, 1);
    },
    successHandler(response, file) {
      let path = response.data;
      console.log(path);
      var _this=this;
      _this.ruleForm.certificate.push(path[0].path);
      // this.proveUrl = URL.createObjectURL(file.raw);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
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
    //修改时，数据回显
    getForm() {
      this.reortForm.report_code = this.$route.query.report_code;
      //保存信息
      let data = this.reortForm;
      api.reportinfo(data)
        .then((res) => {
          if (res.data.code == 201) {
            this.originForm = res.data.data.data;
            if(this.originForm.REPORT_TYPE=="1"){
              this.originForm.REPORT_TYPE==1;
            }else if(this.originForm.REPORT_TYPE=="2"){
              this.originForm.REPORT_TYPE==2;
            }
            this.ruleForm.region_code = this.originForm.REGION_CODE;
            this.ruleForm.report_type = this.originForm.REPORT_TYPE;
            this.ruleForm.informant_name_1 = this.originForm.INFORMANT_NAME;
            this.ruleForm.informant_sex = parseInt(this.originForm.INFORMANT_SEX);
            this.ruleForm.informant_phone = this.originForm.INFORMANT_PHONE;
            this.ruleForm.informant_postcode = this.originForm.INFORMANT_POSTCODE;
            this.ruleForm.informant_address = this.originForm.INFORMANT_ADDRESS;
            this.ruleForm.informant_other_phone = this.originForm.INFORMANT_OTHER_PHONE;
            this.ruleForm.re_informant_name = this.originForm.RE_INFORMANT_NAME;
            this.ruleForm.re_informant_phone = this.originForm.RE_INFORMANT_PHONE;
            this.ruleForm.re_informant_postcode = this.originForm.RE_INFORMANT_POSTCODE;
            this.ruleForm.re_informant_other_phone = this.originForm.RE_INFORMANT_OTHER_PHONE;
            this.ruleForm.re_informant_address = this.originForm.RE_INFORMANT_ADDRESS;
            this.ruleForm.violation_text = this.originForm.VIOLATION_TEXT;
            this.ruleForm.area = this.originForm.AREA;
            this.ruleForm.region_code = this.originForm.REGION_CODE;//所属管辖
            this.ruleForm.textarea = this.originForm.TEXTAREA;
            this.ruleForm.content = this.originForm.CONTENT;
            this.ruleForm.request_content = this.originForm.REQUEST_CONTENT;
            // if(this.originForm.CERTIFICATE.length > 0) {
            //     for(let i = 0;i < this.originForm.CERTIFICATE.length;i++) {
            //       this.proveUrlList.push({url: baseApi + this.originForm.CERTIFICATE[i]})
            //     }
            //   }
            if (this.originForm.CERTIFICATE.length > 0) {
                for (let i = 0; i < this.originForm.CERTIFICATE.length; i++) {
                  this.ruleForm.certificate.push(this.originForm.CERTIFICATE[i]);
                }
              }
            this.ruleForm.violation_type = this.originForm.VIOLATION_TYPE;
            if(this.ruleForm.violation_text){
              this.ruleForm.violation_text = this.originForm.VIOLATION_TEXT;
            }
            this.ruleForm.sources = this.originForm.SOURCES; //来源
            this.ruleForm.re_charge_name = this.originForm.RE_CHARGE_NAME;//负责人姓名
            this.ruleForm.re_job = this.originForm.RE_JOB;//职务
            this.ruleForm.id_type = this.originForm.ID_TYPE;//证件类型
            this.ruleForm.id_number = this.originForm.ID_NUMBER;//证件号码
            if(this.originForm.PROJECT_NAME){
              this.checkboxItem = true;
              this.ruleForm.project_name = this.originForm.PROJECT_NAME;
            }
            this.ruleForm.re_credit_code = this.originForm.RE_CREDIT_CODE;//统一社会信用代码
            // if(this.originForm.CERTIFICATE){
            //     this.proveUrlList = this.originForm.CERTIFICATE;
            // }

          }
        })
        .catch((err) => {
          this.$store.dispatch("hideLoading");
          console.log(err);
        });

    },
    //修改时，数据回显(共同举报人)
    getpersonForm() {
      //获取信息
      this.reortForm.report_code = this.$route.query.report_code;
      //保存信息
      let data = this.reortForm;
      api.reportpersoninfo(data)
        .then((res) => {
          if (res.data.code == 201) {
            let data = res.data.data.data;
              if(data.length > 0) {
                data.map((item,i)=>{
                  const info = {
                    informant_name2: item.INFORMANT_NAME,
                    sex2: item.INFORMANT_SEX,
                    informant_phone2: item.INFORMANT_PHONE,
                    informant_postcode2: item.INFORMANT_POSTCODE,
                    informant_address2: item.INFORMANT_ADDRESS,
                    id_type2: item.ID_TYPE,
                    id_number2: item.ID_NUMBER
                  }
                  this.ruleForm.domains.push(info);
                })
              }
          }
        })
        .catch((err) => {
          this.$store.dispatch("hideLoading");
          console.log(err);
        });

    },
    //数据提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        this.ruleForm.report_type = '3';
        if (valid) {
          this.$store.dispatch("showLoading");
          //保存信息
          let data = this.ruleForm;

          api.getonenaturalperson(data)
            .then((res) => {
              if (res.data.code == 201) {
                let data = res.data.data;
                this.$message({
                  type: "success",
                  message: "操作成功",
                });
                // this.getrouteinfo();
                this.ruleForm = [];
                this.$store.dispatch("hideLoading");
                this.$router.push({ path: "/query/index" });
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
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    addDomain() {
      this.ruleForm.domains.push({

      });
    },
    successHandler(response, file) {
      let path = response.data;
      console.log(path);
      this.ruleForm.certificate.push(path[0].path);
    },
    changeHandler(value) {
      // console.log("改变之后的值是:" + value);

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
            this.$store.dispatch("hideLoading");
          } else {
            this.ruleForm.re_credit_code = '';
            this.showInfo = true;
            this.$store.dispatch("hideLoading");
          }
        })
        .catch((err) => {
          this.$store.dispatch("hideLoading");
          console.log(err);
        });
    },

    // 获取管辖
        getgridlist() {
           this.$axios
              .get(baseApi+`/ycuploads/grid/${this.regioncode}/GRID.json`)
              .then((response) => {
                 this.gridInfo = response.data;
              })
              .catch(function (error) {
                  console.log(error);
              });
        },

   

    previewCB(file) {
      this.imgList.push(URL.createObjectURL(file.raw))
    },
    handleSuccess(data) {
      let path = data[0].file_path;
      this.ruleForm.certificate.push(path);
    },
  },
};
</script>

<style lang="scss" scoped>
.app-container{
  margin-bottom:90px;
}
.reportform {
  overflow: hidden;
}
.delete {
  text-align: right;
  .el-button {
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
  .hint {
    font-size: 12px;
    font-family: MicrosoftYaHei;
    color: #909399;
  }
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
  .search {
    display: inline-block;
    line-height: 18px;
    width: 80px;
    margin: 4px 40px;
  }
  .checkbox-chooes {
    display: inline-block;
  }
  .btn-btn {
    float: right;
    margin-top: 4px;
    width: 88px;
    height: 32px;
    line-height: 32px;
    background: #e6f1fc;
    color: #1a74ef;
    border-radius: 2px;
    border: 1px solid rgba(29, 103, 187, 0.47);
    cursor: pointer;
  }
  .hint {
    font-size: 12px;
    font-family: MicrosoftYaHei;
    color: #909399;
  }
  .upload {
    // padding-left: 60px;
    // margin-top: 10px;
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


.previewImg{
  width: 100px;
  height: 100px;
  margin-right: 10px;
  margin-bottom: 10px;
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
.item-title{
   position: absolute;
   left: 20px;
   width: calc(100% - 40px);
  border-bottom: 2px solid #1a74ef;
  .mini-title{
    position: relative;
    display: inline-block;
    padding: 5px 20px;
    font-size: 14px;
    background:  #1a74ef;
    color: #fff;
    border-top-left-radius: 5px;
    &::after{
      content: '';
      position: absolute;
      bottom: 0;
      right: -40px;
      border-width: 0px 40px 29px 0px;
      border-style: solid;
      border-color: transparent transparent #1A74EF transparent;

    }
  }
}
.operation-warper{
  width: 100%;
  min-height: 40px;
  .footer-btn{
    position: fixed;
    bottom: 8px;
    right: 20px;
  }
}

</style>
