export const setCurrentUser = (user) => ({
    type: 'SET_CURRENT_USER',
    payload: user,
});

export const clearAccessToken = () => ({
    type: 'SET_CURRENT_USER',
    payload: null,
});