<template>
  <div class="CommentComponent col">
    <div class="row py-1 border my-2">
      <div class="col ">
        <img :src="commentProp.creator.picture" alt="" class="img-fluid profPic"><span>   </span> {{ commentProp.creator.name }}
      </div>
      <div class="col" :contenteditable="state.editComment" @blur="editComment">
        {{ commentProp.body }}
      </div> <i class="fa fa-pencil text-success" aria-hidden="true" v-if="state.account.id == commentProp.creatorId" @click="state.editComment = !state.editComment"></i> <i class="fa fa-trash text-danger" aria-hidden="true" v-if="state.account.id == commentProp.creatorId" @click="deleteComment"></i>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { logger } from '../utils/Logger'
import { AppState } from '../AppState'
import { blogService } from '../services/BlogService'
export default {
  name: 'CommentComponent',
  props: {
    commentProp: { type: Object, required: true }
  },
  setup(props) {
    const state = reactive({
      account: computed(() => AppState.account),
      editComment: false
    })
    return {
      state,
      deleteComment() {
        try {
          blogService.deleteComment(props.commentProp.id, AppState.activeBlog.id)
        } catch (error) {
          logger.log(error)
        }
      },
      editComment(e) {
        try {
          blogService.editComment(props.commentProp.id, e.target.innerText)
        } catch (error) {
          logger.log(error)
        }
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
