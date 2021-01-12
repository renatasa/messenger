import * as actionTypes from './actionTypes';

export const setEmailPassword=(email, password)=>{
    console.log('actions')
    return{
        type:actionTypes.SET_EMAIL_PASSWORD, 
        email: email, 
        password: password

    }
}

export const logout=()=>{
    return{
        type:actionTypes.LOGOUT
    }
}