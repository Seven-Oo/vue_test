<template>
  <div style="height:330px;">
    <el-scrollbar style="height:100%">
      <div class="selectedList"
           v-for="(item,index) in searchResultLists"
           :key="index">
        <div class="selectedItem"
             @click="transmit(item)">
          <span class="selected-name">{{item.realName}}</span>
          <span class="selected-nickName">{{item.userName }}</span>
          <span class="selected-className">{{item.classTitle}}</span>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
export default {
  name: 'Searchlist',
  data () {
    return {

    }
  },
  props: ['value', 'searchResultLists'], // 得到父组件传递过来的数据
  mounted () {

  },
  methods: {
    transmit (item) {
      this.$emit('addSelectingSearch', item)
    }
  }
}
</script>

<style scoped>
.selectedList {
  display: block;
  margin-bottom: 10px;
  font-size: 14px;
  cursor: pointer;
}
.selectedItem:hover {
  color: #409eff;
}
.selected-name,
.selected-nickName,
.selected-className {
  display: inline-block;
  width: 30%;
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
