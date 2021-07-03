<template>
  <div class="card mt-4 text-white border-transparentWhite">
    <img class="card-img-top" src="holder.js/100x180/" alt="">
    <div class="card-body">
      <h4 class="card-title">
        Trends For You
      </h4>
      <p v-for="(t, index) in trending" :key="index" class="card-text">
        #{{ t }}
      </p>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
export default {
  setup() {
    return {
      trending: computed(() => AppState.trending)
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
.card-text:hover{
 color: #1DA1F2;
  cursor: pointer;
}
</style>
