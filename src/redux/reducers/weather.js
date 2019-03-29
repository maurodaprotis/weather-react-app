import {
  REQUEST_WEATHER,
  RECEIVE_WEATHER,
  COULNDT_RECEIVE_WEATHER,
} from '../actionsTypes';

const initialState = {
  loading: true,
  error: null,
  weather: null,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case REQUEST_WEATHER:
      return {
        ...state,
        loading: true,
      };
    case RECEIVE_WEATHER:
      return {
        ...state,
        loading: false,
        weather: action.weather,
      };
    case COULNDT_RECEIVE_WEATHER:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
}
