<template>
  <div class="BlogComponent col-6 my-2">
    <div class="card">
      <div class="card-body">
        <router-link :to="{name: 'BlogDetailsPage', params: {id: blogProp.id} }">
          <h4 class="card-title">
            {{ blogProp.title }}
          </h4>
        </router-link>

        <p class="card-text">
          <img class="profPic" :src="blogProp.creator.picture" alt=""> <span>  </span>{{ blogProp.creator.name }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { AppState } from '../AppState'

export default {
  name: 'BlogComponent',
  props: {
    blogProp: { type: Object, required: true }
  },
  setup(props) {
    const state = reactive({
      account: computed(() => AppState.account)

    })
    return {
      state

    }
  },
  components: {}
}
</script>

<style lang="scss" >
.profPic{
  height: 40px;
}
</style>
