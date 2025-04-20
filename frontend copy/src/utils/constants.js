export const SHIFTS = {
    SHIFT_1: {
        id: 1,
        name: 'Shift 1',
        startTime: '08:00',
        endTime: '16:30',
        duration: 8.5
    },
    SHIFT_2: {
        id: 2,
        name: 'Shift 2',
        startTime: '16:30',
        endTime: '01:00',
        duration: 8.5
    },
    SHIFT_3: {
        id: 3,
        name: 'Shift 3',
        startTime: '01:00',
        endTime: '08:00',
        duration: 7
    }
};

export const LEAVE_TYPES = {
    PRIVILEGE: 'Privilege Leave',
    CASUAL: 'Casual Leave',
    NORMAL: 'Normal Leave'
};

export const ATTENDANCE_STATUS = {
    PRESENT: 'Present',
    ABSENT: 'Absent',
    LEAVE: 'Leave',
    HALF_DAY: 'Half Day',
    WEEK_OFF: 'Week Off'
};
