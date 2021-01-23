<template>
  <div class="container-fluid">
    <div class="about text-center row">
      <div class="col">
        <h2>Welcome {{ state.user.name }}</h2>
        <img class="rounded " :src="state.user.picture" alt="" />
        <p>{{ state.user.email }}</p>
      </div>
    </div>
    <div class="row">
      <BlogComponent v-for="blog in state.blog" :key="blog.id" :blog-prop="blog" />
    </div>
  </div>
</template>

<script>
import { computed, reactive, onMounted } from 'vue'
import { AppState } from '../AppState'
import { blogService } from '../services/BlogService'
import { logger } from '../utils/Logger'
export default {
  name: 'Account',
  setup() {
    const state = reactive({
      blog: computed(() => AppState.blogs),
      user: computed(() => AppState.user)
    })

    onMounted(async() => {
      try {
        await blogService.getMyBlogs(state.user.id)
      } catch (error) {
        logger.error(error)
      }
    })
    return { state }
  }
}
</script>

<style scoped>
img {
  max-width: 80px;
}
</style>
