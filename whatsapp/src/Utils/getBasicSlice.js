import { createSlice} from "@reduxjs/toolkit";

const baseData = {
    isError: false,
    error: null,
    isLoading: false,
    data: null,
    isPending: false,
    state: null,
    status: null,
};

export const getBasicSlice = ({name,moreData={}})=>{
    return createSlice({
        name:name,
        initialState:{...baseData,...moreData},
        reducers:{
            fetchStart:(state)=>{
                state.isLoading=true;
                state.isError=false;
                state.error=null;
                state.data=null;
                state.isPending=true;
                state.status=null;
                state.state="request";

            },
            fetchSuccess:(state,action)=>{
                console.log("action in fetchSuccess:",action);
                state.isLoading=false;
                state.isError=false;
                state.error=null;
                state.data=action.payload.data;
                state.isPending=false;
                state.status=action.payload.status;
                state.state="response";
            },
            fetchFailure:(state,action)=>{
                console.log("action in fetchFailure:",action);
                state.isLoading=false;
                state.isError=true;
                state.error=action.payload.error;
                state.data=null;
                state.isPending=false;
                state.status=action.payload.status;
                state.state="failure";
            }
        }
    })
}
