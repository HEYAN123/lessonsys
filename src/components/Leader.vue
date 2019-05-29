<template>
  <div class="hello">
    <el-divider content-position="left">
      <h2 style="margin-bottom:0px;">评教统计</h2>
    </el-divider><br>
        <el-button type="success" @click="downLoad"><i class="el-icon-download"></i>导出统计表</el-button>
    
        <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
            type="index">
        </el-table-column>
        <el-table-column
            prop="userId"
            label="工号">
        </el-table-column>
        <el-table-column
            prop="userName"
            label="姓名">
        </el-table-column>
        <el-table-column
            prop="rank4"
            label="优">
            <template slot-scope="scope">
              {{scope.row.rank4}}%
            </template>
        </el-table-column>
        <el-table-column
            prop="rank3"
            label="良">
            <template slot-scope="scope">
              {{scope.row.rank3}}%
            </template>
        </el-table-column>
        <el-table-column
            prop="rank2"
            label="中">
            <template slot-scope="scope">
              {{scope.row.rank2}}%
            </template>
        </el-table-column>
        <el-table-column
            prop="rank1"
            label="差">
            <template slot-scope="scope">
              {{scope.row.rank1}}%
            </template>
        </el-table-column>
        <el-table-column
          prop="score"
          label="得分">
        </el-table-column>
        </el-table>
        <br>
        <el-pagination
        style="text-align:right;"
        background
        layout="prev, pager, next"
        @current-change="handleVoteChange"
        :current-page.sync="nowVotePage"
        :page-size="votePage.eachPage"
        :total="votePage.totalSize">
        </el-pagination>
    <el-divider content-position="left">
      <h2>学生评价</h2>
    </el-divider>
    <p>
      <el-select v-model="selectedTeacher" placeholder="请选择教师" :change="classChange">
          <el-option  v-for="item in cList" :key="item.gradeClass" :label="item.gradeClass" :value="item.gradeClass"></el-option>
      </el-select>
    </p>
    
    <div>
      <el-card class="box-card" shadow="never" v-for="item in tList" :key="item.userId">
        评教内容评教内容评教内容
      </el-card>
      <el-card class="box-card" shadow="never">
        评教内容评教内容评教内容
      </el-card>
      <el-card class="box-card" shadow="never">
        评教内容评教内容评教内容
      </el-card>
      <el-card class="box-card" shadow="never">
        评教内容评教内容评教内容
      </el-card>
    </div><br>
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
      nowVotePage: 1,
      page:{},
      votePage: {},
      tableData: [
        {
          userId: "123",
          userName: "张老师",
          rank4: 50,
          rank3: 30,
          rank2: 20,
          rank1: 0,
          score: 90
        }
      ],
      selectedClass: "2016-03"
    }
  },
  created() {
    this.axios.get(`${this.API}analyse?page=1`).
    then(res=>{
      this.tableData = res.data.data.vList;
      this.votePage = res.data.data.votePage;
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
      },
      handleVoteChange(index) {
        this.nowVotePage = index;
        this.axios.get(`${this.API}analyse?page=${this.nowVotePage}`).
        then(res=>{
          this.tableData = res.data.data.vList;
          this.page = res.data.data.page;
        })
      },
      handleCommand(command) {
        this.selectedClass = command;
      },
      downLoad() {
        this.axios.get(`${this.API}download`).
        then(res=>{
          
        });
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
