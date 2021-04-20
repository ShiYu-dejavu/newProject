<template>
  <el-upload ref="uploadMutiple" :auto-upload="false" action="Fake Action" :on-change="handleChange"
    :file-list="fileList" :show-file-list='!isPhoto' :multiple='multiple' :accept="accept" :on-remove='handleRemove'>
    <el-button slot="trigger" type="primary" size="small" :disabled="disabled"><i class="el-icon-upload"></i>上传文件</el-button>
  </el-upload>
</template>
<script>
  import * as api from './upload.js';
  import {
    Decrypt,
    Encrypt
  } from './AES.js'
  import {
    dataURLtoDownload
  } from './tool.js'
  const baseApi = process.env.BASE_API
  export default {
    name: "MyUpload",
    props: {
      accept: { //接受文件类型，字符串
        type: String,
        default: 'png,jpg'
      },
      sizeLimit: {//文件大小
        type: String,
        default: '10MB'
      },
      numLimit: {//文件数量
        type: Number,
        default: 1
      },
      multiple:{//是否多选
        type:Boolean,
        default:false
      },
      isPhoto:{//是否预览类型
        type:Boolean,
        default:false
      },
      parameter:{//上传额外参数
        type:Object,
        default:()=>{
          return {}
        }
      }
    },
    data() {
      return {
        fileList: [],
        resList: [],
        count: 0,
        upData: {},
        photoFile:'',
        keyFrom:{},
        disabled: false,
      };
    },
    watch: {
      'fileList.length':function(val){
        if (val > this.numLimit) {
          this.$message.warning(`文件个数不能超过${this.numLimit}个`)
          this.fileList = []
        }
      }
    },
    created() {
      this.getKey()
    },
    methods: {
      handleChange(file, fileList) {
        this.fileList = fileList
        if(this.isPhoto&& !this.multiple &&fileList.length){
          if(fileList.length>1){
            this.$refs.uploadMutiple.handleRemove(fileList[0])
          }
          this.$emit('previewCB',file)
        }
        if(this.isPhoto&& this.multiple &&fileList.length){
          this.$emit('previewCB',file)
        }
        if(this.before_upload(file)){
          this.submitUpload(file)
        }
      },
      handleRemove(file, fileList){
        this.fileList = fileList
      },
      before_upload(file) {
        var flag = false
        var testmsg = file.name.substring(file.name.lastIndexOf('.') + 1).toLowerCase()
        const typeCheck = this.accept.includes(testmsg)
        const sizeCheck = this.dealSize(this.sizeLimit, file)
        if (!typeCheck) {
          this.$message.warning(`上传文件只能是${this.accept}格式!`)
          this.$refs.uploadMutiple.handleRemove(file)
        } else if (!sizeCheck) {
          this.$message.warning(`文件大小不能超过${this.sizeLimit}!`)
          this.$refs.uploadMutiple.handleRemove(file)
        }else{
          flag = true
        }
        return flag
      },
      submitUpload(file) {
        let that = this
        let upData = {
          imgFile: []
        }
        let reader = new FileReader(); //html5读文件
        reader.readAsDataURL(file.raw); //转BASE64
        reader.onload = function (e) {
          let fileItem = {
            file_content: that.jiami(reader.result),
            file_name: file.name,
            file_size: file.size,
            file_ext: that.getType(file.name),
            version: that.keyFrom.version,
          }
          upData.imgFile.push(fileItem)
        }
        setTimeout(() => {
          that.uploadData(upData)
        }, 100);
      },
      uploadData(data) {
        data.grading_rules_id = this.parameter.grading_rules_id
        data.type = this.parameter.type
        data.plan_id = this.parameter.plan_id
        data.task_id = this.parameter.task_id
        this.disabled = true;
        api.myUpload(data).then(res => {
          this.$message.success('文件上传成功')
          this.fileList = []
          this.upData = []
          this.count = 0
          this.$emit('successCB',res.data.data.data)
        }).finally(() => {
          this.disabled = false;
        })
      },
      clearFile(file){
        this.$refs.uploadMutiple.handleRemove(file)
      },
      // -------加密消息--------
      jiami(val) {
        let str1 = val.substring(0, 50)
        let str2 = Encrypt(val.substring(50, 80),this.keyFrom.publicKey,this.keyFrom.privateKey);
        let str3 = val.substring(80)
        return str1 + '&gzqx' + str2 + '&gzqx' + str3
      },
      // -------解密消息--------
      jiemi(val) {
        let arr = val.split('&gzqx')
        arr[1] = Decrypt(arr[1],this.keyFrom.publicKey,this.keyFrom.privateKey)
        return arr[0] + arr[1] + arr[2]
      },
      //获取文件后缀
      getType(filename) {
        var index1 = filename.lastIndexOf(".");
        var index2 = filename.length;
        var type = filename.substring(index1, index2);
        return type;
      },
      //文件大小判断
      dealSize(sizeLimit, file) {
        if (sizeLimit.includes('KB')) {
          return file.size / 1024 < parseInt(sizeLimit)
        } else if (sizeLimit.includes('MB')) {
          return file.size / 1024 / 1024 < parseInt(sizeLimit)
        } else if (sizeLimit.includes('GB')) {
          return file.size / 1024 / 1024 / 1024 < parseInt(sizeLimit)
        }
      },
      getKey(){
        this.keyFrom = JSON.parse(localStorage.getItem('myKey'))
      }

    }
  }

</script>

<style lang='scss' scoped>
  .upload-btn {
    display: inline-block;
  }

</style>
