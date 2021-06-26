<template>
  <div class="card mt-4 text-light">
    <img class="card-img-top" src="holder.js/100x180/" alt="">
    <div class="card-body">
      <p class="text">
        Home
      </p>
      <p class="text">
        Explore
      </p>
      <p class="text">
        Notifications
      </p>
      <p class="text">
        Messages
      </p>
      <p class="text">
        BookMarks
      </p>
      <p class="text">
        Lists
      </p>
      <p class="text">
        Profile
      </p>
      <p class="text">
        More
      </p>
      <div class="d-flex justify-content-center mt-4">
        <button class=" customBtn">
          Post it
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    return {}
  },
  components: {}
}
</script>

<style lang="scss" scoped>
// .card{
//   height: 70vh;
// }
.text{
 font-size: 25px;
}

.text:hover{
  color: #1DA1F2;
  cursor: pointer;
}

.card{
  background-color: #141d26;
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
</style>
