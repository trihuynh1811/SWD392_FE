export const setArtworkTypes = (types) => ({
    type: 'SET_ARTWORK_TYPES',
    payload: types,
});

export const clearArtworkTypes = () => ({
    type: 'SET_ARTWORK_TYPES',
    payload: null,
});