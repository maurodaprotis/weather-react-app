import {
  REQUEST_WEATHER,
  RECEIVE_WEATHER,
  COULNDT_RECEIVE_WEATHER,
  REQUEST_POSITION,
  RECEIVE_POSITION,
  COULNDT_RECEIVE_POSITION,
} from './actionsTypes';

export const requestWeather = () => ({
  type: REQUEST_WEATHER,
});

export const receiveWeather = weather => ({
  type: RECEIVE_WEATHER,
  weather,
});

export const couldntReceiveWeather = error => ({
  type: COULNDT_RECEIVE_WEATHER,
  error,
});

export const requestPosition = () => ({
  type: REQUEST_POSITION,
});

export const receivePosition = position => ({
  tpye: RECEIVE_POSITION,
  position,
});

export const couldntReceivePosition = error => ({
  type: COULNDT_RECEIVE_POSITION,
  error,
});

export const fetchWeather = ({ latitude, longitude }) => dispatch => {
  dispatch(requestWeather());
  return fetch(
    `https://api.weatherbit.io/v2.0/current?lat=${latitude}&lon=${longitude}&key=6b7cffbec4254c32a13dbfd968f009e7`,
    {
      headers: {
        Accept: 'application/json',
      },
    }
  )
    .then(response => response.json())
    .then(json => dispatch(receiveWeather(json.data[0])));
};

export const fetchPosition = () => dispatch => {
  dispatch(requestPosition());
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      const error = { message: `Geolocation now available` };
      reject(error);
    } else {
      navigator.geolocation.getCurrentPosition(
        position => {
          resolve(position);
        },
        error => {
          reject(error);
        }
      );
    }
  })
    .then(position => {
      dispatch(fetchWeather(position.coords));
      return dispatch(receivePosition(position));
    })
    .catch(error => dispatch(couldntReceivePosition(error)));
};

export const fetchPositionAndWeather = () => dispatch => dispatch(fetchPosition());
