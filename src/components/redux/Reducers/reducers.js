import {
  ADD_DATA_SUCCESS
} from '../Constants/constantsInput';

export const initialState = {
  rows: [],
};
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_DATA_SUCCESS: {
      return {
        ...state,
        rows: [...state.rows, action.payload],
      };
    }
    default:
      return state;
  }
};

export default rootReducer;
