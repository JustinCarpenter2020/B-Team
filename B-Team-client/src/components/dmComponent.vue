<template>
  <div class="card height mt-md-4 mt-2 text-light border-transparentWhite">
    <div class="card-body scroll scrollbar">
      <div class="text-light mt-5" v-for="m in messages" :key="m.id">
        <div class="text-right" v-if="m.to == account.id">
          <p class="talk-bubble tri-right right-in round from-them" v-if="!m.body.includes('giphy')">
            <span class="">
              {{ m.body }}
            </span>
          </p>
          <img v-else class="w-50 rounded" :src="m.body" alt="">
          <p class="text-right" v-if="m.createdAt">
            {{ new Date(m.createdAt).toLocaleDateString('en-US', {day: 'numeric', month: 'short', year: 'numeric'}) }}
          </p>
        </div>
        <div class="" v-else>
          <p class="text-left talk-bubble tri-right left-in round from-me" v-if="!m.body.includes('giphy')">
            <span>
              {{ m.body }}
            </span>
          </p>
          <img v-else class="w-50 rounded" :src="m.body" alt="">
          <p class="text-left" v-if="m.createdAt">
            {{ new Date(m.createdAt).toLocaleDateString('en-US', {day: 'numeric', month: 'short', year: 'numeric'}) }}
          </p>
        </div>
      </div>
    </div>
    <div class="card-footer">
      <div class="row">
        <div class="col-12 text-center mb-3 preview" :class="{'d-none' : !activeGif}">
          <img class="preview-height" :src="activeGif" alt="">
          <div class="topright" @click="clearImage">
            X
          </div>
        </div>
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
        <div class="col-2 d-flex align-items-center">
          <i class="fas fa-image fa-2x" @click="revealGifs"></i>
        </div>
        <div class="col-1">
          <button class="btn btn-info" :class="{disabled: !newMessage.body && !activeGif}" @click="createMessage">
            <i class="far fa-paper-plane" title="send"></i>
          </button>
        </div>
      </div>
      <div class="d-none reveal-height scrollbar mt-4  animate_animated animate__slideInUp" id="gifs">
        <div class="input-group mb-3">
          <button class="input-group-text" @click="searchGifs">
            <i class="fas fa-search"></i>
          </button>
          <input type="text"
                 v-model="gifQuery"
                 class="form-control bg-gray"
                 placeholder="Search Gifs..."
                 aria-label="Recipient's username"
                 aria-describedby="basic-addon2"
          >
        </div>
        <div class="masonry-with-columns">
          <gifComponent v-for="(g, index) in gifs" :key="index" :gif="g" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { useRoute } from 'vue-router'
import { logger } from '../utils/Logger'
import { messagesService } from '../services/MessagesService'
import { gifService } from '../services/GifService'
export default {
  setup() {
    const route = useRoute()
    let reveal = ref(false)
    const gifQuery = ref('')
    const newMessage = ref({ to: route.params.id })
    onMounted(async() => {
      try {
        await gifService.getTrendingGifs()
      } catch (error) {
        logger.error(error)
      }
    })
    return {
      newMessage,
      gifQuery,
      reveal,
      route,
      messages: computed(() => AppState.currentMessages),
      account: computed(() => AppState.account),
      gifs: computed(() => AppState.gifs),
      activeGif: computed(() => AppState.activeGif),
      async createMessage() {
        try {
          if (!newMessage.value.body) {
            newMessage.value.body = AppState.activeGif
            await messagesService.createMessage(newMessage.value)
            newMessage.value.body = null
          } else if (AppState.activeGif) {
            await messagesService.createMessage(newMessage.value)
            newMessage.value.body = AppState.activeGif
            await messagesService.createMessage(newMessage.value)
            newMessage.value.body = null
          } else {
            await messagesService.createMessage(newMessage.value)
            newMessage.value.body = null
          }
        } catch (error) {
          logger.error(error)
        }
      },
      revealGifs() {
        reveal = !reveal
        reveal === true ? document.getElementById('gifs').classList.remove('d-none') : document.getElementById('gifs').classList.add('d-none')
      },
      async searchGifs() {
        try {
          if (gifQuery.value.length > 0) {
            await gifService.searchGifs(gifQuery.value)
            gifQuery.value = ''
          }
        } catch (error) {
          logger.error(error)
        }
      },
      clearImage() {
        AppState.activeGif = null
      }
    }
  }
}
</script>

<style lang="scss">
.height{
  height: 80vh;
}

// .preview{
//   position: relative;
// }

.topright {
  position: absolute;
  top: 0px;
  right: 0px;
  font-size: 18px;
}

.reveal-height{
  height: 28vh;
  overflow-y: auto;
  // overflow-x: hidden;
}

.preview-height{
  height: 100px;
  width: 100px;
  position: relative;
}

.bg-gray{
  background-color: #e9ecef;
}

.input{
  border-radius: 25px;
  color: #F5F8FA;
  background-color: #1c1f24c2 !important ;
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
  max-width: 75%;
}

.from-me{
   background-color: rgb(115, 12, 248);
  border-radius: 20px;
  max-width: 75%;
}

// <---------------------------Bubbles ------------------>

/* CSS talk bubble */
.talk-bubble {
  // margin: 40px;
  padding-top: 19px;
  padding-bottom: 19px;
  padding-left: 22px;
  padding-right: 22px;
  display: inline-block;
  position: relative;
  min-width: 80px;
  height: auto;
}
.border {
  border: 8px solid #666;
}
.round {
  border-radius: 30px;
  -webkit-border-radius: 30px;
  -moz-border-radius: 30px;
}

