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
        prop="userName"
        label="教师名称">
      </el-table-column>
      <el-table-column
        prop="lessonName"
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
          @click="visibleHandle('scoreVisible',scope.row.userId)">评分</el-button>
        <el-button
          plain
          size="mini"
          type="success"
          @click="visibleHandle('commentVisible',scope.row.userId)">评价</el-button>
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
              <el-radio-group v-model="questionResult[scope.$index].result">
                <el-radio :label="4">差</el-radio>
                <el-radio :label="3">中</el-radio>
                <el-radio :label="2">良</el-radio>
                <el-radio :label="1">优</el-radio>
              </el-radio-group>
            </template>
          </el-table-column>
        </el-table>
        <span slot="footer" class="dialog-footer">
            <el-button @click="changeStaffVisible = false">取 消</el-button>
            <el-button type="primary" @click="changeStaff()">确 定</el-button>
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
          v-model="textarea2">
        </el-input>
        <span slot="footer" class="dialog-footer">
            <el-button @click="changeStaffVisible = false">取 消</el-button>
            <el-button type="primary" @click="changeStaff()">确 定</el-button>
        </span>
    </el-dialog>
    <br>
  </div>
</template>

<script>
export default {
  name: 'Student',
  data () {
    return {
      scoreVisible: false,
      commentVisible: false,
      questionResult:[
        {
          questionId: "1",
          result: 0,
        },
        {
          questionId: "1",
          result: 0,
        },
        {
          questionId: "1",
          result: 0,
        },
        {
          questionId: "1",
          result: 0,
        },
        {
          questionId: "1",
          result: 0,
        },
        {
          questionId: "1",
          result: 0,
        },
        {
          questionId: "1",
          result: 0,
        },
        {
          questionId: "1",
          result: 0,
        },
        {
          questionId: "1",
          result: 0,
        },
        {
          questionId: "1",
          result: 0,
        },
        {
          questionId: "1",
          result: 0,
        }
      ],
      tableData: [{
          userId:'123',
          userName: '何老师',
          lessonName: '编译原理'
        },{
          userId:'123',
          userName: '何老师',
          lessonName: '编译原理'
        },{
          userId:'123',
          userName: '何老师',
          lessonName: '编译原理'
        },{
          userId:'123',
          userName: '何老师',
          lessonName: '编译原理'
        },{
          userId:'123',
          userName: '何老师',
          lessonName: '编译原理'
        },{
          userId:'123',
          userName: '何老师',
          lessonName: '编译原理'
        },{
          userId:'123',
          userName: '何老师',
          lessonName: '编译原理'
        },{
          userId:'123',
          userName: '何老师',
          lessonName: '编译原理'
        },{
          userId:'123',
          userName: '何老师',
          lessonName: '编译原理'
        },{
          userId:'123',
          userName: '何老师',
          lessonName: '编译原理'
        },],
        questionTable: [
          {
            questionId: "1",
            questionContent: "她教的有趣吗？",
          },
          {
            questionId: "2",
            questionContent: "她教的有趣吗？",
          },
          {
            questionId: "3",
            questionContent: "她教的有趣吗？",
          },
          {
            questionId: "4",
            questionContent: "她教的有趣吗？",
          },
          {
            questionId: "5",
            questionContent: "她教的有趣吗？",
          },
          {
            questionId: "6",
            questionContent: "她教的有趣吗？",
          },
          {
            questionId: "7",
            questionContent: "她教的有趣吗？",
          },
          {
            questionId: "8",
            questionContent: "她教的有趣吗？",
          },
          {
            questionId: "9",
            questionContent: "她教的有趣吗？",
          },
          {
            questionId: "10",
            questionContent: "她教的有趣吗？",
          },
        ]
    }
  },
  created() {
    this.axios.get(`${this.API}snowContent?snowId=${this.$route.params.id}`).
    then(res=>{
      this.content = res.data.data.content;
      this.title = res.data.data.title;
      this.author = res.data.data.author;
      this.time = res.data.data.time;
    });
    this.axios.get(`${this.API}comments?snowId=${this.$route.params.id}&page=${this.nowPage}`).
    then(res=>{
      this.snows = res.data.data.commentList;
      this.page = res.data.data.page;
    });
  },
  methods:{
      visibleHandle(visible,userId) {
        this[visible] = true;
        this.selectT = userId;
      },
      tableRowClassName({row, rowIndex}) {
        if (rowIndex < 3) {
          return 'warning-row';
        } 
        return '';
      },
      handleCurrentChange(index) {
        this.nowPage = index;
        this.axios.get(`${this.API}comments?snowId=${this.$route.params.id}&page=${this.nowPage}`).
        then(res=>{
          this.snows = res.data.data.commentList;
          this.page = res.data.data.page;
        })
      },
      commentHandle() {
        this.comment && this.axios.post(`${this.API}newComment`,{
          userId: this.Cookies.get('userId'),
          snowId: this.$route.params.id,
          content: this.comment
        }).
        then(res=>{
          location.reload();
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
