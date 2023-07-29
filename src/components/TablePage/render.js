export default {
  name: 'RenderCell',
  functional: true,
  props: {
    render: Function,
    params: Object,
  },
  render: (h, ctx) => {
    const params = ctx.props.params
    return ctx.props.render(h, params)
  },
}
