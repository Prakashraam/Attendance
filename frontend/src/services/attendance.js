import api from './api';

export const markAttendance = async (employeeId) => {
    const response = await api.post('/attendance/mark', { employeeId });
    return response.data;
};

export const getAttendanceReport = async (params) => {
    const response = await api.get('/attendance/report', { params });
    return response.data;
};

export const getTodayAttendance = async () => {
    const response = await api.get('/attendance/today');
    return response.data;
};

export const exportAttendanceReport = async (params) => {
    const response = await api.get('/attendance/export', {
        params,
        responseType: 'blob'
    });
    return response.data;
};
