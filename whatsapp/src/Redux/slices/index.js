import { combineReducers } from "@reduxjs/toolkit";

import {LoginReducer,RegisterReducer,UsersReducer} from "./login";

export const rootReducer = combineReducers({
    login: LoginReducer,
    register: RegisterReducer,
    users: UsersReducer,
});