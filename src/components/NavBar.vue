<template>
  <div id="nav">
    <nav class="navbar navbar-expand-lg navbar-dark bg-danger">
      <router-link class="nav-link" to="/"><img src="../assets/logoOttoKlaus.png" alt="logo"></router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto me-5">
          <li class="nav-item">
            <router-link class="nav-link" aria-current="page" :to="{name: 'Home'}"><font-awesome-icon icon="home"></font-awesome-icon></router-link>
          </li>
          <li class="nav-item" v-if="!enterAdmin">
            <router-link class="nav-link" :to="{name: 'Login'}">Ingreso</router-link>
          </li>
          <li class="nav-item" v-else>
            <a class="nav-link" @click="signOut">Salida</a>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{name: 'Panel'}">Panel de Control</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{name: 'Shop'}"><font-awesome-icon icon="shopping-cart"></font-awesome-icon><sup class="bg-warning text-dark">{{sendTotal}}</sup></router-link>
          </li>
        </ul>
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
  nav a{
    cursor: pointer;
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
