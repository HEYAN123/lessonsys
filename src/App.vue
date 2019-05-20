<template>
  <div id="app">
    <el-container>
      <el-header>
        <el-row>
          <el-col :span="12" class="sysname">扫雪工作管理系统</el-col>
          <el-col :span="10" class="username" v-if="login">欢迎，{{name}}</el-col>
          <el-col :span="2" class="username" @click.native="logout" v-if="login"><i class="el-icon-remove"></i>退出</el-col>
        </el-row>
      </el-header>
      <el-main style="min-height: 700px;background-color:#fff;">
        <el-row>
          <el-col :span="4" style="padding-right:20px;" v-if="login">
            <el-menu
              default-active="2"
              class="el-menu-vertical-demo"
              @select="handleSelect">
              <el-menu-item index="staff" v-if="identify==='A'">
                <i class="el-icon-user"></i>
                <span slot="title">员工中心</span>
              </el-menu-item>
              <el-menu-item index="leader" v-if="identify==='B'">
                <i class="el-icon-user"></i>
                <span slot="title">组长中心</span>
              </el-menu-item>
              <el-menu-item index="manager" v-if="identify==='C'">
                <i class="el-icon-user"></i>
                <span slot="title">管理中心</span>
              </el-menu-item>
              <el-menu-item index="honor">
                <i class="el-icon-medal"></i>
                <span slot="title">荣誉墙</span>
              </el-menu-item>
              <el-menu-item index="perform">
                <i class="el-icon-trophy"></i>
                <span slot="title">绩效墙</span>
              </el-menu-item>
              <el-menu-item index="forum">
                <i class="el-icon-chat-line-round"></i>
                <span slot="title">雪情论坛</span>
              </el-menu-item>
            </el-menu>
          </el-col>
          <el-col :span="login?20:24">
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
  margin-top: 30px;
  border: 1px solid #eee;
}
  .username {
    text-align: right;
    padding-right: 10px;
  }
  .sysname {
    text-align: left;
    font-size: 35px;
    font-weight: 800;
  }
  .el-header {
    color: white;
    line-height: 60px;
    background-color: #409EFF;
  }
</style>
