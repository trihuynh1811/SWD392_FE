const initialState = {
    artworkTypes: [],
};

const artworkTypeReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_ARTWORK_TYPES':
            return { ...state, artworkTypes: action.payload };
        default:
            return state;
    }
};

export default artworkTypeReducer;