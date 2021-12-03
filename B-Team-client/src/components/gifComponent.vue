<template>
  <div class="loader">
    <img @click="attachGif" loading="lazy" class="h-100 w-100" :src="gif.url" />
  </div>
</template>

<script>
import { AppState } from '../AppState'
import { Gif } from '../models/Gif'
export default {
  props: { gif: { type: Gif, default: new Gif({}) } },
  setup(props) {
    return {
      attachGif() {
        AppState.activeGif = props.gif.url
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.loader {
  background-image: url('../assets/img/loader.gif');
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 80px;
  min-width: 80px;
}

</style>
