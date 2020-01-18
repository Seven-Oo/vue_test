<template>
  <div>
    <div class="clearfix box-wrapper">
      <el-card shadow='never' class="box-card left" style="margin-right: 15px;">
        <div slot="header" class="clearfix boxcard-title">
          <h3>可选择参与人：</h3>
        </div>
        <el-input class="selectingInput"
          placeholder="输入学生姓名或学号"
          v-model="selectingInput"
          clearable @focus="changeSelectingState" @blur="changeSelectingState" @input="searchSelectingList($event)">
        </el-input>

        <searchlist v-if="selectingSearchResult"></searchlist>

        <div v-if="selectingStudentsList">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="按班级添加" name="first">
              <div class="classWrapper">
                <div class="clearfix content-title">
                  <div class="left" @click="changeSelectingShow">
                    <i v-if="selectingShow" class="el-icon-caret-top content-title-topico"></i>
                    <i v-if="!selectingShow" class="el-icon-caret-bottom content-title-bottomico"></i>
                    <span>19英01班</span>
                  </div>
                  <i class="el-icon-circle-plus-outline right content-title-addico"></i>
                </div>
                <div v-for="(item, index) in this.$store.state.classStudentLists" :key="index" class="text items">
                  <div  v-if="selectingShow" class="item">
                    <span class="item-name">{{item.name}}</span>
                    <span>{{item.nickName}}</span>
                  </div>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="按小组添加" name="second">
              <div>
                <div class="clearfix content-title">
                  <div class="left" @click="changeSelectedShow">
                    <i v-if="selectedShow" class="el-icon-caret-top content-title-topico"></i>
                    <i v-if="!selectedShow" class="el-icon-caret-bottom content-title-bottomico"></i>
                    <span>英语小组</span>
                  </div>
                  <i class="el-icon-circle-plus-outline right content-title-addico"></i>
                </div>
                <div v-for="(item, index) in this.$store.state.groupStudentLists" :key="index" class="text items">
                  <div  v-if="selectedShow" class="item">
                    <span class="item-name">{{item.name}}</span>
                    <span>{{item.nickName}}</span>
                  </div>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-card>

      <el-divider direction="vertical" class="left"></el-divider>

      <el-card shadow='never' class="box-card left" style="margin-left: 15px;">
        <div slot="header" class="clearfix boxcard-title">
          <h3>已选择参与人：<span class="pointText">2</span></h3>
          <div class="right" v-if="showSelectedSearch">
            <i class="el-icon-search" @click="changeSelectedSearch"></i>
            <i class="el-icon-delete"></i>
          </div>
          <div class="right" v-if="!showSelectedSearch">
            <h3 class="exitSearch" @click="changeSelectedSearch">退出检索</h3>
          </div>
        </div>
        <el-input class="selectingInput" v-if="!showSelectedSearch"
          placeholder="输入学生姓名或学号"
          v-model="selectedInput"
          clearable @input="searchSelectedList($event)">
        </el-input>

        <searchlist v-if="selectedSearchResult"></searchlist>

        <div class="selectedList"
          v-for="(item,index) in selectedList"
          :key="index">
          <div v-if="selectedStudentsList">
            <span class="selected-name">{{item.name}}</span>
            <span class="selected-nickName">{{item.nickName}}</span>
            <i class="el-icon-delete"></i>
          </div>
        </div>
      </el-card>
    </div>
    <el-row class="handleBtn">
      <el-button type="primary">提交</el-button>
      <el-button type="danger">取消</el-button>
    </el-row>
  </div>
</template>

