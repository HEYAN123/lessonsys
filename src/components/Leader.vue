<template>
  <div class="hello">
    <el-divider content-position="left">
      <h2>评教统计</h2>
    </el-divider>
    <p>
        <el-dropdown trigger="click" @command="handleCommand">
        <el-button type="primary">
            按所教班级学生统计<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="123">编译原理-2016-03班</el-dropdown-item>
            <el-dropdown-item>狮子头</el-dropdown-item>
            <el-dropdown-item>螺蛳粉</el-dropdown-item>
            <el-dropdown-item>双皮奶</el-dropdown-item>
            <el-dropdown-item>蚵仔煎</el-dropdown-item>
        </el-dropdown-menu>
        </el-dropdown>
        <el-button type="success" @click="addVisible = true"><i class="el-icon-download"></i>导出统计表</el-button>
    
    </p>
    
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
          prop="score"
          label="得分">
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
    <el-divider content-position="left">
      <h2>学生评价</h2>
    </el-divider>
    <p>
        <el-dropdown trigger="click" @command="handleCommand">
      <el-button type="primary">
        贺老师<i class="el-icon-arrow-down el-icon--right"></i>
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="123">编译原理-2016-03班</el-dropdown-item>
        <el-dropdown-item>狮子头</el-dropdown-item>
        <el-dropdown-item>螺蛳粉</el-dropdown-item>
        <el-dropdown-item>双皮奶</el-dropdown-item>
        <el-dropdown-item>蚵仔煎</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    </p>
    
    <div>
      <el-card class="box-card" shadow="never">
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
      addVisible: false,
      nowPage: 1,
      page:{},
      tableData: [
        {
          userId: "123",
          userName: "和老师",
          score: 90
        },
        {
          userId: "123",
          userName: "李老师",
          score: 90
        },
        {
          userId: "123",
          userName: "张老师",
          score: 90
        },
        {
          userId: "123",
          userName: "赵老师",
          score: 90
        },
        {
          userId: "123",
          userName: "贺妍",
          score: 90
        },
      ],
      selectedClass: "2016-03"
    }
  },
  created() {
    // this.axios.get(`${this.API}work?page=1`).
    // then(res=>{
    //   this.tableData = res.data.data.workList;
    //   this.page = res.data.data.page;
    // })
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
      handleCommand(command) {
        this.selectedClass = command;
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
