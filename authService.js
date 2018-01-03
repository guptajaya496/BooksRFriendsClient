import decode from 'jwt-decode';
import {browserHistory} from 'react-router';
import auth0 from 'auth0-js';


const ID_TOKEN_KEY = 'id_token';
const ACCESS_TOKEN_KEY = 'access-token';

export function getIdToken() {
    return localStorage.getItem(ID_TOKEN_KEY);
}

export function getAccessToken() {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
}

function clearIdToken() {
    localStorage.removeItem(ID_TOKEN_KEY);
}

function clearAccessToken() {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
}