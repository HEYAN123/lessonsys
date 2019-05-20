<template>
  <div class="hello">
    <p style="font-size:30px;margin-top:0;">组长中心</p>
    <el-divider content-position="left">当前任务</el-divider>
    <p>分配时间：{{teamTaskTime}}</p>
    <p>任务信息：{{teamTask}}</p>
    <el-divider content-position="left">借调</el-divider>
    <el-row>
        <el-col :span="12">
            <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入借调需求"
            v-model="borrowContent">
            </el-input>
        </el-col>
        <el-col :span="3">
            <el-button size="small" type="primary" style="margin-left: 10px;" @click="borrowHandle">
                确定
            </el-button>
        </el-col>
    </el-row>
   <el-divider content-position="left">组员工作</el-divider>
   平均工作进度：<el-progress :percentage="averageProgress"></el-progress><br>
    <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
            type="index">
        </el-table-column>
        <el-table-column
            prop="name"
            label="姓名">
        </el-table-column>
        <el-table-column
            prop="userTask"
            label="任务">
        <template slot-scope="scope">
            <div v-html="scope.row.userTask?scope.row.userTask:'暂无'"></div>
        </template>
        </el-table-column>
        <el-table-column
        prop="reward"
        label="进度">
        <template slot-scope="scope">
                    <el-progress :percentage="scope.row.num"></el-progress>
            
        </template>
        </el-table-column>
        <el-table-column
        prop="userId"
        label="操作"
        >
            <template slot-scope="scope">
                <el-button type="primary" size="small" @click="actHandle('processVisible',scope.row.userId)">更新进度</el-button>
                <el-button type="success" size="small" @click="actHandle('taskVisible',scope.row.userId)">分配任务</el-button>                
                <el-button type="warning" size="small" :disabled="performSysState==0?true:false" @click="actHandle('scoreVisible',scope.row.userId)">打分</el-button>
            </template>
        </el-table-column>
        </el-table>
        <el-dialog
            title="更新进度"
            :visible.sync="processVisible"
            width="30%">
            请输入进度值：<el-input v-model="staffProcess" type="number"></el-input>
            <span slot="footer" class="dialog-footer">
                <el-button @click="processVisible = false">取 消</el-button>
                <el-button type="primary" @click="processChange">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
            title="通知任务"
            :visible.sync="taskVisible"
            width="30%">
            请输入任务内容：<el-input v-model="sendTask" type="textarea" :autosize="{ minRows: 4}"></el-input>
            <span slot="footer" class="dialog-footer">
                <el-button @click="taskVisible = false">取 消</el-button>
                <el-button type="primary" @click="sendTaskHandle">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
            title="评估绩效"
            :visible.sync="scoreVisible"
            width="30%">
            请输入分数：<el-input v-model="newScore"></el-input>
            <span slot="footer" class="dialog-footer">
                <el-button @click="scoreVisible = false">取 消</el-button>
                <el-button type="primary" @click="changeScore">确 定</el-button>
            </span>
        </el-dialog>
    <br>
    <el-divider content-position="left">车辆状态</el-divider>
    <el-table
        :data="carTable"
        border
        style="width: 100%">
        <el-table-column
            type="index">
        </el-table-column>
        <el-table-column
            prop="carId"
            label="车辆编号">
        </el-table-column>
        <el-table-column
            prop="num"
            label="车牌号">
        </el-table-column>
        <el-table-column
        prop="state"
        label="当前状态">
        </el-table-column>
        <el-table-column
        prop="reward"
        label="状态更新"
        >
            <template slot-scope="scope">
                <el-button type="primary" size="small" @click="carStateChange(scope.row.carId,'工作中')">工作中</el-button>
                <el-button type="success" size="small" @click="carStateChange(scope.row.carId,'待工作')">待工作</el-button>
                <el-button type="warning" size="small" @click="carStateChange(scope.row.carId,'待维修')">待维修</el-button>
            </template>
        </el-table-column>
        </el-table>
    <br>
    <el-divider content-position="left">工具状态</el-divider>
    <el-table
        :data="toolTable"
        border
        style="width: 100%">
        <el-table-column
            type="index">
        </el-table-column>
        <el-table-column
            prop="toolId"
            label="工具编号">
        </el-table-column>
        <el-table-column
            prop="toolName"
            label="工具名称">
        </el-table-column>
        <el-table-column
        prop="state"
        label="当前状态">
        </el-table-column>
        <el-table-column
        prop="state"
        label="状态更新"
        >
            <template slot-scope="scope">
                <el-button type="primary" size="small" @click="toolStateChange(scope.row.toolId,'工作中')">工作中</el-button>
                <el-button type="success" size="small" @click="toolStateChange(scope.row.toolId,'待工作')">待工作</el-button>
                <el-button type="warning" size="small" @click="toolStateChange(scope.row.toolId,'待维修')">待维修</el-button>
            </template>
        </el-table-column>
        </el-table>
    
  </div>
