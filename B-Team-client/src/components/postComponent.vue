<template>
  <div class="row mt-4">
    <div class="col-12">
      <div class="card">
        <img class="card-img-top" src="holder.js/100x180/" alt="">
        <div class="card-body">
          <h4 class="card-title">
            {{ postProp.body }}
          </h4>
          <div class="card-img" v-if="postProp.imgUrl">
            <img :src="postProp.imgUrl" alt="">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: { postProp: { type: Object, required: true } },
  setup() {
    return {}
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
