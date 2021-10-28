<template>
  <div class="container">
    <div class="row">
      <div class="col-md-3">
        <optionsComponent />
      </div>
      <div class="col-md-6 mb-4">
        <ProfileCardComponent />
        <!-- <searchComponent /> -->
        <!-- <postComponent v-for="post in posts" :key="post.id" :post-prop="post" /> -->
      </div>
      <div class="col-3 d-none d-md-block">
        <trendingComponent />
        <followComponent />
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted } from '@vue/runtime-core'
import { profilesService } from '../services/ProfilesService'
import { useRoute } from 'vue-router'
export default {
  setup() {
    const route = useRoute()
    onMounted(async() => {
      await profilesService.getProfile(route.params.id)
    })
    return {}
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
