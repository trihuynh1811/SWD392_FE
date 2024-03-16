const initialState = {
    artworkTypes: [],
};

const artworkTypeReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_ARTWORK_TYPES':
            return { ...state, accessToken: action.payload };
        default:
            return state;
    }
};

export default artworkTypeReducer;