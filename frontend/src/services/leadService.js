import api from './api';

export const createLead = async (payload) => {
  const response = await api.post('/user/lead', payload);
  return response.data;
};
