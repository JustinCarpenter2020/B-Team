<template>
  <div class="card text-light border-transparentWhite mt-4" v-if="profile">
    <img class="card-img-top" src="holder.js/100x180/" alt="">
    <div class="card-body container-fluid p-0">
      <img class="img-top" :src="profile.banner" alt="">
      <div class="row" v-if="profile.name">
        <div class="col-6">
          <img class="profileImg mx-4" :src="profile.picture" />
        </div>
        <div class=" col-6 text-right">
          <button class="btn btn-outline-info m-2">
            Follow
          </button>
        </div>
        <div class="col-md-8">
          <h4 class="mx-2">
            {{ profile.name.split('@')[0] }}
          </h4>
        </div>
        <div class="col-md-8">
          <p class="mx-2">
            @{{ profile.name.split('@')[1] }}
          </p>
        </div>
        <div class="col">
          <p class="mx-4">
            {{ profile.bio }}
          </p>
        </div>
      </div>
    </div>
    <!-- <div class="card-footer border-top">
      <div class="row justify-content-around">
        <div class="col-4">
          <p>Tweets</p>
        </div>
        <div class="col-4">
          <p>Media</p>
        </div>
        <div class="col-4">
          <p>Likes</p>
        </div>
      </div>
    </div> -->
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
  height: 20vh;
}

.profileImg{
  position: relative;
  transform: translateY(-80px);
  border-radius: 50%;
  border: 4px solid black;
}

.btn{
  border-radius:2em;
}

.col-6{
  height: 4rem;
}
</style>
