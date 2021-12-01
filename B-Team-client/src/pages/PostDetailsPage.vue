<template>
  <div class="container-fluid">
    <div class="d-block d-md-none mt-3 mb-0">
      <router-link :to="{name: 'Home'}">
        <i class="fas fa-chevron-left  text-light"></i>
      </router-link>
    </div>
    <div class="row mt-md-4">
      <div class="col-md-3 d-none d-md-block">
        <optionsComponent />
      </div>
      <div class="col-md-6 mt-4 text-center text-white mb-5 scroll scrollbar">
        <postComponent :post-prop="post" />
        <commentComponent v-for="c in comments" :key="c.id" :comment-prop="c" />
      </div>
      <div class="col-md-3  d-none d-md-block">
        <followComponent />
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
import { trendingService } from '../services/TrendingService'
export default {
  setup() {
    const route = useRoute()
    const state = reactive({
    })
    onMounted(() => {
      postsService.getOne(route.params.id)
      commentsService.getComments(route.params.id)
      trendingService.getPeople()
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

@media only screen and (max-width: 600px) {
  .scroll{
  height: 64vh;
}
}

@media only screen and (min-width: 600px) {
.scroll{
  height: 75vh;
}
}
</style>
