import axios from "axios"

import * as actionTypes from "./actionTypes"

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    };
};


export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error

    };
};

export const auth = (email, password, isSignup) => {
    return dispatch =>{
        dispatch(authStart());
        const authData ={
            email: email,
            password: password,
            returnSecureToken: true
        };

        let url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDx0udYWayeH6V_g1r9LV739B3Ckn2jeV4";
        if(!isSignup){
            url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDx0udYWayeH6V_g1r9LV739B3Ckn2jeV4"
        }

        axios.post(url, authData)
            .then(response =>{
                dispatch(authSuccess(response.data.idToken, response.data.localId));
                dispatch(checkAuthTimeout(response.data.expiresIn));
                }
            ).catch(err =>{
                dispatch(authFail(err.response.data.error));
        })
    }
};

export const logout = () =>{
    return{
        type: actionTypes.AUTH_LOGOUT
    }
};

export const checkAuthTimeout = (expirationTime) =>{
    return dispatch =>{
        setTimeout(() =>{
            dispatch(logout());
        }, expirationTime * 1000)
    }
};