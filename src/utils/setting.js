const Setting = {
  // api: 'http://127.0.0.1:3000',
  api: 'http://101.42.8.129:3000',
  theme: {
    // 侧边栏背景色
    aside_color: '#3d4657',
    // 侧边栏字体颜色
    aside_text_color: '#ffffff',
  },
  // 默认用户头像和名称
  defaultUserInfo: {
    avatar:
      'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
    nickname: 'admin',
  },
  // 系统logo和名称
  system: {
    logo: require('@/assets/logo.png'),
    name: '校小鱼',
  },
}

export default Setting
