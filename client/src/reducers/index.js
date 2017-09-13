import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import auth from './authReducer';
import surveys from './surveysReducer';

export default combineReducers({
	auth,
	form: formReducer,
	surveys
});
