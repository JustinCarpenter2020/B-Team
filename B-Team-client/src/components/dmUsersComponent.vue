<template>
  <div class="card height mt-4 text-light border-transparentWhite">
    <img class="card-img-top" src="holder.js/100x180/" alt="">
    <div class="card-body scroll scrollbar" v-if="dmProp.length > 0">
      <h4 class="card-title">
      </h4>
      <div class="small-cards mt-5 border-transparentWhite h-25 d-flex align-items-center" v-for="c in dmProp" :key="c.id">
        <p class="mx-2 my-0" v-if="account.id == c.user1" @click="getMessages(c.user2)">
          <img class="profile-img rounded" :src="c.receiver.picture" alt="">
          <span class="ml-3">
            {{ c.receiver.name.split("@")[0] }}
          </span>
        </p>
        <p class="mx-2 my-0" v-else @click="getMessages(c.user1)">
          <img class="profile-img rounded" :src="c.sender.picture" alt="">
          <span class="ml-3">
            {{ c.sender.name.split("@")[0] }}
          </span>
        </p>
      </div>
    </div>
    <div class="card-body text-light text-center" v-else>
      <p>You Don't Follow Any Accounts...</p>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { logger } from '../utils/Logger'
import { AppState } from '../AppState'
import { messagesService } from '../services/MessagesService'
export default {
  props: {
    dmProp: { type: Array, required: true }
  },
  setup() {
    return {
      account: computed(() => AppState.account),
      async getMessages(id) {
        try {
          await messagesService.getMessages(id)
        } catch (error) {
          logger.error(error)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.scroll{
  overflow-y: scroll;
}

.profile-img{
  height: 15vh;
  width: 15vh;
}
.height{
  height: 80vh;
}

.small-cards{
height: 10vh;
}
</style>
