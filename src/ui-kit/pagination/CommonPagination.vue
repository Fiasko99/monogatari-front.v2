<script setup>
import { defineEmits, defineProps, ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import CommonBtn from '@/ui-kit/btn/CommonBtn.vue'
import TooltipComponent from '@/ui-kit/tooltip/TooltipComponent.vue'

const emit = defineEmits(['getData'])
const props = defineProps({
  count: {
    required: true,
    type: Number
  }
})
const route = useRoute()
const router = useRouter()

const showPostsCount = ref(route.query.limit || 10)
const showTooltipForElemId = ref('')
const toPage = ref()

const currentPage = computed(() => {
  return route.query.page ? parseInt(route.query.page) : 1
})
const getCountPages = computed(() => {
  return Math.ceil(props.count / showPostsCount.value)
})

function changePage(page) {
  if (page < 1 || page > getCountPages.value) {
    return
  }
  router
    .replace({
      name: route.name,
      params: route.params,
      query: {
        ...route.query,
        page
      }
    })
    .then(() => {
      emit('getData')
    })
}

function changeShowPostsCount(e) {
  const query = {
    ...route.query,
    limit: e.target.value
  }
  const countPages = getCountPages.value
  if (currentPage.value > countPages) {
    query.page = countPages
  }
  router
    .replace({
      name: route.name,
      params: route.params,
      query
    })
    .then(() => {
      emit('getData')
    })
}

function openTooltip(elemId) {
  if (elemId === showTooltipForElemId.value) {
    showTooltipForElemId.value = ''
  } else {
    showTooltipForElemId.value = elemId
  }
}

onMounted(() => {
  route.query.page && changePage(currentPage.value)
})
</script>

<template>
  <div class="pagination">
    <CommonBtn :class="currentPage === 1 && 'hideArrow'" @click="changePage(currentPage - 1)">
      &larr;
    </CommonBtn>
    <CommonBtn v-if="currentPage - 3 > 0" @click="changePage(1)">1</CommonBtn>
    <div v-if="currentPage - 3 > 1" id="first">
      <CommonBtn @click="openTooltip('#first')"> ... </CommonBtn>
    </div>
    <CommonBtn v-if="currentPage - 2 > 0" @click="changePage(currentPage - 2)">
      {{ currentPage - 2 }}
    </CommonBtn>
    <CommonBtn v-if="currentPage - 1 > 0" @click="changePage(currentPage - 1)">
      {{ currentPage - 1 }}
    </CommonBtn>
    <CommonBtn>
      {{ currentPage }}
    </CommonBtn>
    <CommonBtn v-if="currentPage + 1 <= getCountPages" @click="changePage(currentPage + 1)">
      {{ currentPage + 1 }}
    </CommonBtn>
    <CommonBtn v-if="currentPage + 2 <= getCountPages" @click="changePage(currentPage + 2)">
      {{ currentPage + 2 }}
    </CommonBtn>
    <div v-if="currentPage + 3 < getCountPages" id="last">
      <CommonBtn @click="openTooltip('#last')"> ... </CommonBtn>
    </div>
    <CommonBtn v-if="currentPage + 2 < getCountPages" @click="changePage(getCountPages)">
      {{ getCountPages }}
    </CommonBtn>
    <CommonBtn
      :class="currentPage === getCountPages && 'hideArrow'"
      @click="changePage(currentPage + 1)"
    >
      &rarr;
    </CommonBtn>
    <select @change="changeShowPostsCount" v-model="showPostsCount">
      <option value="10">10</option>
      <option value="20">20</option>
      <option value="50">50</option>
    </select>
    <TooltipComponent v-if="showTooltipForElemId" :to="showTooltipForElemId">
      <input type="number" v-model="toPage" />
      <hr />
      <CommonBtn @click="changePage(toPage)">Перейти</CommonBtn>
    </TooltipComponent>
  </div>
</template>

<style scoped src="./style.css" />
