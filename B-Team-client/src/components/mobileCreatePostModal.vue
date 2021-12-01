<template>
  <div class="modal fade"
       id="createPost"
       tabindex="-1"
       role="dialog"
       aria-labelledby="create post"
       aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content dark text-white">
        <div class="modal-header">
          <div class="modal-title " id="exampleModalLongTitle">
            <h4>
              Create Post
            </h4>
          </div>
          <button type="button" class="close text-white" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="createPost">
            <input type="text"
                   class="form-control input text-white my-4"
                   name=""
                   v-model="newPost.imgUrl"
                   id=""
                   aria-describedby="helpId"
                   placeholder="imgUrl"
            >
            <input type="text"
                   class="form-control input text-white"
                   name=""
                   v-model="newPost.body"
                   id=""
                   aria-describedby="helpId"
                   placeholder="body"
                   required
            >
            <div class="w-100 text-center my-2">
              <button type="submit" class="btn btn-primary mt-3 w-50">
                Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import { logger } from '../utils/Logger'
import { postsService } from '../services/PostsService'
import Notification from '../utils/Notification'
import { router } from '../router'
import $ from 'jquery'
export default {
  setup() {
    const newPost = ref({})
    return {
      newPost,
      async createPost() {
        try {
          const newId = await postsService.create(newPost.value)
          router.push({ name: 'postDetails', params: { id: newId } })
          newPost.value.body = null
          newPost.value.imgUrl = null
          $('#createPost').modal('hide')
        } catch (error) {
          logger.error(error)
          Notification.toast(error)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.btn{
  border-radius:2em;
}
</style>
