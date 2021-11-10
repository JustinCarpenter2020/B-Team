<template>
  <div class="col-12 p-0 " v-if="commentProp.creator">
    <div class="card border-transparentWhite">
      <div class="card-body">
        <div class="row text-right" v-if="account.id == commentProp.creatorId">
          <div class="col-12">
            <div class="dropdown">
              <button class="dropdown-toggle"
                      type="button"
                      id="dropdownMenuButton"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
              >
                <i class="fas fa-ellipsis-h text-white"></i>
              </button>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <div class="dropdown-item text-danger" @click="deleteComment" href="#">
                  Delete Comment
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-3" v-if="commentProp.creator">
            <router-link :to="{name: 'Profile', params: {id: commentProp.creatorId}}">
              <img class="profile" :src="commentProp.creator.picture" alt="">
            </router-link>
          </div>
          <div class="col-8">
            <div class="row text-left">
              <div class="col-12">
                {{ commentProp.creator.name.split('@')[0] }}
              </div>
              <div class="col-12">
                <span class="opacity">
                  @{{ commentProp.creator.name.split('@')[0] }}
                  {{ time() }}

                </span>
              </div>
              <div class="col-12 mt-2">
                {{ commentProp.body }}
              </div>
            </div>
          </div>
        </div>
        <div class="row text-right">
          <div class="col-12">
            <div v-if="!commentProp.commentLikes.includes(account.id)">
              <span>
                <i class="far fa-heart" @click="like" title="like"></i> {{ commentProp.commentLikes.length }}
              </span>
            </div>
            <div v-else>
              <span>
                <i class="fas fa-heart" @click="like" title="unlike"></i> {{ commentProp.commentLikes.length }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { commentsService } from '../services/CommentsService'
import { logger } from '../utils/Logger'
import moment from 'moment'
import Notification from '../utils/Notification'
export default {
  props: { commentProp: { type: Object, required: true } },
  setup(props) {
    return {
      account: computed(() => AppState.account),
      async like() {
        try {
          if (this.account.name) {
            await commentsService.like(props.commentProp.id)
          } else {
            Notification.toast('Please Login to like comments!')
          }
        } catch (error) {
          logger.error(error)
        }
      },
      time() {
        const input = props.commentProp.createdAt
        if (typeof props.commentProp.createdAt === 'string') {
          const date = new Date(input)
          return moment(date).fromNow()
        }
      },
      async deleteComment() {
        try {
          if (await Notification.confirmAction('Are you sure?', 'this comment will be removed', 'info')) {
            await commentsService.deleteComment(props.commentProp.id)
            Notification.toast('Successfully deleted', 'success')
          }
        } catch (error) {
          logger.error(error)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.profile{
  border-radius: 50%;
  height: 4rem;
}

</style>