/* Right triangle placed top left flush. */
.tri-right.border.left-top:before {
  content: " ";
  position: absolute;
  width: 0;
  height: 0;
  left: -40px;
  right: auto;
  top: -8px;
  bottom: auto;
  border: 32px solid;
  border-color: #666 transparent transparent transparent;
}
.tri-right.left-top:after {
  content: " ";
  position: absolute;
  width: 0;
  height: 0;
  left: -20px;
  right: auto;
  top: 0px;
  bottom: auto;
  border: 22px solid;
  border-color:  rgb(115, 12, 248) transparent transparent transparent;
}

/* Right triangle, left side slightly down */
.tri-right.border.left-in:before {
  content: " ";
  position: absolute;
  width: 0;
  height: 0;
  left: -40px;
  right: auto;
  top: 30px;
  bottom: auto;
  border: 20px solid;
  border-color: #666 #666 transparent transparent;
}
.tri-right.left-in:after {
  content: " ";
  position: absolute;
  width: 0;
  height: 0;
  left: -20px;
  right: auto;
  top: 32%;
  bottom: auto;
  border: 12px solid;
  border-color:  rgb(115, 12, 248)  rgb(115, 12, 248) transparent transparent;
}

/*Right triangle, placed bottom left side slightly in*/
.tri-right.border.btm-left:before {
  content: " ";
  position: absolute;
  width: 0;
  height: 0;
  left: -8px;
  right: auto;
  top: auto;
  bottom: -40px;
  border: 32px solid;
  border-color: transparent transparent transparent #666;
}
.tri-right.btm-left:after {
  content: " ";
  position: absolute;
  width: 0;
  height: 0;
  left: 0px;
  right: auto;
  top: auto;
  bottom: -20px;
  border: 22px solid;
  border-color: transparent transparent transparent  rgb(115, 12, 248);
}

/*Right triangle, placed bottom left side slightly in*/
.tri-right.border.btm-left-in:before {
  content: " ";
  position: absolute;
  width: 0;
  height: 0;
  left: 30px;
  right: auto;
  top: auto;
  bottom: -40px;
  border: 20px solid;
  border-color: #666 transparent transparent #666;
}
.tri-right.btm-left-in:after {
  content: " ";
  position: absolute;
  width: 0;
  height: 0;
  left: 38px;
  right: auto;
  top: auto;
  bottom: -20px;
  border: 12px solid;
  border-color:  rgb(115, 12, 248) transparent transparent  rgb(115, 12, 248);
}

/*Right triangle, placed bottom right side slightly in*/
.tri-right.border.btm-right-in:before {
  content: " ";
  position: absolute;
  width: 0;
  height: 0;
  left: auto;
  right: 30px;
  bottom: -40px;
  border: 20px solid;
  border-color: #666 #666 transparent transparent;
}
.tri-right.btm-right-in:after {
  content: " ";
  position: absolute;
  width: 0;
  height: 0;
  left: auto;
  right: 38px;
  bottom: -20px;
  border: 12px solid;
  border-color:  rgb(115, 12, 248)  rgb(115, 12, 248) transparent transparent;
}

.tri-right.border.btm-right:before {
  content: " ";
  position: absolute;
  width: 0;
  height: 0;
  left: auto;
  right: -8px;
  bottom: -40px;
  border: 20px solid;
  border-color: #666 #666 transparent transparent;
}
.tri-right.btm-right:after {
  content: " ";
  position: absolute;
  width: 0;
  height: 0;
  left: auto;
  right: 0px;
  bottom: -20px;
  border: 12px solid;
  border-color:  rgb(115, 12, 248)  rgb(115, 12, 248) transparent transparent;
}

/* Right triangle, right side slightly down*/
.tri-right.border.right-in:before {
  content: " ";
  position: absolute;
  width: 0;
  height: 0;
  left: auto;
  right: -40px;
  top: 32%;
  bottom: auto;
  border: 20px solid;
  border-color: #666 transparent transparent #666;
}
.tri-right.right-in:after {
  content: " ";
  position: absolute;
  width: 0;
  height: 0;
  left: auto;
  right: -20px;
  top: 38%;
  bottom: auto;
  border: 12px solid;
  border-color:   rgb(3, 184, 216) transparent transparent  rgb(3, 184, 216);
}

/* Right triangle placed top right flush. */
.tri-right.border.right-top:before {
  content: " ";
  position: absolute;
  width: 0;
  height: 0;
  left: auto;
  right: -40px;
  top: -8px;
  bottom: auto;
  border: 32px solid;
  border-color: #666 transparent transparent transparent;
}
.tri-right.right-top:after {
  content: " ";
  position: absolute;
  width: 0;
  height: 0;
  left: auto;
  right: -20px;
  top: 0px;
  bottom: auto;
  border: 20px solid;
  border-color:  rgb(115, 12, 248) transparent transparent transparent;
}

/* talk bubble contents */
.talktext {
  padding: 1em;
  text-align: left;
  line-height: 1.5em;
}
.talktext p {
  /* remove webkit p margins */
  -webkit-margin-before: 0em;
  -webkit-margin-after: 0em;
}

.masonry-with-columns {
  columns: 2 125px;
  column-gap: .5rem;
  div {
    width: 150px;
    color: white;
    margin: 0 .5rem .5rem 0;
    display: inline-block;
    width: 100%;
  }
}

</style>
