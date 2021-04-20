<template>
  <el-dialog title="选择项目" :visible.sync="dialogVisible" width="70%" :before-close="handleClose">
    <main class="form-box">
      <div class="search clearfix">
        <div class="fl mr-10  mb">
          <el-cascader v-model="searchForm.district_code" :options="gridInfo" :props="{ checkStrictly: true }" style="width:100%;" placeholder="请选择管辖" clearable></el-cascader>
        </div>
        <div class="fl mr-10 mb">
          <el-input v-model="searchForm.name" size="small" placeholder="请输入项目名称"></el-input>
        </div>
        <div class="mr-10 fl mb">
          <custom-button :btnMsg="btn.search" @click="searchinfo"></custom-button>
        </div>
        <div class="mr-10 fl mb">
          <custom-button :btnMsg="btn.reset" @click="clear"></custom-button>
        </div>
      </div>
      <el-table :data="tableData" style="width: 100%" border :cell-style="cellStyle" :header-cell-style="headerCellStyle" @selection-change="handleSelectionChange">
        <el-table-column type="selection"  width="55"> </el-table-column>
        <el-table-column type="index" label="序号" :index="indexMethod" width="50"> </el-table-column>
        <el-table-column prop="date" label="管辖">
          <template slot-scope="scope">
            <span v-if="scope.row.CITYNAME">{{scope.row.CITYNAME}}/{{scope.row.DISTRICTNAME}}</span>
            <span v-else>{{scope.row.DISTRICTNAME}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="NAME" label="项目名称"> </el-table-column>
        <el-table-column prop="BUILDER_COMPANY_NAME" label="建设单位"> </el-table-column>
        <el-table-column prop="CONTRACTOR_COMPANY_NAME" label="施工单位单位"> </el-table-column>
      </el-table>
      <div class="page-wrap">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 40, 100]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </main>
    <span slot="footer" class="dialog-footer">
      <button class="btn btn-white" @click="dialogVisible = false">取 消</button>
      <el-button class="btn" type="primary" @click="checkadd()">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import * as api from "@/api/backpay"
const baseApi = process.env.BASE_API;
export default {
  name: '',
  data() {
    return {
      regioncode: '',
      baseApi: baseApi,
      gridInfo: [],
      currentPage: 1,
      searchForm: [],
      emergencyCode: [],
      dialogVisible: false,
      tableData: [],
      multipleSelection: [],
      selectForm: [],
      pageSize: 10,
      total: 0
    };
  },
  computed: {},
  created() {
    this.getProject();
    //this.searchList();
    //this.init();
  },
  mounted() { },

  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //改变分页条数大小
    handleSizeChange(pagesize) {
      this.pageSize = pagesize;
      this.getProject();
    },
    indexMethod(index) {
        return (this.currentPage - 1) * this.pageSize + index + 1;
      },
    //翻页
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.getProject();
    },
    // 查询
    searchinfo(v) {
      this.currentPage = 1;
      this.getProject();
    },
    // 清除
    clear() {
      this.searchForm = [];
      this.getProject();
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => { });
    },
    cellStyle() {
      return 'text-align:center;'
    },
    headerCellStyle() {
      return 'text-align:center;'
    },

    //获取父组件传过来的regioncode
    init(regioncode) {
      this.regioncode = regioncode;
      this.getgridlist();
    },
    //获取项目信息
    getProject() {
      let data = [];
      data = this.searchForm;
      data.rows = this.pageSize;
      data.page = this.currentPage;
      this.$store.dispatch("showLoading");
      api
        .findProjectMsg(data)
        .then(res => {
          let data = res.data.data;
          if (res.data.code === 201) {
            this.tableData = data.data;
            this.total = data.tct
            console.log(this.tableData);
          }else{
            this.tableData = [];
            this.total = 0;
          }
          this.$store.dispatch("hideLoading");
        })
        .catch(err => {
          console.log(err);
          this.$store.dispatch("hideLoading");
        });
    },
    //查询管辖列表
    searchList() {
      api
        .getRegion()
        .then(res => {
          let data = res.data.data;
          if (res.data.code === 201) {
            this.selectForm = data.data.guanxia_list;
          } else {
            this.selectForm = [];
          }
          this.$store.dispatch("hideLoading");
        })
        .catch(err => {
          console.log(err);
          this.$store.dispatch("hideLoading");
        });
    },
    //确定
    checkadd() {

      if (this.multipleSelection.length > 1) {
        this.$message({
          type: "warning",
          message: "最多选择一条记录~",
        });
      } else {
        let row = this.multipleSelection[0];
        this.$emit('projectname', row.NAME);
        this.dialogVisible = false;
      }
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

  },



}

</script>

<style lang="scss" scoped>
/deep/ .el-dialog__body {
  border-top: 1px solid #d8d8d8;
  border-bottom: 1px solid #d8d8d8;
}

/deep/ .el-form-item {
  margin-bottom: 10px !important;
}

.search {
  margin-bottom: 20px;

  .el-input,
  .el-cascader,
  .el-select {
    line-height: 32px;
    width: 160px;
    height: 32px;

    /deep/ .el-input__icon {
      line-height: 32px;
    }

    /deep/ .el-input__inner {
      height: 32px;
    }
  }
}

.dialog-footer {
  .btn {
    margin-right: 10px;
  }
}

.page-wrap {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}
</style>
