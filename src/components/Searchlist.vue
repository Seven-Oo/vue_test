<template>
  <div>
    <!-- <h4>{{value}}</h4> -->
    <div class="selectedList"
         v-for="(item,index) in this.$store.state.studentLists"
         :key="index">
      <div @click="transmit(item)">
        <span class="selected-name">{{item.name}}</span>
        <span class="selected-nickName">{{item.nickName}}</span>
        <span>{{item.class}}</span>
      </div>
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
  props: ['value'], // 得到父组件传递过来的数据
  mounted () {
    this.$http.post('/posts/tableData').then(res => {
      this.$store.commit('save_studentLists', res.data.studentLists)
    })
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
.selected-name {
  display: inline-block;
  width: 80px;
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
