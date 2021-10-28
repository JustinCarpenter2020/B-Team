<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-3">
        <optionsComponent />
      </div>
      <div class="col-md-4 col-12">
        <dmUsersComponent :dm-prop="connections" />
      </div>
      <div class="col-md-5 col-12">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { connectionsService } from '../services/ConnectionsService'
export default {
  setup() {
    onMounted(async() => {
      await connectionsService.getConnections()
    })
    return {
      connections: computed(() => AppState.connections)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
