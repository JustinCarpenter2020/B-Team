<template>
  <div class="mt-4 row">
    <div class="col-2">
      <div v-if="account">
        <img class="profilePic" :src="account.picture" alt="">
      </div>
    </div>
    <div class="col-10 mx-0">
      <div class="form-group">
        <input type="text"
               class="form-control input "
               name=""
               id=""
               aria-describedby="helpId"
               placeholder="What's Happening?"
        >
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
export default {
  setup() {
    return {
      account: computed(() => AppState.account)
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
.profilePic{
  border-radius: 50%;
  height: 3rem;
}

.input{
  border-radius: 25px;
}
</style>
