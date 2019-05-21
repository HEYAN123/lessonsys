<template>
  <div class="hello">
    <p style="font-size:30px;margin-top:0;margin-bottom:0;">{{title}}</p>
    <p style="color: #666666;">{{`${time} ${author}`}}</p>
    <el-divider></el-divider>
    <div v-html="content" style="word-wrap:break-word;"></div>
    <br>
    <el-divider></el-divider>
    <el-card class="box-card" shadow="never" style="color:#777777;" v-for="snow in snows" :key="snow.snowId" >
        <p><i class="el-icon-s-custom"></i>{{`${snow.author} ${snow.time}`}}</p>
        <el-row>
            <el-col :span="20" style="color:#333333;" v-html="snow.content">
              
            </el-col>
            <el-col :span="4"></el-col>
        </el-row><br>
    </el-card>
    <br>
    <el-pagination
    style="text-align:right;"
    background
    layout="prev, pager, next"
    @current-change="handleCurrentChange"
    :current-page.sync="nowPage"
    :page-size="page.eachPage"
    :total="page.totalSize">
    </el-pagination>
    <br>
    <quill-editor
    v-model="comment" 
    ref="myQuillEditor" 
    :options="editorOption" 
    @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
    @change="onEditorChange($event)">
    </quill-editor>
    <p style="text-align:right;"><el-button size="small" type="primary" @click="commentHandle">评论</el-button></p>
  </div>
</template>

<script>
export default {
  name: 'Newscontent',
  data () {
    return {
      editorOption:{
        modules:{
            toolbar:[
            ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
                ['blockquote', 'code-block']
            ]
        }
      },
      title: "--",
      time: "--",
      author: "--",
      content:"<h1>hell0000098765456789098765457654345678987654567890987654567890678998765456789098765456789098765456789o</h1>哈哈哈哈哈哈哈哈哈哈哈",
      nowPage: 1,
      page:{},
      snows: [],
      comment:""
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
