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
                level: 1,
                logo: "https://czp-1304694162.cos.ap-nanjing.myqcloud.com/xiaoxiaoyu.png",
                name: Random.cname(),
                token: Random.id()
            }
        })
    } else if ($username=='visitor') {
        return Mock.mock({
            code : 200,
            data: {
                level: 2,
                logo: "https://czp-1304694162.cos.ap-nanjing.myqcloud.com/xiaoxiaoyu.png",
                name: Random.cname(),
                token: Random.id()
            }
        })
    } else if (!$username) {
        return Mock.mock({
            code:400,
            message:'请输入账号！'
        })
    } else {
        return Mock.mock({
            code:400,
            message:'无效账号！'
        })
    }
})