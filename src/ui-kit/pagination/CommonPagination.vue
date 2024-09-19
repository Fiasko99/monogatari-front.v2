<script setup>
import { ref, onMounted, computed } from 'vue'
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
    <CommonBtn :disabled="currentPage === 1" @click="changePage(currentPage - 1)">
      &larr;
    </CommonBtn>
    <CommonBtn :disabled="currentPage === 1" @click="changePage(1)">
      {{ currentPage === 1 ? '...' : '1' }}
    </CommonBtn>
    <div id="currentPage">
      <CommonBtn @click="openTooltip('#currentPage')">
        {{ currentPage }}
      </CommonBtn>
    </div>
    <CommonBtn :disabled="currentPage === getCountPages" @click="changePage(getCountPages)">
      {{ currentPage === getCountPages ? '...' : getCountPages }}
    </CommonBtn>
    <CommonBtn
      :disabled="currentPage === getCountPages"
      @click="changePage(currentPage + 1)"
    >
      &rarr;
    </CommonBtn>
    <select @change="changeShowPostsCount" v-model="showPostsCount" class="select">
      <option class="option" value="10">10</option>
      <option class="option" value="20">20</option>
      <option class="option" value="50">50</option>
    </select>
    <TooltipComponent v-if="showTooltipForElemId" :to="showTooltipForElemId">
      <input type="number" v-model="toPage" />
      <hr />
      <CommonBtn @click="changePage(toPage)">Перейти</CommonBtn>
    </TooltipComponent>
  </div>
</template>

<style scoped src="./style.css" />
