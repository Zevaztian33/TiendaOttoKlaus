import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase';
import Swal from 'sweetalert2';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    admin: null,
    toys: [],
    sellToys: 0,
    ticket: [],
  },

  getters: {
    enterAdmin(state){
      return state.admin;
    },

    infoProduct(state){
      return state.toys;
    },

    infoProductStock(state){
      return state.toys.filter(total => total.stock > 0);
    },

    sendSell(state){
      return state.sellToys;
    },

    sendTicket(state){
      return state.ticket;
    },

    sendTotalTicket(state, getters){
      let prices = getters.sendTicket.map(result => result.price * result.total)
      return prices.reduce ((plus, init) => {
        return plus + init;
      },0)
    },

    sendTotal(state, getters){
      let total = getters.sendTicket.map(result => result.total);
      return total.reduce((plus, init) => {
        return plus + init;
      }, 0)
    }
  },

  mutations: {
    mutAdmin(state,datoAdmin){
      state.admin = datoAdmin; 
    },

    mutProducto(state,datos){
      state.toys = datos;
    },

    mutRestStock(state, item){
      let rest = state.toys.find(result => result.idDoc == item.idDoc);
      rest.stock = parseInt(rest.stock);
      rest.price = parseFloat(rest.price);
      rest.stock--;
      ++rest.total;
      state.sellToys++;
      let resultTicket = state.ticket.find(ticket => ticket.idDoc == item.idDoc);
      if (resultTicket === undefined){
        state.ticket.push(rest);
      }else{
        resultTicket.total = rest.total;
      }
    },

    mutBackStock(state, item){
      let rest = state.toys.find(result => result.idDoc == item.idDoc);
      rest.stock = parseInt(rest.stock);
      rest.price = parseFloat(rest.price);
      rest.stock++;
      --rest.total;
      state.sellToys--;
      if(rest.total == 0){
        let resultTicket = state.ticket.findIndex(ticket => ticket.idDoc == rest.idDoc);
        state.ticket.splice(resultTicket, 1);
      }else{
        let resultTicket = state.ticket.find(ticket => ticket.idDoc == rest.idDoc);
        resultTicket.total = rest.total;
      }
    },

    mutBackAll(state, item){
      let rest = state.toys.find(result => result.idDoc == item.idDoc);
      rest.stock = parseInt(rest.stock);
      rest.price = parseFloat(rest.price);
      rest.stock += rest.total;
      state.sellToys -= rest.total;
      rest.total = 0;
      let toy = state.ticket.findIndex(rest => rest.idDoc == item.idDoc);
      state.ticket.splice(toy, 1);
    }
  },

  actions: {
    admin({commit}, datoAdmin){
      commit('mutAdmin', datoAdmin);
    },

    traerDatos({commit}){
      firebase.firestore().collection('listadoJuguetes').orderBy("code").onSnapshot((res)=>{
        let datos = [];
        res.forEach(element => {
          datos.push({
            idDoc:  element.id,
            code: element.data().code,
            name: element.data().name,
            stock: element.data().stock,
            price: element.data().price,
            image: element.data().image,
            total: element.data().total
          })
        })
        commit('mutProducto', datos);
      }, error => console.error(error))
    },

    addItem(context, datos){
      firebase.firestore().collection('listadoJuguetes').add({
        code: datos.code,
        name: datos.name,
        stock: datos.stock,
        price: datos.price,
        image: datos.image,
        total: 0
      }).then(() => console.log("Producto ingresado correctamente")).catch(error => console.error(error));
    },

    delProduct(context,id){
      firebase.firestore().collection('listadoJuguetes').doc(id).delete()
        .then(()=> console.log('Producto eliminado'))
        .catch(error => console.error(error));
    },

    actualizandoProducto(context, datos){
      firebase.firestore().collection('listadoJuguetes').doc(datos.idDoc).update({
        code: datos.code,
        name: datos.name,
        stock: datos.stock,
        price: datos.price,
        image: datos.image,
        total: 0
      })
        .then(()=> console.log("Datos actualizados"))
        .catch(error => console.error(error));
    },

    addCart({commit}, item){
      commit('mutRestStock', item),
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Agregado al carrito correctamente',
        showConfirmButton: false,
        timer: 1500
      })
    },

    restItem({commit}, item){
      commit ('mutBackStock', item);
      console.log("Se devolvio 1 item al Stock")
    },

    deleteItem({commit}, item){
      commit('mutBackAll', item);
      console.log("Se devolvio toda la fila de productos al Stock")
    }
  }
})
