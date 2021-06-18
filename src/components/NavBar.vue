<template>
  <div id="nav">
    <nav class="navbar navbar-expand-lg navbar-light bg-danger">
      <div class="container-fluid">
        <router-link class="navbar-brand" href="/" :to="{name: 'Home'}"><img src="../assets/logoOttoKlaus.png" alt="logo"></router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav ms-auto">
            <router-link class="nav-link" aria-current="page" :to="{name: 'Home'}"><font-awesome-icon icon="home"></font-awesome-icon></router-link>
            <router-link class="nav-link" v-if="!enterAdmin" :to="{name: 'Login'}">Ingreso</router-link>
            <router-link class="nav-link" v-else @click="signOut">Salida</router-link>
            <router-link class="nav-link" :to="{name: 'Panel'}">Panel de Control</router-link>
            <router-link class="nav-link" :to="{name: 'Shop'}"><font-awesome-icon icon="shopping-cart"></font-awesome-icon><sup class="bg-warning text-dark">{{sendTotal}}</sup></router-link>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import firebase from 'firebase';
import { mapGetters } from "vuex";
import Swal from 'sweetalert2';

export default {
  name: 'NavBar',

  computed: {
    ...mapGetters(['enterAdmin', 'sendTotal']),
  },

  methods: {
    signOut(){
      firebase.auth().signOut().then(() => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Hasta luego!',
          showConfirmButton: false,
          timer: 1500
        })
        console.log('Cierre de sesión correcta')
        this.$router.replace({name: 'Home'});
      }).catch((error) => {
        console.error(error);
      });
    }
  },
}

</script>

<style scoped>
  #nav img{
    width: 150px;
  }

  #nav {
    font-weight: 700;
    font-size: 25px;
  }
  
  sup{
    padding: 2px 10px;
    border-radius: 100%;
    margin-left: 5px;
  }
</style>
