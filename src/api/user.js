import request from '@/utils/request'

// get请求
export default {
  loginApi (data) {
    return request({
      url: 'login',
      method: 'POST',
      data
    })
  }
}
