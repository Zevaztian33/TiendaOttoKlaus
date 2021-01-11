<template>
  <div>
    <div>
      <NavBar/>
    </div>
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
    <Footer/>
  </div>
</template>

<script>

import NavBar from '@/components/NavBar.vue';
import Footer from '@/components/Footer.vue';
import firebase from 'firebase';

export default {
  name: 'App',
  components: {
    NavBar,
    Footer,
  },

  mounted() {
    firebase.auth().onAuthStateChanged((admin) => {
      if (admin) {
        this.$store.dispatch('admin',admin);
      } else {
        this.$store.dispatch('admin',null);
      }
    });
    this.$store.dispatch('traerDatos');
  },
}
</script>


<style>
@import url('https://fonts.googleapis.com/css2?family=Righteous&display=swap');

*{
  font-family: 'Righteous', cursive;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

</style>
