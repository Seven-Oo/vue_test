<template>
  <div>
    <h3 class="subtitle">
      添加测试发布对象
    </h3>
    <div class="clearfix box-wrapper">
      <el-card shadow="never"
               class="box-card left"
               style="margin-right: 15px;">
        <div slot="header"
             class="clearfix boxcard-title">
          <h3>可选择参与人：</h3>
        </div>
        <el-input class="selectingInput"
                  placeholder="输入学生姓名或学号"
                  v-model="selectingInput"
                  clearable
                  @clear="clearSelectingSearch"
                  @focus="changeInputState"
                  @input="searchSelectingList($event)">

        </el-input>
        <searchlist v-show="selectingSearchResult"
                    v-bind:value="selectingInput"
                    v-bind:testId="testId"
                    v-bind:searchResultLists="searchResultLists"
                    @addSelectingSearch="addSelectingSearch($event)"></searchlist>

        <div v-show="selectingStudentsList">
          <el-tabs v-model="activeName">
            <el-tab-pane label="按班级添加"
                         name="first">
              <div class="classWrapper"
                   v-for="(item1, index1) in classLists"
                   :key="index1">
                <div class="clearfix content-title">
                  <div class="left"
                       @click="changeSelectingShow(index1, item1)">
                    <i v-show="item1.selectingShow"
                       class="el-icon-caret-top content-title-topico">
</template>
                    <i v-show="!item1.selectingShow"
                       class="el-icon-caret-bottom content-title-bottomico"></template>
                    <span>{{item1.name}}</span>
                  </div>
                  <i class="el-icon-circle-plus-outline right content-title-addico"
                     @click="addFromClass(item1)"></i>
                </div>
                <div v-for="(item2, index2) in item1.data"
                     :key="index2"
                     class="text items">
                  <div v-show="item1.selectingShow"
                       class="item"
                       @click="addself(item2)">
                    <span class="item-name">{{item2.realName}}</span>
                    <span>{{item2.numb}}</span>
                  </div>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="按小组添加"
                         name="second">
              <div class="groupWrapper"
                   v-for="(groupItem, groupIndex) in groupLists"
                   :key="groupIndex">
                <div class="clearfix content-title">
                  <div class="left"
                       @click="changeSelectedShow(groupIndex,groupItem)">
                    <i v-show="groupItem.selectingShow"
                       class="el-icon-caret-top content-title-topico"></i>
                    <i v-show="!groupItem.selectingShow"
                       class="el-icon-caret-bottom content-title-bottomico"></i>
                    <span>{{groupItem.name}}</span>
                  </div>
                  <i class="el-icon-circle-plus-outline right content-title-addico"
                     @click="addFromGroup(groupItem)"></i>
                </div>
                <div v-for="(stuItem, stuIndex) in groupItem.data"
                     :key="stuIndex"
                     class="text items">
                  <div v-show="groupItem.selectingShow"
                       class="item"
                       @click="addself(stuItem)">
                    <span class="item-name">{{stuItem.realName}}</span>
                    <span>{{stuItem.numb}}</span>
                  </div>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-card>

      <!-- <el-divider direction="vertical"
                  class="left"></el-divider> -->

      <el-card shadow="never"
               class="box-card left"
               style="margin-left: 15px;">
        <div slot="header"
             class="clearfix boxcard-title">
          <h3>
            已选择参与人：
            <span class="pointText">{{selectedList.length}}</span>
          </h3>
          <div class="right"
               v-show="showSelectedSearch">
            <i class="el-icon-search"
               @click="changeSelectedSearch"></i>
            <i class="el-icon-close"
               @click="selectedListDelete"></i>
          </div>
          <div class="right"
               v-show="!showSelectedSearch">
            <h3 class="exitSearch"
                @click="changeSelectedSearch">退出检索</h3>
          </div>
        </div>
        <el-input class="selectingInput"
                  v-show="!showSelectedSearch"
                  placeholder="输入学生姓名或学号"
                  v-model="selectedInput"
                  clearable
                  @clear="clearSelectedSearch"
                  @input="searchSelectedList($event)"></el-input>

        <div class="selectedList"
             v-show="selectedSearchResult"
             v-for="(searchItem,searchIndex) in selectedSearchResultList"
             :key="searchIndex">
          <span class="selected-name">{{searchItem.realName}}</span>
          <span class="selected-nickName">{{searchItem.numb}}</span>
          <i class="el-icon-close"
             @click="searchstuDelete(searchIndex,searchItem)"></i>
        </div>

        <div class="selectedList"
             v-for="(item,index) in selectedList"
             :key="index">
          <div v-show="selectedStudentsList">
            <span class="selected-name">{{item.realName}}</span>
            <span class="selected-nickName">{{item.numb}}</span>
            <i class="el-icon-close"
               @click="stuDelete(index)"></i>
          </div>
        </div>
      </el-card>
    </div>
    <el-row class="handleBtn">
      <el-button type="primary"
                 @click="submit">提交</el-button>
      <el-button type="danger"
                 @click="cancel">取消</el-button>
    </el-row>
  </div>
