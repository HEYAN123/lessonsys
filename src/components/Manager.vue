<template>
  <div class="hello">
    <p style="font-size:30px;margin-top:0;">管理中心</p>
    <el-divider content-position="left">员工管理</el-divider>
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
            prop="sex"
            label="性别">
        </el-table-column>
        <el-table-column
        prop="idcard"
        label="身份证号">
        </el-table-column>
        <el-table-column
        prop="userTeamId"
        label="小组编号">
        <template slot-scope="scope">
            {{scope.row.userTeamId?scope.row.userTeamId:'未分配'}}
        </template>
        </el-table-column>
        <el-table-column
        prop="cstate"
        label="工作状态">
        <template slot-scope="scope">
            {{stateText[scope.row.cstate]}}
        </template>
        </el-table-column>
        <el-table-column
        prop="reward"
        label="操作">
            <template slot-scope="scope">
                <el-button type="primary" size="small" @click="actHandle('changeStaffVisible',scope.row.userId)">调配小组</el-button>
                <el-button type="warning" size="small" @click="actHandle('removeVisible',scope.row.userId)">移出小组</el-button>
            </template>
        </el-table-column>
        </el-table>
        <el-dialog
            title="将员工移出所在小组"
            :visible.sync="removeVisible"
            width="30%">
            确定将该小组成员移出所在小组吗？
            <span slot="footer" class="dialog-footer">
                <el-button @click="removeVisible = false">取 消</el-button>
                <el-button type="primary" @click="removeHandle()">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
            title="调配员工到小组"
            :visible.sync="changeStaffVisible"
            width="30%">
            请输入目标小组编号：<el-input v-model="toTeam"></el-input>
            <span slot="footer" class="dialog-footer">
                <el-button @click="changeStaffVisible = false">取 消</el-button>
                <el-button type="primary" @click="changeStaff()">确 定</el-button>
            </span>
        </el-dialog>
    <br>
    <el-divider content-position="left">小组管理</el-divider>
    <p><el-button type="success" size="small" @click="newTeamVisible=true">新建小组</el-button></p>
    <el-dialog
        title="新建小组"
        :visible.sync="newTeamVisible"
        width="30%">
        请输入小组编号：<el-input v-model="newTeamId"></el-input>
        请输入小组账号密码：<el-input v-model="newTeamPs"></el-input>
        <span slot="footer" class="dialog-footer">
            <el-button @click="newTeamVisible = false">取 消</el-button>
            <el-button type="primary" @click="newTeam">确 定</el-button>
        </span>
    </el-dialog>
    <el-table
        :data="teamTable"
        border
        style="width: 100%">
        <el-table-column
            type="index">
        </el-table-column>
        <el-table-column
            prop="teamId"
            label="小组编号">
        </el-table-column>
        <el-table-column
            prop="taskContent"
            label="任务">
            <template slot-scope="scope">
            <div v-html="scope.row.taskContent?scope.row.taskContent:'暂无'"></div>
        </template>
       
        </el-table-column>
        <el-table-column
        prop="process"
        label="平均进度">
        <template slot-scope="scope">
            {{scope.row.process?scope.row.process:0}}%
            </template>
        </el-table-column>
        <el-table-column
        prop="score"
        label="小组绩效">
        <template slot-scope="scope">
            {{scope.row.score?scope.row.score:'--'}}
            </template>
        </el-table-column>
        
        <el-table-column
        prop="reward"
        label="操作">
            <template slot-scope="scope">
                <el-button type="primary" size="small" @click="actHandle('taskVisible',scope.row.teamId)">分配任务</el-button>
                <el-button type="success" size="small" @click="actHandle('scoreVisible',scope.row.teamId)" :disabled="performSysState==0">打分</el-button>
                <el-button type="warning" size="small" @click="actHandle('deleteVisible',scope.row.teamId)" :disabled="performSysState==0">解散</el-button>          
            </template>
        </el-table-column>
        </el-table>
        <el-dialog
            title="解散小组"
            :visible.sync="deleteVisible"
            width="30%">
            确定要解散该小组吗？
            <span slot="footer" class="dialog-footer">
                <el-button @click="deleteVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteHandle">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
            title="分配小组任务"
            :visible.sync="taskVisible"
            width="30%">
            请输入任务内容：<el-input v-model="taskContent" type="textarea" :autosize="{ minRows: 4}"></el-input>
            <span slot="footer" class="dialog-footer">
                <el-button @click="taskVisible = false">取 消</el-button>
                <el-button type="primary" @click="taskHandle">确 定</el-button>
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
    <el-divider content-position="left">申请管理</el-divider>
    <el-table
        :data="appTable"
        border
        style="width: 100%">
        <el-table-column
            type="index">
        </el-table-column>
        <el-table-column
            prop="teamId"
            label="小组编号">
        </el-table-column>
        <el-table-column
            prop="content"
            label="申请内容">
        </el-table-column>
        <el-table-column
            prop="state"
            label="申请状态">
            <template slot-scope="scope">
                {{appStateText[scope.row.state]}}
            </template>
        </el-table-column>
        <el-table-column
        prop="teamId"
        label="申请处理">
            <template slot-scope="scope">
                <el-button type="primary" size="small" @click="manageApp(scope.row.teamId,1)" :disabled="scope.row.state == 1">调配完成</el-button>
                <el-button type="warning" size="small" @click="manageApp(scope.row.teamId,-1)">忽略申请</el-button>
            </template>
        </el-table-column>
        </el-table>
        <br>
    <el-divider content-position="left">车辆管理</el-divider>
    <p><el-button type="success" size="small" @click="newCarVisible = true">新增车辆</el-button></p>
    <el-dialog
        title="新增车辆"
        :visible.sync="newCarVisible"
        width="30%">
        请输入车牌号：<el-input v-model="newCarNum"></el-input>
        <span slot="footer" class="dialog-footer">
            <el-button @click="newCarVisible = false">取 消</el-button>
            <el-button type="primary" @click="newCar">确 定</el-button>
        </span>
    </el-dialog>
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
            width="400px"
            prop="num"
            label="车牌号">
        </el-table-column>
        <el-table-column
        prop="teamId"
        label="小组编号">
        </el-table-column>
        <el-table-column
        prop="state"
        label="使用状态">
        </el-table-column>
        <el-table-column
        prop="teamId"
        label="操作">
            <template slot-scope="scope">
                <el-button type="primary" size="small" @click="changeCarVisible=true;changeCarId=scope.row.carId">调配</el-button>
            </template>
        </el-table-column>
        </el-table>
        <el-dialog
            title="调配车辆到小组"
            :visible.sync="changeCarVisible"
            width="30%">
            请输入目标小组编号：<el-input v-model="carToTeam"></el-input>
            <span slot="footer" class="dialog-footer">
                <el-button @click="changeCarVisible = false">取 消</el-button>
                <el-button type="primary" @click="changeCar">确 定</el-button>
            </span>
        </el-dialog>
        <br>
    <el-divider content-position="left">工具管理</el-divider>
    <p><el-button type="success" size="small" @click="newToolVisible=true">新增工具</el-button></p>
    <el-dialog
        title="新增工具"
        :visible.sync="newToolVisible"
        width="30%">
        请输入工具名称：<el-input v-model="newToolName"></el-input>
        <span slot="footer" class="dialog-footer">
            <el-button @click="newToolVisible = false">取 消</el-button>
            <el-button type="primary" @click="newTool">确 定</el-button>
        </span>
    </el-dialog>
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
            prop="teamId"
            label="小组编号">
        </el-table-column>
        <el-table-column
            prop="state"
            label="使用状态">
        </el-table-column>
        <el-table-column
        prop="reward"
        label="操作">
            <template slot-scope="scope">
                <el-button type="primary" size="small" @click="changeToolVisible=true;changeToolId=scope.row.toolId">调配</el-button>
            </template>
        </el-table-column>
        </el-table>
        <el-dialog
            title="调配工具到小组"
            :visible.sync="changeToolVisible"
            width="30%">
            请输入目标小组编号：<el-input v-model="toolToTeam"></el-input>
            <span slot="footer" class="dialog-footer">
                <el-button @click="changeToolVisible = false">取 消</el-button>
                <el-button type="primary" @click="changeTool">确 定</el-button>
            </span>
        </el-dialog>
        <br>
        <el-divider content-position="left">活动管理</el-divider>
        <el-button type="primary" size="small" @click="changeVote(voteSysState==1?0:1)">{{voteSysState==1?'投票系统关闭':'投票系统开启'}}</el-button>
        <el-button type="success" size="small" @click="changePerform(performSysState==1?0:1)">{{performSysState==1?'绩效系统关闭':'绩效系统开启'}}</el-button>
  </div>
