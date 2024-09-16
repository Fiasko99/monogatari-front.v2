import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '',
      name: 'Main',
      component: () => import('@/views/main/MainPage.vue'),
      children: [
        {
          path: '',
          name: 'Regions',
          component: () => import('@/views/regions/RegionsPage.vue'),
        },
        {
          path: 'active',
          name: 'Active',
          component: () => import('@/views/active/ActivePage.vue')
        },
        {
          path: 'world',
          name: 'World',
          component: () => import('@/views/world/WorldPage.vue'),
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
      ]
    },
    {
      path: '/location/:locationId',
      name: 'Location',
      component: () => import('@/views/location/LocationPage.vue')
    },
    {
      path: '/character/:characterId',
      name: 'Character',
      component: () => import('@/views/character/CharacterPage.vue')
    },
    {
      path: '/auth',
      name: 'Auth',
      component: () => import('@/views/auth/AuthPage.vue'),
      children: [
        {
          path: '',
          name: 'Signin',
          component: () => import('@/views/signin/SigninPage.vue')
        },
        {
          path: 'signup',
          name: 'Signup',
          component: () => import('@/views/signup/SignupPage.vue')
        }
      ]
    },
    {
      path: '/profile/:nickname',
      name: 'Profile',
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
    },
    {
      path: '/region/:regionId',
      name: 'Region',
      component: () => import('@/views/region/RegionPage.vue')
    },
    {
      path: '/area/:areaId',
      name: 'Area',
      component: () => import('@/views/area/AreaPage.vue')
    },
  ]
})

export default router
