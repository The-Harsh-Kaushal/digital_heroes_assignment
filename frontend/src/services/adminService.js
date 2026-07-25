import api from './api';

export const login = async (credentials) => {
  const response = await api.post('/admin/auth', credentials);
  return response.data.data;
};

export const getLeads = async (params) => {
  const response = await api.get('/admin/lead', { params });
  return response.data.data;
};

export const changeLeadStatus = async (id, status) => {
  const response = await api.patch(`/admin/lead/${id}/status`, { status });
  return response.data.data;
};
