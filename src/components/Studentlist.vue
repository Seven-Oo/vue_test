<template>
  <div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="添加学员：">
        <el-button type="primary" @click="onAdd">添加</el-button>
      </el-form-item>
    </el-form>

    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="">
        <el-form-item label="已添加学员：">
          <el-input v-model="formInline.name" placeholder="请输入学员姓名或用户名"></el-input>
        </el-form-item>
        <el-select v-model="formInline.class" placeholder="请选择班级" style="margin-right:10px;">
          <el-option label="班级一" value="shanghai"></el-option>
          <el-option label="班级二" value="beijing"></el-option>
        </el-select>
        <el-select v-model="formInline.group" placeholder="请选择小组">
          <el-option label="小组一" value="shanghai"></el-option>
          <el-option label="小组二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>

    <el-table class="studentlistTable"
      ref="multipleTable"
      :data="tableData"
      :stripe=true
      tooltip-effect="dark"
      style="width: 100%">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="nickName"
        label="用户名"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="class"
        label="所属班级"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="group"
        label="所属小组"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        label="删除"
        show-overflow-tooltip>
      </el-table-column>
    </el-table>
    <div class="clearfix" style="margin-top: 20px">
      <div class="left"><el-button>删除选中学员</el-button></div>
      <div class="right">
        <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="20"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400">
      </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Studentlist',
  data () {
    return {
      tableData: [],
      formInline: {
        name: '',
        class: '',
        group: ''
      }
    }
  },
  mounted () {
    this.$http.post('/posts/tableData').then(res => {
      this.tableData = res.data.tableData
    })
  },
  methods: {

  }
}
</script>

<style scoped>
  .el-pagination {padding: 6px 5px;}
</style>
