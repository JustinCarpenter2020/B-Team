<template>
  <div class="container-fluid">
    <div class="row mt-md-3">
      <div class="col-md-3 d-none d-md-block">
        <optionsComponent />
      </div>
      <div class="col-md-4 col-12 d-none d-md-block">
        <dmUsersComponent :dm-prop="connections" />
      </div>
      <span :class="{'mobile-hide': mobileHide} " class="d-block d-md-none col-12">
        <div class="row">
          <mobileDmUserComponent :dm-prop="connections" />
        </div>
      </span>
      <div class="col-md-5 col-12 ">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { connectionsService } from '../services/ConnectionsService'
import { useRoute } from 'vue-router'
export default {
  setup() {
    const route = useRoute()
    onMounted(async() => {
      await connectionsService.getConnections()
    })
    return {
      mobileHide: computed(() => route.name === 'MessagePage'),
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

@media screen and(max-width: 759px){
  .mobile-hide{
    display: none !important;
  }
}
</style>
