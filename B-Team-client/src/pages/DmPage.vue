<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-3">
        <optionsComponent />
      </div>
      <div class="col-md-4 col-12">
        <dmUsersComponent :dm-prop="connections" />
      </div>
      <div class="col-md-8 col-12">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import { messagesService } from '../services/MessagesService'
import { AppState } from '../AppState'
export default {
  setup() {
    onMounted(async() => {
      await messagesService.getConnections()
    })
    return {
      connections: computed(() => AppState.connections)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
