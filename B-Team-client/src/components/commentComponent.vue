<template>
  <!-- //NOTE needs border between each one -->
  <div class="col-12 p-0 ">
    <div class="card">
      <img class="card-img-top" src="holder.js/100x180/" alt="">
      <div class="card-body">
        <h4 class="card-title">
          {{ commentProp.body }}
        </h4>
        <p class="card-text">
          Text
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: { commentProp: { type: Object, required: true } },
  setup() {
    return {}
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
