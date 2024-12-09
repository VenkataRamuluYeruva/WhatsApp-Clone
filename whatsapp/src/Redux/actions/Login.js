import { types } from "./types";


export const loginDisputch=(payload)=>{
    return {
        type:types.LOGIN,
        payload
    }

}

export const registerDisputch=(payload)=>{
    return {
        type:types.REGISTER,
        payload
    }

}

export const usersDisputch=(payload)=>{
    console.log("payload in action",payload);
    return {
        type:types.USERS,
        payload
    }

}