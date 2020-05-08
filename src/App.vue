<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
}
#app {
  font-family: -apple-system, SF UI Text, Arial, PingFang SC, Hiragino Sans GB,
    Microsoft YaHei, WenQuanYi Micro Hei, "sans-serif";
}

/* 自定义的dialog的class */
.delAllDialog .el-dialog__body {
  padding: 10px 20px;
}
.el-card__body {
  padding: 20px 0 20px 20px !important;
}
/* 隐藏横向滚动条 */
.el-scrollbar__wrap {
  overflow-x: hidden !important;
  margin-right: -18px !important;
}
</style>
