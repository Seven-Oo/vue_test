<template>
  <div>
    <div class="selectedList"
         v-for="(item,index) in searchResultLists"
         :key="index">
      <div @click="transmit(item)">
        <span class="selected-name">{{item.realname}}</span>
        <span class="selected-nickName">{{item.numb}}</span>
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
