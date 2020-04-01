<template>
  <div>
    <addstudent></addstudent>
  </div>
</template>

<script>
import Publish from '../components/Publish'
import Studentlist from '../components/Studentlist'
import Addstudent from '../components/Addstudent'
export default {
  name: 'Index',
  data () {
    return {
      msg: ''
    }
  },
  components: {
    Publish,
    Studentlist,
    Addstudent
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
