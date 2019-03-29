import { combineReducers } from 'redux';
import position from './position';
import weather from './weather';

export default combineReducers({ position, weather });
