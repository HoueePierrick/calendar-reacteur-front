const initialState = {
  name: "John Doe"
};

export const sampleReducer = (state = initialState, action) => {
  switch (action.type) {
    // Sample of a reducer action
    /* case ACTION:
    return {
      ...state,
      ...action.payload
    };
    */
    default:
      return state;
  }
};
