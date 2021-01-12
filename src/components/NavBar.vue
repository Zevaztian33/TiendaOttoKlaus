<template>
  <div id="nav">
    <b-navbar toggleable="lg" type="dark" variant="danger">
      <div class="container">
        <b-navbar-brand :to="{name: 'Home'}"><img src="../assets/logoOttoKlaus.png" alt="logo"></b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
      
        <b-navbar-nav class="ml-auto">
            <b-nav-item :to="{name: 'Home'}"><font-awesome-icon icon="home"></font-awesome-icon></b-nav-item>
            
            <b-nav-item v-if="!enterAdmin" :to="{name: 'Login'}">Ingreso</b-nav-item>
            <b-nav-item v-else @click="signOut">Salida</b-nav-item>
            <b-nav-item :to="{name: 'Panel'}">Panel de Control</b-nav-item>
            <b-nav-item class="text-center" :to="{name: 'Shop'}"><font-awesome-icon icon="shopping-cart"></font-awesome-icon><sup class="bg-warning text-dark">{{sendTotal}}</sup></b-nav-item>
            
        </b-navbar-nav>
      </b-collapse>
    </div>
      
    </b-navbar>

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
    padding: 2px 7px;
    border-radius: 100%;
    margin-left: 5px;
  }
</style>
