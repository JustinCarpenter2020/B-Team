<template>
  <div class="card text-center mt-4 text-white border-transparentWhite">
    <img class="card-img-top" src="holder.js/100x180/" alt="">
    <div class="card-body">
      <h4 class="card-title mb-3">
        Who to follow
      </h4>
      <div class="card-text row mb-3" v-for="p in people" :key="p.id">
        <div class="col-12 mb-2">
          <p class="m-0">
            {{ p.name.split("@")[0] }}
          </p>
        </div>
        <div class="col-12">
          <button v-if="!followedIds.includes(p.id)" class="btn btn-outline-info" @click="follow(p.id)">
            Follow
          </button>
          <button class="btn btn-outline-danger" v-else>
            UnFollow
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref, watchEffect } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { connectionsService } from '../services/ConnectionsService'
import Notification from '../utils/Notification'
export default {
  setup() {
    const followedIds = ref([])
    watchEffect(() => AppState.connections.forEach(c => followedIds.value.push(c.user2)))
    return {
      followedIds,
      people: computed(() => AppState.people),
      account: computed(() => AppState.account),
      async follow(id) {
        try {
          if (this.account.name) {
            await connectionsService.newConnection(this.account.id, id)
          } else {
            Notification.toast('Please Login to follow other accounts!')
          }
        } catch (error) {
          logger.error(error)
        }
        // Notification.toast('You must buy premium for that feature', 'info')
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
