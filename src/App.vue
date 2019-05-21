<template>
  <div id="app">
    <el-container>
      <el-header style="height:200px;">
        <el-row>
          <el-col :span="12" class="sysname">课程教学质量评测反馈系统</el-col>
          <el-col :span="10" class="username" v-if="login">欢迎，{{name?name:'贺妍'}}</el-col>
          <el-col :span="1" class="username" @click.native="infoVisible=true" v-if="login && (identify==='S' || identify==='T')"><i class="el-icon-user-solid"></i>信息</el-col>
          <el-col :span="1" class="username" @click.native="logout" v-if="login"><i class="el-icon-remove"></i>退出</el-col>
        </el-row>
        <el-dialog
            title="个人信息"
            :visible.sync="infoVisible"
            width="40%">
            <p>账号：{{userInfo.userId}}</p>
            <el-row>
              <el-col :span="12">
                班级：{{userInfo.class}}
              </el-col>
              <el-col :span="12">
                专业：{{userInfo.major}}
              </el-col>
            </el-row><br>
            <el-row>
              <el-col :span="12">
                学制：{{userInfo.years}}
              </el-col>
              <el-col :span="12">
                学历：{{userInfo.education}}
              </el-col>
            </el-row>
            <el-row><br>
              <el-col :span="12">
                姓名：<span v-if="!changeInfo.userName">{{userInfo.userName}}<el-button icon="el-icon-edit" size="mini" circle style="margin-left:10px;" @click="changeInfo.userName=true"></el-button></span>
                <el-input placeholder="请输入内容" v-model="newName" v-if="changeInfo.userName" size="mini" style="width:50%;">
                  <el-button slot="append" icon="el-icon-finished"></el-button>
                </el-input>
              </el-col>
              <el-col :span="12">
                性别：{{userInfo.sex}}<el-button icon="el-icon-edit" size="mini" circle style="margin-left:10px;"></el-button>
              </el-col>
            </el-row><br>
            <el-row>
              <el-col :span="12">
                出生日期：{{userInfo.birthday}}<el-button icon="el-icon-edit" size="mini" circle style="margin-left:10px;"></el-button>
              </el-col>
              <el-col :span="12">
                联系电话：{{userInfo.phone}}<el-button icon="el-icon-edit" size="mini" circle style="margin-left:10px;"></el-button>
              </el-col>
            </el-row>
            <p>备注信息：{{userInfo.tip}}<el-button icon="el-icon-edit" size="mini" circle style="margin-left:10px;"></el-button></p>
              
              
              
              <!-- <el-radio v-model="ruleForm1.sex" label="男">男</el-radio>
              <el-radio v-model="ruleForm1.sex" label="女">女</el-radio> -->
              
              <!-- <el-date-picker
                v-model="ruleForm1.birthday"
                type="date"
                placeholder="选择日期">
              </el-date-picker> -->
              
              <!-- <el-input v-model="ruleForm1.phone"></el-input> -->
              
              <!-- <el-input v-model="ruleForm1.tip"></el-input> -->
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancelHandle">放弃修改</el-button>
                <el-button type="primary" @click="changeStaff()">修改密码</el-button>
            </span>
        </el-dialog>
      </el-header>
      <el-main style="min-height: 700px;background-color:#fff;">
        <el-row>
          <el-col :span="24">
            <router-view/>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      login: true,
      identify: "T",
      userName: "",
      infoVisible: false,
      userInfo:{
        userId: "123456",
        class: "2016-6",
        major: "计科",
        years: "4年",
        education: "本科",
        userName:"贺妍",
        sex: "女",
        birthday: "1998-9-16",
        phone: "1234567890",
        tip: "哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈"
      },
      changeInfo:{
        userName: false,
        sex: false,
        birthday: false,
        phone: false,
        tip: false
      },
      newName: "",
      newSex: "",
      newBirthday: "",
      newPhone: "",
      newTip: ""
    }
  },
  created(){
    const type = this.Cookies.get('type');
    const name = this.Cookies.get('userName');
    this.name = name;
    if(type === "S") {
      this.identify = "S";
      this.login = true;
    }
    else if(type === "T") {
      this.identify = "T";
      this.login = true;
    }
    else if(type === "L") {
      this.identify = "L";
      this.login = true;
    }
    else if(type === "M") {
      this.identify = "M";
      this.login = true;
    }
  },
  methods: {
    logout() {
      console.log(this.API)
      this.Cookies.remove('userId');
      this.Cookies.remove('userName');
      this.Cookies.remove('type');
      this.$forceUpdate();
      this.$router.push({
          path: '/'
      })
      location.reload();
    },
    cancelHandle() {
      for(let key  in this.changeInfo){
        this.changeInfo[key] = false;
      }
    }
  }
}
</script>

<style>
#app {
  min-height: 100%;
  height: auto !important;
  height: 100%;
  position: relative;
}
.el-main {
  margin-top: 10px;
  border: 1px solid #eee;
}
  .username {
    text-align: right;
    line-height: 350px;
    height: 200px;
  }
  .sysname {
    text-align: left;
    font-size: 60px;
    font-weight: 300;
    line-height: 200px;
    height: 200px;
  }
  .el-header {
    color: white;
    background-color: #4ec2af;
  }
</style>
