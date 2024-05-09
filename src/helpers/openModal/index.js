export default (router, route) => (routeName) => {
  router.addRoute(route.name, {
    path: 'modal',
    name: 'Modal',
    props: { view: routeName },
    component: () => import('@/modal/ModalView.vue')
  })
  router.push({ name: 'Modal' })
}
