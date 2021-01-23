<template>
  <div class="container-fluid">
    <div class="blog-details row justify-content-center">
      <div class="card col-8">
        <div class="row">
          <img v-if="blog.imgUrl" class="card-img-top" :src="blog.imgUrl" alt="">
          <div class="card-body col">
            <h4 class="card-title">
              {{ blog.title }}
            </h4>
            <p class="card-text" :contenteditable="state.editBlog" @blur="editBlog">
              {{ blog.body }}
            </p><i class="fa fa-pencil text-success" aria-hidden="true" v-if="state.account.id == this.blog.creatorId" @click="state.editBlog = !state.editBlog"></i> <i class="fa fa-trash text-danger" aria-hidden="true" v-if="state.account.id == blog.creatorId" @click="deleteBlog"></i>
          </div>
          <div class="card-footer col">
            <CommentComponent v-for="comment in state.comments" :key="comment.id" :comment-prop="comment" />
            <div v-if="state.user.isAuthenticated">
              <form @submit.prevent="createComment">
                <div class="input-group mb-3">
                  <input type="text"
                         class="form-control"
                         placeholder="newComment"
                         aria-label="newComment"
                         aria-describedby="basic-addon2"
                         v-model="state.newComment.body"
                  >
                  <div class="input-group-append">
                    <button class="btn btn-outline-secondary" type="submit">
                      Comment
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { AppState } from '../AppState'
import { blogService } from '../services/BlogService'
import { logger } from '../utils/Logger'

export default {
  name: 'BlogDetailsPage',
  setup() {
    const route = useRoute()
    const router = useRouter()

    const state = reactive({
      comments: computed(() => AppState.activeBlogComments),
      user: computed(() => AppState.user),
      newComment: {},
      blog: computed(() => AppState.activeBlog),
      account: computed(() => AppState.account),
      editBlog: false
    })
    // NOTE need to pass the id through to the comment object before posting
    onMounted(async() => {
      try {
        await blogService.getOneBlog(route.params.id)
      } catch (error) {
        logger.error(error)
      }
      try {
        await blogService.getBlogComments(route.params.id)
      } catch (error) {
        logger.error(error)
      }
    })
    return {
      state,
      blog: computed(() => AppState.activeBlog),
      comments: computed(() => AppState.activeBlogComments),
      async createComment() {
        try {
          await blogService.createComment(state.newComment, this.blog.id)
        } catch (error) {
          logger.error(error)
        }
      },
      async deleteBlog() {
        try {
          await blogService.deleteBlog(this.blog.id)
          router.push({ name: 'Home' })
        } catch (error) {
          logger.log(error)
        }
      },
      editBlog(e) {
        try {
          blogService.editBlog(this.blog.id, e.target.innerText)
        } catch (error) {
          logger.log(error)
        }
      }

    }
  }
}
</script>
