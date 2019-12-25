import teacher from '../../services/modules/teacher';

export default {
  state: {
    teachers: [],
  },
  getters: {
    teachers: state => state.teachers,
  },
  mutations: {
    SET_TEACHERS: (state, payload) => {
      state.teachers = payload;
    },
  },
  actions: {
    loadTeachers: async ({ commit }) => {
      const { data } = await teacher.getAll();
      commit('SET_TEACHERS', data);
    },
    createTeacher: async ({ dispatch }, payload) => {
      await teacher.create(payload);
      dispatch('loadTeachers');
    },
    updateTeacher: async ({ dispatch }, payload) => {
      await teacher.update(payload._id, payload);
      dispatch('loadTeachers');
    },
    deleteTeacher: async ({ dispatch }, payload) => {
      await teacher.delete(payload._id);
      dispatch('loadTeachers');
    },
  },
};
