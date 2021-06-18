<template>
  <div class="home">
    <div class="d-inline-block p-3" v-for="(item, index) in infoProductStock" :key="index">
      <div class="card" style="width: 18rem;">
        <img :src="item.image" class="card-img-top" alt="item.name">
        <div class="card-body">
          <h5 class="card-title">{{item.name}}</h5>
          <p class="card-text">${{item.price}}</p>
          <button type="button" class="btn btn-success text-center" @click="sendCart(item)">Agregar a <font-awesome-icon icon="shopping-cart"></font-awesome-icon></button>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: 'Home',

  computed: {
    ...mapGetters(['infoProductStock']),
  },

  methods:{
    sendCart(item){
      this.$store.dispatch('addCart',item);
      console.log('Producto agregado al carrito')
    }
  },
}

</script>

<style>
  .home{
    background-image: url('../assets/set-of-cartoon-clouds-vector.jpg');
    background-size: auto;
    background-position: center;
    background-repeat: repeat;
  }

  .card{
    border: 4px solid purple !important;
  }

  .card-text{
    font-size: 25px;
    color: purple;
  }

</style>
