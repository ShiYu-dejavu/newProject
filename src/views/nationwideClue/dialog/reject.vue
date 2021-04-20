<template>
  <el-dialog :visible.sync="dialogVisible" width="600px" :show-close='false' top='10vh'>
    <h4 class="title">劳动保障监察不予受理决定书</h4>
    <div class="form">
      <p style="text-align:right">
        <el-input size='mini' style="width:100px" v-model="form.key1"></el-input> 人社监不受 <el-input v-model="form.key2"
          size='mini' style="width:50px"></el-input>
        <el-input v-model="form.key3" size='mini' style="width:50px"></el-input> 号
      </p>
      <p><span>投诉人</span>
        <el-input v-model="form.key4" size='mini' style="width:450px"></el-input>
      </p>
      <p><span>地址</span>
        <el-input v-model="form.key5" size='mini' style="width:450px"></el-input>
      </p>
      <p>我厅（局）于 <el-input v-model="form.key6" size='mini' style="width:50px"></el-input> 年 <el-input v-model="form.key7"
          size='mini' style="width:50px">
        </el-input> 月 <el-input v-model="form.key8" size='mini' style="width:50px"></el-input> 日接到您关于</p>
      <el-input type="textarea" v-model="form.key9" show-word- rows='4'>
      </el-input>
      <p>（投诉主要内容）的投诉，根据《关于实施（劳动保障监察条例）若干规定》第十八条第一款第（一）项的规定，经审查，您的投诉不符合受理条件，决定不予受理。</p>
      <p>&nbsp; &nbsp; 如您不服本不予受理决定，可在收到本决定书之日起60日内向（上一级人力资源和社会保障行政部门）
        <el-input v-model="form.key10" size='mini' style="width:100px"></el-input> 或
        <el-input v-model="form.key11" size='mini' style="width:100px"></el-input>
        （同级人民政府）申请行政复议，或者自收到本决定书之日起六个月内向
        <el-input size='mini' v-model="form.key12" style="width:100px"></el-input> （人力资源和社会保障行政部门所在区人民法院）提起行政诉讼。
      </p>
      <p style="text-align:right">(人力资源和社会保障行政部门印章)</p>
      <p style="text-align:right">
        <el-input v-model="form.key13" size='mini' style="width:50px"></el-input> 年 <el-input v-model="form.key14"
          size='mini' style="width:50px">
        </el-input> 月 <el-input v-model="form.key15" size='mini' style="width:50px"></el-input> 日
      </p>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel" size='small'>取 消</el-button>
      <el-button type="primary" @click="submit" size='small'>保 存</el-button>
    </div>
  </el-dialog>
</template>

<script>
  export default {
    data() {
      return {
        dialogVisible: false,
        form: {
          key1: '',
          key2: '',
          key3: '',
          key4: '',
          key5: '',
          key6: '',
          key7: '',
          key8: '',
          key9: '',
          key10: '',
          key11: '',
          key12: '',
          key13: '',
          key14: '',
          key15: '',
        },
        type_code: '', //案件编号
        district_code: '', //区域编码
      };
    },
    methods: {
      init(type_code, district_code) {
        this.type_code = type_code;
        this.district_code = district_code;
      },
      //取消
      cancel() {
        this.form = []
        this.dialogVisible = false
      },
      //提交
      submit() {
        this.$emit('setForm', this.form)
        this.dialogVisible = false
      }
    }
  }

</script>

<style lang='scss' scoped>
  .title {
    text-align: center;
  }

  .form {
    width: 540px;
    min-height: 200px;
    margin: 20px auto;
    position: relative;

    p {
      padding-bottom: 10px;
      line-height: 30px;

      span {
        display: inline-block;
        width: 60px;
      }
    }
  }

  /deep/ .el-dialog__header {
    border: none;
  }

  /deep/ .el-input__inner {
    padding: 0 5px;
  }

</style>
