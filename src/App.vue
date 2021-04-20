<template>
  <div id="app"  :class="{hidden:isRellyShow}">
    <router-view />
    <div class="loading_box" v-show="isRellyShow" @click="hideload">
      <img src="../static/images/loading.svg" style="width: 150px; height: 150px;"/>
    </div>
    <MsgPush />
  </div>
</template>

<script>
import * as api from "@/components/AESfile/upload.js";
import MsgPush from '@/components/msgPush'
export default {
  name: "App",
  components: {
    MsgPush
  },
  methods: {
    hideload: function () {
      this.$store.dispatch("hideLoading");
    },
  },
  computed: {
    isRellyShow() {
      return this.$store.getters.isShowMethod;
    },
  },
  created() {
    api.getKey().then((res) => {
      if (res.data.code == 201) {
        localStorage.setItem("myKey", JSON.stringify(res.data.data.data[0]));
        res.data.data.data.forEach(item => {
          localStorage.setItem(item.version, JSON.stringify(item))
        })
      }
    })
  },
};
</script>

<style lang="scss" scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100%;
  height: 100%;
  position: absolute;
}
.hidden{
  overflow: hidden;
}

.loading_box {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 10000;
  overflow: hidden;
  img {
    position: absolute;
    left: calc(50% - 75px);
    top: calc(50% - 75px);
  }
}
</style>
