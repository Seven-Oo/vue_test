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
                  placeholder="输入学生姓名或用户名"
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
              <div style="height:274px;">
                <el-scrollbar style="height:100%">
                  <div class="clearfix classWrapper"
                       v-for="(item1, index1) in classLists"
                       :key="index1">
                    <div class="clearfix content-title">
                      <div class="left"
                           @click="changeSelectingShow(index1, item1)">
                        <i v-show="item1.selectingShow"
                           class="el-icon-caret-top content-title-topico"></i>

                        <i v-show="!item1.selectingShow"
                           class="el-icon-caret-bottom content-title-bottomico"></i>
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
                        <span class="item-numb">{{item2.userName}}</span>
                      </div>
                    </div>
                  </div>
                </el-scrollbar>
              </div>
            </el-tab-pane>
            <el-tab-pane label="按小组添加"
                         name="second">
              <div style="height:274px;">
                <el-scrollbar style="height:100%">
                  <div class="groupWrapper clearfix"
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
                        <span class="item-numb">{{stuItem.userName}}</span>
                      </div>
                    </div>
                  </div>
                </el-scrollbar>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-card>

      <el-card shadow="never"
               class="box-card left card-rightBox"
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
            <i class="el-icon-delete"
               @click="checkSelectedList"></i>
          </div>
          <div class="right"
               v-show="!showSelectedSearch">
            <h3 class="exitSearch"
                @click="changeSelectedSearch">退出检索</h3>
          </div>
        </div>
        <el-input class="selectingInput"
                  v-show="!showSelectedSearch"
                  placeholder="输入学生姓名或用户名"
                  v-model="selectedInput"
                  clearable
                  @clear="clearSelectedSearch"
                  @input="searchSelectedList($event)"></el-input>
        <div v-show="selectedSearchResult">
          <div style="height:330px;">
            <el-scrollbar style="height:100%">
              <div class="selectedList"
                   v-for="(searchItem,searchIndex) in selectedSearchResultList"
                   :key="searchIndex">
                <div class="selectedItem">
                  <span class="selected-name">{{searchItem.realName}}</span>
                  <span class="selected-nickName">{{searchItem.userName }}</span>
                  <i class="el-icon-close"
                     @click="searchstuDelete(searchIndex,searchItem)"></i>
                </div>
              </div>
            </el-scrollbar>
          </div>
        </div>

        <div style="height:400px;">
          <el-scrollbar style="height:100%">
            <div class="selectedList"
                 v-for="(item,index) in selectedList"
                 :key="index">
              <div v-show="selectedStudentsList"
                   class="selectedItem">
                <span class="selected-name">{{item.realName}}</span>
                <span class="selected-nickName">{{item.userName }}</span>
                <i class="el-icon-close"
                   @click="stuDelete(index)"></i>
              </div>
            </div>
          </el-scrollbar>
        </div>
      </el-card>
    </div>

    <el-row class="handleBtn">
      <el-button type="primary"
                 @click="submit">提交</el-button>
      <el-button type="danger"
                 @click="cancel">取消</el-button>
    </el-row>

    <el-dialog title="提示"
               :visible.sync="delDialogVisible"
               width="30%"
               custom-class="delAllDialog">
      <span>
        <i class="el-icon-info"></i>
        此操作将删除全部已选学生, 是否继续?
      </span>
      <span slot="footer"
            class="dialog-footer">
        <el-button type="primary"
                   @click="selectedListDelete">确 定</el-button>
        <el-button @click="delDialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
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
      searchResultLists: [],
      searchResultListsStash: [],
      delDialogVisible: false // 自定义弹出框
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

    this.getClassList()
    this.getGroupList()
  },
  methods: {
    getClassList () {
      // 加载班级列表
      this.$http.get('/test/classList.do?testId=' + this.testId).then(res => {
        this.classLists = res.data
        for (var i = 0; i < res.data.length; i++) {
          var arr = res.data
          arr[i].selectingShow = false
        }
      })
    },
    getGroupList () {
      // 加载小组列表
      this.$http.get('/test/groupList.do?testId=' + this.testId).then(res => {
        this.groupLists = res.data
        for (var i = 0; i < res.data.length; i++) {
          let arr = res.data
          arr[i].selectingShow = false
        }
      })
    },
    getSearchList (value) {
      if (this.searchResultListsStash.length > 0) {
        // value是Input的值
        if (value.trim()) {
          this.searchResultLists = this.searchResultListsStash.filter((val) => { // 过滤数组元素
            return val.realName.includes(value) || val.userName.toString().includes(value) // 如果包含字符返回true
          })
        } else {
          this.searchResultLists = this.searchResultListsStash
        }
      } else {
        this.$http.post('/test/courseStudentList.do?testId=' + this.testId + '&name=' + '' + '&t=' + Math.random()).then(res => {
          this.searchResultListsStash = res.data
          this.searchResultLists = res.data.filter((val) => { // 过滤数组元素
            return val.realName.includes(this.selectingInput) || val.userName.toString().includes(this.selectingInput) // 如果包含字符返回true
          })
        })
      }
    },
    // 左侧搜索子组件向父组件传值
    addSelectingSearch (e) {
      // e 是子组件传递过来的数据
      // this.selectedList = this.selectedList.concat([e])
      // this.selectedList = this.unique(this.selectedList)
      if (this.selectedList.length > 0) {
        let inArray = false
        for (var i = 0; i < this.selectedList.length; i++) {
          let theItem = this.selectedList[i]
          if (e.userName === theItem.userName) {
            inArray = true
            this.$message({
              duration: 1000,
              message: '该学生【' + e.realName + '】已添加'
            })
            break
          }
        }
        if (!inArray) {
          this.selectedList = this.selectedList.concat([e])
        }
      } else {
        this.selectedList = this.selectedList.concat([e])
      }
    },
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
      this.selectedSearchResult = false
      this.selectedInput = ''// 退出时清空input的value
    },
    // 班级图标展开与收起
    changeSelectingShow (index, item) {
      // 请求添加随机字符以保证IE不缓存
      this.$http.get('/test/classStudentList.do?testId=' + this.testId + '&classNumb=' + item.numb + '&t=' + Math.random()).then(res => {
        if (res.data.includes('你的访问过于频繁,请稍后再试')) {
          this.$message({
            duration: 1000,
            message: '你的访问过于频繁,请稍后再试'
          })
        } else {
          this.$set(this.classLists[index], 'data', res.data)
          // 将状态改为显示列表，图标改变
          this.classLists[index].selectingShow = !this.classLists[index]
            .selectingShow
        }
      })
    },
    // 小组图标展开与收起
    changeSelectedShow (index, item) {
      this.$http.get('/test/groupStudentList.do?testId=' + this.testId + '&groupId=' + item.id + '&t=' + Math.random()).then(res => {
        if (res.data.includes('你的访问过于频繁,请稍后再试')) {
          this.$message({
            duration: 1000,
            message: '你的访问过于频繁,请稍后再试'
          })
        } else {
          this.$set(this.groupLists[index], 'data', res.data)
          // 将状态改为显示列表，图标改变
          this.groupLists[index].selectingShow = !this.groupLists[index]
            .selectingShow
        }
      })
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
      this.getSearchList(value)
    },
    //  右侧搜索输入
    searchSelectedList (value) {
      // value是Input的值
      if (value.trim()) {
        this.selectedSearchResultList = this.selectedList.filter((val) => { // 过滤数组元素
          return val.realName.includes(value) || val.userName.toString().includes(value) // 如果包含字符返回true
        })
      } else {
        this.selectedSearchResultList = this.selectedList
      }
      this.selectedStudentsList = false
      this.selectedSearchResult = !this.selectedStudentsList
    },
    // 清除右侧输入框数据
    clearSelectedSearch () {
      this.selectedSearchResultList = []
    },
    // 检查是否有选中的学生
    checkSelectedList () {
      if (this.selectedList.length > 0) {
        this.delDialogVisible = true
      } else {
        this.$message('您还未添加学生，请先添加')
      }
    },
    // 右侧选择学生中的全部删除
    selectedListDelete () {
      if (this.selectedList.length > 0) {
        this.selectedList = []
        this.delDialogVisible = false
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
        return !(val.userName.toString().includes(item.userName.toString())) // 如果包含字符返回true
      })
    },
    //  按班级添加
    addFromClass (item) {
      this.$http.get('/test/classStudentList.do?testId=' + this.testId + '&classNumb=' + item.numb + '&t=' + Math.random()).then(res => {
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
          if (item.userName === theItem.userName) {
            inArray = true
            this.$message({
              duration: 1000,
              message: '该学生【' + item.realName + '】已添加'
            })
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
      this.$http.get('/test/groupStudentList.do?testId=' + this.testId + '&groupId=' + item.id + '&t=' + Math.random()).then(res => {
        if (res.data.length > 0) {
          this.selectedList = this.selectedList.concat(res.data)
          this.selectedList = this.unique(this.selectedList)
        } else {
          this.$message({
            duration: 1000,
            message: '该小组学生数为0，无法添加！'
          })
        }
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
      this.$http.post('/test/testStudentSave.do', param).then(res => {
        if (res.error) {
          this.$alert(res.error, '提示', {
            confirmButtonText: '确定',
            type: 'warning'
          })
        } else {
          var isIE = (!!window.ActiveXObject || 'ActiveXObject' in window)

          if (isIE) {
            // 如果为IE 构造一个虚拟的a标签 以便于跳转到对应的URL
            var gotolink = document.createElement('a')
            gotolink.href = '../../../../test/testStudentList.do?testId=' + this.testId
            gotolink.setAttribute('target', '_self')
            document.body.appendChild(gotolink)
            gotolink.click()
          } else {
            window.open('../../../../test/testStudentList.do?testId=' + this.testId, '_self')
          }

          // window.open('../../../../test/testStudentList.do?testId=' + this.testId, '_self')
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
  /* width: 1051px; 100%宽度 */
  border: 1px solid #ebeef5;
  margin: 0 20px;
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
.items:hover {
  color: #409eff;
}
.item {
  cursor: pointer;
}
.item-name,
.item-numb {
  display: inline-block;
  width: 48%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  line-height: 22px;
}
.box-card {
  /* width: 510px; */
  width: 48%; /*避免宽度过高掉落下一行*/
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
  width: 98%;
  text-align: center;
  margin: 30px 0;
}
.classWrapper,
.groupWrapper {
  padding-right: 20px;
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
.selectedItem:hover {
  color: #409eff;
}
.selected-name,
.selected-nickName {
  display: inline-block;
  width: 45%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  line-height: 22px;
}
.exitSearch {
  color: #3f51b5;
  cursor: pointer;
}
</style>
