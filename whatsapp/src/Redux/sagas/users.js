import {put,call,takeLatest} from 'redux-saga/effects';
import { types } from '../actions/types';
import { usersStart,usersSuccess,usersFailure } from '../slices/login';
import { UsersService } from '../../Services/api';


function* UsersSaga(action){
    console.log("payload in saga",action.payload);
    try{
        yield put(usersStart());

        const response = yield call(UsersService,action.payload);
        console.log("response in saga",response);
        if(response.status===200){
            yield put(usersSuccess(response.data));
        }
        else{
            yield put(usersFailure(response.data));
        }

    }
    catch(error){
        yield put(usersFailure(error));
    }
}


export function* watchUsersSaga(){
    yield takeLatest(types.USERS,UsersSaga);
}