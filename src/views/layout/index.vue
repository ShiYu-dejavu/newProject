<template>
  <el-container>
    <el-header>
      <HeadTitle />
      <div class="header-bar__menu">
        <CommonHeader
          :disabled="false"
          :userInfo="userInfo"
          :total="msgTotal"
          :messageList="messageList"
          @goWordDesk="goWordDesk"
          @goModule="goModule"
          @loginOut="logout"
          @tabClick="handleClick"
        />
      </div>
    </el-header>
    <el-container>
      <el-aside :style="isCollapse ? width1 : width2">
        <el-menu
          ref="leftMenu"
          class="el-menu-customize"
          :collapse="isCollapse"
          :default-active="$route.path"
          @open="handleOpen"
          @close="handleClose"
          :unique-opened="true"
          text-color="#303133"
          active-text-color="#1A74EF"
        >
          <template v-for="(routers, index) in $store.getters.addRouters">
            <el-submenu :index="index.toString()" v-if="!routers.lastMenu">
              <template slot="title">
                <i :class="'img-log iconfont ' + routers.meta.icon"></i>
                <span slot="title">{{ routers.meta.title }}</span>
              </template>

              <el-menu-item
                v-if="!router.hidden"
                v-for="(router, idx) in routers.children"
                :key="router.path"
                @click="clickCategory(routers.path + '/' + router.path)"
                :index="routers.path + '/' + router.path"
              >
                {{ router.meta.title }}
              </el-menu-item>
            </el-submenu>

            <el-menu-item
              v-else
              :index="routers.redirect"
              :key="index"
              @click="clickCategory(routers.redirect)"
            >
              <i :class="'img-log iconfont ' + routers.meta.icon"></i>
              <span slot="title">
                {{ routers.children[0].meta.title }}
              </span>
            </el-menu-item>
          </template>
        </el-menu>
      </el-aside>
      <el-main :style="isCollapse ? left1 : left2">
        <tags-view></tags-view>
        <router-view ref="child"></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import HeadTitle from "@/components/HeadTitle";
