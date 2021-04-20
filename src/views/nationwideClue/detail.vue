<template>
  <div class="app-container">
    <div class="header clearfix">
      <h5 class="fl title">
        <el-button size="small" class="el-icon-arrow-left" @click="$router.go(-1)">返回</el-button>
        <span style="padding-left:20px"></span>
        详细信息
        <!-- <span v-if="$route.query.report_code" style="padding-left:20px">案件编号：{{$route.query.report_code}}</span> -->
      </h5>
    </div>
    <div class="contents">
      <div class="remarks">
        <h4><span>基本信息</span></h4>
      </div>

      <table class="tb-content">
        <tr>
          <td class="tb-title">线索编号</td>
          <td>{{dataForm.CLUE_CODE}}</td>
          <td class="tb-title">线索来源</td>
          <td>{{dataForm.CLUE_SOURCE}}</td>
        </tr>
        <tr>
          <td class="tb-title">线索登记时间</td>
          <td>{{dataForm.REGISTER_TIMES}}</td>
          <td class="tb-title">反映人姓名</td>
          <td>{{dataForm.REFLECT_PERSON_NAME}}</td>
        </tr>
        <tr>
          <td class="tb-title">反映人电话</td>
          <td>{{dataForm.REFLECT_PERSON_PHONE}}</td>
          <td class="tb-title">反映人身份证号码</td>
          <td>{{dataForm.REFLECT_PERSON_CARD}}</td>
        </tr>
        <tr>
          <td class="tb-title">行业领域</td>
          <td>{{dataForm.INDUSTRY_FIELD}}</td>
          <td class="tb-title" v-if="$route.query.type == 1">拖欠工资项目名称</td>
          <td v-if="$route.query.type == 1">{{dataForm.BACKPAY_PROJECT}}</td>
          <td class="tb-title" v-if="$route.query.type == 2">拖欠工资单位</td>
          <td v-if="$route.query.type == 2">{{dataForm.BE_REPORTED_COMPANY}}</td>
        </tr>
        <tr>
          <td class="tb-title">是否签订劳动合同</td>
          <td>{{dataForm.IS_CONTRACT}}</td>
          <td class="tb-title">劳动合同用人单位名称</td>
          <td>{{dataForm.CONTRACT_CPMPANY_NAME}}</td>
        </tr>
        <tr>
          <td class="tb-title">所属管辖</td>
          <td>{{dataForm.REGION_CODE_TEXT}}</td>
          <td class="tb-title">详细地址</td>
          <td>{{dataForm.DETAIL_ADDRESS}}</td>
        </tr>
        <tr v-if="$route.query.type == 1">
          <td class="tb-title" >建设单位名称</td>
          <td>{{dataForm.BUILD_COMPANY}}</td>
          <td class="tb-title">总承包单位名称</td>
          <td>{{dataForm.GENERAL_CONTRACTOR}}</td>
        </tr>
        <tr v-if="$route.query.type == 1">
          <td class="tb-title">分包单位名称</td>
          <td>{{dataForm.SUB_CONTRACTOR}}</td>
          <td class="tb-title">是否政府投资项目</td>
          <td>{{dataForm.IS_GOV_INVEST}}</td>
        </tr>
        <tr>
          <td class="tb-title">欠薪人数（人）</td>
          <td>{{dataForm.BACK_PAY_PERSON}}</td>
          <td class="tb-title">欠薪金额（元）</td>
          <td>{{dataForm.BACK_PAY_MONEY}}</td>
        </tr>
        <tr>
          <td class="tb-title">欠薪发生时间</td>
          <td colspan="3">{{dataForm.BACK_PAY_TIMES}}</td>
        </tr>
      </table>

      <table class="tb-content m-t-20">
        <tr>
          <td style="height:0;border:0"></td>
          <td style="height:0;border:0"></td>
          <td style="height:0;border:0"></td>
          <td style="height:0;border:0"></td>
        </tr>
        <tr>
          <td class="tb-title">欠薪基本情况摘要</td>
          <td colspan="3">{{dataForm.BACK_PAY_REMARK}}</td>
        </tr>
        <tr>
          <td class="tb-title">是否曾经通过以下途径反映上述问题</td>
          <td colspan="3">{{dataForm.ONCE_REPORT}}</td>
        </tr>
        <tr>
          <td class="tb-title">对曾经反映情况进行详细说明</td>
          <td colspan="3">{{dataForm.ONCE_DETAIL_REMARK}}</td>
        </tr>
        <tr>
          <td class="tb-title">反馈行业领域</td>
          <td colspan="3">{{dataForm.FEEDBACK_INDUSTRY_AREA}}</td>
        </tr>
        <tr>
          <td class="tb-title">基本案情</td>
          <td colspan="3">{{dataForm.BASIC_FACTS}}</td>
        </tr>
        <tr>
          <td class="tb-title">核处结论</td>
          <td colspan="3">{{dataForm.CONCLUSION}}</td>
        </tr>
      </table>
      <!-- 工程领域 -->
      <table class="tb-content m-t-20" v-if="$route.query.type == 1">
        <tr>
          <td class="tb-title">欠薪项目名称</td>
          <td>{{dataForm.NOMONEY_PROJECT}}</td>
          <td class="tb-title">欠薪项目地址</td>
          <td>{{dataForm.BACKPAY_PROJECT_ADDRESS}}</td>
        </tr>
        <tr>
          <td class="tb-title">项目性质</td>
          <td>{{dataForm.PROJECT_KIND}}</td>
          <td class="tb-title">总包单位性质</td>
          <td>{{dataForm.GENERAL_CONTRACTOR_KIND}}</td>
        </tr>
        <tr>
          <td class="tb-title">所属行业</td>
          <td>{{dataForm.INDUSTRY_INVOLVED}}</td>
          <td class="tb-title">总包单位统一社会信用代码</td>
          <td>{{dataForm.GENERAL_CONTRACTOR_CODE}}</td>
        </tr>
        <tr>
          <td class="tb-title">总包单位名称</td>
          <td>{{dataForm.TOTAL_PACKAGE_UNIT}}</td>
          <td class="tb-title">开工时间</td>
          <td>{{dataForm.WORK_START_TIMES}}</td>
        </tr>
        <tr>
          <td class="tb-title">完工时间</td>
          <td>{{dataForm.WORK_END_TIMES}}</td>
          <td class="tb-title">是否实行总包代发工资</td>
          <td>{{dataForm.IS_ISSUING}}</td>
        </tr>
        <tr>
          <td class="tb-title">是否实行农民工实名制管理</td>
          <td>{{dataForm.IS_REALNAME_MANAGE}}</td>
          <td class="tb-title">是否实行农民工工资专用账户管理</td>
          <td>{{dataForm.IS_SPECIALACCOUNT_MANAGE}}</td>
        </tr>
        <tr>
          <td class="tb-title">是否实行工资保证金制度</td>
          <td colspan="3">{{dataForm.IS_EARNEST_MONEY}}</td>
        </tr>
        <tr>
          <td class="tb-title">欠薪原因</td>
          <td colspan="3">{{dataForm.BACKPAY_REASON}}</td>
        </tr>
      </table>
      <!-- 非工程领域 -->
      <table class="tb-content m-t-20" v-else>
        <tr>
          <td class="tb-title">是否为平台经济</td>
          <td>{{dataForm.IS_PLATFORM_ECONOMY}}</td>
          <td class="tb-title">欠薪单位名称</td>
          <td>{{dataForm.BACKPAY_COMPANY_NAME}}</td>
        </tr>
        <tr>
          <td class="tb-title">欠薪单位统一社会信用代码</td>
          <td>{{dataForm.BACKPAY_SOCIAL_CODE}}</td>
          <td class="tb-title">单位性质</td>
          <td>{{dataForm.UNIT_KIND}}</td>
        </tr>
        <tr>
          <td class="tb-title">欠薪项目地址</td>
          <td>{{dataForm.BACKPAY_PROJECT_ADDRESS}}</td>
          <td class="tb-title">所属行业</td>
          <td>{{dataForm.INDUSTRY_INVOLVED}}</td>
        </tr>
        <tr>
          <td class="tb-title">欠薪原因</td>
          <td colspan="3">{{dataForm.BACKPAY_REASON}}</td>
        </tr>
      </table>

      <table class="tb-content m-t-20">
        <tr>
          <td class="tb-title">欠薪时间起</td>
          <td>{{dataForm.BACKPAY_START_TIMES}}</td>
          <td class="tb-title">欠薪时间止</td>
          <td>{{dataForm.BACKPAY_END_TIMES}}</td>
        </tr>
        <tr>
          <td class="tb-title">解决欠薪人数（人）</td>
          <td>{{dataForm.SOLVED_PERSON}}</td>
          <td class="tb-title">欠薪直接责任单位名称</td>
          <td>{{dataForm.BACKPAY_DUTY_COMPANY}}</td>
        </tr>
        <tr>
          <td class="tb-title">欠薪直接责任单位统一信用代码</td>
          <td>{{dataForm.DUTY_COMPANY_CODE}}</td>
          <td class="tb-title">欠薪直接责任个人姓名</td>
          <td>{{dataForm.DUTY_PERSON_NAME}}</td>
        </tr>
        <tr>
          <td class="tb-title">欠薪直接责任个人身份证号码</td>
          <td>{{dataForm.DUTY_PERSON_CARD}}</td>
          <td class="tb-title">解决欠薪金额（万元）</td>
          <td>{{dataForm.SOLVED_MONEY}}</td>
        </tr>
        <tr>
          <td class="tb-title">核实处置情况</td>
          <td colspan="3">{{dataForm.DEAL_SITUATION}}</td>
        </tr>
      </table>

      <table class="tb-content m-t-20">
        <tr>
          <td class="tb-title">承办单位</td>
          <td>{{dataForm.UNDERTAKE_UNIT}}</td>
          <td class="tb-title">承办人员姓名</td>
          <td>{{dataForm.UNDERTAKE_PERSON}}</td>
        </tr>
        <tr>
          <td class="tb-title">承办人员联系方式</td>
          <td colspan="3">{{dataForm.UNDERTAKE_PERSON_PHONE}}</td>
        </tr>
        <tr>
          <td class="tb-title">备注</td>
          <td colspan="3">{{dataForm.REMARKS}}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
  import Myimg from "@/components/AESfile/getUrl";

  import * as api from "@/api/backpay";
  const baseApi = process.env.BASE_API

  export default {
    components: {
      Myimg,
    },
    data() {
      return {
        baseApi: baseApi,
        dataForm:{},
      };
    },
    created() {
      this.getDetail();
    },
    methods: {
      // 返回
      goBack() {
        this.$router.push({
          path: "/index"
        });
      },
      //获取详情
      getDetail(){
        let data = [];
        data.clue_code = this.$route.query.clue_code;
        this.$store.dispatch("showLoading");
        api
          .getClueDetail(data)
          .then(res => {
            let data = res.data.data;
            if (res.data.code === 201) {
              this.dataForm = data.data;
              this.$store.dispatch("hideLoading");
            } else {
              this.dataForm = {};
              this.$store.dispatch("hideLoading");
            }
          })
          .catch(err => {
            console.log(err);
            this.$store.dispatch("hideLoading");
          });
        },


    },
  };

</script>

<style lang="scss" scoped>

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

  .tb-content {
    width: 100%;
    font-size: 14px;

    td {
      border: 1px solid #dcdfe6;
      height: 40px;
      width: 25%;
      padding-left: 8px;
    }

    .tb-title {
      background-color: #f5f7fa;
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

  .m-t-20 {
    margin-top: 24px;
  }

</style>
