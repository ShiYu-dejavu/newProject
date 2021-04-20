<template>
    <div class="app-container">
        <div class="header clearfix">
            <h5 class="fl title">举报投诉回收站</h5>
        </div>
        <div class="contents">
            <div class="search clearfix">
                <!-- <div class="w-120 fl mr-10 mb">
                    <el-cascader clearable size="mini" v-model="searchList.districtCode" :options="areaList" placeholder="管辖划分" change-on-select="true" expand-trigger="hover"></el-cascader>
                </div> -->
                <div class="w-200 fl mr-10 mb">
                    <el-input v-model="searchList.report_code" clearable size="small" placeholder="请输入编号"></el-input>
                </div>
                <div class="w-200 fl mr-10 mb">
                    <el-input v-model="searchList.informant_name" clearable size="small" placeholder="请输入举报投诉人姓名"></el-input>
                </div>
                <div class="w-200 fl mr-10 mb">
                    <el-input v-model="searchList.re_informant_name" clearable size="small" placeholder="请输入被举报投诉对象"></el-input>
                </div>
                <div class="w-200 fl mr-10 mb">
                    <el-select v-model="searchList.report_type" placeholder="请选择类型" clearable size="small">
                        <el-option v-for="(item,key) in reportType" :key="key" :value="key" :label="item"></el-option>
                    </el-select>
                </div>
                <!-- <div class="w-200 fl mr-10 mb">
                    <el-select v-model="searchList.status" placeholder="案件进度" clearable size="small">
                        <el-option v-for="(key,item) in dealStatusType" :key="item" :value="key.CODE" :label="key.NAME"></el-option>
                    </el-select>
                </div> -->
                <div class="mr-10 fl mb">
                    <custom-button :btnMsg="btn.search" @click="searchInfo"></custom-button>
                </div>
                <custom-button :btnMsg="btn.reset" @click="clear" class="fl ml-10"></custom-button>
            </div>
            <div class="sheet">
                <el-tabs v-model="activeName" type="card">
                    <el-tab-pane :label="'全部('+totalLength+')'" name="first"></el-tab-pane>
                </el-tabs>
                <el-table ref="multipletable" :height="tableHeight" :data="showList" @select-all="selectAll" @selection-change="handleSelectionChange" tooltip-effect="dark" style="width: 100%" border class="menu-table">
                    <el-table-column type="selection" width="55"></el-table-column>
                    <el-table-column type="index" label="序号" fixed :index="indexMethod" width="55"></el-table-column>
                    <el-table-column prop="ran_number" label="编号">
                        <template slot-scope="scope">
                            <span @click="toDetail(scope.row)" style="color:#1a74ef; cursor:pointer;"> {{ scope.row.REPORT_CODE }} </span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="report_type" label="类型">
                         <template slot-scope="scope">
                            <span>{{scope.row.REPORT_TYPE}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="name" label="举报投诉人姓名">
                        <template slot-scope="scope">
                            <span>{{scope.row.INFORMANT_NAME}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="idnumber" label="举报投诉人身份证号码">
                         <template slot-scope="scope">
                            <span>{{scope.row.ID_NUMBER}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="project_name" label="举报投诉对象">
                        <template slot-scope="scope">
                            <span>{{scope.row.RE_INFORMANT_NAME}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="deuid" label="删除操作人">
                        <template slot-scope="scope">
                            <span>{{scope.row.REC_PERSON}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="update_time" label="删除时间">
                        <template slot-scope="scope">
                            <span>{{scope.row.UPDATE_TIME}}</span>
                        </template>
                    </el-table-column>
                </el-table>

            </div>
        </div>
        <div class="operation-warper">
            <!-- <custom-button :btnMsg="btn.detail1" @click="detail" class="fl ml-10">详细信息</custom-button> -->
            <custom-button :btnMsg="btn.restore" @click="rest" v-hasBtnPermission="'btn_119003001001'" class="fl ml-10">还原</custom-button>
            <custom-button :btnMsg="btn.remove" @click="del" v-hasBtnPermission="'btn_119003001002'" class="fl ml-10">彻底删除</custom-button>
            <div class="pager-wrapper fr">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="pageSizes" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalLength"></el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import * as api from "@/api/backpay";
import CustomButton from "@/components/customButton/button";
import {mixin} from "@/mixins/table.js"
export default {
    mixins: [mixin],
    data() {
        return {
            add: {
                name: "新增",
                icon: "el-icon-plus",
            },
            search: {
                name: "查询",
                icon: "el-icon-search",
            },
            distCode: [],
            areaList: [],
            objType: {
                1: "工程建设领域拖欠劳动者工资",
                2: "非工程建设领域拖欠劳动者工资",
            },
            complaintModeType: {
                1: "实名投诉",
                2: "匿名投诉",
            },
            complaintType: [],
            dealStatusType: [],
            multipleSelection: "",
            activeName: "first",
            searchList: [],
            dataList: [],
            totalLength: 0,
            currentPage: 1,
            reportType:[],
        };
    },
    created() {
        this.getSearchList();
        this.getDataList();
    },
    methods: {
        // 查看详情
        // toDetail(row) {
        //     this.$router.push({ path: "/query/details", query: { report_code: row.REPORT_CODE,status:row.STATUS } });

        // },
        toDetail(row) {
        this.$router.push({
            path: "/query/detail",
            query: {
            report_code: row.REPORT_CODE,
            status: row.STATUS,
            id: row.ID,
            },
        });
        },
        //改变分页条数大小
        handleSizeChange(pagesize) {
            this.pageSize = pagesize;
            this.getDataList();
        },
        //翻页
        handleCurrentChange(currentPage) {
            this.currentPage = currentPage;
            this.getDataList();
        },
        //选择框
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        indexMethod(index) {
            return (this.currentPage - 1) * this.pageSize + index + 1;
        },
        // 获取搜索框默认值
        getSearchList() {
            api.getsearchinfo()
                .then((res) => {
                    let data = res.data.data;
                    if (res.data.code == 201) {
                        this.reportType = data.data.REPORT_TYPE;
                        this.dealStatusType = data.data.REPORT_STATUS;
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        // 获取数据
        getDataList() {
            let data = this.searchList;
            data.rows = this.pageSize;
            data.page = this.currentPage;
            this.$store.dispatch("showLoading");
            api.recyclelist(data)
                .then((res) => {
                    const data = res.data.data;
                    if (res.data.code === 201) {
                        this.dataList = data.data;
                        this.totalLength = data.tct;
                        this.$store.dispatch("hideLoading");
                    } else {
                        this.dataList = [];
                        this.totalLength = 0;
                        this.$store.dispatch("hideLoading");
                    }
                    let list = this.dataList;
                    this.allList = this.reSetData(list, 20);
                    this.showList = this.allList[0];
                    this.resetTable()
                })
                .catch((err) => {
                    console.log(err);
                    this.$store.dispatch("hideLoading");
                });
        },
        searchInfo(v) {
            this.currentPage = 1;
            this.getDataList();
        },
        clear() {
            this.searchList = [];
        },
        // 详情
        detail() {
            if (this.multipleSelection.length > 1) {
                this.$message.warning("最多选择一条记录");
            } else if (this.multipleSelection.length === 0) {
                this.$message.warning("请至少选择一条记录查看");
            } else {
                let row = this.multipleSelection[0];
                this.$router.push({
                    path: "/details",
                    query: {
                        id: row.id,
                    },
                });
            }
        },
        // 还原
        rest() {
            if (this.multipleSelection.length < 1) {
                this.$message({
                    type: "warning",
                    message: "请至少选择一条记录查看~",
                });
                return false;
            } else if (this.multipleSelection.length > 1) {
                this.$message({
                    type: "warning",
                    message: "最多选择一条记录~",
                });
                return false;
            }
            this.$confirm("确定还原此数据?", "提示", {
                confirmbuttontext: "确定",
                cancelbuttontext: "取消",
                type: "info",
            })
                .then(() => {
                    this.$store.dispatch("showLoading");
                    let row = this.multipleSelection[0];
                    let data = {
                        report_code: row.REPORT_CODE,
                        is_reacll : '0',
                    };
                    api.restore(data)
                        .then((res) => {
                            if (res.data.code == 201) {
                                this.$message({
                                    type: "success",
                                    message: res.data.data.message,
                                });
                                this.getDataList(); //刷新列表
                                this.$store.dispatch("hideLoading");
                            } else {
                                this.$message({
                                    type: "warning",
                                    message: res.data.data.message,
                                });
                                this.$store.dispatch("hideLoading");
                            }
                        })
                        .catch((err) => {
                            console.log(err);
                            this.$store.dispatch("hideLoading");
                        });
                })
                .catch(() => {});
        },
        // 彻底删除
        del() {
            if (this.multipleSelection.length < 1) {
                this.$message({
                    type: "warning",
                    message: "请至少选择一条记录查看~",
                });
                return false;
            } else if (this.multipleSelection.length > 1) {
                this.$message({
                    type: "warning",
                    message: "最多选择一条记录~",
                });
                return false;
            }
            this.$confirm("确定删除此数据?", "提示", {
                confirmbuttontext: "确定",
                cancelbuttontext: "取消",
                type: "info",
            })
                .then(() => {
                    let row = this.multipleSelection[0];
                    let data = {
                        report_code: row.REPORT_CODE,
                        delete_mark : '1',
                    };
                    this.$store.dispatch("showLoading");
                    api.restore(data)
                        .then((res) => {
                            if (res.data.code == 201) {
                                this.$message({
                                    type: "success",
                                    message: res.data.data.message,
                                });
                                this.getDataList();
                                this.$store.dispatch("hideLoading");
                            } else {
                                this.$message({
                                    type: "warning",
                                    message: res.data.data.message,
                                });
                                this.$store.dispatch("hideLoading");
                            }
                        })
                        .catch((err) => {
                            console.log(err);
                            this.$store.dispatch("hideLoading");
                        });
                })
                .catch(() => {});
        },
    },
};
</script>

<style lang="scss" scoped>
.app-container{
    margin-bottom: 70px;
}
/deep/ .el-tabs__item {

    height: 32px;
    line-height: 32px;
}
 .operation-warper{
      width: 120%;
  }
  .pager-wrapper{
      position: fixed;
      bottom: 8px;
      right: 8px;
  }
</style>
