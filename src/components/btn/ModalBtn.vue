<script setup>
import { useRouter, useRoute } from 'vue-router'

const route = useRoute()
const router = useRouter()

const props = defineProps({
  view: {
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
  const viewRoute = router.getRoutes().find((a) => a.name === props.view)
  const newViewName = 'ChildModal' + props.view
  const modalRoute = {
    path: '',
    name: 'Modal' + route.name,
    props: { view: props.view, previousView: route.name },
    component: () => import('@/components/modal/ModalView.vue'),
    children: [
      {
        path: viewRoute.path,
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
  <button @click="openModal">
    <slot></slot>
  </button>
  <router-view />
</template>
<style scoped></style>
