<template>
  <div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="参与测试对象：">
        <el-select v-model="formInline.student" placeholder="请选择">
          <el-option label="全部学生" value=""></el-option>
          <el-option label="指定学生" value=""></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Publish',
  data () {
    return {
      formInline: {
        student: ''
      }
    }
  }
}
</script>
