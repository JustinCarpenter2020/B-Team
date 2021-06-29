<template>
  <div class="row mt-4">
    <div class="col-12">
      <div class="card">
        <img class="card-img-top" src="holder.js/100x180/" alt="">
        <div class="card-body">
          <router-link :to="{ name: 'postDetails', params: {id: postProp.id}}">
            <h4 class="card-title">
              {{ postProp.body }}
            </h4>
          </router-link>
          <div class="card-img" v-if="postProp.imgUrl">
            <img :src="postProp.imgUrl" alt="">
          </div>
        </div>
        <div class="row">
          <div class="col-4 text-right">
            <i class="far fa-comment"></i>
          </div>
          <div class="col-4 text-center">
            <i class="fas fa-exchange-alt"></i>
          </div>
          <div class="col-4">
            <i class="far fa-heart"></i>
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
