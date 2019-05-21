<template>
  <div class="hello">
    <p style="font-size:30px;margin-top:0;">绩效墙</p>
        <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
            type="index"
            label="排名">
        </el-table-column>
        <el-table-column
            prop="userName"
            label="姓名">
        </el-table-column>
        <el-table-column
            prop="score"
            label="绩效得分">
        </el-table-column>
        <el-table-column
        prop="reward"
        label="得奖情况">
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
    this.axios.get(`${this.API}work?page=1`).
    then(res=>{
      this.tableData = res.data.data.workList;
      this.page = res.data.data.page;
    })
  },
  methods:{
      handleCurrentChange(index) {
        this.nowPage = index;
        this.axios.get(`${this.API}work?page=${this.nowPage}`).
        then(res=>{
          this.tableData = res.data.data.workList;
          this.page = res.data.data.page;
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
