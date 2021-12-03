<template>
  <div class="row text-white" v-if="postProp.likedIds">
    <div class="col-12">
      <div class="card border-transparentWhite">
        <div class="card-body">
          <div class="row text-right" v-if="account.id == postProp.creatorId">
            <div class="col-12">
              <div class="dropdown">
                <button class="dropdown-toggle border-none"
                        type="button"
                        id="dropdownMenuButton"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                >
                  <i class="fas fa-ellipsis-h text-white"></i>
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <div class="dropdown-item text-danger" @click="deletePost" href="#">
                    Delete Post
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row align-items-center">
            <!-- <div class="col-12 my-3 text-right">
              <span class="opacity">{{ time() }}</span>
            </div> -->
            <div class="col-md-2 col-3" v-if="postProp.creator">
              <router-link :to="{name: 'Profile', params: {id: postProp.creator.id}}">
                <img class="profile" :src="postProp.creator.picture" alt="">
              </router-link>
            </div>
            <div class="col-9  d-flex align-self-center justify-content-between">
              <p class="card-title post-text" v-if="postProp.creator.name">
                {{ postProp.creator.name.split('@')[0] }}
                <router-link :to="{ name: 'postDetails', params: {id: postProp.id}}">
                  <p class="card-title post-text">
                    {{ postProp.body }}
                  </p>
                </router-link>
              </p>
              <span class="opacity mx-2">{{ time() }}</span>
            </div>
            <!-- <div class="col-6 text-center">
              <router-link :to="{ name: 'postDetails', params: {id: postProp.id}}">
                <p class="card-title post-text">
                  {{ postProp.body }}
                </p>
              </router-link>
            </div> -->
            <!-- <div class="col-3 d-none col-md-block text-right">
              <span class="opacity">{{ time() }}</span>
            </div> -->
          </div>
          <div class="row mt-3">
            <div class="card-img" v-if="postProp.imgUrl">
              <img class="img-fluid rounded" :src="postProp.imgUrl" alt="">
            </div>
          </div>
        </div>
        <div class="row mb-3" v-if="account._id">
          <div class="col-4 text-right">
            <i class="far fa-comment cursor" title="comment" data-toggle="modal" :data-target="'#addCommentModal' + postProp.id"></i>
          </div>
          <div class="col-4 text-center">
            <i class="fas fa-exchange-alt cursor" title="share"></i>
          </div>
          <div class="col-4 text-left" v-if="!postProp.likedIds.includes(account.id)">
            <span>
              <i class="far fa-heart cursor" @click="like" title="like"></i> {{ postProp.likedIds.length }}
            </span>
          </div>
          <div class="col-4 text-left" v-else>
            <span>
              <i class="fas fa-heart cursor" @click="like" title="unlike"></i> {{ postProp.likedIds.length }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <!-- <--------------------------------- modals ------------------->
    <div class="modal fade"
         :id="'addCommentModal' + postProp.id"
         tabindex="-1"
         role="dialog"
         aria-labelledby="exampleModalCenterTitle"
         aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content dark text-white">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">
              Add Comment
            </h5>
            <button type="button" class="close text-white" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="createComment">
              <div class="form-group">
                <input type="text"
                       maxlength="240"
                       class="form-control input"
                       v-model="state.newComment.body"
                       name=""
                       id=""
                       aria-describedby="helpId"
                       placeholder="Your thoughts"
                >
              </div>
              <button type="submit" class="btn btn-primary">
                Share
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { postsService } from '../services/PostsService'
import { logger } from '../utils/Logger'
import Notification from '../utils/Notification'
import { commentsService } from '../services/CommentsService'
import { router } from '../router'
import moment from 'moment'
import $ from 'jquery'
export default {
  props: { postProp: { type: Object, required: true } },
  setup(props) {
    const state = reactive({
      newComment: {}
    })
    return {
      state,
      account: computed(() => AppState.account),
      async like() {
        try {
          await postsService.like(props.postProp.id)
        } catch (error) {
          logger.error(error)
        }
      },
      async deletePost() {
        try {
          if (await Notification.confirmAction('Delete Post?')) {
            await postsService.deletePost(props.postProp.id)
            Notification.toast('deleted', 'success')
          }
        } catch (error) {
          logger.error(error)
        }
      },
      async createComment() {
        try {
          state.newComment.postId = props.postProp.id
          await commentsService.createComment(state.newComment)
          router.push({ name: 'postDetails', params: { id: props.postProp.id } })
          $('#addCommentModal' + props.postProp.id).modal('toggle')
        } catch (error) {
          logger.error(error)
        }
      },
      time() {
        const input = props.postProp.createdAt
        if (typeof props.postProp.createdAt === 'string') {
          const date = new Date(input)
          return moment(date).fromNow()
        }
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
.rounded{
  border-radius: 8%;
}

.border-none{
  border: none;
}

.post-text{
  color: white;
  text-decoration: none;
}

.post-text:hover{
  color: #1DA1F2;
  cursor: pointer;
}

.swal-overlay {
  background-color: rgba(43, 165, 137, 0.45);
}

.profile{
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

</style>
