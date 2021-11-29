<template>
  <header>
    <Navbar />
  </header>
  <main>
    <router-view />
    <div v-if="!messagePage">
      <button class="fab d-md-none d-block" data-toggle="modal" data-target="#createPost">
        <i class="fas fa-kiwi-bird fa-2x mt-3"></i>
      </button>
      <mobileCreatePostModal />
    </div>
  </main>
  <footer class="d-block d-md-none text-light my-2 ">
    <div class="d-flex justify-content-around">
      <router-link class="decor" :to="{ name: 'Home' }">
        <i class="fas fa-home fa-2x" title="home"></i>
      </router-link>
      <router-link class="text-light link" v-if="account.name" :to="{name: 'Profile', params: {id: account.id}}">
        <p class="text" v-if="account.picture">
          <img
            :src="account.picture"
            alt="user photo"
            height="40"
            class="rounded accountImg"
          />
        </p>
      </router-link>
      <i class="fas fa-user fa-2x" title="profile" v-else></i>
      <router-link class="decor" :to="{ name: 'DmPage' }">
        <i class="far fa-envelope fa-2x" title="messages"></i>
      </router-link>
    </div>
  </footer>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import { AuthService } from './services/AuthService'
import { useRoute } from 'vue-router'
export default {
  name: 'App',
  setup() {
    const route = useRoute()
    return {
      appState: computed(() => AppState),
      account: computed(() => AppState.account),
      messagePage: computed(() => route.name === 'MessagePage'),
      async login() {
        AuthService.loginWithPopup()
      },
      async logout() {
        if (await Notification.confirmAction('Are you sure you want to log out', 'you will be missed', 'info', 'logout')) {
          AuthService.logout({ returnTo: window.location.origin })
        }
      }
    }
  }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";
p{
  font-family: 'Roboto', sans-serif;
}

.accountImg{
  height: 3rem;
}

.fab{
  z-index: 10;
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  bottom: 15%;
  right: 5%;
  background-color: $info;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  cursor: pointer;
  // box-shadow: 2px 2px 10px rgba(10,10,10,0.3);
  border: 2px solid #1689d1;
  transition: all 0.2s ease-in-out;
}

// <-------------scrollbar ---------->
.scrollbar:hover::-webkit-scrollbar-thumb {
    visibility:visible;
}

.scrollbar::-webkit-scrollbar-track
{
  // border: 1px solid #f7f7f7;
  background-color: #14171A;
}

.scrollbar::-webkit-scrollbar
{
  width: 10px;
  background-color: #F5F5F5;
}

.scrollbar::-webkit-scrollbar-thumb
{
  border-radius: 30px;
  background-color: #1DA1F2;
  visibility:hidden;
}

.dark{
    background-color: #1c1f24c2 ;
}

  .decor{
          text-decoration: none;
          color: white;
        }

.opacity{
  opacity: .5;
}

.card{
  background-color: #141d26;

}

.dropdown-toggle{
  background:transparent;
}
.dropdown-toggle::after {
    content: none;
}

.border-transparentWhite{
  border: solid 1px;
  border-color: #f5f8fa48;
}

.border-transparentWhiteb{
  border-bottom: 1px solid #f5f8fa48;
}

.cursor{
  cursor: pointer;
}

.footer {
   position: fixed;
   left: 0;
   bottom: 0;
   width: 100%;
   text-align: center;
}
</style>