import { logout, getmessagelist } from "@/api/login";
import { setToken, setPHPSESSION } from "@/common/utils/auth";
import Cookies from "js-cookie";
import tagsView from "./tagsView";
import { CommonHeader } from "common";
const baseUrl = process.env.BASE_API;
export default {
  name: "home",
  components: {
    tagsView,
    CommonHeader,
    HeadTitle
  },
  data() {
    return {
      width1: { width: "64px" },
      width2: { width: "220px" },
      left1: { left: "64px", width: "calc(100% - 64px)" },
      left2: { left: "220px", width: "calc(100% - 220px)" },
      personData: {
        PRIVATE_SESSIONID: "",
        PRIVATE_USER_NAME: "",
        PRIVATE_DEPARTMENT_NAME: "",
        PRIVATE_ROLE_CODE: "",
        PRIVATE_ROLE_NAME: "",
        PRIVATE_SUPERVISOR_CODE: "",
        PRIVATE_SUPERVISOR_DUTY: "",
        PRIVATE_SUPERVISOR_HEAD_URL: "",
        PRIVATE_SUPERVISOR_NAME: "",
        PRIVATE_UNIT_NAME: "",
        PRIVATE_USER_CODE: "",
        PRIVATE_ACCOUNT_PHONE: "",
        PRIVATE_ACCOUNT_EMAIL: "",
      },

      // 顶部右侧配置
      is_read: "0",
      userInfo: {},
      msgTotal: "",
      messageList: [],
    };
  },
  created() {
    //获取用户个人信息
    this.personData.PRIVATE_SESSIONID = Cookies.get("PRIVATE_SESSIONID");
    this.personData.PRIVATE_USER_NAME = Cookies.get("PRIVATE_USER_NAME");
    this.personData.PRIVATE_DEPARTMENT_NAME = Cookies.get(
      "PRIVATE_DEPARTMENT_NAME"
    );
    this.personData.PRIVATE_ROLE_CODE = Cookies.get("PRIVATE_ROLE_CODE");
    this.personData.PRIVATE_ROLE_NAME = Cookies.get("PRIVATE_ROLE_NAME");
    this.personData.PRIVATE_SUPERVISOR_CODE = Cookies.get(
      "PRIVATE_SUPERVISOR_CODE"
    );
    this.personData.PRIVATE_SUPERVISOR_DUTY = Cookies.get(
      "PRIVATE_SUPERVISOR_DUTY"
    );
    this.personData.PRIVATE_SUPERVISOR_NAME = Cookies.get(
      "PRIVATE_SUPERVISOR_NAME"
    );
    this.personData.PRIVATE_UNIT_NAME = Cookies.get("PRIVATE_UNIT_NAME");
    this.personData.PRIVATE_USER_CODE = Cookies.get("PRIVATE_USER_CODE");
    this.personData.PRIVATE_ACCOUNT_PHONE = Cookies.get(
      "PRIVATE_ACCOUNT_PHONE"
    );
    this.personData.PRIVATE_ACCOUNT_EMAIL = Cookies.get(
      "PRIVATE_ACCOUNT_EMAIL"
    );
    //判断头像
    let headPic = Cookies.get("PRIVATE_SUPERVISOR_HEAD_URL");
    if (headPic == "" || headPic == "null") {
      this.personData.PRIVATE_SUPERVISOR_HEAD_URL = this.headImg;
    } else {
      this.personData.PRIVATE_SUPERVISOR_HEAD_URL = localStorage.getItem('PRIVATE_SUPERVISOR_HEAD_URL');
    }

    // 顶部右侧消息框
    this.personData.authorityCode = Cookies.get("authorityCode");
    this.userInfo = {
      PRIVATE_SUPERVISOR_HEAD_URL: this.personData.PRIVATE_SUPERVISOR_HEAD_URL,
      PRIVATE_SUPERVISOR_NAME: this.personData.PRIVATE_SUPERVISOR_NAME,
      PRIVATE_UNIT_NAME: this.personData.PRIVATE_UNIT_NAME,
      PRIVATE_DEPARTMENT_NAME: this.personData.PRIVATE_DEPARTMENT_NAME,
      PRIVATE_SUPERVISOR_CODE: this.personData.PRIVATE_SUPERVISOR_CODE,
      authorityCode: this.personData.authorityCode,
    };
    this.getDataList();
  },
  computed: {
    isCollapse() {
      return this.$store.getters.isCollapse;
    },
  },
  methods: {
    clickCategory(path) {
      this.$router.push({
        path: path,
      });
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },

    // 顶部右侧消息框
    goWordDesk(path) {
      window.open(baseUrl + "/dist/" + path);
    },
    goModule(path) {
      window.open(baseUrl + "/dist/" + path + "/index.html");
    },
    logout() {
      this.$confirm("此操作将退出登录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          logout().then((res) => {
            if (res.data.code == 201) {
              //清除session
              setPHPSESSION("PHPSESSID", "");
              setToken("");
              this.$message({
                type: "success",
                message: "退出成功!",
              });
              location.reload();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消登出",
          });
        });
    },
    handleClick(tab) {
      this.is_read = tab.index;
      this.getDataList();
    },
    getDataList() {
      this.$store.dispatch("showLoading");
      let data = [];
      data.is_read = this.is_read;
      getmessagelist(data)
        .then((res) => {
          this.$store.dispatch("hideLoading");
          if (res.data.code == 201) {
            this.messageList = res.data.data.data;
            this.msgTotal = res.data.data.tct + "";
          } else {
            this.messageList = [];
            /*this.$message({
                 type: "error",
                 message: res.data.data.message,
              });*/
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.el-header {
  background-color: #1a74ef;
}
.el-menu {
  border-right: none;
}

.el-menu-customize:not(.el-menu--collapse) {
  width: 220px;
  border-width: 0px;
}

.el-menu-customize {
  & > li {
    margin-top: 8px;

    /deep/ .el-submenu__title {
      span {
        font-size: 16px;
        margin-left: 10px;
      }
      padding-left: 25px !important;
      height: 40px;
      line-height: 40px;

      /deep/ .el-submenu__icon-arrow {
        color: #303133;
      }
    }

    /deep/ .el-menu--inline {
      li {
        padding-left: 50px !important;
        font-size: 14px;
      }
    }
  }

  & > li.el-submenu.is-active .el-submenu__title {
    span,
    i {
      color: #1a74ef;
    }
  }

  li.el-menu-item {
    margin-top: 8px;
    span {
      font-size: 16px;
      margin-left: 10px;
    }
    height: 40px;
    line-height: 40px;
    border-left: 5px solid #ffffff;
  }

  li.el-menu-item.is-active {
    border-left: 5px solid #1a74ef;
    background-color: #ecf5ff;

    .img-log {
      color: #1a74ef;
    }
  }

  .img-log {
    color: #303133;
    width: 20px;
  }
}

.el-aside {
  overflow: hidden;
  background-color: #ffffff;
  width: 100%;
  height: calc(100vh - 60px);
  position: absolute;
  left: 0;
  box-shadow: 2px 0px 6px 0px rgba(0, 21, 41, 0.15);
  z-index: 99;

  ul > li {
    font-weight: 700;
  }
}

body .el-container .el-container {
  position: relative;
  width: 100%;
  height: 100%;
}
.el-main {
  position: absolute;
  left: 200px;
  background-color: #e9eef3;
  //text-align: center;
  width: calc(100% - 200px);
  height: calc(100vh - 60px);
}

.el-color-picker {
  transform: translate(-10px, -3px);
}


.header-bar__menu {
  float: right;
  margin-top: 20px;
}
/deep/ .el-drawer {
  width: 428px !important;
  overflow: auto;
}
.right-menu {
  height: 60px;
  line-height: 60px;
  border-bottom: 1px solid #e5e5e5;
  text-align: center;
  background: #fff;
  img {
    position: absolute;
    left: 0;
    margin: 10px;
    cursor: pointer;
  }
}
.admin {
  display: block;
  width: 400px;
  margin: 10px auto 0;
  height: 40px;
  line-height: 40px;
  text-align: center;
  background: linear-gradient(
    90deg,
    rgba(45, 174, 249, 1) 0%,
    rgba(20, 118, 241, 1) 100%
  );
  color: #fff;
  border-radius: 5px;
}
.admin-box {
  width: 400px;
  height: 538px;
  margin: 10px auto;
  background: #fff;
  box-shadow: 0px 4px 7px 0px rgba(168, 172, 192, 0.35),
    0px -1px 0px 0px rgba(255, 255, 255, 1);
  border-radius: 8px;
  .admin-item {
    width: 33.33%;
    float: left;
    text-align: center;
    margin-top: 25px;
  }
  .first-line {
    margin-top: 24px;
  }
  p {
    font-size: 14px;
    color: #55595f;
    margin-top: 15px;
  }
}
.user {
  width: 400px;
  height: 170px;
  margin: 14px auto 0;
  box-shadow: 0px 4px 7px 0px rgba(168, 172, 192, 0.35),
    0px -1px 0px 0px rgba(255, 255, 255, 1);
  border-radius: 8px;
  background: #fff;
  p {
    padding: 20px;
    span {
      display: inline-block;
    }
    span:nth-child(1) {
      font-weight: 500;
      color: #1f8dff;
    }
    span:nth-child(2) {
      background: #e9effb;
      font-size: 12px;
      padding: 3px 10px;
      border-radius: 12px;
      float: right;
      i {
        color: #1f8dff;
      }
    }
    .icon-right {
      font-size: 12px;
      padding-left: 7px;
    }
    .icon-message {
      position: relative;
    }
    .icon-message::after {
      content: "";
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: red;
      position: absolute;
      top: 0;
      right: 0;
    }
  }
  .info {
    padding: 0 20px;
    img {
      float: left;
      width: 74px;
      height: 90px;
    }
    ul {
      float: left;
      width: calc(100% - 95px);
      margin-left: 21px;
      font-size: 14px;
      .info-key {
        color: #55595f;
      }
      .info-val {
        color: #8e939a;
      }
      li {
        line-height: 23px;
        span:nth-child(3) {
          float: right;
          color: #1f8dff;
        }
      }
    }
  }
}
.img-log {
  width: 24px;
  height: 24px;
  color: #1a74ef;
  margin-right: 12px;
  font-weight: normal;
}
/deep/ .el-drawer__body {
  background: #f2f5f9;
}

/deep/ .el-submenu__title {
  font-size: 16px;
}
.subitem {
  font-weight: 400;
}
/deep/ .el-menu-item-group__title {
  display: none;
}
</style>