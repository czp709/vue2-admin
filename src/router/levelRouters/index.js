import page404 from '@/views/main/error/404'

export const levelRouters = [
  {
    path: '/home',
    component: () => {
      return import('@/layout/home')
    },
    meta: { hidden: false },
    children: [
      // 第一个子路由是做默认跳转用的,即进入home后默认进入的子路由，通常和第二个子路由引入的文件相同（即默认进入第二个子路由）
      {
        path: '',
        name: '',
        component: () => {
          return import('@/views/test1/PageTest1.vue')
        },
        meta: {
          hidden: true, // hidden为true时不在侧边导航栏显示
        },
      },
      {
        path: '/page1',
        name: '页面1',
        component: () => {
          return import('@/views/test1/PageTest1.vue')
        },
        meta: {
          hidden: false, // hidden为false，在侧边导航栏显示
          levelname: 'acd150a6885f609532931d89844070b1', // 那些权限用户可以访问此页面，即level=1，level=2都可以访问
          title: '实例页面1', // 侧边导航栏显示的名称
          icon: 'el-icon-coin', // 侧边导航栏的图标
        },
      },
      {
        path: '/page2',
        name: '页面2',
        component: () => {
          return import('@/views/test2/PageTest2.vue')
        },
        meta: {
          hidden: false,
          levelname: '87da0c1d74d7335f83acb6f445b85a44',
          icon: 'el-icon-s-custom',
          title: '实例页面2',
        },
      },
      {
        path: '/page3',
        name: 'page3',
        component: () => {
          return import('@/views/test3/PageTest3.vue')
        },
        children: [
          {
            path: '/page3',
            name: '页面3',
            component: () => {
              return import('@/views/test3/views/PageTest4.vue')
            },
            meta: {
              hidden: false,
              levelname: '87da0c1d74d7335f83acb6f445b85a44',
              icon: 'el-icon-s-flag',
              title: '实例页面3',
            },
          },
        ],
        meta: {
          hidden: false,
          levelname: '87da0c1d74d7335f83acb6f445b85a44',
          icon: 'el-icon-s-opportunity',
          title: '实例菜单3',
        },
      },
      // 最后一个路由配置404页面，即用户访问了不存在的路由后同意跳转到404页面
      // 注意！！！一定要放在最后一项，否则在此路由后配置的的路由都将失效。
      {
        path: '/*',
        meta: {
          hidden: true,
        },
        component: page404,
      },
    ],
  },
]
