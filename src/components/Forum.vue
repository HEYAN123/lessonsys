<template>
  <div class="hello">
    <p style="font-size:30px;margin-top:0;">雪情论坛</p>
    <div>
        <el-card class="box-card" shadow="never" style="color:#777777;" v-for="snow in snows" :key="snow.snowId" >
            <el-row>
                <el-col :span="20" style="color:#409EFF;font-size:20px;">
                    <router-link :to="'/newscontent/'+snow.snowId">{{snow.title}}</router-link>
                </el-col>
                <el-col :span="4">{{snow.time}}</el-col>
            </el-row><br>
            <i class="el-icon-s-custom"></i>{{snow.author}}
        </el-card>
        <p style="text-align:left;"><el-button size="small" type="primary" @click="publishHandle">发表</el-button></p>
        <el-pagination
        style="text-align:right;"
        background
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
        :current-page.sync="nowPage"
        :page-size="page.eachPage"
        :total="page.totalSize">
        </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Forum',
  data () {
    return {
      nowPage: 1,
      page:{},
      snows: []
    }
  },
  created() {
    this.axios.get(`${this.API}snowList?page=${this.nowPage}`).
    then(res=>{
      this.snows = res.data.data.snowList;
      this.page = res.data.data.page;
    })
  },
  methods:{
      tableRowClassName({row, rowIndex}) {
        if (rowIndex < 3) {
          return 'warning-row';
        } 
        return '';
      },
      newsHandle(index) {
          console.log(index);
      },
      publishHandle() {
          this.$router.push({
              path: `/newseditor`
          });
      },
      handleCurrentChange(index) {
        this.nowPage = index;
        this.axios.get(`${this.API}snowList?page=${this.nowPage}`).
        then(res=>{
          this.snows = res.data.data.snowList;
          this.page = res.data.data.page;
        })
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-card.box-card.is-never-shadow:hover {
    background-color: #eeeeee;
}
.warning-row {
    background-color: oldlace !important;
  }
a {
    text-decoration: none;
}
</style>
