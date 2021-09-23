<template>
  <div class="component">
    <h1 class="text-light" v-for="m in messages" :key="m.id">
      {{ m }}
    </h1>
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
      await messagesService.getConnections(route.params.id)
    })
    return {
      messages: computed(() => AppState.currentMessages)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
