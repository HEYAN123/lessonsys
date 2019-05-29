<template>
  <div id="app">
    <el-container>
      <el-header style="height:200px;">
        <el-row>
          <el-col :span="12" class="sysname">课程教学质量评测反馈系统</el-col>
          <el-col :span="10" class="username" v-if="login">欢迎，{{name?name:'--'}}</el-col>
          <el-col :span="1" class="username" @click.native="visibleHandle" v-if="login && (identify==='S' || identify==='T')"><i class="el-icon-user-solid"></i>信息</el-col>
          <el-col :span="1" class="username" @click.native="logout" v-if="login"><i class="el-icon-remove"></i>退出</el-col>
        </el-row>
        <el-dialog
            title="学生个人信息"
            :visible.sync="sVisible"
            width="40%">
            <p>账号：{{userInfo.userId}}</p>
            <el-row>
              <el-col :span="12">
                班级：{{userInfo.className}}
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
            </el-row><br>
            <el-row>
              <el-col :span="12">
                姓名：<span v-if="!changeInfo.name">{{userInfo.name}}<el-button icon="el-icon-edit" size="mini" circle style="margin-left:10px;" @click="changeInfo.name=true"></el-button></span>
                <el-input placeholder="请输入姓名" v-model="newName" v-if="changeInfo.name" size="mini" style="width:50%;">
                </el-input>
                <el-button size="mini" v-if="changeInfo.name" icon="el-icon-finished" @click="changeHandle('name')"></el-button>
              </el-col>
              <el-col :span="12">
                性别：<span v-if="!changeInfo.sex">{{userInfo.sex}}<el-button icon="el-icon-edit" size="mini" circle style="margin-left:10px;" @click="changeInfo.sex=true"></el-button></span>
                <el-radio label="男" v-model="newSex" v-if="changeInfo.sex">男</el-radio>
                <el-radio v-model="newSex" v-if="changeInfo.sex" label="女">女</el-radio>
                <el-button icon="el-icon-finished" v-if="changeInfo.sex" @click="changeHandle('sex')" size="mini"></el-button>
                
              </el-col>
            </el-row><br>
            <el-row>
              <el-col :span="12">
                出生日期：<span v-if="!changeInfo.birthday">{{userInfo.birthday}}<el-button icon="el-icon-edit" size="mini" circle style="margin-left:10px;" @click="changeInfo.birthday=true"></el-button></span>
                <el-date-picker type="date" placeholder="请选择正确日期" value-format="yyyy-MM-dd" v-model="newBirthday" v-if="changeInfo.birthday" size="mini" style="width:50%;">
                </el-date-picker>
                <el-button icon="el-icon-finished" @click="changeHandle('birthday')" size="mini" v-if="changeInfo.birthday"></el-button>
              </el-col>
              <el-col :span="12">
                联系电话：<span v-if="!changeInfo.phone">{{userInfo.phone}}<el-button icon="el-icon-edit" size="mini" circle style="margin-left:10px;" @click="changeInfo.phone=true"></el-button></span>
                <el-input placeholder="请输入联系电话" v-model="newPhone" v-if="changeInfo.phone" size="mini" style="width:50%;">
                </el-input>
                <el-button size="mini" v-if="changeInfo.phone" icon="el-icon-finished" @click="changeHandle('phone')"></el-button>
              </el-col>
            </el-row>
            <p>备注信息：<span v-if="!changeInfo.tip">
              {{userInfo.tip}}<el-button icon="el-icon-edit" size="mini" circle style="margin-left:10px;" @click="changeInfo.tip=true"></el-button></span>
              <el-input placeholder="请输入备注信息" v-model="newTip" v-if="changeInfo.tip" size="mini" style="width:80%;" type="textarea">
              </el-input>
              <el-button icon="el-icon-finished" @click="changeHandle('tip')" size="mini" v-if="changeInfo.tip"></el-button>
              </p>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancelHandle">放弃修改</el-button>
                <el-button type="primary" @click="psVisible=true">修改密码</el-button>
            </span>
        </el-dialog>
        <el-dialog
            title="教师个人信息"
            :visible.sync="tVisible"
            width="40%">
            <p>账号：{{userInfo.userId}}</p>
            <el-row>
              <el-col :span="12">
                姓名：<span v-if="!changeInfo.name">{{userInfo.name}}<el-button icon="el-icon-edit" size="mini" circle style="margin-left:10px;" @click="changeInfo.name=true"></el-button></span>
                <el-input placeholder="请输入姓名" v-model="newName" v-if="changeInfo.name" size="mini" style="width:50%;">
                </el-input>
                <el-button size="mini" v-if="changeInfo.name" icon="el-icon-finished" @click="changeHandle('name')"></el-button>
              </el-col>
              <el-col :span="12">
                性别：<span v-if="!changeInfo.sex">{{userInfo.sex}}<el-button icon="el-icon-edit" size="mini" circle style="margin-left:10px;" @click="changeInfo.sex=true"></el-button></span>
                <el-radio label="男" v-model="newSex" v-if="changeInfo.sex">男</el-radio>
                <el-radio v-model="newSex" v-if="changeInfo.sex" label="女">女</el-radio>
                <el-button icon="el-icon-finished" v-if="changeInfo.sex" @click="changeHandle('sex')" size="mini"></el-button>
                
              </el-col>
            </el-row><br>
            <el-row>
              <el-col :span="12">
                电子邮箱：<span v-if="!changeInfo.email">{{userInfo.email}}<el-button icon="el-icon-edit" size="mini" circle style="margin-left:10px;" @click="changeInfo.email=true"></el-button></span>
                <el-input placeholder="请输入电子邮箱" v-model="newEmail" v-if="changeInfo.email" size="mini" style="width:50%;">
                </el-input>
                <el-button size="mini" v-if="changeInfo.email" icon="el-icon-finished" @click="changeHandle('email')"></el-button>
              </el-col>
              <el-col :span="12">
                联系电话：<span v-if="!changeInfo.phone">{{userInfo.phone}}<el-button icon="el-icon-edit" size="mini" circle style="margin-left:10px;" @click="changeInfo.phone=true"></el-button></span>
                <el-input placeholder="请输入联系电话" v-model="newPhone" v-if="changeInfo.phone" size="mini" style="width:50%;">
                </el-input>
                <el-button size="mini" v-if="changeInfo.phone" icon="el-icon-finished" @click="changeHandle('phone')"></el-button>
              </el-col>
            </el-row><br>
            <el-row>
              <el-col :span="12">
                出生日期：<span v-if="!changeInfo.birthday">{{userInfo.birthday}}<el-button icon="el-icon-edit" size="mini" circle style="margin-left:10px;" @click="changeInfo.birthday=true"></el-button></span>
                <el-date-picker type="date" placeholder="请选择正确日期" value-format="yyyy-MM-dd" v-model="newBirthday" v-if="changeInfo.birthday" size="mini" style="width:50%;">
                </el-date-picker>
                <el-button icon="el-icon-finished" @click="changeHandle('birthday')" size="mini" v-if="changeInfo.birthday"></el-button>
              </el-col>
              <el-col :span="12">
                学历：<span v-if="!changeInfo.education">{{userInfo.education}}<el-button icon="el-icon-edit" size="mini" circle style="margin-left:10px;" @click="changeInfo.education=true"></el-button></span>
                <el-input placeholder="请输入您的学历" v-model="newEducation" v-if="changeInfo.education" size="mini" style="width:50%;">
                </el-input>
                <el-button size="mini" v-if="changeInfo.education" icon="el-icon-finished" @click="changeHandle('education')"></el-button>
              </el-col>
            </el-row><br>
            <el-row>
              <el-col :span="12">
                毕业院校：<span v-if="!changeInfo.collage">{{userInfo.collage}}<el-button icon="el-icon-edit" size="mini" circle style="margin-left:10px;" @click="changeInfo.collage=true"></el-button></span>
                <el-input placeholder="请输入你的毕业院校" v-model="newCollage" v-if="changeInfo.collage" size="mini" style="width:50%;">
                </el-input>
                <el-button size="mini" v-if="changeInfo.collage" icon="el-icon-finished" @click="changeHandle('collage')"></el-button>
              </el-col>
              <el-col :span="12">
                办公地点：<span v-if="!changeInfo.address">{{userInfo.address}}<el-button icon="el-icon-edit" size="mini" circle style="margin-left:10px;" @click="changeInfo.address=true"></el-button></span>
                <el-input placeholder="请输入您的办公地点" v-model="newAddress" v-if="changeInfo.address" size="mini" style="width:50%;">
                </el-input>
                <el-button size="mini" v-if="changeInfo.address" icon="el-icon-finished" @click="changeHandle('address')"></el-button>
              </el-col>
            </el-row>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancelHandle">放弃修改</el-button>
                <el-button type="primary" @click="psVisible=true">修改密码</el-button>
            </span>
        </el-dialog>
        <el-dialog
            title="修改密码"
            :visible.sync="psVisible"
            width="30%">
            请输入旧密码：
            <el-input
              type="password"
              v-model="changePs.old">
            </el-input>
            请输入新密码：
            <el-input
              type="password"
              v-model="changePs.new">
            </el-input>
            <span slot="footer" class="dialog-footer">
                <el-button @click="psVisible = false">取 消</el-button>
                <el-button type="primary" @click="changePsHandle()">确 定</el-button>
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
      login: false,
      identify: "",
      name: "",
      sVisible: false,
      tVisible: false,
      psVisible: false,
      changePs: {
        old: "",
        new: ""
      },
      userInfo:{
        userId: "123456",
        className: "2016-6",
        major: "计科",
        years: "4年",
        email: "1234@qq.com",
        education: "本科",
        collage: "林大",
        name:"贺妍",
        address: "行政楼",
        sex: "女",
        birthday: "1998-9-16",
        phone: "1234567890",
        tip: "哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈"
      },
      changeInfo:{
        name: false,
        sex: false,
        birthday: false,
        phone: false,
        address: false,
        tip: false,
        education: false,
        collage: false,
        email: false
      },
      newName: "",
      newSex: "",
      newBirthday: "",
      newPhone: "",
      newTip: "",
      newEmail: "",
      newEducation: "",
      newAddress: "",
      newCollage: ""
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
    },
    visibleHandle() {
      this.axios.get(`${this.API}info/${this.Cookies.get('userId')}`).
        then(res=>{
          this.userInfo = res.data.data;
        })
      if(this.identify === "S") {
        this.sVisible = true;
      }
      else if(this.identify === "T") {
        this.tVisible = true;
      }
    },
    changePsHandle() {
      this.axios.put(`${this.API}info`,{
        userId: this.Cookies.get('userId'),
        oldPs: this.changePs.old,
        newPs: this.changePs.new
      }).
      then(res=>{
        if(res.data.code === 0) {
          this.$message.success('修改密码成功！');
          this.psVisible = false;
        }
        else this.$message.error(res.data.message);
      })
    },
    changeHandle(item) {
      let tempForm = {
        userId: this.Cookies.get('userId')
      };
      switch (item) {
        case 'name':
          tempForm.name = this.name;
          break;
        case 'sex':
          tempForm.sex = this.newSex;
          break;
        case 'birthday':
          tempForm.birthday = this.newBirthday;
          break;
        case 'phone':
          tempForm.phone = this.newPhone;
          break;
        case 'tip':
          tempForm.tip = this.newTip;
          break;
        default:
          tempForm.new = null;
      }
      this.axios.put(`${this.API}info`,tempForm).
      then(res=>{
        if(res.data.code === 0) {
          this.$message.success('修改成功！');
          this.changeInfo[item] = false;
          this.userInfo[item] = tempForm[item];
        }
      })
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
