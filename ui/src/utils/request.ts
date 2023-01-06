// 封装axios
// axios构造函数实例化出的axios对象拥有拦截器属性，拦截器属性里有两个拦截器对象，一个是请求拦截器，一个是响应拦截器
// axios最核心的东西就是axios.prototype.request方法，使用axios发请求就是在调用这个方法
// axios.prototype.request会将请求拦截器，请求，响应拦截器放在一个数组里，形成一个队列，然后按照顺序用Promise,prototype.then()方法进行调用，
// then方法的返回值还是一个promise，因此就形成一个then链，直到队列中所有操作都执行结束，然后将最终的Promise返回。这就是axios的核心实现


// js封装axios
// import axios from 'axios'
// import { message } from 'antd'

// const [messageApi, contextHolder] = message.useMessage()

// // 是否显示重新登录
// export let isRelogin = { show: false };

// // 默认请求头
// axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'

// // 创建axios实例
// const service = axios.create({
//   // axios中请求配置有baseURL选项，表示请求URL公共部分
//   // baseURL: import.meta.env.VITE_APP_BASE_API,
//   baseURL: 'http://localhost:3030'
//   // 超时
//   timeout: 10000
// })

// // request拦截器
// service.interceptors.request.use(config => {
//   // 是否需要防止数据重复提交
//   const isRepeatSubmit = (config.headers || {}).repeatSubmit === false

//   // get请求映射params参数
//   if (config.method === 'get' && config.params) {
//     let url = config.url + '?' + tansParams(config.params);
//     url = url.slice(0, -1); 
//     config.params = {};
//     config.url = url;
//   }
//   if (!isRepeatSubmit && (config.method === 'post' || config.method === 'put')) {
//     const requestObj = {
//       url: config.url,
//       data: typeof config.data === 'object' ? JSON.stringify(config.data) : config.data,
//       time: new Date().getTime()
//     }
//   }
//   return config
// }, error => {
//     console.log(error)
//     Promise.reject(error)
// })

// // 响应拦截器
// service.interceptors.response.use(res => {  
//     // 未设置状态码则默认成功状态
//     const code = res.data.code || 200;
//     // 二进制数据则直接返回
//     if(res.request.responseType ===  'blob' || res.request.responseType ===  'arraybuffer'){
//       return res.data
//     }
//     if (code === 401) {
//       if (!isRelogin.show) {
//         isRelogin.show = true;
//         messageApi.open({
//           type: 'warning',
//           content: '请重新确认'
//         }).then(() => {
//         isRelogin.show = false;
//       }).catch(() => {
//         isRelogin.show = false;
//       });
//     }
//       return Promise.reject('请重新登录')
//     } else if (code === 1500) {
//       messageApi.open({
//         type: 'error',
//         content: 'msg'
//       })
//       return Promise.reject('发生错误')
//     } else if (code !== 200) {
//       messageApi.open({
//         type: 'error',
//         content: 'msg'
//       })
//       return Promise.reject('error')
//     } else {
//       return  Promise.resolve(res.data)
//     }
//   },
//   error => {
//     console.log('err' + error)
//     return Promise.reject(error)
//   }
// )
// export default service


// ts封装axios
// AxiosRequestConfig: 是我们使用axios请求传递参数的类型，也是我们请求拦截器里面的参数类型
// AxiosInstance: 使我们使用axios实例对象类型，我们使用axios.create(config?:AxiosRequestConfig)创建出来的都是AxiosInstance类型
// Axios： axios是AxiosStatic类型，并且继承了AxiosInstance类型，是两者的结合
// AxiosResponse: axios请求返回值都是AxiosResponse类型。并且AxiosResponse是一个接口泛型，这个泛型会应用到后端返回的data上面，所以我们可以根据后端接口返回不同的类型传递进去
// AxiosError: 响应拦截器里面的错误就是AxiosError类型
import axios, { AxiosInstance, AxiosRequestConfig,AxiosResponse } from "axios";

// 设置request
class Request {
    private instance: AxiosInstance
    constructor(config: AxiosRequestConfig) {
        this.instance = axios.create(config)
        // 添加请求拦截器
        this.instance.interceptors.request.use(
            config => {
                // 添加你在发起请求前要做的操作
                console.log('准备发起请求了');
                // 必须要设置返回值
                return config
            },
            error => {
                console.log('请求拦截失败 over',error)
            }
        )

        // 添加响应拦截器
        this.instance.interceptors.response.use(
            res => {
                // 添加你在接收数据之前进行的处理，可以进行很多判断在这里，常见的有status, data, headers
                console.log('添加响应操作')
                return res.data
            },
            error => {
                // 用来处理http常见错误
                console.log('响应失败',error)
                return error
            }
        )
    }
    request(config: AxiosRequestConfig): Promise<AxiosResponse> {
        return new Promise<AxiosResponse>((resolve, reject) => {
            this.instance?.request(config)
            .then((res) => {
                resolve(res)
            })
            .catch((error) => {
                reject(error)
            })
        })
    }

    // 常用方法封装
    get<T>(url: string,params?: object): Promise<T> {
        return this.instance.get(url, params )
    }
    post<T>(url: string, params?: object): Promise<T> {
        return this.instance.post(url, params)
    }
    put<T>(url: string, params?: object): Promise<T> {
        return this.instance.put(url ,params)
    }
    delete<T>(url: string, params?: object): Promise<T> {
        return this.instance.delete(url, params)
    }
}

// 实例化：
const web: Request = new Request({
    baseURL: 'http://localhost:3000',
    timeout: 100000,
})
export default web
