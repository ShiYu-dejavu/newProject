import Cookies from "js-cookie";
export var mixin = {
  data() {
    return {
      allList: [],
      showList: [],
      showListPage: 0,
      tableDom: null,
      tableHeight: "500",
      isSelectAll: false,
      pageSize:50,
      pageSizes:[50,100,200],
      
    };
  },
  watch: {
    tableHeight(val) {
      console.log(val)
    }
  },
  created () {
    if(JSON.parse(Cookies.get("pageInfo"))){
      this.pageSize = JSON.parse(Cookies.get("pageInfo")).pageSize
      this.pageSizes = JSON.parse(Cookies.get("pageInfo")).pageSizeList
    }
  },
  mounted() {
    this.$nextTick(() => {
      // 页面渲染完成后的回调
      let clientHeight = `${document.documentElement.clientHeight}` * 1;
      this.tableHeight = clientHeight - this.$refs.multipletable.bodyWrapper.getBoundingClientRect().top - 74 > 500 ? clientHeight - this.$refs.multipletable.bodyWrapper.getBoundingClientRect().top - 24: 500;
    });
    this.tableDom = this.$refs.multipletable.bodyWrapper;
    this.tableDom.addEventListener("scroll", () => {
      let scrollTop = Math.floor(this.tableDom.scrollTop);
      let windowHeight = this.tableDom.clientHeight || this.tableDom.clientHeight;
      let scrollHeight = this.tableDom.scrollHeight || this.tableDom.scrollHeight;
      if (this.multipleSelection && this.multipleSelection.length !== 0 && this.showList.length === this.multipleSelection.length) {
        this.isSelectAll = true;
      }else{
        this.isSelectAll = false;
      }
      if ((scrollTop + windowHeight )/scrollHeight >0.99) {
        this.showListPage++;
        if (this.showListPage < this.allList.length) {
          this.allList[this.showListPage].forEach(item => {
            this.showList.push(item);
          });
        }
        if (this.isSelectAll) {
          this.showList.forEach(row => {
            this.$refs.multipletable.toggleRowSelection(row, true)
          })
        }
      }
    });
  },
  methods: {
    reSetData(array, subGroupLength) {
      let index = 0;
      let newArray = [];
      while (index < array.length) {
        newArray.push(array.slice(index, (index += subGroupLength)));
      }
      return newArray;
    },
    resetTable() {
      this.isSelectAll = false
      this.showListPage = 0;
      this.$nextTick(() => {
        this.tableDom.scrollTop = 0;
        let clientHeight = `${document.documentElement.clientHeight}` * 1;
        this.tableHeight = clientHeight - this.$refs.multipletable.bodyWrapper.getBoundingClientRect().top - 74 > 500 ? clientHeight - this.$refs.multipletable.bodyWrapper.getBoundingClientRect().top - 24 : 500;
      });
    },
    selectAll() {
      this.isSelectAll = !this.isSelectAll;
    },

  }
};
