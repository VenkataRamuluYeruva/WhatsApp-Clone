import { all } from "redux-saga/effects";
import { LoginWatcherLogin } from "./Login";
import { watchUsersSaga } from "./users";

export default function* rootSaga(){
    yield all([
        LoginWatcherLogin(),
        watchUsersSaga(),
    ])
}