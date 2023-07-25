import Vue from 'vue'
import {
  Avatar,
  Input,
  Form,
  FormItem,
  Button,
  Link,
  Container,
  Aside,
  Main,
  Header,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Tooltip,
  Loading,
  MessageBox,
  Message,
  Notification,
  Tree,
} from 'element-ui'

Vue.use(Avatar)
Vue.use(Input)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Link)
Vue.use(Container)
Vue.use(Main)
Vue.use(Header)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Tooltip)
Vue.use(Submenu)
Vue.use(Aside)
Vue.use(Button)
Vue.use(Loading.directive)
Vue.use(Tree)
Vue.prototype.$loading = Loading.service
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$notify = Notification
Vue.prototype.$message = Message
