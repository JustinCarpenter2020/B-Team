<template>
  <div class="container">
    <div class="row">
      <div class="col-md-3">
        <optionsComponent />
      </div>
      <div class="col-md-6 mb-4">
        <ProfileCardComponent />
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
import { profilesService } from '../services/ProfilesService'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState'
export default {
  setup() {
    const route = useRoute()
    onMounted(async() => {
      await profilesService.getProfile(route.params.id)
      await profilesService.getAllPostsByProfileId(route.params.id)
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
