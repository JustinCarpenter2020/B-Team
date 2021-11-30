<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-transparent border-transparentWhiteb ">
    <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
      <div class="d-flex flex-column align-items-center">
        <span>
          <img class="logo" src="../assets/img/logo.png" alt=""> HERD
        </span>
      </div>
    </router-link>
  </nav>
</template>

<script>
import { AuthService } from '../services/AuthService'
import { AppState } from '../AppState'
import { computed, reactive } from 'vue'
export default {
  name: 'Navbar',
  setup() {
    const state = reactive({
      dropOpen: false
    })
    return {
      state,
      user: computed(() => AppState.user),
      async login() {
        AuthService.loginWithPopup()
      },
      async logout() {
        AuthService.logout({ returnTo: window.location.origin })
      }
    }
  }
}
</script>

<style scoped>

.logo{
  height: 50px;
}
.dropdown-menu {
  user-select: none;
  display: block;
  transform: scale(0);
  transition: all 0.15s linear;
}
.dropdown-menu.show {
  transform: scale(1);
}
.hoverable {
  cursor: pointer;
}
a:hover {
  text-decoration: none;
}
.nav-link{
  text-transform: uppercase;
}
.nav-item .nav-link.router-link-exact-active{
  color: var(--primary);
}
</style>
