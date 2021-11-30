<template>
  <div class="card text-light border-transparentWhite mt-4" v-if="profile">
    <img class="card-img-top" src="holder.js/100x180/" alt="">
    <div class="card-body container-fluid p-0">
      <img class="img-top" :src="profile.banner" alt="">
      <div class="row" v-if="profile.name">
        <div class="col-6">
          <img class="profileImg mx-4" :src="profile.picture" />
        </div>
        <div class=" col-6 text-right" v-if="account.name != profile.name">
          <button class="btn btn-outline-info m-2" v-if="!followedIds.includes(profile.id)" @click="follow(profile.id)">
            Follow
          </button>
          <button class="btn btn-outline-danger m-2" v-else @click="unfollow(profile.id)">
            UnFollow
          </button>
        </div>
        <div class="col-6 text-right" v-else>
          <button class="btn btn-outline-info m-2" data-target="#editAccount" data-toggle="modal">
            Edit Account
          </button>
        </div>
        <div class="col-md-8">
          <h4 class="mx-2">
            {{ profile.name.split('@')[0] }}
          </h4>
        </div>
        <div class="col-md-8">
          <p class="mx-2">
            @{{ profile.name.split('@')[1] }}
          </p>
        </div>
        <div class="col">
          <p class="mx-4">
            {{ profile.bio }}
          </p>
        </div>
      </div>
    </div>

    <!-- ------------------------------------Edit Account Modal ------------- -->
    <div class="modal fade"
         id="editAccount"
         tabindex="-1"
         role="dialog"
         aria-labelledby="Edit Account"
         aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content dark text-white">
          <div class="modal-header">
            <div class="modal-title " id="exampleModalLongTitle">
              <h4>
                Edit Account
              </h4>
            </div>
            <button type="button" class="close text-white" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="editAccount">
              <input type="text"
                     class="form-control input text-white my-4"
                     name=""
                     v-model="editable.banner"
                     id=""
                     aria-describedby="helpId"
                     placeholder="banner Image..."
              >
              <input type="text"
                     class="form-control input text-white"
                     name=""
                     v-model="editable.bio"
                     id=""
                     aria-describedby="helpId"
                     placeholder="Tell us about yourself..."
              >
              <input type="text"
                     class="form-control input text-white my-4"
                     name=""
                     v-model="editable.picture"
                     id=""
                     aria-describedby="helpId"
                     placeholder="Profile pic..."
              >
              <div class="w-100 text-center my-2">
                <button type="submit" class="btn btn-primary mt-3 w-50">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref, watchEffect } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { connectionsService } from '../services/ConnectionsService'
import { accountService } from '../services/AccountService'

export default {
  setup() {
    const followedIds = ref([])
    const editable = ref({})
    watchEffect(() => {
      followedIds.value = []
      AppState.connections.forEach(c => followedIds.value.push(c.user2))
      editable.value = AppState.account
    })
    return {
      followedIds,
      editable,
      profile: computed(() => AppState.activeProfile),
      account: computed(() => AppState.account),
      async follow(id) {
        try {
          if (this.account.name) {
            await connectionsService.newConnection(this.account.id, id)
          } else {
            Notification.toast('Please Login to follow other accounts!')
          }
        } catch (error) {
          logger.error(error)
        }
        // Notification.toast('You must buy premium for that feature', 'info')
      },
      async unFollow(id) {
        try {
          const found = AppState.connections.find(c => c.user2 === id)
          await connectionsService.unFollow(found.id)
        } catch (error) {
          logger.error(error)
        }
      },
      async editAccount() {
        try {
          await accountService.editAccount()
        } catch (error) {
          logger.error(error)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.img-top{
  width: 100%;
  height: 20vh;
}

.profileImg{
  position: relative;
  transform: translateY(-80px);
  border-radius: 50%;
  border: 4px solid black;
}

.btn{
  border-radius:2em;
}

.col-6{
  height: 4rem;
}
</style>
