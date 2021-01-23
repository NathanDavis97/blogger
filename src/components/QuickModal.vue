<template>
  <div class="QuickModal">
    <!-- Button trigger modal -->

    <!-- Modal -->
    <div class="modal fade"
         id="modelId"
         tabindex="-1"
         role="dialog"
         aria-labelledby="modelTitleId"
         aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <form @submit.prevent="createBlog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">
                Modal title
              </h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <input type="text"
                     name="title"
                     id="title"
                     placeholder="Title"
                     required
                     v-model="state.newBlog.title"
              >
              <input type="text"
                     name="body"
                     id="body"
                     placeholder="Body"
                     required
                     v-model="state.newBlog.body"
              >
              <input type="url" name="imgUrl" id="imgUrl" placeholder="Image Url" v-model="state.newBlog.imgUrl">
            <!-- <input type="text" name="tags" id="tags" placeholder="tags"> -->
            </div>

            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">
                Close
              </button>
              <button type="submit" class="btn btn-primary">
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue'
import { logger } from '../utils/Logger'
import { blogService } from '../services/BlogService'

export default {
  name: 'QuickModal',
  setup() {
    const state = reactive({
      newBlog: {}
    })
    return {
      state,
      async createBlog() {
        try {
          await blogService.createBlog(state.newBlog)
        } catch (error) {
          logger.error(error)
        }
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
