import axios from "axios";
import API_KEY from "../../rest/secrets";
import {AUTH_SUCCESS, LOGOUT_SUCCESS} from "./actionTypes";

export function auth(email, password, isLogin) {
    return async dispatch => {
        const authData = {
            email,
            password,
            returnSecureToken: isLogin
        };
        try {
            let url = '';
            if (isLogin) {
                url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;
            } else {
                url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;
            }
            const resp = await axios.post(url, authData);
            const data = resp.data;

            const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000);

            localStorage.setItem("token", data.idToken);
            localStorage.setItem("userId", data.localId);
            localStorage.setItem("expirationDate", expirationDate);

            dispatch(authSuccess(data.idToken));
            dispatch(autoLgout(data.expiresIn));

        } catch (e) {
            console.log(e)
        }
    }

}

export function authSuccess(token) {
    return {
        type: AUTH_SUCCESS,
        payload: token
    }
}

export function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("expirationDate");
    return {
        type: LOGOUT_SUCCESS,
    }
}

export function autoLgout(time) {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, time * 1000)
    }
}
