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

.dark{
    background-color: #1c1f24c2 ;
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
</style>
