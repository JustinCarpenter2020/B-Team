<template>
  <div class="card height mt-4 text-light border-transparentWhite">
    <img class="card-img-top" src="holder.js/100x180/" alt="">
    <div class="card-body scroll">
      <h4 class="card-title">
      </h4>
      <div class="small-cards mt-5 border-transparentWhite" v-for="c in dmProp" :key="c.id">
        <p>
          {{ c }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    dmProp: { type: Object, required: true }
  },
  setup() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.scroll{
  // height: 100vh;
  overflow-y: scroll;
}
.height{
  height: 80vh;
}

.small-cards{
height: 10vh;
}
</style>
