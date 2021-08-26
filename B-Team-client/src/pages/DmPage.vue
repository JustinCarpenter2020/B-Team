<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-4 col-12">
        <dmUsersComponent />
      </div>
      <div class="col-md-8 col-12">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    return {}
  }
}
</script>

<style lang="scss" scoped>

</style>
