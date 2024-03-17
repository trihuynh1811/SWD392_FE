const initialState = {
    user: null,
    creatorList: []
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_CURRENT_USER':
            return { ...state, user: action.payload };
        case 'SET_CREATOR_LIST':
            return { ...state, creatorList: action.payload };
        default:
            return state;
    }
};

export default userReducer;