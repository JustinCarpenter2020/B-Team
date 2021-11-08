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
          <p class="text-right" v-if="m.createdAt">
            {{ new Date(m.createdAt).toLocaleDateString('en-US', {day: 'numeric', month: 'short', year: 'numeric'}) }}
          </p>
        </div>
        <div class="" v-else>
          <p class="text-left">
            <span class="from-me p-3">
              {{ m.body }}
            </span>
          </p>
          <p class="text-left" v-if="m.createdAt">
            {{ new Date(m.createdAt).toLocaleDateString('en-US', {day: 'numeric', month: 'short', year: 'numeric'}) }}
          </p>
        </div>
      </div>
    </div>
    <div class="card-footer">
      <div class="row">
        <div class="col-8">
          <input type="text"
                 class="form-control input text-white"
                 name=""
                 v-model="newMessage.body"
                 id=""
                 aria-describedby="helpId"
                 placeholder="Message..."
          >
        </div>
        <div class="col-1">
          <i class="fas fa-microphone"></i>
        </div>
        <div class="col-1">
          <i class="fas fa-image"></i>
        </div>
        <div class="col-1">
          <button class="btn btn-info" :class="{disabled: !newMessage.body}" @click="createMessage">
            <i class="fas fa-plus-circle"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { useRoute } from 'vue-router'
import { logger } from '../utils/Logger'
import { messagesService } from '../services/MessagesService'
export default {
  setup() {
    const route = useRoute()
    const newMessage = ref({ to: route.params.id })
    return {
      newMessage,
      messages: computed(() => AppState.currentMessages),
      account: computed(() => AppState.account),
      async createMessage() {
        try {
          await messagesService.createMessage(newMessage.value)
          newMessage.body = ''
        } catch (error) {
          logger.error(error)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.height{
  height: 80vh;
}

.input{
  border-radius: 25px;
  color: #F5F8FA;
  background-color: #1c1f24c2 ;
}

.input::placeholder {
  color: #F5F8FA;
  opacity: .5;
}

.scroll{
  overflow-y: scroll;
}

.from-them{
  background-color: rgb(3, 184, 216);
  border-radius: 20px;
}

.from-me{
   background-color: rgb(115, 12, 248);
  border-radius: 20px;
}
</style>
