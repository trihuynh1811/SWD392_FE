export const setCurrentUser = (user) => ({
    type: 'SET_CURRENT_USER',
    payload: user,
});

export const setCreatorList = (creatorList) => ({
    type: 'SET_CREATOR_LIST',
    payload: creatorList,
})

export const clearAccessToken = () => ({
    type: 'SET_CURRENT_USER',
    payload: null,
});