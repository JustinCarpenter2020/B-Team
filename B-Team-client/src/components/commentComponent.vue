<template>
  <!-- //NOTE needs border between each one -->
  <div class="col-12 p-0 ">
    <div class="card border">
      <img class="card-img-top" src="holder.js/100x180/" alt="">
      <div class="card-body">
        <div class="row">
          <div class="col-3" v-if="commentProp.Creator">
            <img class="profile" :src="commentProp.Creator.picture" alt="">
          </div>
          <div class="col-8">
            <div class="row text-left">
              <div class="col-12">
                {{ commentProp.Creator.name.split('@')[0] }}
              </div>
              <div class="col-12">
                <span class="opacity">
                  @{{ commentProp.Creator.name.split('@')[0] }}
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
export default {
  props: { commentProp: { type: Object, required: true } },
  setup(props) {
    return {
      account: computed(() => AppState.account),
      async like() {
        try {
          await commentsService.like(props.commentProp.id)
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
