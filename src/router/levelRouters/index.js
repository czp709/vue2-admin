import page404 from '@/components/404'
export const levelRouters = [
    {
        path: '/home',
        component: () => import('@/layout/home'),
        meta: { hidden: false, level: [1, 2] },
        children: [
            // 第一个子路由是做默认跳转用的,即进入home后默认进入的子路由，通常和第二个子路由引入的文件相同（即默认进入第二个子路由）
            {
                path: '',
                name: '',
                component: () => import('@/views/test1/test1.vue'),
                meta: {
                    hidden: true    //hidden为true时不在侧边导航栏显示
                }
            },
            {
                path: '/page1',
                name: '页面1',
                component: () => import('@/views/test1/test1.vue'),
                meta: {
                    hidden: false, //hidden为false，在侧边导航栏显示
                    level: [1, 2], //那些权限用户可以访问此页面，即level=1，level=2都可以访问
                    title: '实例页面1', //侧边导航栏显示的名称
                    icon: 'el-icon-coin' //侧边导航栏的图标
                }
            },
            {
                path: '/page2',
                name: '页面2',
                component: () => import('@/views/test2/test2.vue'),
                meta: {
                    hidden: false,
                    level: [1],
                    icon: 'el-icon-document',
                    title: '实例页面2'
                }
            },
            // 最后一个路由配置404页面，即用户访问了不存在的路由后同意跳转到404页面
            // 注意！！！一定要放在最后一项，否则在此路由后配置的的路由都将失效。
            {
                path: '/*',
                meta: {
                    hidden: true
                },
                component: page404
            }]
    }]

 
