/* eslint-disable @typescript-eslint/no-use-before-define */
import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';

export function createHttpClient(config: { baseURL: string; context: string }) {
    const client = axios.create({
        ...request.defaults,
        ...config,
        paramsSerializer: {
            serialize: (params) => new URLSearchParams(params).toString(),
        },
    });

    client.interceptors.request.use(requestLogger, requestErrorHandler);
    client.interceptors.response.use(responseLogger, getResponseErrorHandler(config.context));

    return client;
}

function requestErrorHandler(error: unknown) {
    return Promise.reject(error);
}

function getResponseErrorHandler(context: string) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (error: any) => {
        const { config, response } = error || {};
        console.error({
            context,
            message: 'Request ended with an error',
            request_url: config?.url,
            request_method: config?.method,
            http_status: response?.status,
            exception: error,
            meta: {
                code: error?.code ?? 'N/A',
                baseURL: config?.baseURL ?? 'N/A',
                url: config?.url ?? 'N/A',
                method: config?.method.toUpperCase() ?? 'N/A',
                params: config?.params ?? 'N/A',
                data: config?.data ?? 'N/A',
                response: {
                    headers: response?.headers ?? 'N/A',
                    data: response?.data ?? 'N/A',
                },
            },
        });

        return Promise.reject(error);
    };
}

function requestLogger(request: InternalAxiosRequestConfig) {
    const { baseURL, url, params, method, data } = request;
    // @ts-ignore
    request.metadata = request.metadata || {};

    // @ts-ignore
    request.metadata.startTime = Date.now();

    console.info({
        context: 'REQUEST',
        message: method?.toUpperCase() || '',
        request_url: typeof url === 'string' && typeof baseURL === 'string' ? `${baseURL}${url}` : '',
        meta: {
            params,
            data,
        },
    });

    return request;
}
function responseLogger(response: AxiosResponse) {
    // @ts-ignore
    const startTime = response.config.metadata?.startTime || 0;

    console.info({
        context: 'REQUEST',
        message: response.config?.method?.toUpperCase() || '',
        request_url: response?.config?.url,
        http_status: response.status,
        ...(startTime ? { response_time: Date.now() - startTime } : {}),
        meta: {
            data: response.data,
        },
    });

    return response;
}

/**
 * Make axios instance with default options
 * @example
 * ```javascript
 * const data await client.get('http://www.ya.ru')
 * ```
 */
const request = axios.create({
    timeout: 5000,
    responseType: 'json',
    // eslint-disable-next-line @typescript-eslint/naming-convention
    headers: { 'X-Requested-With': 'XMLHttpRequest' },
    paramsSerializer: {
        serialize: (params) => JSON.stringify(params),
    },
});

request.interceptors.request.use(requestLogger, (error) => Promise.reject(error));

request.interceptors.response.use(responseLogger, (error) => {
    let status = 500;

    if (error.response) {
        status = error.response.status;
    }

    console.error({
        context: 'REQUEST',
        message: 'Request ended with an error',
        request_url: error?.config?.url,
        http_status: status,
        exception: {
            message: error?.message,
        },
    });

    return Promise.reject(error);
});
