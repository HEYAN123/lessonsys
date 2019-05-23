<template>
  <div class="hello">
    <el-divider content-position="left">
      <h2 style="margin: 0;">班级管理</h2>
    </el-divider>
    <el-dropdown trigger="click" @command="handleCommand">
      <el-button type="primary">
        {{selectedItem.lessonId?selectedItem.lessonName+'-'+selectedItem.className+'班':'请选择班级'}}<i class="el-icon-arrow-down el-icon--right"></i>
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item :command="[item.classId,item.className,item.lessonId,item.lessonName]" v-for="item in classList" :key="item.classId+'-'+item.lessonId">{{item.lessonName}}-{{item.className}}</el-dropdown-item>
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
          v-model="addUserId">
        </el-input>
        <span slot="footer" class="dialog-footer">
            <el-button @click="addVisible = false">取 消</el-button>
            <el-button type="primary" @click="addStudent">确 定</el-button>
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
          @click="deleteHandle(scope.row.userId)"
          >删除</el-button>
        </template>
        </el-table-column>

        </el-table>
        <br>
        <el-pagination
        style="text-align:right;"
        background
        layout="prev, pager, next"
        @current-change="handleCurrentChangeS"
        :current-page.sync="nowPageS"
        :page-size="pageS.eachPage"
        :total="pageS.totalSize">
        </el-pagination>
    <el-divider content-position="left">
      <h2 style="margin: 0;">评教情况</h2>
    </el-divider>
    <p><b>当前得分：</b>{{vResult.score}}</p>
    <b>得分分析：</b>
    <div id="myChart" style="width:600px;height:300px;"></div>
    <p><b>学生评价：</b></p>
    <div>
      <el-card class="box-card" shadow="never" v-for="item in commentList" :key="item.commentId" >
        {{item.comment}}
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
      addUserId: "",
      nowPage: 1,
      page:{},
      nowPageS: 1,
      pageS: {},
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
        }
      ],
      classList: [
        {
          classId: "123",
          className: "2016-06",
          lessonId: "1234",
          lessonName: "编译原理"
        },
        {classId: "222",
          className: "2016-07",
          lessonId: "1234",
          lessonName: "编译原理"
        },
        {
          classId: "333",
          className: "2016-08",
          lessonId: "1234",
          lessonName: "编译原理"
        }
      ],
      commentList: [{
        commentId: "1",
        comment: "有趣"
      },
      {
        commentId: "1",
        comment: "有趣"
      },
      {
        commentId: "1",
        comment: "有趣"
      }],
      selectedItem: {
        classId: "",
        className: "",
        lessonId: "",
        lessonName: ""
      },
      vResult: {
        rank4: 0,
        rank3: 0,
        rank2: 0,
        rank1: 0,
        score: 0
      }
    }
  },
  created() {
    this.axios.get(`${this.API}vResult/${this.Cookies.get(userId)}`).
    then(res=>{
      this.vResult = res.data.data;
    });
    this.axios.get(`${this.API}cList?userId=${this.Cookies.get(userId)}&page=${this.nowPage}`).
    then(res=>{
      this.commentList = res.data.data.cList;
      this.page = res.data.data.page;
    });
    this.axios.get(`${this.API}class/${this.Cookies.get(userId)}`).
    then(res=>{
      this.classList = res.data.data;
    });
  },
  mounted() {
    this.drawLine();
  },
  methods:{
    handleCurrentChange(index) {
        this.nowPage = index;
        this.axios.get(`${this.API}cList?userId=${this.Cookies.get('userId')}&page=${this.nowPage}`).
        then(res=>{
          this.commentList = res.data.data.cList;
          this.page = res.data.data.page;
        })
      },
      handleCurrentChangeS(index) {
        this.nowPageS = index;
        this.axios.get(`${this.API}sList?userId=${this.Cookies.get('userId')}&page=${this.nowPageS}`).
        then(res=>{
          this.tableData = res.data.data.sList;
          this.pageS = res.data.data.page;
        })
      },
      handleCommand(command) {
        this.selectedItem.classId = command[0],
        this.selectedItem.className = command[1],
        this.selectedItem.lessonId = command[2],
        this.selectedItem.lessonName = command[3]
        this.axios.get(`${this.API}sList?userId=${this.Cookies.get(userId)}&classId=${this.selectedItem.classId}&lessonId=${this.selectedItem.lessonId}&page=${this.nowPageS}`).
        then(res=>{
          this.classList = res.data.data.sList;
          this.pageS = res.data.data.page;
        });
      },
      addStudent() {
        this.axios.post(`${this.API}sList`,{
          userId: this.addUserId,
          lessonId: this.selectedItem.lessonId
        }).then(res=>{
          if(res.data.code === 0) {
            this.$message.success("添加成功！");
            this.addVisible = false;
          }
          else this.$message.error("服务器异常");
        })
      },
      deleteHandle(userId) {
        this.axios.delete(`${this.API}sList`,{
          userId: userId,
          lessonId: this.selectedItem.lessonId
        }).then(res=>{
          if(res.data.code === 0) {
            this.$message.success("删除成功！");
          }
          else this.$message.error("服务器异常");
        })
      },
      drawLine() {
        let chart = this.echarts.init(document.getElementById('myChart'));
        chart.setOption({
            
            tooltip: {
              trigger: 'axis',
              axisPointer : {
              type : 'shadow'
            }},
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            xAxis: {
                data: ["优","良","中","差"]
            },
            yAxis: {},
            series: [{
                type: 'bar',
                data: [this.vResult.rank4, this.vResult.rank3, this.vResult.rank2, this.vResult.rank1],
                itemStyle: {
                  normal: {
                    color: function(params) { 
                      var colorList = ['#12a182',"#1781b5","#dc9123","#ee3f4d"]; 
                      return colorList[params.dataIndex];
                    }
                  }
                }
            }]
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
