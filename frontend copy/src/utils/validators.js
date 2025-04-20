export const validateEmployeeId = (id) => {
    const pattern = /^EMP\d{3}$/;
    return pattern.test(id);
};

export const validateTime = (time) => {
    const pattern = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
    return pattern.test(time);
};
