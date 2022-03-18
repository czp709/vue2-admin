import Mock from 'mockjs'
var Random = Mock.Random
Mock.setup({
    timeout: 500 //设置一个延迟时间虚拟服务器响应效果
})
Mock.mock(`${process.env.VUE_APP_BASE_URL}login`, 'post', function (option) {
    var $username = JSON.parse(option.body).username;
    if ($username == 'admin') {
        return Mock.mock({
            code: 200,
            data: {
                level: "acd150a6885f609532931d89844070b187da0c1d74d7335f83acb6f445b85a44",
                logo: "https://xiaoxiaoyu.club/pic/logo.png",
                name: "admin",
                token: Random.id()
            }
        })
    } else if ($username == 'visitor') {
        return Mock.mock({
            code: 200,
            data: {
                level: "87da0c1d74d7335f83acb6f445b85a44",
                logo: "https://xiaoxiaoyu.club/pic/logo.png",
                name: "visitor",
                token: Random.id()
            }
        })
    } else if (!$username) {
        return Mock.mock({
            code: 400,
            message: '请输入账号！'
        })
    } else {
        return Mock.mock({
            code: 400,
            message: '无效账号！'
        })
    }
})