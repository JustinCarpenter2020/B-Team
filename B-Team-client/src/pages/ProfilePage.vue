<template>
  <div class="container">
    <div class="d-block d-md-none my-2">
      <router-link :to="{name: 'Home'}">
        <i class="fas fa-chevron-left  text-light"></i>
      </router-link>
    </div>
    <div class="row">
      <div class="col-md-3 d-none d-md-block">
        <optionsComponent />
      </div>
      <div class="col-md-6 mb-4">
        <ProfileCardComponent />
        <div v-if="posts.length > 0" class="">
          <postComponent v-for="post in posts" :key="post.id" :post-prop="post" />
        </div>
        <div v-else class="col-12 text-center text-light mt-4">
          <p>Oh no, no posts yet....</p>
        </div>
      </div>
      <div class="col-3 d-none d-md-block">
        <trendingComponent />
        <followComponent />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref, watchEffect } from '@vue/runtime-core'
import { profilesService } from '../services/ProfilesService'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState'
import { trendingService } from '../services/TrendingService'
export default {
  setup() {
    const route = useRoute()
    watchEffect(async() => {
      await profilesService.getProfile(route.params.id)
      await profilesService.getAllPostsByProfileId(route.params.id)
    })
    onMounted(async() => {
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
.scroll{
  height: 25vh;
}
</style>
