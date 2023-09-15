import axios from "axios";
import md5 from "js-md5";
import type { Method } from "axios";
import type { ResponseCodeMapValues } from '@type/config'

const version = import.meta.env.VITE_APP_VERSION;
const defaultGuid = import.meta.env.VITE_DEFAULT_GUID;
const platform = import.meta.env.VITE_APP_PLATFORM;
const defaultToken = import.meta.env.VITE_DEFAULT_TOKEN;
const hashRule = [
    [9, 18, 19, 23, 3, 31],
    [1, 4, 12, 17, 22, 29],
    [6, 19, 31, 0, 12, 18],
    [4, 22, 21, 11, 5, 10],
    [8, 20, 12, 28, 25, 20],
    [12, 28, 13, 19, 20, 21],
    [10, 24, 16, 27, 11, 22],
    [14, 10, 28, 18, 16, 12]
];

// 创建axios实例
const request = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 10000,
    timeoutErrorMessage: "请求超时",
});


/**
 * 请求方法
 * @param url {String} 请求地址
 * @param params {Object} 请求参数
 * @param methods {String} 请求方式
 * @param isBusiness {Boolean} 是否是业务接口 需要登录
 */
const api = (url: string, params: object, methods: Method = 'POST', isBusiness: boolean = false) => {
    const userGuid = '';
    const userToken = '';
    const time = Math.floor(new Date().getTime() / 1000);
    let temp = ''
    let tempToken = ''
    let str = ''
    // 是否是业务接口 需要登录
    if (isBusiness) {
        temp += userToken.substring(5, 1);
        temp += userToken.substring(8, 1);
        temp += userToken.substring(7, 1);
        const num = parseInt(temp, 16) % 8;
        const temp_hash = hashRule[num];

        for (let i = 0; i < 6.; i++) {
            tempToken += userToken.substring(temp_hash[i], 1);
        }
        str = time + url + userGuid + tempToken;
    } else {
        str = time + url + defaultGuid + defaultToken;
    }
    // 生成签名
    const signatures = md5(str);

    // 发起请求
    return request(url, {
        method: methods,
        data: params,
        responseType: 'json',
        headers: {
            'Ghwl-Time': time,
            'Ghwl-User': userGuid || defaultGuid,
            'Ghwl-Version': version,
            'Ghwl-Signatures': signatures,
            'Ghwl-Platform': platform,
        }
    }).then((response) => {
        const { code, data, msg } = response.data;
        // 错误映射
        const responseCodeMap: Record<string, ResponseCodeMapValues> = {
            40000: {
                msg: '服务器操作失败'
            },
            40001: {
                msg: 'Server internal error!'
            },
            40002: {
                msg: 'Request timeout!'
            },
            40004: {
                msg: 'Global user ID can not be null!',
                handle: () => {
                    // 强制登录
                }
            },
            40005: {
                msg: 'Signature error!',
                handle: () => {
                    // 强制登录
                }
            },
            40006: {
                msg: '未知错误',
            },
            40007: {
                msg: 'user not!',
                handle: () => {
                    // 强制登录
                }
            },
            40009: {
                msg: 'token time out!',
                handle: () => {
                    // 强制登录
                }
            },
            41044: {
                msg: '数据库操作失败',
            },
            41054: {
                msg: '缺少关键字段',
            },
            41064: {
                msg: '	参数错误',
            },
        }
        // 错误处理
        if (code !== 20000) {
            alert(msg || responseCodeMap[code].msg)
            return Promise.reject(response.data);
        }

        // 成功
        return Promise.resolve(data);
    }).catch((err) => {
        return err;
    });
}

export default api;