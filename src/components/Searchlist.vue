<template>
  <div>
    <div class="selectedList"
      v-for="(item,index) in this.$store.state.studentLists"
      :key="index">
      <span class="selected-name">{{item.name}}</span>
      <span class="selected-nickName">{{item.nickName}}</span>
      <span>{{item.class}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Searchlist',
  data () {
    return {
      msg: ''
    }
  },
  mounted () {
    this.$http.post('/posts/tableData').then(res => {
      this.$store.commit('save_studentLists', res.data.studentLists)
    })
  }
}
</script>

<style scoped>
  .selectedList {
    display:block;
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
