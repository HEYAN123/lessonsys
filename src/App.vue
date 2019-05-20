<template>
  <div id="app">
    <el-container>
      <el-header style="height:200px;">
        <el-row>
          <el-col :span="12" class="sysname">课程教学质量评测反馈系统</el-col>
          <el-col :span="10" class="username" v-if="login">欢迎，{{name}}</el-col>
          <el-col :span="2" class="username" @click.native="logout" v-if="login"><i class="el-icon-remove"></i>退出</el-col>
        </el-row>
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
      identify: "",
      name: "",
    }
  },
  created(){
    const type = this.Cookies.get('type');
    const name = this.Cookies.get('name');
    this.name = name;
    if(type === "A") {
      this.identify = "A";
      this.login = true;
    }
    else if(type === "B") {
      this.identify = "B";
      this.login = true;
    }
    else if(type === "C") {
      this.identify = "C";
      this.login = true;
    }
  },
  methods: {
    logout() {
      console.log(this.API)
      this.Cookies.remove('userId');
      this.Cookies.remove('name');
      this.Cookies.remove('type');
      this.$forceUpdate();
      this.$router.push({
          path: '/'
      })
      location.reload();
    },
    handleSelect(key) {
      this.$router.push({
        path: `/${key}`
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
    padding-right: 10px;
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
