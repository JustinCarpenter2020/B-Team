<template>
  <div v-for="c in dmProp" :key="c.id" class="text-light col-12 mt-4 d-block d-md-none border-transparentWhite border-right-none border-left-none" @click="getMessages(c.user2)">
    <div class="row">
      <div class="col-4">
        <img class="circle my-2" :src="c.receiver.picture" alt="">
      </div>
      <div class="col-6 text-light">
        {{ c.receiver.name.split("@")[0] }}
      </div>
    </div>
  </div>
</template>
<script>
import { messagesService } from '../services/MessagesService'
import { logger } from '../utils/Logger'
export default {
  props: {
    dmProp: { type: Array, required: true }
  },
  setup() {
    return {
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
