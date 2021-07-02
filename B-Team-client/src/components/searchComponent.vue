<template>
  <div class="my-4 row" v-if="account._id">
    <div class="col-2">
      <div>
        <img class="profilePic" :src="account.picture" alt="">
      </div>
    </div>
    <div class="col-7 mx-0">
      <div class="form-group">
        <input type="text"
               class="form-control input text-white"
               name=""
               v-model="state.newPost.body"
               id=""
               aria-describedby="helpId"
               placeholder="What's Happening?"
        >
      </div>
    </div>
    <div class="col-3 mt-1">
      <i class="far fa-image fa-2x blue mr-3 " title="attach image" data-toggle="modal" data-target="#imageModal"></i>
      <i class="far fa-paper-plane fa-2x blue" title="share" @click="createPost"></i>
    </div>
    <!-- <---------------- Modals --------------------------->
    <!-- <modalComponent>
      <div slot="title">Add an image</div>
    </modalComponent> -->

    <div class="modal fade"
         id="imageModal"
         tabindex="-1"
         role="dialog"
         aria-labelledby="exampleModalCenterTitle"
         aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content dark text-white">
          <div class="modal-header">
            <div class="modal-title " id="exampleModalLongTitle">
              Add an Image Url
            </div>
            <button type="button" class="close text-white" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <input type="text"
                   class="form-control input text-white"
                   name=""
                   v-model="state.newPost.imgUrl"
                   id=""
                   aria-describedby="helpId"
                   placeholder="imgUrl"
            >
            <button type="button" class="btn btn-primary mt-3 d-flex justify-content-center" data-dismiss="modal">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import Notification from '../utils/Notification'
import { postsService } from '../services/PostsService'
export default {
  setup() {
    const state = reactive({
      newPost: {}
    })
    return {
      state,
      account: computed(() => AppState.account),
      async createPost() {
        try {
          if (!state.newPost.body) {
            return window.alert('need content')
          }
          await postsService.create(state.newPost)
        } catch (error) {
          logger.error(error)
          Notification.toast(error)
        }
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
.profilePic{
  border-radius: 50%;
  height: 3rem;
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

.blue{
  color: #00acee;
}
</style>
