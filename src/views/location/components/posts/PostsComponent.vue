<script setup>
import { defineProps } from 'vue'
import CommonLink from '@/ui-kit/link/CommonLink.vue'

defineProps({
  posts: {
    type: Array,
    required: true
  }
})

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
    customTimeStr = 'Меньше минуты назад'
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
  <div class="posts">
    <div v-for="post in posts" :key="post.id" class="post">
      <div class="top">
        <div class="user">
          <CommonLink
            :to="{ name: 'Characters', params: { nickname: post.character.user.nickname } }"
            >{{ post.character.user.nickname }}</CommonLink
          >
        </div>
        <div class="info" :title="new Date(post.createdAt)">
          <span>{{ getTime(post.createdAt) }}</span>
        </div>
      </div>
      <div class="post-info">
        <div class="character">
          <CommonLink :to="{ name: 'Character', params: { id: post.character.id } }">{{
            post.character.name
          }}</CommonLink>
        </div>
        <div v-html="post.text" class="text"></div>
      </div>
    </div>
  </div>
</template>
<style scoped src="./style.css"></style>
