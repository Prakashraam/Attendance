import api from './api';

export const applyLeave = async (data) => {
    const response = await api.post('/leave/apply', data);
    return response.data;
};

export const getLeaveRequests = async (params) => {
    try {
        const response = await api.get('/leave/requests', { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching leave requests:', error);
        return [];
    }
};

export const updateLeaveStatus = async (id, status) => {
    try {
        const response = await api.put(`/leave/${id}`, { status });
        return response.data;
    } catch (error) {
        console.error('Error updating leave status:', error);
        throw error;
    }
};
