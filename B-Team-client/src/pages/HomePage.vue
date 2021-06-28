<template>
  <div class="container">
    <div class="row">
      <div class="col-md-3">
        <optionsComponent />
      </div>
      <div class="col-md-6">
        <searchComponent />
        <postComponent v-for="post in posts" :key="post.id" :post-prop="post" />
      </div>
      <div class="col-3 d-none d-md-block">
        <trendingComponent />
        <followComponent />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import { postsService } from '../services/PostsService'
import { AppState } from '../AppState'
import { trendingService } from '../services/TrendingService'
export default {
  setup() {
    onMounted(() => {
      postsService.getPosts()
      trendingService.getTrending()
    })
    return {
      posts: computed(() => AppState.posts)
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
