<template>
  <div class="">
    <img @click.stop class="h-100 w-100" :src="gif.url" />
  </div>
</template>

<script>
import { Gif } from '../models/Gif'
export default {
  props: { gif: { type: Gif, default: new Gif({}) } },
  setup() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
</style>