</template>

<script>
export default {
  name: 'Manager',
  data () {
    return {
        teamTaskTime: "--",
        teamTask: "--",
        borrowContent: "",
        averageProgress: 0,
        performSysState: 0,
        scoreVisible: false,
        processVisible: false,
        taskVisible: false,
        selectUser:"0",
        newScore:0,
        sendTask:"",
        staffProcess:0,
        tableData: [],
        carTable: [],
        toolTable: []
    }
  },
  created() {
      this.axios.get(`${this.API}teamTask/${this.Cookies.get('userId')}`).
      then(res=>{
        if(res.data.code === 0) {
            this.teamTask = res.data.data.content;
            this.teamTaskTime = res.data.data.time;
        }
        else {
            this.$message.error(res.data.message);
        }
      })
      this.axios.get(`${this.API}performSysState`).
      then(res=>{
        this.performSysState = res.data.state;
      });
      this.axios.get(`${this.API}progress/${this.Cookies.get('userId')}`).
      then(res=>{
        if(res.data.code === 0) {
            this.tableData = res.data.data;
            this.averageProgress = res.data.averageProgress
        }
        else {
            this.$message.error(res.data.message);
        }
      })
        this.axios.get(`${this.API}select/tools/${this.Cookies.get('userId')}`).
        then(res=>{
            this.toolTable = res.data.data;
        });
        this.axios.get(`${this.API}select/cars/${this.Cookies.get('userId')}`).
        then(res=>{
            this.carTable = res.data.data;
        });
  },
  methods:{
      borrowHandle() {
          
          this.axios.post(`${this.API}needs`,{
              teamId: this.Cookies.get('userId'),
              applyContent: this.borrowContent
          }).
            then(res=>{
                if(res.data.code == 0) {
                    this.$message.success("发送借调信息成功！");
                }
                else {
                    this.$message.error(res.data.message);
                }
            })
      },
      sendTaskHandle() {
          console.log(this.selectUser)
          this.axios.post(`${this.API}task`,{
              userId: this.selectUser,
              userTask: this.sendTask
          }).
            then(res=>{
                if(res.data.code == 0) {
                    this.$message.success("发送任务信息成功！");
                    this.taskVisible = false;
                }
                else {
                    this.$message.error(res.data.message);
                }
            })
      },
      changeScore() {
          this.axios.get(`${this.API}perform?userId=${this.selectUser}&score=${this.newScore}`).
            then(res=>{
                if(res.data.code == 0) {
                    this.$message.success("评分成功！");
                    this.scoreVisible = false;
                }
                else {
                    this.$message.error(res.data.message);
                }
            })
      },
      carStateChange(carId,text) {
          this.axios.get(`${this.API}update/cars?carId=${carId}&state=${text}`).
            then(res=>{
                if(res.data.code == 0) {
                    this.$message.success("更新状态成功！");
                }
                else {
                    this.$message.error(res.data.message);
                }
            })
      },
      toolStateChange(toolId, text) {
          this.axios.get(`${this.API}update/tools?toolId=${toolId}&state=${text}`).
            then(res=>{
                if(res.data.code == 0) {
                    this.$message.success("更新状态成功！");
                }
                else {
                    this.$message.error(res.data.message);
                }
            })
      },
      actHandle(visible,userId) {
          this[visible]=true;
          this.selectUser=userId;
      },
      processChange() {
          this.axios.get(`${this.API}progress?userId=${this.selectUser}&num=${this.staffProcess}`).
            then(res=>{
            if(res.data.code == 0) {
                this.$message.success("更新进度成功！");
                this.processVisible = false;
            }
            else {
                this.$message.error(res.data.message);
            }
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
