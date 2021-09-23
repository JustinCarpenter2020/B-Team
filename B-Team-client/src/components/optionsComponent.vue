<template>
  <div class="card mt-4 text-light border-transparentWhite">
    <img class="card-img-top" src="holder.js/100x180/" alt="">
    <div class="card-body">
      <router-link class="decor" :to="{ name: 'Home' }">
        <p class="text">
          <i class="fas fa-home"></i> Home
        </p>
      </router-link>
      <p class="text" @click="buy">
        <i class="fas fa-hashtag"></i> Explore
      </p>
      <p class="text" @click="buy">
        <i class="far fa-bell"></i> Notifications
      </p>
      <router-link class="decor" :to="{ name: 'DmPage' }">
        <p class="text">
          <i class="far fa-envelope"></i> Messages
        </p>
      </router-link>
      <p class="text" @click="buy">
        <i class="far fa-bookmark"></i> BookMarks
      </p>
      <p class="text" @click="buy">
        <i class="far fa-list-alt"></i>  Lists
      </p>
      <p class="text" v-if="user.picture" @click="logout">
        <img
          :src="user.picture"
          alt="user photo"
          height="40"
          class="rounded"
        /> Profile
      </p>
      <p class="text" @click="buy">
        <i class="far fa-dot-circle"></i> More
      </p>
      <div class="d-flex justify-content-center mt-4" v-if="user.name">
        <button @click="logout" class=" customBtn">
          Logout
        </button>
      </div>
      <div class="d-flex justify-content-center mt-4" v-else>
        <button @click="login" class=" customBtn">
          login
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { AuthService } from '../services/AuthService'
import Notification from '../utils/Notification'

export default {
  setup() {
    return {
      user: computed(() => AppState.user),
      account: computed(() => AppState.account),
      async login() {
        AuthService.loginWithPopup()
      },
      async logout() {
        if (await Notification.confirmAction('Are you sure you want to log out', 'you will be missed', 'info', 'logout')) {
          AuthService.logout({ returnTo: window.location.origin })
        }
      },
      buy() {
        Notification.toast('You must buy premium for that feature', 'info')
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
.text{
 font-size: 25px;
}

.text:hover{
  color: #1DA1F2;
  cursor: pointer;
}

.card{
  background-color: #141d26;
  height: 80vh;
}

.customBtn {
 border-radius:2em;
 text-decoration:none;
 background-color: #1DA1F2;
 color: #F5F8FA;
 display:inline-block;
 padding:.5em 1em;
 position:relative;
 margin: 1em;
 min-width:10em;
        }

.customBtn:hover{
 background: #428BCA;
        }

        .rounded{
          border-radius: 50%;
          height: 1em;
          width: 1em;
        }

        .decor{
          text-decoration: none;
          color: white;
        }

</style>
