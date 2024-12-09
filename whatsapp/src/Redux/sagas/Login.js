import { put,call,takeLatest } from "redux-saga/effects";
import { types } from "../actions/types";
import {LoginService, RegisterService} from "../../Services/api";

import { 
    loginStart,
    loginSuccess,
    loginFailure,
    registerFailure,
    registerStart,
    registerSuccess,


} from "../slices/login";


function* LoginSaga(action) {
    try {
      yield put(loginStart());

      const response = yield call(LoginService, action.payload);
      if (response.status === 200) {
        yield put(loginSuccess(response));
      } 
      else {
        yield put(loginFailure(response));
      }
    } catch (error) {
        console.log("error in LoginSaga:",error);
      yield put(loginFailure({ error: error || "Unexpected error occurred." }));
    }
  }


  function* RegisterSaga(action) {
    try {
      yield put(registerStart());
  
      const response = yield call(RegisterService, action.payload);
  
      if (response && response.success) {
        yield put(registerSuccess(response.data));
      } 
      else {
        yield put(registerFailure({ error: response.message || "Unexpected error occurred." }));
      }
    } catch (error) {
      yield put(registerFailure({ error: error.message || "Unexpected error occurred." }));
    }
  }


export function* LoginWatcherLogin(){
    yield takeLatest(types.LOGIN,LoginSaga);
    yield takeLatest(types.REGISTER,RegisterSaga);
}




