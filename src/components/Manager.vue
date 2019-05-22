<template>
  <div class="hello">
      <el-collapse>
        <el-collapse-item>
            <template slot="title">
            <h2 style="margin: 0;">系统管理</h2>
            </template>
            <el-button type="primary" size="small" @click="changeVote(voteSysState==1?0:1)">{{voteSysState==1?'投票系统关闭':'投票系统开启'}}</el-button>
        <el-button type="success" size="small" @click="changePerform(performSysState==1?0:1)">{{performSysState==1?'评价系统关闭':'评价系统开启'}}</el-button>
        </el-collapse-item>
        <el-collapse-item>
            <template slot="title">
            <h2 style="margin: 0;">教学管理</h2>
            </template>
            <el-button type="primary" size="small">新增教师</el-button>
      <el-button type="success" size="small">新增班级</el-button>
      <el-button type="warning" size="small">新增课程</el-button>      
    <br><br>
    <el-table
        :data="lessonTable"
        stripe
        style="width: 100%">
        <el-table-column
            type="index">
        </el-table-column>
        <el-table-column type="expand">
        <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="教师姓名:">
                <span>{{ props.row.userName }}</span>
            </el-form-item>
            <el-form-item label="电子邮箱:">
                <span>{{ props.row.email }}</span>
            </el-form-item>
            <el-form-item label="联系电话:">
                <span>{{ props.row.phone }}</span>
            </el-form-item>
            <el-form-item label="性别:">
                <span>{{ props.row.sex }}</span>
            </el-form-item>
            <el-form-item label="出生日期:">
                <span>{{ props.row.birthday }}</span>
            </el-form-item>
            <el-form-item label="学历:">
                <span>{{ props.row.education }}</span>
            </el-form-item>
            <el-form-item label="毕业院校:">
                <span>{{ props.row.collage }}</span>
            </el-form-item>
            <el-form-item label="办公地点:">
                <span>{{ props.row.address }}</span>
            </el-form-item>
            </el-form>
        </template>
        </el-table-column>
        <el-table-column
            prop="userId"
            label="教师工号">
        </el-table-column>
        <el-table-column
            prop="userName"
            label="教师姓名">
        </el-table-column>
        <el-table-column
            prop="lessonName"
            label="课程">
        </el-table-column>
        <el-table-column
        prop="className"
        label="班级">
        </el-table-column>
        <el-table-column
        prop="reward"
        label="操作">
            <template slot-scope="scope">
                <el-button type="primary" plain size="mini" @click="actHandle('removeVisible',scope.row.userId)">修改</el-button>
                <el-button type="warning" plain size="mini" @click="actHandle('changeStaffVisible',scope.row.userId)">删除</el-button>
            </template>
        </el-table-column>
        </el-table><br>
        <el-pagination
        style="text-align:right;"
        background
        layout="prev, pager, next"
        >
        </el-pagination>
        </el-collapse-item>
        <el-collapse-item>
            <template slot="title">
            <h2 style="margin: 0;">投票题目管理</h2>
            </template>
            <el-button type="primary" size="small">新增题目</el-button>
      <br><br>
      <el-table
        stripe
        :data="questionTable"
        style="width: 100%">
        <el-table-column
            type="index">
        </el-table-column>
        <el-table-column
            prop="questionContent"
            label="题目"
            width="800"
            >
        </el-table-column>
        <el-table-column
            prop="4"
            label="优">
        </el-table-column>
        <el-table-column
        prop="3"
        label="良">
        </el-table-column>
        <el-table-column
        prop="2"
        label="中">
        </el-table-column>
        <el-table-column
        prop="1"
        label="差">
        </el-table-column>
        
        <el-table-column
        prop="reward"
        label="操作">
            <template slot-scope="scope">
                <el-button type="primary" plain size="mini" @click="actHandle('removeVisible',scope.row.userId)">修改</el-button>
                <el-button type="warning" plain size="mini" @click="actHandle('changeStaffVisible',scope.row.userId)">删除</el-button>
            </template>
        </el-table-column>
        </el-table><br>
        </el-collapse-item>
        <el-collapse-item>
            <template slot="title">
            <h2 style="margin: 0;">反馈管理</h2>
            </template>
            请输入低分反馈界限值：
            <el-input type="number" style="width: 200px;"></el-input><br><br>
            请输入低分反馈内容：
            <el-input
                type="textarea"
                :autosize="{ minRows: 4}"
                v-model="textarea2">
            </el-input><br><br>
            <el-button plain size="mini" type="primary">确定</el-button>
        </el-collapse-item>
        <el-collapse-item>
            <template slot="title">
            <h2 style="margin: 0;">学生管理</h2>
            </template>
            <el-button type="primary" size="small">新增学生</el-button>   
        <br><br>
    <el-table
        :data="studentTable"
        stripe
        style="width: 100%">
        <el-table-column
            type="index">
        </el-table-column>
         <el-table-column type="expand">
        <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="学生姓名:">
                <span>{{ props.row.userName }}</span>
            </el-form-item>
            <el-form-item label="联系电话:">
                <span>{{ props.row.phone }}</span>
            </el-form-item>
            <el-form-item label="性别:">
                <span>{{ props.row.sex }}</span>
            </el-form-item>
            <el-form-item label="出生日期:">
                <span>{{ props.row.birthday }}</span>
            </el-form-item>
            <el-form-item label="学历:">
                <span>{{ props.row.education }}</span>
            </el-form-item>
            <el-form-item label="备注:">
                <span>{{ props.row.tip }}</span>
            </el-form-item>
            </el-form>
        </template>
        </el-table-column>
        <el-table-column
            prop="userId"
            label="学号">
        </el-table-column>
        <el-table-column
            prop="userName"
            label="学生姓名">
        </el-table-column>
        <el-table-column
            prop="className"
            label="班级">
        </el-table-column>
        <el-table-column
        prop="major"
        label="专业">
        </el-table-column>
        <el-table-column
        prop="reward"
        label="操作">
            <template slot-scope="scope">
                <el-button type="primary" plain size="mini" @click="actHandle('removeVisible',scope.row.userId)">修改</el-button>
                <el-button type="warning" plain size="mini" @click="actHandle('changeStaffVisible',scope.row.userId)">删除</el-button>
            </template>
        </el-table-column>
        </el-table><br>
        <el-pagination
        style="text-align:right;"
        background
        layout="prev, pager, next"
        >
        </el-pagination>
        </el-collapse-item>
      </el-collapse>    
  </div>
