const importFn = require.context('../components', true, /\.js$/)
export default {
  install(app) {
    importFn.keys().forEach((path) => {
      if (path != './index.js') {
        const component = importFn(path).default
        app.component(component.name, component)
      }
    })
  },
}
