import api from '@/services/api';

export default {
  getAll: () => api().get('/students'),
  create: student => api().post('students', student),
  update: (studentId, student) => api().put(`students/${studentId}`, student),
  delete: studentId => api().delete(`students/${studentId}`),
};
