<template>
  <img class="img" :src="srcUrl" width="100" height="100" v-if="isImg" @click="preview(srcUrl)">
  <span class="download" v-else @click="handleDownload">{{filename}}</span>
</template>

<script>
  import {
    Encrypt,
    Decrypt
  } from '@/components/AESfile/AES.js'
  import {
    urlToBase64,
    dataURLtoDownload
  } from '@/components/AESfile/tool.js'
  const baseApi = process.env.BASE_API
  export default {
    props: ['url','filename'],
    data() {
      return {
        srcUrl: '',//文件路径
        type: 'png,jpg,jpeg' //图片类型文件判断字符串
      }
    },
    computed: {
      isImg() {
        // 判断文件类型是否图片类型，图片则直接查看，其他类型则下载
        return this.type.includes(this.url.substring(this.url.lastIndexOf('.') + 1).toLowerCase())
      },
      version(){
        return this.url.split('/')[2]
      }
    },
    watch:{
      'url':function(val){
        urlToBase64(baseApi + this.url).then(res => {
          this.srcUrl = this.jiemi(res)
        })
      }
    },
    created() {
      urlToBase64(baseApi + this.url).then(res => {
        this.srcUrl = this.jiemi(res)
        // console.log(this.srcUrl)
      })
    },
    methods: {
      // -------解密文件--------
      jiemi(val) {
        let keyFrom = JSON.parse(localStorage.getItem(this.version))
        let arr = val.split('&gzqx')
        if (arr[1]) {
          arr[1] = Decrypt(arr[1], keyFrom.publicKey, keyFrom.privateKey)
          return arr[0] + arr[1] + arr[2]
        } else {
          return "";
        }
      },
      //下载文件
      handleDownload() {
        dataURLtoDownload(this.srcUrl, this.filename||'')
      },
      preview(srcUrl){
        this.$emit('imgPreview',srcUrl)
      }
    }
  }

</script>

<style scoped>
  .img {
    cursor: pointer;
    margin-right: 5px;
    margin-bottom: 5px;
  }

  .download {
    cursor: pointer;
    line-height: 42px;
    color: #1a74ef;
  }

</style>
