export default {
  path: '/profile/:nickname',
  component: () => import('@/views/profile/ProfilePage.vue'),
  children: [
    {
      path: '',
      name: 'Characters',
      props: true,
      component: () => import('@/views/characters/CharactersPage.vue')
    },
    {
      path: 'settings',
      name: 'Settings',
      component: () => import('@/views/settings/SettingsPage.vue')
    },
    {
      path: 'logout',
      name: 'Logout',
      component: () => import('@/views/logout/LogoutPage.vue')
    }
  ]
}