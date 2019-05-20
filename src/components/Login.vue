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
              title="注册"
              :visible.sync="dialogVisible"
              width="30%">
              <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="姓名" prop="name">
                  <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="sex">
                  <el-radio v-model="ruleForm.sex" label="男">男</el-radio>
                  <el-radio v-model="ruleForm.sex" label="女">女</el-radio>
                </el-form-item>
                <el-form-item label="身份证号" prop="idCard">
                  <el-input v-model="ruleForm.userId"></el-input>
                </el-form-item>
                <el-form-item label="工龄" prop="workAge">
                  <el-input v-model="ruleForm.workAge"></el-input>
                </el-form-item>
                <el-form-item label="居住地址" prop="address">
                  <el-input v-model="ruleForm.address"></el-input>
                </el-form-item>
                <el-form-item label="账号密码" prop="password">
                  <el-input v-model="ruleForm.password" type="password"></el-input>
                </el-form-item>
              </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button @click="resetForm('ruleForm')">重置</el-button>
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitForm">确 定</el-button>
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
      dialogVisible: false,
      userId: "",
      password: "",
      ruleForm: {
          name: '',
          sex: '',
          idCard: '',
          workAge: 0,
          address: '',
          password: ''
        },
      rules: {
        name: [
          { required: true, message: '请输入您的姓名', trigger: 'blur' }
        ],
        sex: [
          { required: true, message: '请选择您的性别', trigger: 'blur' }
        ],
        userId: [
          { required: true, message: '请输入您的身份证号码', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请设置您的密码', trigger: 'blur' }
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
            this.$message.success('登录成功！');
            this.Cookies.set('type',res.data.type);
            this.Cookies.set('name',res.data.name);
            this.Cookies.set('userId',this.userId);
            
            if(res.data.type === 'A') {
              this.$router.push({
                path: '/staff'
              });

            }
            if(res.data.type === 'B') {
              this.$router.push({
                path: '/leader'
              });
            }
            if(res.data.type === 'C') {
              this.$router.push({
                path: '/manager'
              });
            }
            location.reload();
        }
        else {
            this.$message.error(res.data.message);
        }
      })
    },
    submitForm() {
      this.axios.post(`${this.API}signin`,this.ruleForm).
      then(res=>{
        if(res.data.code === 0) {
            this.$Message.success('注册成功！');
            this.$router.push({
                path: '/'
            })
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