</template>

<script>
export default {
  name: 'Manager',
  data () {
    return {
        performSysState: 0,
        voteSysState: 0,
        taskContent: "",
        changeOne: "",
        scoreOne: "",
        newTeamId:"",
        newTeamPs:"",
        selectTeam: "",
        changeStaffVisible: false,
        newTeamVisible: false,
        scoreVisible: false,
        taskVisible: false,
        newCarVisible: false,
        changeCarVisible:false,
        newToolVisible: false,
        changeToolVisible: false,
        deleteVisible: false,
        removeVisible: false,
        newToolName: "",
        carToTeam:"",
        toolToTeam:"",
        changeToolId:"",
        changeCarId:"",
        newCarNum: "",
        toTeam:"",
        teamTask:"",
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
      tableData: [],
      teamTable:[],
      appTable:[],
      carTable:[],
      toolTable:[]
    }
  },
  created() {
    this.axios.get(`${this.API}starfs`).
    then(res=>{
    this.tableData = res.data.data;
    })
    this.axios.get(`${this.API}performSysState`).
    then(res=>{
    this.performSysState = res.data.state;
    })
    this.axios.get(`${this.API}voteSysState`).
    then(res=>{
    this.voteSysState = res.data.state;
    })
    this.axios.get(`${this.API}teams`).
    then(res=>{
    this.teamTable = res.data.data;
    })
    this.axios.get(`${this.API}teams`).
    then(res=>{
    this.teamTable = res.data.data;
    })
    this.axios.get(`${this.API}applications`).
    then(res=>{
    this.appTable = res.data.data;
    })
    this.axios.get(`${this.API}select/cars`).
    then(res=>{
    this.carTable = res.data.data;
    })
    this.axios.get(`${this.API}select/tools`).
    then(res=>{
    this.toolTable = res.data.data;
    })
  },
  methods:{
      taskHandle() {
          this.axios.post(`${this.API}changeTeamTask`,{
              teamId: this.selectTeam,
              content: this.taskContent
          }).
            then(res=>{
                if(res.data.code === 0) {
                    this.$message.success("通知成功！");
                    this.taskVisible = false;
                    // location.reload();
                }
            })
      },
      changeStaff() {
          this.axios.put(`${this.API}changeTeam?userId=${this.selectTeam}&teamId=${this.toTeam}`).
            then(res=>{
                if(res.data.code === 0) {
                    this.$message.success("调配成功！");
                    this.changeStaffVisible = false;
                    // location.reload();
                }
            })
      },
      changeScore() {
          this.axios.get(`${this.API}perform/team?teamId=${this.selectTeam}&score=${this.newScore}`).
            then(res=>{
                if(res.data.code === 0) {
                    this.$message.success("打分成功");
                    this.scoreVisible = false;
                    // location.reload();
                }
            })
      },
      newTeam() {
          this.axios.post(`${this.API}newTeam`,{
              teamId: this.newTeamId,
              password: this.newTeamPs
          }).
            then(res=>{
                if(res.data.code === 0) {
                    this.$message.success("创建成功！");
                    this.newTeamVisible = false;
                    // location.reload();
                }
            })
      },
      newCar() {
          this.axios.post(`${this.API}cars`,{
              num:this.newCarNum
          }).
            then(res=>{
                if(res.data.code === 0) {
                    this.$message.success("创建成功！");
                    this.newCarVisible = false;
                    // location.reload();
                }
            })
      },
      newTool() {
          this.axios.post(`${this.API}tools`,{
              toolName:this.newToolName
          }).
            then(res=>{
                if(res.data.code === 0) {
                    this.$message.success("创建成功！");
                    this.newToolVisible = false;
                    // location.reload();
                }
            })
      },
      changeTool() {
          this.axios.put(`${this.API}changeTools?toolId=${this.changeToolId}&teamId=${this.toolToTeam}`).
            then(res=>{
                if(res.data.code === 0) {
                    this.$message.success("调配成功！");
                    this.changeToolVisible = false;
                    // location.reload();
                }
            })
      },
      changeCar() {
          this.axios.put(`${this.API}changeCars?carId=${this.changeCarId}&teamId=${this.carToTeam}`).
            then(res=>{
                if(res.data.code === 0) {
                    this.$message.success("调配成功！");
                    this.changeCarVisible = false;
                    // location.reload();
                }
            })
      },
      manageApp(teamId,state) {
          this.axios.get(`${this.API}apply?teamId=${teamId}&apply=${state}`).
            then(res=>{
                if(res.data.code === 0) {
                    this.$message.success("修改状态成功");
                    // location.reload();
                }
            })
      },
      changeVote(state) {
          this.axios.put(`${this.API}manageVoteState?state=${state}`).
            then(res=>{
                if(res.data.code === 0) {
                    location.reload();
                    this.$message.success("修改状态成功");
                    // 
                }
            })
      },
      changePerform(state) {
          this.axios.put(`${this.API}managePerformState?state=${state}`).
            then(res=>{
                if(res.data.code === 0) {
                    location.reload();
                    this.$message.success("修改状态成功");
                    
                }
            })
      },
      actHandle(visible,teamId) {
          this[visible]=true;
          this.selectTeam=teamId;
      },
      deleteHandle() {
          this.axios.get(`${this.API}deleteGroup?teamId=${this.selectTeam}`).
            then(res=>{
                if(res.data.code === 0) {
                    this.$message.success("解散成功！");
                    // location.reload();
                }
            })
      },
      removeHandle() {
          this.axios.get(`${this.API}deleteUser?userId=${this.selectTeam}`).
            then(res=>{
                if(res.data.code === 0) {
                    this.$message.success("移出成功！");
                    // location.reload();
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