<script>
import Searchlist from '../components/Searchlist'
export default {
  name: 'Addstudent',
  data () {
    return {
      selectingInput: '',
      selectedInput: '',
      activeName: 'first',
      selectedList: [],
      activeNames: ['1'],
      showSelectedSearch: true,
      selectingStudentsList: true,
      selectingSearchResult: false,
      selectedStudentsList: true,
      selectedSearchResult: false,
      selectingShow: this.$store.state.selectingShow,
      selectedShow: this.$store.state.selectedShow
    }
  },
  components: {
    Searchlist
  },
  mounted () {
    this.$http.post('/posts/tableData').then(res => {
      this.selectedList = res.data.selectedList
    })
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
    },
    // 已选区域搜索框显示
    changeSelectedSearch () {
      this.showSelectedSearch = !this.showSelectedSearch
      this.selectedStudentsList = !this.selectedStudentsList
    },
    changeSelectingShow () {
      // 请求班级内学生列表
      this.$http.post('/posts/tableData').then(res => {
        this.$store.commit('save_classStudentLists', res.data.classStudentLists)
      })
      // 将状态改为显示列表，图标改变
      this.selectingShow = !this.selectingShow
    },
    changeSelectedShow () {
      // 请求小组内学生列表
      this.$http.post('/posts/tableData').then(res => {
        this.$store.commit('save_groupStudentLists', res.data.groupStudentLists)
      })
      // 将状态改为显示列表，图标改变
      this.selectedShow = !this.selectedShow
    },
    searchSelectingList (value) { // value是Input的值
      console.log(value)
      // this.$http.post('/posts/tableData').then(res => {
      //   this.$store.commit('save_groupStudentLists', res.data.groupStudentLists)
      // })
      this.selectingSearchResult = !this.selectingSearchResult
      if (this.selectingSearchResult === true) {
        this.selectingStudentsList = false
      } else {
        this.selectingStudentsList = true
      }
    },
    searchSelectedList (value) { // value是Input的值
      console.log(value)
      // this.$http.post('/posts/tableData').then(res => {
      //   this.$store.commit('save_groupStudentLists', res.data.groupStudentLists)
      // })
    },
    // 左侧选择学生中的搜索框获取焦点和失去焦点的操作
    changeSelectingState () {
      this.selectingStudentsList = !this.selectingStudentsList
    }
  }
}
</script>

<style scoped>
.el-tabs__nav-wrap::after {
    height: 0!important;
  }
  .el-tabs__item.is-active {
    color: #FF5B00;
  }
  .box-wrapper {
    width: 851px;
    border: 1px solid #EBEEF5;
  }
  .boxcard-title h3 {
    display: inline-block;
  }
  .boxcard-title i {
    font-size: 18px;
    width: 30px;
    text-align: right;
    cursor: pointer;
  }
  .boxcard-title .pointText {
    color: #FF5B00;
  }
  .text {
    font-size: 14px;
  }

  .items {
    margin-bottom: 18px;
    padding-left:50px;
    margin-bottom: 10px;
  }
  .item {
    cursor: pointer;
  }
  .item-name {
    display:inline-block;
    width:80px;
  }

  .box-card {
    width: 410px;
    border: none;
  }
  .el-card__header {
    margin: 0 20px;
    padding: 18px 0;
  }
  .el-divider--vertical {
    margin: 18px 0;
    min-height: 50vh;
  }
  .selectingInput {
    margin: 10px 0 20px 0;
  }
  .handleBtn {
    width: 853px;
    text-align: center;
    margin: 30px 0;
  }
  .content-title {
    height:30px;
    line-height:30px;
    font-size:14px;
    font-weight:bold;
    margin-bottom:10px;
    cursor:pointer;
  }
  .content-title-topico, .content-title-bottomico {
    font-size:18px;
    line-height:28px;
    margin-right:10px;
    color:#606266;
  }
  .content-title-addico {
    font-size:16px;
    line-height:30px;
    color:#606266;
  }
  .selectedList {
    display:block;
    margin-left: 30px;
    margin-bottom:10px;
    font-size: 14px;
    cursor: pointer;
  }
  .selected-name {
    display:inline-block;
    width:80px;
  }
  .selected-nickName {
    display:inline-block;
    width:100px;
  }
  .exitSearch {
    color:#3F51B5;
    cursor: pointer;
  }
</style>
