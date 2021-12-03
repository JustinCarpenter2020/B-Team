<template>
  <div v-if="dmProp.length > 0" class="text-light col-12 border-transparentWhite border-right-none border-left-none">
    <div v-for="c in dmProp" :key="c.id" class="" @click="getMessages(c.user2)">
      <div class="row align-items-center" v-if="account.id == c.user1">
        <div class="col-4">
          <img class="circle my-2" :src="c.receiver.picture" alt="">
        </div>
        <div class="col-6 text-light">
          {{ c.receiver.name.split("@")[0] }}
        </div>
      </div>
    </div>
  </div>
  <div v-else class="text-light text-center w-100">
    <p>You Don't Follow Any Accounts...</p>
  </div>
</template>
<script>
import { computed } from '@vue/runtime-core'
import { messagesService } from '../services/MessagesService'
import { logger } from '../utils/Logger'
import { AppState } from '../AppState'
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
.circle{
  border-radius: 50%;
  height: 10vh;
}
</style>
