export default {
  path: 'world',
  component: () => import('@/views/world/WorldPage.vue'),
  redirect: { name: 'History' },
  children: [
    {
      path: '',
      name: 'History',
      component: () => import('@/views/history/HistoryPage.vue')
    },
    {
      path: 'rules',
      name: 'Rules',
      component: () => import('@/views/rules/RulesPage.vue')
    },
    {
      path: 'events',
      name: 'Events',
      component: () => import('@/views/events/EventsPage.vue')
    }
  ]
}