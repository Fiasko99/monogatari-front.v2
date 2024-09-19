export default {
  path: '/auth',
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
}