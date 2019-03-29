import {
  REQUEST_POSITION,
  RECEIVE_POSITION,
  COULNDT_RECEIVE_POSITION,
} from '../actionsTypes';

const initialState = {
  loading: false,
  error: null,
  position: null,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case REQUEST_POSITION:
      return {
        ...state,
        loading: true,
      };
    case RECEIVE_POSITION:
      return {
        ...state,
        loading: false,
        position: action.position,
      };
    case COULNDT_RECEIVE_POSITION:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    default:
      return state;
  }
}
