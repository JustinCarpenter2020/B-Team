<template>
  <header>
    <Navbar />
  </header>
  <main>
    <router-view />
  </main>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
export default {
  name: 'App',
  setup() {
    return {
      appState: computed(() => AppState)
    }
  }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";
p{
  font-family: 'Roboto', sans-serif;
}

.card{
  background-color: #141d26;

}

  .border-transparentWhite{
          border: solid 1px;
          border-color: #f5f8fa48;
        }

         .border-transparentWhiteb{
          border-bottom: 1px solid #f5f8fa48;
          // border-color: #f5f8fa48;
        }
</style>
