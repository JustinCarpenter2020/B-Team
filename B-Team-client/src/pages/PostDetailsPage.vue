<template>
  <div class="container-fluid">
    <div class="row mt-4">
      <div class="col-md-3">
        <optionsComponent />
      </div>
      <div class="col-md-6 mt-4 text-center">
        <div class="card">
          <img class="card-img-top" src="holder.js/100x180/" alt="">
          <div class="card-body">
            <h4 class="card-title">
              {{ post.body }}
            </h4>
            <div class="card-img" v-if="post.imgUrl">
              <img :src="post.imgUrl" alt="">
            </div>
          </div>
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
import { AppState } from '../AppState'
import { useRoute } from 'vue-router'
export default {
  setup() {
    const route = useRoute()
    const state = reactive({
    })
    onMounted(() => {
      postsService.getOne(route.params.id)
    })
    return {
      state,
      post: computed(() => AppState.activePost)
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
