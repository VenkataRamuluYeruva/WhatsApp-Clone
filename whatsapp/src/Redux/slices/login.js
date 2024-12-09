import {getBasicSlice} from '../../Utils/getBasicSlice';
import { createSlice} from "@reduxjs/toolkit";

const loginData = {
    isAuthenticated:false,
    userId:null,
    ApiKey:null,
    Access_Token:null,
    Refresh_Token:null,
    isError: false,
    error: null,
    isLoading: false,
    data: null,
    isPending: false,
    state: null,
    status: null,
};

export const LoginSlice = createSlice({
    name:'login',
    initialState:loginData,
    reducers:{
        fetchStart:(state)=>{
            state.isLoading=true;
            state.isError=false;
            state.error=null;
            state.data=null;
            state.isPending=true;
            state.status=null;
            state.state="request";
            state.isAuthenticated=false;
            state.userId=null;
            state.ApiKey=null;
            state.Access_Token=null;
            state.Refresh_Token=null;

        },
        fetchSuccess:(state,action)=>{
            console.log("action in fetchSuccess:",action.payload);
            state.isLoading=false;
            state.isError=false;
            state.error=null;
            state.data=action.payload.data;
            state.isPending=false;
            state.status=action.payload.status;
            state.state="response";
            state.isAuthenticated=true;
            state.userId=action.payload.data.userId;
            state.ApiKey=action.payload.data.ApiKey;
            state.Access_Token=action.payload.data.accessToken;
            state.Refresh_Token=action.payload.data.refreshToken;
        },
        fetchFailure:(state,action)=>{
            console.log("action in fetchFailure:",action.payload);
            state.isLoading=false;
            state.isError=true;
            state.error=action.payload.data.error;
            state.data=null;
            state.isPending=false;
            state.status=action.payload.status;
            state.state="failure";
            state.isAuthenticated=false;
            state.userId=null;
            state.ApiKey=null;
            state.Access_Token=null;
            state.Refresh_Token=null;
        }
    }
})

export const RegisterSlice = getBasicSlice({name:"register"});

export const UsersSlice = getBasicSlice({name:"users"});

export const {
    fetchStart: loginStart,
    fetchSuccess: loginSuccess,
    fetchFailure: loginFailure
}=LoginSlice.actions;

export const {
    fetchStart: registerStart,
    fetchSuccess: registerSuccess,
    fetchFailure: registerFailure
}=RegisterSlice.actions;

export const {
    fetchStart: usersStart,
    fetchSuccess: usersSuccess,
    fetchFailure: usersFailure
}=UsersSlice.actions;


export const LoginReducer = LoginSlice.reducer;
export const RegisterReducer = RegisterSlice.reducer;
export const UsersReducer = UsersSlice.reducer;