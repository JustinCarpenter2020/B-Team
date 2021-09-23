<template>
  <div class="">
    <dmComponent />
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
      account: computed(() => AppState.account)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
