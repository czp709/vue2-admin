import http from "../utils/http"
const resquest = "login"

// get请求
export default {
  loginApi (params) {
    return http.post(`${resquest}`, params)
  }
}
