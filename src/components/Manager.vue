<template>
  <div class="hello">
      <el-collapse>
        <el-collapse-item>
            <template slot="title">
            <h2 style="margin: 0;">系统管理</h2>
            </template>
            <el-button type="primary" size="small" @click="changeVote(voteSysState==1?0:1)">{{voteSysState==1?'投票系统关闭':'投票系统开启'}}</el-button>
        <el-button type="success" size="small" @click="changePerform(commentState==1?0:1)">{{commentState==1?'评价系统关闭':'评价系统开启'}}</el-button>
        </el-collapse-item>
        <el-collapse-item>
            <template slot="title">
            <h2 style="margin: 0;">教学管理</h2>
            </template>
            <el-button type="primary" size="small" @click="addTVisible = true">新增教师</el-button>
            <el-button type="warning" size="small">新增课程</el-button>      
    <br><br>
    <el-dialog
        title="新增教师"
        :visible.sync="addTVisible"
        width="30%">
        工号：
        <el-input
          type="text"
          v-model="addT.userId">
        </el-input>
        初始密码：
        <el-input
          type="text"
          v-model="addT.password">
        </el-input>
        姓名：
        <el-input
          type="text"
          v-model="addT.name">
        </el-input>
        电子邮箱：
        <el-input
          type="text"
          v-model="addT.email">
        </el-input>
        <span slot="footer" class="dialog-footer">
            <el-button @click="addTVisible = false">取 消</el-button>
            <el-button type="primary" @click="handleAddT">确 定</el-button>
        </span>
    </el-dialog>
    <el-dialog
        title="新增课程"
        :visible.sync="addTVisible"
        width="30%">
        课程名称：
        <el-input
          type="text"
          v-model="addL.teacherLesson">
        </el-input>
        学分：
        <el-input
          type="text"
          v-model="addL.lessonScore">
        </el-input>
        学时：
        <el-input
          type="text"
          v-model="addL.lessonTime">
        </el-input>
        课程类型：
        <el-input
          type="text"
          v-model="addL.lessonType">
        </el-input>
        任课教师：
        <el-select v-model="addL.userId" placeholder="请选择">
            <el-option  v-for="item in tList" :key="item.userId" :label="item.name" :value="item.userId"></el-option>
        </el-select>
        开课班级：
        <el-select v-model="addL.gradeClass" placeholder="请选择">
            <el-option  v-for="item in cList" :key="item.gradeClass" :label="item.gradeClass" :value="item.gradeClass"></el-option>
        </el-select>
        <span slot="footer" class="dialog-footer">
            <el-button @click="addLVisible = false">取 消</el-button>
            <el-button type="primary" @click="handleAddL">确 定</el-button>
        </span>
    </el-dialog>
    <el-table
        :data="lessonTable"
        stripe
        style="width: 100%">
        <el-table-column
            type="index">
        </el-table-column>
        
        <el-table-column
            prop="userId"
            label="教师工号">
        </el-table-column>
        <el-table-column
            prop="userName"
            label="教师姓名">
            <template slot-scope="scope">
                <el-tooltip class="item" effect="dark"
                :content="`教师姓名：${scope.row.userName}
                电子邮箱：${scope.row.email}
                联系电话：${scope.row.phone}
                性别：${scope.row.sex}
                出生日期：${scope.row.birthday}
                学历：${scope.row.education}
                毕业学校：${scope.row.collage}
                办公地点：${scope.row.address}`"
                placement="top">
                    <el-button type="text">{{scope.row.userName}}</el-button>
                </el-tooltip>
            </template>
        </el-table-column>
        <el-table-column
            prop="lessonName"
            label="课程">
            <template slot-scope="scope">
                <el-tooltip class="item" effect="dark"
                :content="`课程名称：${scope.row.lessonName}
                学分：${scope.row.lessonScore}
                学时：${scope.row.lessonTime}
                类型：${scope.row.lessonType}`"
                placement="top">
                    <el-button type="text">{{scope.row.lessonName}}</el-button>
                </el-tooltip>
            </template>
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
        @current-change="handleLessonChange"
        :current-page.sync="nowLessonPage"
        :page-size="lessonPage.eachPage"
        :total="lessonPage.totalSize"
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
            <h2 style="margin: 0;">学生管理</h2>
            </template>
            <el-select v-model="selectedClass" placeholder="请选择班级" :change="classChange">
                <el-option  v-for="item in cList" :key="item.gradeClass" :label="item.gradeClass" :value="item.gradeClass"></el-option>
            </el-select>
            <el-button type="primary" size="small">新增班级</el-button>  
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
        @current-change="handleStuChange"
        :current-page.sync="nowStuPage"
        :page-size="stuPage.eachPage"
        :total="stuPage.totalSize"
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
        addTVisible: false,
        addT: {
            userId: "",
            password: "",
            name: "",
            email: ""
        },
        addLVisible: false,
        addL: {
            teacherLesson: "",
            lessonScore: "",
            lessonTime: "",
            lessonType: "",
            userId: "",
            gradeClass: ""
        },
        tList: [],
        cList: [],
        lessonPage: {
            totalSize: 0,
            totalPage: 0,
            eachPage: 0,
            nowPage: 0
        },
        stuPage: {
            totalSize: 0,
            totalPage: 0,
            eachPage: 0,
            nowPage: 0
        },
        nowLessonPage: 1,
        nowStuPage: 1,
        selectedClass: "",
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
                lessonId: "123",
                lessonName: "编译原理",
                classId: "123",
                className: "2016-06",
                lessonScore: 2,
                lessonTime: 12,
                lessonType: "必修"
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
                className: "2016-06",
                lessonScore: 2,
                lessonTime: 12,
                lessonType: "必修"
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
                className: "2016-06",
                lessonScore: 2,
                lessonTime: 12,
                lessonType: "必修"
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
    this.axios.get(`${this.API}tList`).
    then(res=>{
    this.tList = res.data.data;
    });
    this.axios.get(`${this.API}gList`).
    then(res=>{
    this.cList = res.data.data;
    this.selectedClass = this.cList[0].gradeClass;
    })
    this.axios.get(`${this.API}teachList?page=1`).
    then(res=>{
    this.lessonTable = res.data.data.teachList;
    this.lessonPage = res.data.data.page;
    })
    this.axios.get(`${this.API}sList?gradeClass=${this.selectedClass}&page=1`).
    then(res=>{
    this.studentTable = res.data.data.sList;
    this.stuPage = res.data.data.page;
    })
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
      changeVote(state) {
        this.axios.put(`${this.API}sysState`,{
            voteState: state
        }).then(res=>{
            if(res.data.code === 0) {
                this.$message.success("修改成功！")
                this.voteState = state
            }
        })
      },
      changePerform(state) {
          this.axios.put(`${this.API}sysState`,{
            commentState: state
        }).then(res=>{
            if(res.data.code === 0) {
                this.$message.success("修改成功！")
                this.commentState = state
            }
        })
      },
      handleAddT() {
          this.axios.post(`${this.API}addT`,this.addT).then(res=>{
            if(res.data.code === 0) {
                this.$message.success("添加成功！")
                this.addTVisible = false;
            }
        })
      },
      handleAddL() {
          this.axios.post(`${this.API}addL`,this.addL).then(res=>{
            if(res.data.code === 0) {
                this.$message.success("添加成功！")
                this.addLVisible = false;
            }
        })
      },
      handleLessonChange(index) {
          this.nowLessonPage = index;
        this.axios.get(`${this.API}teachList?page=${this.nowLessonPage}`).
        then(res=>{
          this.lessonTable = res.data.data.teachList;
          this.lessonPage = res.data.data.page;
        })
      },
      handleStuChange(index) {
        this.nowStuPage = index;
        this.axios.get(`${this.API}sList?page=${this.nowStuPage}`).
        then(res=>{
          this.studentTable = res.data.data.sList;
          this.stuPage = res.data.data.page;
        })
      },
      classChange() {
          this.axios.get(`${this.API}sList?gradeClass=${this.selectedClass}&page=1`).
            then(res=>{
            this.studentTable = res.data.data.sList;
            this.stuPage = res.data.data.page;
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
