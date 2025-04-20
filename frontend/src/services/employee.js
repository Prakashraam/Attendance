import api from './api';

export const getEmployees = async () => {
    const response = await api.get('/employees');
    return response.data;
};

export const getEmployeeDetails = async (id) => {
    const response = await api.get(`/employees/${id}`);
    return response.data;
};

export const updateEmployee = async (id, data) => {
    const response = await api.put(`/employees/${id}`, data);
    return response.data;
};
