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
          <router-link :to="{ name: 'postDetails', params: {id: postProp.id}}">
            <h4 class="card-title">
              {{ postProp.body }}
            </h4>
          </router-link>
          <div class="card-img" v-if="postProp.imgUrl">
            <img class="img-fluid rounded" :src="postProp.imgUrl" alt="">
          </div>
        </div>
        <div class="row" v-if="account">
          <div class="col-4 text-right">
            <i class="far fa-comment"></i>
          </div>
          <div class="col-4 text-center">
            <i class="fas fa-exchange-alt"></i>
          </div>
          <div class="col-4" v-if="!postProp.likedIds.includes(account.id)">
            <span>
              <i class="far fa-heart" @click="like"></i> {{ postProp.likedIds.length }}
            </span>
          </div>
          <div class="col-4" v-else>
            <span>
              <i class="fas fa-heart" @click="like"></i> {{ postProp.likedIds.length }}
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

.dropdown-toggle::after {
    content: none;
}
</style>
