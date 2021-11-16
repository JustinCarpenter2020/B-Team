<template>
  <div class="container-fluid">
    <div class="row mt-3">
      <div class="col-md-3 d-none d-md-block">
        <optionsComponent />
      </div>
      <div class="col-3 d-block d-md-none">
        <img class="img-fluid circle-profile" :src="account.picture" alt="">
      </div>
      <div class="col-6 d-block d-md-none text-light text-center">
        Messages
      </div>
      <mobileDmUserComponent :dm-prop="connections" />
      <div class="col-md-4 col-12 d-none d-md-block">
        <dmUsersComponent :dm-prop="connections" />
      </div>
      <div class="col-md-5 col-12 d-none d-md-block">
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
      connections: computed(() => AppState.connections),
      account: computed(() => AppState.account)
    }
  }
}
</script>

<style lang="scss" scoped>
.circle-profile{
  border-radius: 50%;
}
</style>
