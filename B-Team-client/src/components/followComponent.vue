<template>
  <div class="card text-center mt-4 text-white border-transparentWhite">
    <img class="card-img-top" src="holder.js/100x180/" alt="">
    <div class="card-body">
      <h4 class="card-title mb-3">
        Who to follow
      </h4>
      <div class="card-text row mb-3" v-for="(person, index) in people" :key="index">
        <div class="col-12 mb-2">
          {{ person }}
        </div>
        <div class="col-12">
          <button class="btn btn-outline-info" @click="follow">
            Follow
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
import Notification from '../utils/Notification'
export default {
  setup() {
    return {
      people: computed(() => AppState.people),
      follow() {
        Notification.toast('You must buy premium for that feature', 'info')
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
.btn{
  border-radius:2em;
}
</style>
