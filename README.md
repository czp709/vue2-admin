# vue2-admin

体验地址：[vue2-admin](https://chenzp.club)

体验地址：[zipen's blog](http://blog.chenzp.club)

一级账号：admin 密码：123456

二级账号：visitor  密码：123456

遇到BUG或者有更好的实现方式欢迎联系我（有代码不理解的地方也可以给我发邮件询问）。邮箱：chenzhipeng709@163.com
___
## vue2+element+axios 后台模板

为了减少打包体积，vue、elementui使用的是cdn引入,为了稳定性推荐使用自己的cdn服务。本人在日常使用中是将vue，element文件放在了自己的服务器，这样既保证了一定的稳定性和快速响应。也方便在其他项目中通过CDN引入。

___
## 引入mock，便于前后端分离开发。
__
## 关于mockjs 

为了效果展示，本人在正式环境中也使用了mock.js生成测试数据。但是正式版本是不会使用的！

在正式使用时请在中断中执行
```
npm uninstall mockjs --save
```
如果在开发过程中需要测试数据，请执行下面的指令在开发环境中安装mockjs
```
npm install mockjs -D
```

___
## 对 axios 进行封装

在utils/request.js中可以配置请求头，可以根据自己的实际情况进行修改

将请求的基础url配置在环境中

通用环境为.env

开发环境为.env.development

生产环境为.env.production

环境变量优先级 .env.production = .env.development > .env

在项目src目录下含有api文件夹，然后在其中新建 user.js文件，这个文件是主要书写API的封装过程。

在使用时推荐将一类接口放在同一个文件下，方便我们进行调试和统一管理

如果采用@/api/user.js 格式，在使用时首先引入。例如我在@/component/login.vue 中
首先引入文件
```JavaScript
import user from "@/api/user"
login () {
  let data = this.ruleForm
  user.loginApi(data).then(res => {
    console.log(res)
  })
}

```
___
## router 权限控制

根据登录接口返回的level字段进行判断，其中meta的levelname表示页面所需权限，不配置默认全可以访问。给每一位用户添加了level字段，level字段由此用户所持有权限的页面的levelname拼接而成。

<font color=red>对于不需要进行分级权限认证的系统请不要删除@/router/levelRouters，可以将所有页面的levelname全部删除，即全部设置为无需权限。</font>

在@/router/beforEach.js中含有路由守卫，基础的路由守卫已经添加，若还要实现其余功能（如：进行过某个操作后才能进入某个页面）可以在router/beforEach.js 内的Selfexecution函数内添加相应逻辑。

## 文本根据路由生成侧边导航

在@/router/beforEach.js中meta属性中配置侧边栏的icon，title，hidden。当hidden:true时侧边导航栏不显示。

动态导航栏是根据level、levelname、hidden生成的。
___
## VUEX

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
___
## 按钮节流

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
___
## 初始包含页面

登录页面、

密码找回页面、

404 页面、

Home 页

___

## 使用准备

```
npm uninstall mockjs --save

npm install mockjs -D

npm install
```


### 启动项目

```
npm run serve
```


### 项目打包

```
npm run build
```


### 代码格式化

```
npm run lint
```
