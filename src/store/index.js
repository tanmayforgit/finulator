import { createStore } from 'redux';

const storeReducer = (state = {}, action) => {
  if(action.type === 'set_mandatory_user_data') {
    return ({
      ...state,
      ...{userDetails: action.userDetails}
    })
  } else {
    return state;
  }
}

const store = createStore(storeReducer);
export default store;