<template>
  <div class="hello">
    <p style="font-size:30px;margin-top:0;">荣誉墙</p>
        <el-table
        :data="tableData"
        :row-class-name="tableRowClassName"
        style="width: 100%">
        <el-table-column
            type="index"
            label="排名">
            <template slot-scope="scope">
                {{scope.$index+1+(nowPage-1)*5}}
            </template>
        </el-table-column>
        <el-table-column
            prop="userName"
            label="姓名">
        </el-table-column>
        <el-table-column
            prop="vote"
            label="所得票数">
        </el-table-column>
        <el-table-column
        prop="tag"
        label="荣誉">
        <template slot-scope="scope">
            {{(scope.$index+1+(nowPage-1)*5) >3 ? null :"荣誉扫雪员"}}
        </template>
        </el-table-column>
        </el-table>
        <br>
        <el-pagination
        style="text-align:right;"
        background
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
        :current-page.sync="nowPage"
        :page-size="page.eachPage"
        :total="page.totalSize">
        </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'Honor',
  data () {
    return {
      nowPage: 1,
      page:{},
      tableData: []
    }
  },
  created() {
    this.axios.get(`${this.API}honor?page=1`).
    then(res=>{
      this.tableData = res.data.data.honorList;
      this.page = res.data.data.pages;
    })
  },
  methods:{
      tableRowClassName({row, rowIndex}) {
        if (rowIndex < 3 && this.nowPage == 1) {
          return 'warning-row';
        } 
        return '';
      },
      handleCurrentChange(index) {
        this.nowPage = index;
        this.axios.get(`${this.API}honor?page=${this.nowPage}`).
        then(res=>{
          this.tableData = res.data.data.honorList;
          this.page = res.data.data.pages;
        })
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.warning-row {
    background-color: oldlace !important;
  }
</style>
