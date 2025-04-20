import { useState, useEffect } from 'react';
import { getAttendanceReport } from '../services/attendance';

export function useAttendance(filters) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchAttendance();
    }, [filters]);

    const fetchAttendance = async () => {
        try {
            setLoading(true);
            const response = await getAttendanceReport(filters);
            setData(response);
            setError(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return { data, loading, error, refetch: fetchAttendance };
}
