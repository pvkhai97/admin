import student from '../../services/modules/student';

export default {
  state: {
    students: [],
  },
  getters: {
    students: state => state.students,
  },
  mutations: {
    SET_STUDENTS: (state, payload) => {
      state.students = payload;
    },
  },
  actions: {
    loadStudents: async ({ commit }) => {
      const { data } = await student.getAll();
      commit('SET_STUDENTS', data);
    },
    createStudent: async ({ dispatch }, payload) => {
      await student.create(payload);
      dispatch('loadStudents');
    },
    updateStudent: async ({ dispatch }, payload) => {
      await student.update(payload._id, payload);
      dispatch('loadStudents');
    },
    deleteStudent: async ({ dispatch }, payload) => {
      await student.delete(payload._id);
      dispatch('loadStudents');
    },
  },
};
