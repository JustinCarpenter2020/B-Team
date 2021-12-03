<template>
  <div class="container">
    <div class="row">
      <div class="col-md-3 d-none d-md-block">
        <optionsComponent />
      </div>
      <div class="col-md-6 my-4">
        <searchComponent />
        <div class="scroll scrollbar">
          <postComponent v-for="post in posts" :key="post.id" :post-prop="post" />
        </div>
      </div>
      <div class="col-3 d-none d-md-block side-scroll scrollbar">
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
    onMounted(async() => {
      await postsService.getPosts()
      await trendingService.getTrending()
      await trendingService.getPeople()
    })
    return {
      posts: computed(() => AppState.posts)
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

@media only screen and (max-width: 600px) {
  .scroll{
  height: 60vh;
  overflow-y: auto;
  overflow-x: hidden;
}
}

@media only screen and (min-width: 600px) {
.scroll{
  height: 66vh;
  overflow-y: auto;
  overflow-x: hidden;
}

}

.side-scroll{
  height: 84vh;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
