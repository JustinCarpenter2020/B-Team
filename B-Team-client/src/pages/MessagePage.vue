<template>
  <div class="component">
    <div class="text-light mt-5" v-for="m in messages" :key="m.id">
      <div class="" v-if="m.to == account.id">
        <p class="text-right">
          <span class="from-them p-3">
            {{ m.body }}
          </span>
        </p>
      </div>
      <div class="from-me" v-else>
        <p class="text-left">
          {{ m.body }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { messagesService } from '../services/MessagesService'
import { useRoute } from 'vue-router'
export default {
  setup() {
    const route = useRoute()
    onMounted(async() => {
      await messagesService.getMessages(route.params.id)
    })
    return {
      messages: computed(() => AppState.currentMessages),
      account: computed(() => AppState.account)
    }
  }
}
</script>

<style lang="scss" scoped>
.from-them{
  background-color: rgb(3, 184, 216);
  border-radius: 20px;
}
</style>
