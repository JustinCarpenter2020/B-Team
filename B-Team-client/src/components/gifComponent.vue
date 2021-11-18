<template>
  <div class="">
    <img @click="attachGif" class="h-100 w-100" :src="gif.url" />
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
        console.log(props.gif.url)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
