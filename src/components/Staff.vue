<template>
  <div class="hello">
    <p style="font-size:30px;margin-top:0;">员工中心</p>
    <el-divider content-position="left">当前任务</el-divider>
    <br>
    <p>分配时间：{{taskTime}}</p>
    <p>任务信息：{{taskContent}}</p>
    <br>
    <el-divider content-position="left">工作状态</el-divider>
    <br>
    <p>累计总工时：{{workTime}}</p>
    <p>当前工作状态：{{stateText[workState]}}</p>
    <p>
    <el-button type="primary" :disabled="workState == 0" @click="workHandle(0)">开始工作</el-button>
    <el-button type="success" :disabled="workState == -1 || workState == 1" @click="workHandle(1)">结束工作</el-button>
    <el-button type="warning" @click="workHandle(-1)">有事请假</el-button>
    </p>
    <br>
    <el-divider content-position="left">荣誉扫雪员投选</el-divider>
    <div v-if="voteSysState">
      <el-select v-model="value" placeholder="请为你欣赏的扫雪员投票" style="width:200px;">
        <el-option
          v-for="item in options"
          :key="item.userId"
          :label="item.name"
          :value="item.userId">
        </el-option>
      </el-select>
      <el-button type="primary" size="small" @click="voteHandle" :disabled="!voteState">投票</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Staff',
  data () {
    return {
      taskTime: "--",
      taskContent: "--",
      workTime: "--",
      voteSysState: false,
      options: [],
      value: '',
      voteState: false,
      workState: "1",
      stateText: {
        '1': "待工作",
        '0': "工作中",
        '-1': "请假中"
      }
    }
  },
  created() {
    this.axios.get(`${this.API}task/${this.Cookies.get('userId')}`).
      then(res=>{
        if(res.data.code === 0) {
            this.taskContent = res.data.data.content;
            this.taskTime = res.data.data.time;
        }
        else {
            this.$message.error(res.data.message);
        }
      })
    this.axios.get(`${this.API}workTime/${this.Cookies.get('userId')}`).
    then(res=>{
      if(res.data.code === 0) {
          this.workTime = res.data.data;
      }
      else {
          this.$message.error(res.data.message);
      }
    })
    this.axios.get(`${this.API}voteSysState`).
    then(res=>{
      this.voteSysState = res.data.state == 1?true:false;
    })
    this.axios.get(`${this.API}starfs`).
    then(res=>{
      this.options = res.data.data;
    })
    this.axios.get(`${this.API}voteState/${this.Cookies.get('userId')}`).
    then(res=>{
      this.voteState = res.data.state === 0? true:false;
    })
    this.axios.get(`${this.API}clock/status/${this.Cookies.get('userId')}`).
    then(res=>{
    })
    
  },
  methods:{
    voteHandle() {
      this.axios.get(`${this.API}vote?from=${this.Cookies.get('userId')}&to=${this.value}`).
      then(res=>{
        this.voteState = false;
      })
    },
    workHandle(state) {
      this.axios.get(`${this.API}clock?state=${state}&userId=${this.Cookies.get('userId')}`).
      then(res=>{
        this.workState = state;
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
