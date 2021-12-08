import axios from 'axios';
import qs from 'qs';
import {
    Toast
} from 'vant';
/**
 * 环境
 */
// axios.defaults.baseURL = 'https://msjt.jxsxkeji.com/';
axios.defaults.baseURL = process.env.NODE_ENV == 'development' ? '/api' : 'https://msjt.jxsxkeji.com/',
    // axios.defaults.baseURL = '/api';

    /**
     * 请求超时时间
     * @type {number}
     */
    axios.defaults.timeout = 10000;

/**
 * post请求头设置
 * @type {string}
 */
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
//axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

/**
 * token设置
 * @type {string}
 */
axios.defaults.headers.common['token'] = 'eyJhdXRoIjoibXNqdCIsInVpZCI6OCwiZXhwIjoxNjM5NTQ4Mzg5fQ%3D%3D'
// localStorage.getItem('token');

/**
 * 请求拦截
 */
axios.interceptors.request.use(

    config => {
        return config;
    },
    error => {
        return Promise.error(error);
    }
)

/**
 * 响应拦截
 */
axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        Toast(error.response.data.msg);
    }
)

/**
 * get请求
 * @param url
 * @param params
 * @returns {Promise<unknown>}
 */
export function get(url, params) {
    return new Promise((resolve) => {
        axios.get(url, {
            params
        }).then(res => {
            resolve(res.data);
        });
    });
}

/**
 * post请求
 * @param url
 * @param params
 * @returns {Promise<unknown>}
 */
export function post(url, params, type = 1) {
    return new Promise((resolve) => {
        if (type == 1) {
            axios.post(url, qs.stringify(params)).then(res => {
                resolve(res.data);
            })
        } else {
            axios.post('https://msjt.jxsxkeji.com/api/' + url, params).then(res => {
                resolve(res.data);
            })
        }
    })
}