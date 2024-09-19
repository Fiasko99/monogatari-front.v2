export default (children) => {
  return {
    path: 'modal',
    component: () => import('@/views/modal/ModalView.vue'),
    children: children.map(({path, to, from, component}) => {
      const preparePath = path[0] === '/' ? path.slice(1, path.length) : path
      return {
        path: preparePath,
        name: `${to}In${from}`,
        component
      }
    })
  }
}