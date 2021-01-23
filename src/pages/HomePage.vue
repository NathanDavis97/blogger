<template>
  <div class="container-fluid">
    <button type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#modelId" v-if="state.user.isAuthenticated">
      Create Post
    </button>
    <QuickModal />
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
  name: 'Home',
  setup() {
    const state = reactive({
      blog: computed(() => AppState.blogs),
      user: computed(() => AppState.user)
    })

    onMounted(async() => {
      try {
        await blogService.getBlogs()
      } catch (error) {
        logger.error(error)
      }
    })
    return { state }
  }
}
</script>

<style scoped lang="scss">
.home{
  text-align: center;
  user-select: none;
  > img{
    height: 200px;
    width: 200px;
  }
}
</style>
