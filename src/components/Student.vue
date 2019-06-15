<template>
  <div class="hello">
    <el-divider content-position="left">
      <h2>学生评教</h2>
    </el-divider>
    <el-table
      :data="tableData"
      stripe
      style="width: 100%;">
      <el-table-column
        type="index">
      </el-table-column>
      <el-table-column
        prop="teacherName"
        label="教师名称">
      </el-table-column>
      <el-table-column
        prop="teacherLesson"
        label="所授课程">
      </el-table-column>
      <el-table-column
        prop="address"
        label="操作">
        <template slot-scope="scope">
          <el-button
          plain
          size="mini"
          type="primary"
          @click="visibleHandle('scoreVisible',scope.row.userId)"
          :disabled="tableData[scope.$index].score !== 0 || voteState === 0">评分</el-button>
        <el-button
          plain
          size="mini"
          type="success"
          @click="visibleHandle('commentVisible',scope.row.userId)"
          :disabled="commentState === 0">评价</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
        title="评分"
        :visible.sync="scoreVisible"
        width="50%">
        <el-table
          :data="questionTable"
          stripe
          style="width: 100%;">
          <el-table-column
            type="index">
          </el-table-column>
          <el-table-column
            prop="questionContent"
            label="题目">
          </el-table-column>
          <el-table-column
            prop="address"
            label="选项">
            <template slot-scope="scope">
              <el-radio-group v-model="questionResult[scope.$index].rank">
                <el-radio :label="'rank1'">差</el-radio>
                <el-radio :label="'rank2'">中</el-radio>
                <el-radio :label="'rank3'">良</el-radio>
                <el-radio :label="'rank4'">优</el-radio>
              </el-radio-group>
            </template>
          </el-table-column>
        </el-table>
        <span slot="footer" class="dialog-footer">
            <el-button @click="scoreVisible = false">取 消</el-button>
            <el-button type="primary" @click="scoreHandle">确 定</el-button>
        </span>
    </el-dialog>
    <el-dialog
        title="评价"
        :visible.sync="commentVisible"
        width="30%">
        请输入你对该老师的评价：
        <el-input
          type="textarea"
          :autosize="{ minRows: 4}"
          placeholder="请输入内容"
          v-model="comment">
        </el-input>
        <span slot="footer" class="dialog-footer">
            <el-button @click="commentVisible = false">取 消</el-button>
            <el-button type="primary" @click="commentHandle()">确 定</el-button>
        </span>
    </el-dialog>
    <br>
    <el-divider content-position="left">
      <h2>教师反馈</h2>
    </el-divider>
    <el-table
      :data="answer"
      stripe
      style="width: 100%;">
      <el-table-column
        type="index">
      </el-table-column>
      <el-table-column
        prop="teacherName"
        label="教师名称">
      </el-table-column>
      <el-table-column
        prop="teacherLesson"
        label="所授课程">
      </el-table-column>
      <el-table-column
        prop="answer"
        label="评语">
        
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'Student',
  data () {
    return {
      answer:[
        {
            "score":0,
            "teacherName":"李四",
            "teacherLesson":"数据库",
            "userId":"1000004021",
            answer: "学习很刻苦。"
        },
        {
            "score":1,
            "teacherName":"王品",
            "teacherLesson":"测试课程",
            "userId":"1000004020",
            answer: "善于提问，学习热情很高。"
        },
        {
            "score":0,
            "teacherName":"刘老师",
            "teacherLesson":"数学",
            "userId":"1000004022",
            answer: "每次都坐第一排，很积极。"
        },
        {
            "score":0,
            "teacherName":"何老师",
            "teacherLesson":"信息资源管理",
            "userId":"1000004023",
            answer: "学习态度端正。"
        }
    ],
      scoreVisible: false,
      commentVisible: false,
      voteState: 0,
      commentState: 0,
      comment: "",
      selectT: "",
      questionResult:[],
      tableData: [],
      questionTable: []
    }
  },
  created() {
    this.axios.get(`${this.API}sysState`).
    then(res=>{
      this.voteState = res.data.data.voteState;
      this.commentState = res.data.data.commentState;
    });
    this.axios.get(`${this.API}tList/${this.Cookies.get('userId')}`).
    then(res=>{
      this.tableData = res.data.data;
    });
    this.axios.get(`${this.API}question`).
    then(res=>{
      this.questionTable = res.data.data;
      for(let i = 0;i<this.questionTable.length;i++){
      let tempQ = {};
      tempQ.questionId = this.questionTable[i].questionId;
      tempQ.rank = "";
      this.questionResult.push(tempQ);
    }
    });
    
  },
    mounted() {
      
    },
  methods:{
      visibleHandle(visible,userId) {
        this[visible] = true;
        this.selectT = userId;
        if(visible === "scoreVisible") {
          
          // console.log(this.questionResult);
        }
      },
      scoreHandle() {
        for(let i=0;i<this.questionResult.length;i++)
        {
          if(!this.questionResult[i].rank) {
            this.$message.warning("请完成所有题目后再提交！");
            return;
          }
        }
        this.axios.post(`${this.API}vote?from=${this.Cookies.get('userId')}&to=${this.selectT}`,this.questionResult).
        then(res=>{
          if(res.data.code === 0) {
            this.$message.success("评分成功！");
            this.scoreVisible = false;
          }
          else {
            this.$message.error(res.data.message);
          }
        })
      },
      commentHandle() {
        this.comment && this.axios.post(`${this.API}/comment?to=${this.selectT}`,{
          comment: this.comment
        }).then(res=>{
          if(res.data.code === 0) {
            this.$message.success("评价成功！");
            this.commentVisible = false;
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
<style scoped>
.warning-row {
    background-color: oldlace !important;
  }
</style>
