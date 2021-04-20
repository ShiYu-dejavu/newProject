<template>
  <div class="headtitle clearfix fl">
    <img class="fl" :src="government.goverImg"  />
    <div class="fl" >{{ government.reportTitle }}</div>
  </div>
</template>

<script>
import * as siteInfo from "@/api/siteInfo";
import { urlToBase64 } from "@/components/AESfile/tool.js";
import { Decrypt } from "@/components/AESfile/AES.js";

const baseApi = process.env.BASE_API;
export default {
  data() {
    return {
      baseApi: baseApi,
      government:{}, // 站点信息
    };
  },
  created() {
    this.getHeadTitleInfo();
  },
  methods: {
    getHeadTitleInfo() {
      let data = [];
      data.type_code = "10003"; // 10003 对内  10002 对外
      siteInfo
        .getSiteMsg(data)
        .then((res) => {
          let resData = res.data.data;
          let resCode = res.data.code;
          if (resCode === 201) {
            this.government = resData.data.val ? resData.data.val : {};
          //  console.log(this.government)
            window.localStorage.setItem('government',JSON.stringify(this.government));
            document.title = this.government.reportTitle;
            urlToBase64(baseApi + this.government.goverImg).then((res) => {
              this.government.goverImg = this.jiemi(res, this.government.goverImg.split("/")[2]);
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    // -------解密文件--------
    jiemi(val, version) {
      let keyFrom = JSON.parse(localStorage.getItem(version));
      let arr = val.split("&gzqx");
      arr[1] = Decrypt(arr[1], keyFrom.publicKey, keyFrom.privateKey);
      return arr[0] + arr[1] + arr[2];
    },
  },
};
</script>

<style lang="scss" scoped>
.headtitle {
  img {
    margin: 12.2px 7px 12.2px 0px;
    height: 35.6px;
  }

  div {
    height: 60px;
    line-height: 60px;
    font-size: 24px;
    color: #ffffff;
  }
}
</style>