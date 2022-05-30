# vue2-admin

体验地址：[vue2-admin](https://chenzp.club)  
一级账号：admin 密码：123456  
二级账号：visitor 密码：123456  
遇到 BUG 或者有更好的实现方式欢迎联系我（有代码不理解的地方也可以给我发邮件询问）。邮箱：chenzhipeng709@163.com  

---
## 包含功能
1.首屏加载 loading 动画  
2.axios 封装  
3.router 权限控制  
4.根据权限动态生成侧边导航栏  
5.登录逻辑  
6.dashboard 页面布局  
7.mockjs  
8.CDN 引入 element 减小打包体积，并含有 cdn 失效更换机制  

---


## vue2+element+axios 后台模板

为了减少打包体积，vue、elementui 使用的是 cdn 引入,为了稳定性推荐使用自己的 cdn 服务。本人在日常使用中是将 vue，element 文件放在了自己的服务器，这样既保证了一定的稳定性和快速响应。也方便在其他项目中通过 CDN 引入。

---

## 引入 mock，便于前后端分离开发。

## 关于 mockjs

为了效果展示，本人在正式环境中也使用了 mock.js 生成测试数据。但是正式版本是不会使用的！

在正式使用时请在中断中执行

```
npm uninstall mockjs --save
```

如果在开发过程中需要测试数据，请执行下面的指令在开发环境中安装 mockjs

```
npm install mockjs -D
```

---

## 对 axios 进行封装

在 utils/request.js 中可以配置请求头，可以根据自己的实际情况进行修改

将请求的基础 url 配置在环境中

通用环境为.env

开发环境为.env.development

生产环境为.env.production

环境变量优先级 .env.production = .env.development > .env

在项目 src 目录下含有 api 文件夹，然后在其中新建 user.js 文件，这个文件是主要书写 API 的封装过程。

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

---

## router 权限控制

根据登录接口返回的 level 字段进行判断，其中 meta 的 levelname 表示页面所需权限，不配置默认全可以访问。给每一位用户添加了 level 字段，level 字段由此用户所持有权限的页面的 levelname 拼接而成。

<font color=red>对于不需要进行分级权限认证的系统请不要删除@/router/levelRouters，可以将所有页面的 levelname 全部删除，即全部设置为无需权限。</font>

在@/router/beforEach.js 中含有路由守卫，基础的路由守卫已经添加，若还要实现其余功能（如：进行过某个操作后才能进入某个页面）可以在 router/beforEach.js 内的 Selfexecution 函数内添加相应逻辑。

## 文本根据路由生成侧边导航

在@/router/beforEach.js 中 meta 属性中配置侧边栏的 icon，title，hidden。当 hidden:true 时侧边导航栏不显示。

动态导航栏是根据 level、levelname、hidden 生成的。

侧边栏颜色可以修改 VUEX 中的 aside_color 和 aside_rext_color

---

## VUEX

将 vuex 模块化，登录和权限控制单独放在一个模块下

防止 vuex 数据刷新丢失，引入 vuex-persistedstate

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

为了防止用户手动修改 sessionstorage，添加了监听事件

```JavaScript
window.addEventListener('storage', function (e) {
    sessionStorage.setItem(e.key, e.oldValue)
});
```

---

## 按钮节流

添加了基础的按钮节流代码,在 button 上绑定 v-preventReClick 即可。

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

---

## 初始包含页面

登录页面、

密码找回页面、

404 页面、

Home 页

---

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
