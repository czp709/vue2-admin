# vue2-admin

体验地址：[vue2-admin](http://chenzp.ltd)

#### vue2+element+axios 后台模板

为了减少打包体积，vue、elementui使用的是cdn引入

#### 引入mock，便于前后端分离开发。

#### 对 axios 进行封装

在utils/request.js中可以配置请求头，

将请求的基础url配置在环境中

开发环境为.env.development

生产环境为.env.production

axios调用方式为：

```JavaScript
this.$getAPI(url).then(res => {})
this.$postAPI(url).then(res => {})
```


#### router 权限控制

根据登录接口返回的level字段进行判断，分为1，2两级

在router/index.js中含有路由守卫

为了体现出权限差距，设置了admin账户。

登陆时账号输入admin密码随便输入为1级账号

账号密码都随便输入为2级账号

#### VUEX

将vuex模块化，登录和权限控制单独放在一个模块下

防止vuex数据刷新丢失，引入vuex-persistedstate

```JavaScript
    // 为了防止刷新页面vuex中的数据丢失，可以选择性地将数据存入sessionstorage中，防止丢失
    plugins: [createPersistedState({
        storage: window.sessionStorage,
        reducer(val) {
            return {
            // 只储存state中的isPC
            isPC: val.user.isPC
            }
        }
    })]
```


为了防止用户手动修改sessionstorage，添加了监听事件

```JavaScript
window.addEventListener('storage', function (e) {
    sessionStorage.setItem(e.key, e.oldValue)
});
```




#### 文本根据路由生成侧边导航

router/levelRouters/index.js中配置登陆后首页的页面路由

其中meta属性中配置侧边栏的icon，title，是否显示。当hidden:true时侧边导航栏不显示

其中meta的level表示那些权限用户可以访问此页面，不配置默认全可以访问。侧边导航栏也是根据此字段动态生成

#### 初始包含页面

登录页面、

密码找回页面、

404 页面、

Home 页

#### 按钮节流

添加了基础的按钮节流代码,在button上绑定v-preventReClick即可。

```JavaScript
// button节流，在button中添加v-preventReClick即可控制按钮，防止按钮连击，时间限制2s
Vue.directive("preventReClick", {
    inserted(el, binding) {
      el.addEventListener("click", () => {
        if (el.style.pointerEvents !== "none") {
          el.style.pointerEvents = "none"
          setTimeout(() => {
            el.style.pointerEvents = ""
          }, 2000)
        }
      })
    }
})
```

## Project setup

```
npm install
```


### Compiles and hot-reloads for development

```
npm run serve
```


### Compiles and minifies for production

```
npm run build
```


### Lints and fixes files

```
npm run lint
```
