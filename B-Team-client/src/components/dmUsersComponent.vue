<template>
  <div class="card height mt-4 text-light border-transparentWhite">
    <img class="card-img-top" src="holder.js/100x180/" alt="">
    <div class="card-body scroll">
      <h4 class="card-title">
        Messages
      </h4>
      <div class="small-cards mt-5 border-transparentWhite">
        <p>
          Text
        </p>
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
