<template>
  <div class="card text-light border-transparentWhite mt-4" v-if="profile">
    <img class="card-img-top" src="holder.js/100x180/" alt="">
    <div class="card-body p-0">
      <img class="img-top" src="https://images.unsplash.com/photo-1633505899118-4ca6bd143043?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1332&q=80" alt="">
      <img class="profileImg mx-4" :src="profile.picture" />
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'

export default {
  setup() {
    return {
      profile: computed(() => AppState.activeProfile)
    }
  }
}
</script>

<style lang="scss" scoped>
.img-top{
  width: 100%;
  height: 25vh;
}

.profileImg{
  position: relative;
  transform: translateY(-80px);
  border-radius: 50%;
  border: 4px solid black;
}
</style>