</template>

<script>
export default {
  name: 'Manager',
  data () {
    return {
        
        newScore:0,
        appStateText: "--",
      stateText:{
          "0": "工作中",
          "1": "待工作",
          "-1": "请假中"
      },
      appStateText:{
          1:"调配完成",
          0:"未处理"
      },
      questionTable: [
          {
              questionId: "123",
              questionContent: "他教的有趣吗？",
              4:5,
              3:3,
              2:2,
              1:0
          },
          {
              questionId: "123",
              questionContent: "他教的有趣吗？",
              4:5,
              3:3,
              2:2,
              1:0
          },
          {
              questionId: "123",
              questionContent: "他教的有趣吗？",
              4:5,
              3:3,
              2:2,
              1:0
          },
          {
              questionId: "123",
              questionContent: "他教的有趣吗？",
              4:5,
              3:3,
              2:2,
              1:0
          },
          {
              questionId: "123",
              questionContent: "他教的有趣吗？",
              4:5,
              3:3,
              2:2,
              1:0
          }
      ],
      lessonTable: [
          {
                userId: "123",
                userName: "贺老师",
                email: "123456@qq.com",
                phone: "123445678",
                sex: "女",
                birthday: "1998-09-16",
                education: "博士",
                collage: "林大",
                address: "林大行政楼",
                lessonName: "编译原理",
                className: "2016-06"
          },
          {
                userId: "123",
                userName: "贺老师",
                email: "123456@qq.com",
                phone: "123445678",
                sex: "女",
                birthday: "1998-09-16",
                education: "博士",
                collage: "林大",
                address: "林大行政楼",
                lessonName: "编译原理",
                className: "2016-06"
          },
          {
                userId: "123",
                userName: "贺老师",
                email: "123456@qq.com",
                phone: "123445678",
                sex: "女",
                birthday: "1998-09-16",
                education: "博士",
                collage: "林大",
                address: "林大行政楼",
                lessonName: "编译原理",
                className: "2016-06"
          },
          {
                userId: "123",
                userName: "贺老师",
                email: "123456@qq.com",
                phone: "123445678",
                sex: "女",
                birthday: "1998-09-16",
                education: "博士",
                collage: "林大",
                address: "林大行政楼",
                lessonName: "编译原理",
                className: "2016-06"
          },
          {
                userId: "123",
                userName: "贺老师",
                email: "123456@qq.com",
                phone: "123445678",
                sex: "女",
                birthday: "1998-09-16",
                education: "博士",
                collage: "林大",
                address: "林大行政楼",
                lessonName: "编译原理",
                className: "2016-06"
          }
      ],
      studentTable: [
            {
                userId: "123456",
                className: "2016-6",
                major: "计科",
                years: "4年",
                education: "本科",
                userName:"贺妍",
                sex: "女",
                birthday: "1998-9-16",
                phone: "1234567890",
                tip: "哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈"
            },
            {
                userId: "123456",
                className: "2016-6",
                major: "计科",
                years: "4年",
                education: "本科",
                userName:"贺妍",
                sex: "女",
                birthday: "1998-9-16",
                phone: "1234567890",
                tip: "哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈"
            },
            {
                userId: "123456",
                className: "2016-6",
                major: "计科",
                years: "4年",
                education: "本科",
                userName:"贺妍",
                sex: "女",
                birthday: "1998-9-16",
                phone: "1234567890",
                tip: "哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈"
            },
            {
                userId: "123456",
                className: "2016-6",
                major: "计科",
                years: "4年",
                education: "本科",
                userName:"贺妍",
                sex: "女",
                birthday: "1998-9-16",
                phone: "1234567890",
                tip: "哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈"
            },
            {
                userId: "123456",
                className: "2016-6",
                major: "计科",
                years: "4年",
                education: "本科",
                userName:"贺妍",
                sex: "女",
                birthday: "1998-9-16",
                phone: "1234567890",
                tip: "哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈"
            }
      ]
    }
  },
  created() {
    // this.axios.get(`${this.API}starfs`).
    // then(res=>{
    // this.tableData = res.data.data;
    // })
    // this.axios.get(`${this.API}performSysState`).
    // then(res=>{
    // this.performSysState = res.data.state;
    // })
    // this.axios.get(`${this.API}voteSysState`).
    // then(res=>{
    // this.voteSysState = res.data.state;
    // })
    // this.axios.get(`${this.API}teams`).
    // then(res=>{
    // this.teamTable = res.data.data;
    // })
    // this.axios.get(`${this.API}teams`).
    // then(res=>{
    // this.teamTable = res.data.data;
    // })
    // this.axios.get(`${this.API}applications`).
    // then(res=>{
    // this.appTable = res.data.data;
    // })
    // this.axios.get(`${this.API}select/cars`).
    // then(res=>{
    // this.carTable = res.data.data;
    // })
    // this.axios.get(`${this.API}select/tools`).
    // then(res=>{
    // this.toolTable = res.data.data;
    // })
  },
  methods:{
      

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.warning-row {
    background-color: oldlace !important;
  }
</style>
