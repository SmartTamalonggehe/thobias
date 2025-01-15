/** @format */

import axios from "axios";

// const BASE_URL = "https://wwf.sitoko.my.id";
const BASE_URL = "http://localhost:8000";
const url_auth = `${BASE_URL}/auth`;
const url_api = `${BASE_URL}/api`;
const url_crud = `${BASE_URL}/crud`;
const url_storage = `${BASE_URL}/storage`;

const auth = axios.create({
    baseURL: url_auth,
});
const crud = axios.create({
    baseURL: url_crud,
});
const api = axios.create({
    baseURL: url_api,
});

const storage = axios.create({
    baseURL: url_storage,
});

export {
    auth,
    crud,
    api,
    storage,
    BASE_URL,
    url_auth,
    url_api,
    url_crud,
    url_storage,
};
