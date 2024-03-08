export const setAccessToken = (token) => ({
    type: 'SET_ACCESS_TOKEN',
    payload: token,
});

export const clearAccessToken = () => ({
    type: 'SET_ACCESS_TOKEN',
    payload: null,
});