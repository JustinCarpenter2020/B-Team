<template>
  <header>
    <Navbar />
  </header>
  <main>
    <router-view />
  </main>
  <footer class="d-block d-md-none text-light my-2 ">
    <div class="d-flex justify-content-around">
      <router-link class="decor" :to="{ name: 'Home' }">
        <p class="text">
          <i class="fas fa-home fa-2x" title="home"></i>
        </p>
      </router-link>
      <router-link class="text-light link" v-if="account.name" :to="{name: 'Profile', params: {id: account.id}}">
        <p class="text" v-if="account.picture">
          <img
            :src="account.picture"
            alt="user photo"
            height="40"
            class="rounded"
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
export default {
  name: 'App',
  setup() {
    return {
      appState: computed(() => AppState),
      account: computed(() => AppState.account),
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
