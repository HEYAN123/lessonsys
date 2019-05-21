<template>
  <div class="hello">
    <el-divider content-position="left">
      <h2>班级管理</h2>
    </el-divider>
    <el-dropdown trigger="click" @command="handleCommand">
      <el-button type="primary">
        编译原理-{{selectedClass}}班<i class="el-icon-arrow-down el-icon--right"></i>
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="123">编译原理-2016-03班</el-dropdown-item>
        <el-dropdown-item>狮子头</el-dropdown-item>
        <el-dropdown-item>螺蛳粉</el-dropdown-item>
        <el-dropdown-item>双皮奶</el-dropdown-item>
        <el-dropdown-item>蚵仔煎</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-button type="success" @click="addVisible = true">新增学生</el-button>
    <el-dialog
        title="新增学生"
        :visible.sync="addVisible"
        width="30%">
        请输入学生的学号：
        <el-input
          type="text"
          v-model="textarea2">
        </el-input>
        <span slot="footer" class="dialog-footer">
            <el-button @click="changeStaffVisible = false">取 消</el-button>
            <el-button type="primary" @click="changeStaff()">确 定</el-button>
        </span>
    </el-dialog>
        <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
            type="index">
        </el-table-column>
        <el-table-column
            prop="userId"
            label="学号">
        </el-table-column>
        <el-table-column
            prop="userName"
            label="姓名">
        </el-table-column>
        <el-table-column
          prop="sex"
          label="性别">
        </el-table-column>
        <el-table-column
          prop="major"
          label="专业">
        </el-table-column>
        <el-table-column
          prop="major"
          label="操作">
          <template slot-scope="scope">
          <el-button
          plain
          size="mini"
          type="warning"
          >删除</el-button>
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
    <el-divider content-position="left">
      <h2>评教情况</h2>
    </el-divider><br>
    <p><b>当前得分：</b>87</p>
    <p><b>学生评价：</b></p>
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
          userName: "贺妍",
          sex: "女",
          major: "计科",
        },
        {
          userId: "123",
          userName: "贺妍",
          sex: "女",
          major: "计科",
        },
        {
          userId: "123",
          userName: "贺妍",
          sex: "女",
          major: "计科",
        },
        {
          userId: "123",
          userName: "贺妍",
          sex: "女",
          major: "计科",
        },
        {
          userId: "123",
          userName: "贺妍",
          sex: "女",
          major: "计科",
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
