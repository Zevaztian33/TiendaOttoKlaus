<template>
<div class="panel">
  <div class="container p-4">
    <h2>Bienvenido al panel de control</h2>
    <hr>
    <p>Usted tiene los permisos para revisar, eliminar, editar y agregar nuevo stock de la tienda. Proceda con cuidado, la información que encontrara acá es confidencial.</p>
    
    <!-- Tabla de Informacion -->
    
    <h2>Stock de juguetes</h2>
      <div class="my-4">
        <button type="button" class="btn btn-success" data-toggle="modal" data-target="#exampleModal">Agregar producto nuevo</button>
      </div>
      <table class="table table-danger table-striped text-center">
        <thead>
          <tr class="bg-danger text-light">
            <th>Código</th>
            <th>Nombre</th>
            <th>Stock</th>
            <th>Precio</th>
            <th>Editar</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in infoProduct" :key="index">
            <td>{{item.code}}</td>
            <td>{{item.name}}</td>
            <td>{{item.stock}}</td>
            <td>${{item.price}}</td>
            <td><button type="button" class="btn btn-info" @click="editProduct(item.idDoc)"><font-awesome-icon icon="edit"></font-awesome-icon></button></td>
            <td><button type="button" class="btn btn-danger" @click="deleteProduct(item.idDoc)"><font-awesome-icon icon="trash-alt"></font-awesome-icon></button></td>
          </tr>
        </tbody>
      </table>

      <div>
            <!-- Modal -->
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Ingreso de producto nuevo</h5>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="mb-3">
                            <label for="inputCode" class="form-label">Código</label>
                            <input type="text" class="form-control" id="inputCode" v-model="code">
                        </div>
                        <div class="mb-3">
                            <label for="inputName" class="form-label">Nombre</label>
                            <input type="text" class="form-control" id="inputName" v-model="name">
                        </div>
                        <div class="mb-3">
                            <label for="inputStock" class="form-label">Cantidad</label>
                            <input type="number" class="form-control" id="inputStock" v-model="stock">
                        </div>
                        <div class="mb-3">
                            <label for="inputPrice" class="form-label">Precio</label>
                            <input type="number" class="form-control" id="inputPrice" v-model="price">
                        </div>
                        <div class="mb-3">
                            <label for="inputImage" class="form-label">Imagen de referencia</label>
                            <input type="text" class="form-control" id="inputImage" v-model="image">
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-dismiss="modal"><font-awesome-icon icon="times"></font-awesome-icon></button>
                    <button type="button" v-b-popover.hover.bottom.v-danger="{title:'CUIDADO!', content:'No se pueden ingresar cifras negativas en Stock y Precio, o dejar campos vacios'}" class="btn btn-success" data-dismiss="modal" @click.prevent="addItem">Agregar</button>
                </div>
                </div>
            </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Swal from 'sweetalert2';

export default {
  name: 'Panel',

  data(){
    return{
      code: '',
      name: '',
      stock: '',
      price: '',
      image: ''
    }
  },

  computed: {
    ...mapGetters(['infoProduct']),
  },

  methods: {
    addItem(){
      if (this.code && this.name && this.stock >= 0 && this.price > 0 && this.image) {
        let datos = {
          code: this.code,
          name: this.name,
          stock: this.stock,
          price: this.price,
          image: this.image
        };
        this.$store.dispatch('addItem', datos);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Producto ingresado correctamente',
          showConfirmButton: false,
          timer: 1500
        })
        this.code = ''
        this.name = ''
        this.stock = ''
        this.price = ''
        this.image = ''
        
      } else {
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Ha ocurrido un error, vuelva a intentarlo.',
            showConfirmButton: true,
            timer: 2000
        });
        this.code = ''
        this.name = ''
        this.stock = ''
        this.price = ''
        this.image = ''
      }
    },
    
    deleteProduct(id){
      Swal.fire({
        title: 'Estas seguro?',
        text: "Esta acción es irreversible.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Borrar',
      }).then((result) => {
        if (result.isConfirmed) {
        this.$store.dispatch('delProduct',id);
          Swal.fire(
            'Borrado.',
            'Producto eliminado de la base de datos.'
          )
        }
      })
    },
    
    editProduct(idDoc){
      this.$router.push({name: 'Edit', params: {id: idDoc}});
    }
  }
}
</script>

<style>
  .panel{
    background-image: url('../assets/set-of-cartoon-clouds-vector.jpg');
    background-size: auto;
    background-position: center;
    background-repeat: repeat;
  }
</style>
