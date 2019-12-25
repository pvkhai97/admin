import api from '@/services/api';

export default {
  getAll: () => api().get('/teachers'),
  create: teacher => api().post('teachers', teacher),
  update: (teacherId, teacher) => api().put(`teachers/${teacherId}`, teacher),
  delete: teacherId => api().delete(`teachers/${teacherId}`),
};
