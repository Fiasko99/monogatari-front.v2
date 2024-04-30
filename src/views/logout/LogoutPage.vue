<script setup>
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'
import fetcher from '@/Fetcher'
import { userStore } from '@/stores/user'

const router = useRouter()
const user = userStore()
onMounted(() => {
  fetcher
    .get('/user/logout')
    .then(() => {
      user.fieldUser()
      router.push('/')
    })
    .catch((err) => console.log(err))
})
</script>
<template>
  <div>
    <h1 align="center">Выход</h1>
  </div>
</template>
<style scoped src="./style.css"></style>
