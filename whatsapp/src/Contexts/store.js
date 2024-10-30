import {createSlice,configureStore} from '@reduxjs/toolkit';

const State = {
    tokenData:null,
    userDetails:null,
    otherUsers:null,
};

const userSlice = createSlice({
    name:'user',
    initialState:State,
    reducers:{
        setUserDetails:(state,action)=>{
            state.userDetails= action.payload;
        },
        setRemainingUser:(state,action)=>{
            state.otherUsers=action.payload;
        },
        setTokenData:(state,action)=>{
            state.tokenData=action.payload;
        },
    }
});
const store=configureStore({
    reducer:{
        user:userSlice.reducer,
    },
});
export const {setUserDetails,setRemainingUser,setTokenData} = userSlice.actions;
export default store;