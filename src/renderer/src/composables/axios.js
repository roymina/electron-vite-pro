import Axios from 'axios'
import { ElMessage } from 'element-plus'
import { usePersistStore } from '@/stores/persistStore'

const baseURL = 'http://localhost:4000/api'
import router from '@/router'
const axios = Axios.create({
  baseURL,
  timeout: 30000
})

// 前置拦截器（发起请求之前的拦截）
axios.interceptors.request.use(
  (config) => {
    //注意useDataStore必须放在这个位置，见官方文档：https://pinia.vuejs.org/core-concepts/outside-component-usage.html#single-page-applications
    const store = usePersistStore()
    const { token } = store
    //获取并设置token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 后置拦截器（获取到响应时的拦截）
axios.interceptors.response.use(
  (response) => {
    if (response.config.method !== 'get') {
      ElMessage({
        message: '操作成功',
        grouping: true,
        type: 'success'
      })
    }
    return response
  },
  (error) => {
    if (error.response && error.response.data) {
      const code = error.response.status
      //unauthorized
      if (code === 401) {
        ElMessage({
          message: '登录已过期',
          grouping: true,
          type: 'error'
        })
        router.push('/login')
      } else {
        const data = error.response.data
        const isString = typeof data === 'string'
        ElMessage({
          message: isString ? data : `发生错误，${code}`,
          grouping: true,
          type: 'error'
        })
      }
    } else {
      ElMessage({
        message: '发生错误',
        grouping: true,
        type: 'error'
      })
    }
    return Promise.reject(error)
  }
)
export default axios
