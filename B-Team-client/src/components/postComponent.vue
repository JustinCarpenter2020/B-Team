<template>
  <div class="row text-white">
    <div class="col-12">
      <div class="card border-transparentWhite">
        <div class="card-body">
          <div class="row text-right" v-if="account.id == postProp.creatorId">
            <div class="col-12">
              <div class="dropdown">
                <button class="bg-transparent dropdown-toggle"
                        type="button"
                        id="dropdownMenuButton"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                >
                  <i class="fas fa-ellipsis-v text-white"></i>
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <div class="dropdown-item text-danger" @click="deletePost" href="#">
                    Delete Post
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-2" v-if="postProp.Creator">
              <img class="profile" :src="postProp.Creator.picture" alt="">
            </div>
            <div class="col-7 d-flex align-self-center">
              <router-link :to="{ name: 'postDetails', params: {id: postProp.id}}">
                <h4 class="card-title">
                  {{ postProp.body }}
                </h4>
              </router-link>
            </div>
          </div>
          <div class="row mt-3">
            <div class="card-img" v-if="postProp.imgUrl">
              <img class="img-fluid rounded" :src="postProp.imgUrl" alt="">
            </div>
          </div>
        </div>
        <div class="row" v-if="account._id">
          <div class="col-4 text-right">
            <i class="far fa-comment" title="comment"></i>
          </div>
          <div class="col-4 text-center">
            <i class="fas fa-exchange-alt" title="share"></i>
          </div>
          <div class="col-4" v-if="!postProp.likedIds.includes(account.id)">
            <span>
              <i class="far fa-heart" @click="like" title="like"></i> {{ postProp.likedIds.length }}
            </span>
          </div>
          <div class="col-4" v-else>
            <span>
              <i class="fas fa-heart" @click="like" title="unlike"></i> {{ postProp.likedIds.length }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { postsService } from '../services/PostsService'
import { logger } from '../utils/Logger'
import Notification from '../utils/Notification'
export default {
  props: { postProp: { type: Object, required: true } },
  setup(props) {
    return {
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
          await postsService.deletePost(props.postProp.id)
          Notification.toast('deleted', 'success')
        } catch (error) {
          logger.error(error)
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

.swal-overlay {
  background-color: rgba(43, 165, 137, 0.45);
}

.dropdown-toggle::after {
    content: none;
}

.profile{
  border-radius: 50%;
  height: 3rem;
}

</style>
