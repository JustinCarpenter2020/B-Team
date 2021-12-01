<template>
  <div>
    <div class="d-block d-md-none mt-1">
      <router-link :to="{name: 'DmPage'}">
        <i class="fas fa-chevron-left  text-light"></i>
      </router-link>
    </div>
    <dmComponent />
  </div>
</template>

<script>
import { computed, onMounted, watchEffect } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { messagesService } from '../services/MessagesService'
import { useRoute } from 'vue-router'
export default {
  setup() {
    const route = useRoute()
    watchEffect(async() => {
      if (route.name === 'MessagePage') {
        await messagesService.getMessages(route.params.id)
      }
    })
    return {
      account: computed(() => AppState.account)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
