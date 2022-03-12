# vue2-admin

体验地址：[vue2-admin](http://chenzp.ltd)
一级账号：admin 密码：123456
二级账号：vistor  密码：123456

#### vue2+element+axios 后台模板

为了减少打包体积，vue、elementui使用的是cdn引入,为了稳定性推荐使用自己的cdn服务。本人在日常使用中是将vue，element文件放在了自己的服务器，这样既保证了一定的稳定性和快速响应。也方便在其他项目中通过CDN引入。

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

根据登录接口返回的level字段进行判断，其中meta的levelname表示页面所需权限，不配置默认全可以访问。给每一位用户添加了level字段，level字段由此用户所持有权限的页面的levelname拼接而成。

在router/index.js中含有路由守卫

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

其中meta的levelname表示页面所需权限，不配置默认全可以访问。给每一位用户添加了level字段，level字段有此用户所持有权限的页面的levelname拼接而成。

其中meta属性中配置侧边栏的icon，title，是否显示。当hidden:true时侧边导航栏不显示。

动态导航栏是根据level、levelname、hidden生成的。

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