</template>

<script>
import Searchlist from '../components/Searchlist'
export default {
  name: 'Addstudent',
  data () {
    return {
      selectingInput: '', // 左侧输入框的值
      selectedInput: '', // 右侧输入框的值
      activeName: 'first', // 班级和小组切换控制
      selectedList: [], // 已选择的学生列表
      showSelectedSearch: true, // 右侧搜索框是否显示
      selectingStudentsList: true, // 左侧班级和小组是否显示
      selectingSearchResult: false, // 左侧搜索结果是否显示
      selectedStudentsList: true, // 右侧选中列表是否显示
      selectedSearchResult: false, // 右侧搜索结果是否显示
      selectingShow: false, // 班级内学生列表是否显示
      selectedShow: false, // 小组内学生列表是否显示
      classLists: [], // 班级列表
      groupLists: [], // 小组列表
      inputState: false, // 左侧输入框是否获得焦点
      selectedSearchResultList: [], // 右侧搜索结果列表
      testId: 54797,
      searchResultLists: []
    }
  },
  components: {
    Searchlist// 左侧搜索子组件
  },
  mounted () {
    // 获取localStorage中的testId
    if (localStorage.getItem('testId')) {
      this.testId = localStorage.getItem('testId')
    }

    // 加载班级和小组列表
    this.$http.get('/test/classList.do?testId=' + this.testId).then(res => {
      this.classLists = res.data
      for (var i = 0; i < res.data.length; i++) {
        var arr = res.data
        arr[i].selectingShow = false
      }
    })
    this.$http.get('/test/groupList.do?testId=' + this.testId).then(res => {
      this.groupLists = res.data
      for (var i = 0; i < res.data.length; i++) {
        let arr = res.data
        arr[i].selectingShow = false
      }
    })
  },
  methods: {
    getSearchList () {
      this.$http.post('/test/courseStudentList.do?testId=' + this.testId + '&name=' + this.selectingInput).then(res => {
        this.searchResultLists = res.data.filter((val) => { // 过滤数组元素
          return val.realname.includes(this.selectingInput) || val.numb.toString().includes(this.selectingInput) // 如果包含字符返回true
        })
      })
    },
    // 左侧搜索子组件向父组件传值
    addSelectingSearch (e) {
      // e 是子组件传递过来的数据
      this.selectedList = this.selectedList.concat([e])
      this.selectedList = this.unique(this.selectedList)
    },
    // 数组去重
    // unique (arr) {
    //   return Array.from(new Set(arr))
    // },
    // 对象数组去重
    unique (arr) {
      const res = new Map()
      return arr.filter((arr) => !res.has(arr.id) && res.set(arr.id, 1))
    },
    // 右侧搜索框显示
    changeSelectedSearch () {
      this.selectedSearchResultList = []
      this.showSelectedSearch = !this.showSelectedSearch
      this.selectedStudentsList = !this.selectedStudentsList
    },
    // 班级图标展开与收起
    changeSelectingShow (index, item) {
      this.$http.get('/test/classStudentList.do?testId=' + this.testId + '&classNumb=' + item.numb).then(res => {
        // this.classListsStu = res.data
        this.$set(this.classLists[index], 'data', res.data)
      })

      // 将状态改为显示列表，图标改变
      this.classLists[index].selectingShow = !this.classLists[index]
        .selectingShow
    },
    // 小组图标展开与收起
    changeSelectedShow (index, item) {
      this.$http.get('/test/groupStudentList.do?testId=' + this.testId + '&groupId=' + item.id).then(res => {
        // this.groupListsStu = res.data
        this.$set(this.groupLists[index], 'data', res.data)
      })

      // 将状态改为显示列表，图标改变
      this.groupLists[index].selectingShow = !this.groupLists[index]
        .selectingShow
    },
    //  左侧搜索获取焦点操作
    changeInputState () {
      this.inputState = true
    },
    // 清空左侧输入框内容
    clearSelectingSearch () {
      this.selectingStudentsList = true
      this.selectingSearchResult = !this.selectingStudentsList
    },
    // 左侧搜索输入
    searchSelectingList (value) {
      // value是Input的值
      if (this.inputState) { // 处于获取焦点状态
        this.selectingStudentsList = false
        this.selectingSearchResult = !this.selectingStudentsList
      } else {
        this.selectingStudentsList = true
        this.selectingSearchResult = !this.selectingStudentsList
      }
      this.getSearchList()
    },
    //  右侧搜索输入
    searchSelectedList (value) {
      // value是Input的值
      if (value.trim()) {
        this.selectedSearchResultList = this.selectedList.filter((val) => { // 过滤数组元素
          return val.realname.includes(value) || val.numb.toString().includes(value) // 如果包含字符返回true
        })
      }
      this.selectedStudentsList = false
      this.selectedSearchResult = !this.selectedStudentsList
    },
    // 清除右侧输入框数据
    clearSelectedSearch () {
      this.selectedSearchResultList = []
    },
    //  右侧选择学生中的全部删除
    selectedListDelete () {
      if (this.selectedList.length > 0) {
        this.$confirm('此操作将删除全部已选学生, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.selectedList = []
        }).catch(() => {

        })
      } else {
        this.$message('您还未添加学生，请先添加')
      }
    },
    //  右侧选择学生中的删除
    stuDelete (index) {
      this.selectedList.splice(index, 1)
    },
    //  右侧查询后删除
    searchstuDelete (index, item) {
      this.selectedSearchResultList.splice(index, 1)
      this.selectedList = this.selectedList.filter((val) => { // 过滤数组元素
        return !(val.realname.includes(item.realname) || val.numb.toString().includes(item.numb.toString())) // 如果包含字符返回true
      })
    },
    //  按班级添加
    addFromClass (item) {
      this.$http.get('/test/classStudentList.do?testId=' + this.testId + '&classNumb=' + item.numb).then(res => {
        this.selectedList = this.selectedList.concat(res.data)
        this.selectedList = this.unique(this.selectedList)
      })
    },
    // 点击学生添加
    addself (item) {
      if (this.selectedList.length > 0) {
        let inArray = false
        for (var i = 0; i < this.selectedList.length; i++) {
          let theItem = this.selectedList[i]
          if (item.realname === theItem.realname) {
            inArray = true
            this.$message('该学生已添加')
            break
          }
        }
        if (!inArray) {
          this.selectedList = this.selectedList.concat([item])
        }
      } else {
        this.selectedList = this.selectedList.concat([item])
      }
    },
    // 按小组添加
    addFromGroup (item) {
      this.$http.get('/test/groupStudentList.do?testId=' + this.testId + '&groupId=' + item.id).then(res => {
        this.selectedList = this.selectedList.concat(res.data)
        this.selectedList = this.unique(this.selectedList)
      })
    },
    // 提交
    submit () {
      let param = new URLSearchParams()
      let ids = []
      for (var i = 0; i < this.selectedList.length; i++) {
        var arr = this.selectedList
        ids.push(arr[i].id)
      }
      param.append('testId', this.testId)
      param.append('ids', ids)
      console.log('ids=> ', ids)
      this.$http.post('/test/testStudentSave.do', param).then(res => {
        if (res.error) {
          this.$alert(res.error, '提示', {
            confirmButtonText: '确定',
            type: 'warning'
          })
        } else {
          window.open('../../../../test/testStudentList.do?testId=' + this.testId, '_self')
        }
      })
    },
    // 取消
    cancel () {
      window.open('../../../../test/testStudentList.do?testId=' + this.testId, '_self')
    }
  }
}
</script>

<style scoped>
.el-tabs__nav-wrap::after {
  height: 0 !important;
}
.el-tabs__item.is-active {
  color: #ff5b00;
}
.box-wrapper {
  width: 851px;
  border: 1px solid #ebeef5;
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
  color: #ff5b00;
}
.text {
  font-size: 14px;
}

.items {
  margin-bottom: 18px;
  padding-left: 50px;
  margin-bottom: 10px;
}
.item {
  cursor: pointer;
}
.item-name {
  display: inline-block;
  width: 120px;
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
  height: 30px;
  line-height: 30px;
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 10px;
  cursor: pointer;
}
.content-title-topico,
.content-title-bottomico {
  font-size: 18px;
  line-height: 28px;
  margin-right: 10px;
  color: #606266;
}
.content-title-addico {
  font-size: 16px;
  line-height: 30px;
  color: #606266;
}
.selectedList {
  display: block;
  margin-left: 30px;
  margin-bottom: 10px;
  font-size: 14px;
  cursor: pointer;
}
.selected-name {
  display: inline-block;
  width: 120px;
}
.selected-nickName {
  display: inline-block;
  width: 100px;
}
.exitSearch {
  color: #3f51b5;
  cursor: pointer;
}
</style>
