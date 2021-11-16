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
      <div class="col-md-4 col-12 d-none d-md-block">
        <dmUsersComponent :dm-prop="connections" />
      </div>
      <div :class="{'mobile-hide': mobileHide} " class="d-block d-md-none">
        <mobileDmUserComponent :dm-prop="connections" />
      </div>
      <div class="col-md-5 col-12 ">
        <div>
          x
        </div>
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
