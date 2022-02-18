import { all, fork } from 'redux-saga/effects';
import userSaga from './user';
import postSaga from './post';
import axios from 'axios';
import { backUrl } from '../config/config';

if(process.env.NODE_ENV === 'development') {
    axios.defaults.baseURL = 'http://localhost:3065';
} else {
    axios.defaults.baseURL = backUrl;
}
axios.defaults.withCredentials = true;

export default function* rootSaga() {
    yield all([
        fork(userSaga),
        fork(postSaga),
    ])
}
