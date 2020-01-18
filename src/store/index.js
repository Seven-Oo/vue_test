import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    selectingShow: false,
    selectedShow: false,
    classStudentLists: [],
    groupStudentLists: [],
    studentLists: []
  },
  mutations: {
    save_classStudentLists (state, data) {
      state.classStudentLists = data
    },
    save_groupStudentLists (state, data) {
      state.groupStudentLists = data
    },
    save_studentLists (state, data) {
      state.studentLists = data
    },
    changeSelectingShow (state) {
      state.selectingShow = !state.selectingShow
    }
  },
  getters: {

  }
})
