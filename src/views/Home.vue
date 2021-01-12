<template>
  <div class="home">
    <b-row class="p-5">
      <b-col cols="12" sm="12" md="6" lg="4" xl="4" class="container p-3" v-for="(item, index) in infoProductStock" :key="index">
        
          <b-card id="card"
            :title="item.name"
            :img-src="item.image"
            img-alt="Image"
            img-top
            tag="article"
            style="max-width: 20rem;"
            class="mb-2"
          >
          <b-card-text id="price">
            ${{item.price}}
          </b-card-text>
          <div class="text-center">
            <button type="button" class="btn btn-success text-center" @click="sendCart(item)">Agregar a <font-awesome-icon icon="shopping-cart"></font-awesome-icon></button>
          </div>
          </b-card>
        
      </b-col>
    </b-row>
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

  #card{
    border: 4px solid purple;
  }

  #price{
    font-size: 25px;
    color: purple;
  }

</style>
