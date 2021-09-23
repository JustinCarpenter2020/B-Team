<template>
  <div class="card height mt-4 text-light border-transparentWhite">
    <div class="card-body scroll">
      <div class="text-light mt-5" v-for="m in messages" :key="m.id">
        <div class="" v-if="m.to == account.id">
          <p class="text-right">
            <span class="from-them p-3">
              {{ m.body }}
            </span>
          </p>
        </div>
        <div class="from-me" v-else>
          <p class="text-left">
            {{ m.body }}
          </p>
        </div>
      </div>
    </div>
    <div class="card-footer">
      <p>talk</p>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
export default {
  setup() {
    return {
      messages: computed(() => AppState.currentMessages),
      account: computed(() => AppState.account)
    }
  }
}
</script>

<style lang="scss" scoped>
.height{
  height: 80vh;
}

.scroll{
  overflow-y: scroll;
}

.from-them{
  background-color: rgb(3, 184, 216);
  border-radius: 20px;
}
</style>
