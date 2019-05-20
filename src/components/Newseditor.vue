<template>
  <div class="hello">
    <p style="font-size:30px;margin-top:0;">发表帖子</p>
    <p>标题：<el-input v-model="newsTitle" style="width: auto;" /></p><br>
    <quill-editor
        v-model="content" 
        ref="myQuillEditor" 
        :options="editorOption" 
        >
    </quill-editor>
    <br>
    <el-button type="primary" @click="handleClick" size="small">发布</el-button>
  </div>
</template>

<script>
export default {
  name: 'Newseditor',
  data () {
    return {
      newsTitle: "",
      content: "",
      editorOption:{
          modules:{
              toolbar:[
                ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
                  ['blockquote', 'code-block']
              ]
          }
      }
    }
  },
  methods:{
      tableRowClassName({row, rowIndex}) {
        if (rowIndex < 3) {
          return 'warning-row';
        } 
        return '';
      },
      handleClick() {
        this.content && this.axios.post(`${this.API}newSnow`,{
          userId: this.Cookies.get('userId'),
          title: this.newsTitle,
          content: this.content
        }).
        then(res=>{
          this.$router.push({
            path: '/forum'
          });
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
