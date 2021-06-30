<template>
  <div class="container-fluid">
    <div class="row mt-4">
      <div class="col-md-3">
        <optionsComponent />
      </div>
      <div class="col-md-6 mt-4 text-center text-white">
        <div class="row">
          <div class="card col-12 border">
            <img class="card-img-top" src="holder.js/100x180/" alt="">
            <div class="card-body">
              <h4 class="card-title">
                {{ post.body }}
              </h4>
              <div class="card-img" v-if="post.imgUrl">
                <img class="img-fluid rounded" :src="post.imgUrl" alt="">
              </div>
            </div>
          </div>
          <commentComponent v-for="c in comments" :key="c.id" :comment-prop="c" />
        </div>
      </div>
      <div class="col d-none d-md-block">
        side bar
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { computed, onMounted } from '@vue/runtime-core'
import { postsService } from '../services/PostsService'
import { commentsService } from '../services/CommentsService'

import { AppState } from '../AppState'
import { useRoute } from 'vue-router'
export default {
  setup() {
    const route = useRoute()
    const state = reactive({
    })
    onMounted(() => {
      postsService.getOne(route.params.id)
      commentsService.getComments(route.params.id)
    })
    return {
      state,
      post: computed(() => AppState.activePost),
      comments: computed(() => AppState.comments)
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
.rounded{
  border-radius: 8%;
}
</style>
