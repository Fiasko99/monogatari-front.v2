<script setup>
import { onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
const route = useRoute()
const router = useRouter()

const props = defineProps({
  view: String
})

function closeModal() {
  router.push(route.path.replace('/modal', ''))
}

function openPage() {
  const viewRoute = router.getRoutes().find((a) => a.name === props.view)
  router.push({ name: viewRoute.name })
}

onMounted(async () => {
  const newViewName = 'Modal' + props.view
  const viewRoute = router.getRoutes().find((a) => a.name === props.view)
  router.addRoute('Modal', {
    ...viewRoute,
    path: '',
    name: newViewName
  })
  router.push({ name: newViewName })
})
</script>
<template>
  <teleport to="body">
    <div class="modal">
      <div class="slot">
        <div class="btns">
          <button @click="closeModal" class="close-button">Закрыть модалку</button>
          <button @click="openPage" class="full-page">Открыть страницу</button>
        </div>
        <router-view />
      </div>
    </div>
  </teleport>
</template>
<style scoped src="./style.css"></style>
