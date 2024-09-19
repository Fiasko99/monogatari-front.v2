export default {
  path: '/region/:regionId',
  name: 'Region',
  component: () => import('@/views/region/RegionPage.vue')
}