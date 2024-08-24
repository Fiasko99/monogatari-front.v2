<script setup>
import CommonLink from '@/ui-kit/link/CommonLink.vue'

defineProps({
  post: {
    type: Object,
    required: true
  },
  user: {
    type: Object,
    required: true
  },
  character: {
    type: Object,
    required: true
  }
})

function returnDefaul(e) {
  e.target.src = `${import.meta.env.VITE_APP_CDN_URL}/default/characterAvatar.svg`
}

function getTime(time) {
  const date = new Date(time)
  const nowDate = new Date()
  let customTimeStr = ''
  const weaks = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота']
  const months = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь'
  ]
  const timings = {
    minute: 1000 * 60,
    day: 1000 * 60 * 60 * 24,
    yesterday: 1000 * 60 * 60 * 24 * 2,
    weak: 1000 * 60 * 60 * 24 * 7
  }

  if (nowDate.getTime() - date.getTime() < timings.minute) {
    customTimeStr = 'Меньше минуты'
  } else if (nowDate.getDay() === date.getDay()) {
    customTimeStr = `Сегодня в ${date.getHours()}:${date.getMinutes()}`
  } else if (nowDate.getTime() === date.getTime() + timings.day) {
    customTimeStr = `Вчера в ${date.getHours()}:${date.getMinutes()}`
  } else if (nowDate.getTime() - date.getTime() < timings.weak) {
    customTimeStr = `${weaks[date.getDay()]} ${date.getHours()}:${date.getMinutes()}`
  } else if (nowDate.getMonth() >= date.getMonth()) {
    customTimeStr = `${months[date.getMonth()]} ${date.getHours()}:${date.getMinutes()}`
  } else {
    customTimeStr = date.toLocaleString()
  }
  return customTimeStr
}
</script>

<template>
  <div class="post">
    <div class="top">
      <div class="info" :title="new Date(post.createdAt)">
        <span>{{ getTime(post.createdAt) }}</span>
      </div>
    </div>
    <div class="post-info">
      <div class="character">
        <CommonLink class="name" :to="{ name: 'Character', params: { id: character.id } }">{{
          character.name
        }}</CommonLink>
        <div class="imageWrapper">
          <img class="image" :src="character.avatar" @error="returnDefaul" alt="" />
        </div>
      </div>
      <div v-html="post.text" class="text"></div>
    </div>
  </div>
</template>
<style scoped src="./style.css"></style>
