<script setup>
import { useRouter, useRoute } from 'vue-router'

const route = useRoute()
const router = useRouter()

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  params: {
    type: Object,
    default() {
      return {}
    }
  }
})

function openModal() {
  const viewRoute = router.getRoutes()
    .find((a) => a.name === props.name)    
  const newViewName = 'ChildModal' + viewRoute.name
  const modalRoute = {
    path: 'modal',
    name: 'Modal' + route.name,
    props: { view: props, previousView: { name: route.name, params: route.params } },
    component: () => import('@/views/modal/ModalView.vue'),
    children: [
      {
        path: viewRoute.path.slice(1, viewRoute.path.length),
        name: newViewName,
        components: viewRoute.components
      }
    ]
  }
  router.addRoute(route.name, modalRoute)
  router.push({ name: newViewName, params: props.params })
}
</script>
<template>
  <span class="btn" @click="openModal">
    <slot></slot>
  </span>
  <router-view />
</template>
<style scoped>
.btn {
  text-decoration: none;
  color: var(--link);
  cursor: pointer;

  &:hover {
    color: var(--link-active);
  }
}
</style>
