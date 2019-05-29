<template>
  <div class="hello">
    <el-row>
        <div style="margin: 0 auto;width:40%;">
          <div class="clearfix" style="font-size:30px;">
            <h2>登录</h2>
          </div>
          <div>
            <br>
            <el-row>
              <el-col :span="2" style="line-height: 40px;">
                <span>账号：</span>
              </el-col>
              <el-col :span="22">
                <el-input
                  prefix-icon="el-icon-user-solid"
                  v-model="userId">
                </el-input>
              </el-col>
            </el-row>
            <br><br>
            <el-row>
              <el-col :span="2" style="line-height: 40px;">
                <span>密码：</span>
              </el-col>
              <el-col :span="22">
                <el-input
                  type="password"
                  prefix-icon="el-icon-s-check"
                  v-model="password">
                </el-input>
              </el-col>
            </el-row>
            <br><br>
            <el-row>
              <el-col>
                <el-button type="primary" style="width:100%;" @click="loginHandle" round>登录</el-button>
              </el-col>
            </el-row>
            <el-dialog
              title="请完善您的信息"
              :visible.sync="signinVisible"
              width="30%">
              <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="姓名" prop="name">
                  <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="sex">
                  <el-radio v-model="ruleForm.sex" label="男">男</el-radio>
                  <el-radio v-model="ruleForm.sex" label="女">女</el-radio>
                </el-form-item>
                <el-form-item label="出生日期" prop="birthday">
                  <el-date-picker
                    value-format="yyyy-MM-dd"
                    v-model="ruleForm.birthday"
                    type="date"
                    placeholder="选择日期">
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="学历" prop="education">
                  <el-input v-model="ruleForm.education"></el-input>
                </el-form-item>
                <el-form-item label="毕业院校" prop="college">
                  <el-input v-model="ruleForm.college"></el-input>
                </el-form-item>
                <el-form-item label="办公地点" prop="address">
                  <el-input v-model="ruleForm.address"></el-input>
                </el-form-item>
              </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button @click="resetForm('ruleForm')">重置</el-button>
                <el-button @click="signinVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitForm('T')">确 定</el-button>
              </span>
            </el-dialog>
            <el-dialog
              title="请完善您的信息"
              :visible.sync="signinVisible1"
              width="30%">
              <el-form :model="ruleForm1" :rules="rules" ref="ruleForm1" label-width="100px" class="demo-ruleForm">
                <el-form-item label="姓名" prop="name">
                  <el-input v-model="ruleForm1.name"></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="sex">
                  <el-radio v-model="ruleForm1.sex" label="男">男</el-radio>
                  <el-radio v-model="ruleForm1.sex" label="女">女</el-radio>
                </el-form-item>
                <el-form-item label="出生日期" prop="birthday">
                  <el-date-picker
                    v-model="ruleForm1.birthday"
                    type="date"
                    placeholder="选择日期">
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="电话" prop="phone">
                  <el-input v-model="ruleForm1.phone"></el-input>
                </el-form-item>
                <el-form-item label="备注信息" prop="tip">
                  <el-input v-model="ruleForm1.tip"></el-input>
                </el-form-item>
              </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button @click="resetForm('ruleForm1')">重置</el-button>
                <el-button @click="signinVisible1 = false">取 消</el-button>
                <el-button type="primary" @click="submitForm('S')">确 定</el-button>
              </span>
            </el-dialog>
          </div>
        </div>
    </el-row>
    
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      signinVisible: false,
      signinVisible1: false,
      type:"",
      userId: "",
      password: "",
      ruleForm: {
        name: '',
        sex: '',
        birthday: '',
        education: '',
        address: '',
        college: ''
      },
      ruleForm1: {
        name: '',
        sex: '',
        birthday: '',
        phone: '',
        tip: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入您的姓名', trigger: 'blur' }
        ],
        sex: [
          { required: true, message: '请选择您的性别', trigger: 'blur' }
        ],
        birthday: [
          { required: true, message: '请选择您的出生日期', trigger: 'blur' }
        ],
        education: [
          { required: true, message: '请输入您的学历', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请输入您的工作地点', trigger: 'blur' }
        ],
        college: [
          { required: true, message: '请输入您的毕业院校', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入您的联系电话', trigger: 'blur' }
        ],
      }
    }
  },
  created() {
  },
  methods: {
    loginHandle(){
      this.axios.post(`${this.API}login`,{
        userId: this.userId,
        password: this.password
      }).
      then(res=>{
        if(res.data.code === 0) {
          if(res.data.data.message === "ok" || res.data.data.type === 'M' || res.data.data.type === 'L') {
            this.$message.success('登录成功！');
            this.Cookies.set('type',res.data.data.type);
            this.Cookies.set('userName',res.data.data.userName);
            this.Cookies.set('userId',this.userId);
            if(res.data.data.type === 'S') {
              this.$router.push({
                path: '/student'
              });
            }
            if(res.data.data.type === 'T') {
              this.$router.push({
                path: '/teacher'
              });
            }
            if(res.data.data.type === 'L') {
              this.$router.push({
                path: '/leader'
              });
            }
            if(res.data.data.type === 'M') {
              this.$router.push({
                path: '/manager'
              });
            }
            location.reload();
          }
          else if(res.data.data.message === "fail") {
            if(res.data.data.type === "T") {
              this.signinVisible = true;
            }
            else if(res.data.data.type === "S") {
              this.signinVisible1 = true;
            }
          }
        }
        else {
            this.$message.error(res.data.message);
        }
      })
    },
    submitForm(type) {
      let tempForm = {};
      let tempVisible = true;
      if(type === "T") {
        tempForm = this.ruleForm;
        tempVisible = this.signinVisible;
      }
      if(type === "S") {
        tempForm = this.ruleForm1;
        tempVisible = this.signinVisible1;
      }
      this.axios.post(`${this.API}signin/${this.userId}`,tempForm).
      then(res=>{
        if(res.data.code === 0) {
            this.$message.success('信息补全成功，请重新登录！');
            if(this.signinVisible1) {
              this.signinVisible1 = false;
            }
            else this.signinVisible = false;
        }
        else {
            this.$message.error(res.data.message);
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
