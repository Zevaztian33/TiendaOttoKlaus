<template>
    <div class="edit">
        <div class="container py-5">
            <h2>Panel de Edición:</h2>
            <hr>
            <form @submit.prevent="editProduct">
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
                <div class="text-center">
                    <button type="submit" v-b-popover.hover.bottom.v-danger="{title:'CUIDADO!', content:'Esta acción es delicada e irreversible'}" class="btn btn-primary mr-2 text-center"><font-awesome-icon icon="save"></font-awesome-icon></button>
                    <button type="button" class="btn btn-info" @click="$router.go(-1)">Regresar</button>
                </div>
            </form> 
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import Swal from 'sweetalert2';

export default {
    name: 'Edit',
    props: ['id'],
    data() {
        return {
            code: '',
            name: '',
            stock: '',
            price: '',
            image: ''
        }
    },
    computed: {
        ...mapGetters(['infoProduct'])
    },

    methods: {
        editProduct(){
            if (this.code && this.name && this.stock >= 0 && this.price > 0 && this.image) {
                let datos = {
                    code: this.code,
                    name: this.name,
                    stock: this.stock,
                    price: this.price,
                    image: this.image,
                    idDoc: this.id
                };
                this.$store.dispatch('actualizandoProducto',datos);
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Datos Actualizados!',
                    showConfirmButton: false,
                    timer: 1500
                })
                setTimeout(()=>{
                    this.$router.push({name: 'Panel'});
                },1000);
            } else {
                Swal.fire("No se pueden ingresar cifras negativas en Stock y Precio");
            }
        }
    },

    mounted(){
        let datos = this.infoProduct.find(toy => toy.idDoc === this.id);
        if (datos !== undefined) {
            this.code = datos.code;
            this.name = datos.name,
            this.stock = datos.stock,
            this.price = datos.price,
            this.image = datos.image
        } else {
            setTimeout(()=>{
                this.$router.push({name: 'Panel'});
            },1000);
        }
    }
}

</script>

<style>
    .edit{
        background-image: url('../assets/set-of-cartoon-clouds-vector.jpg');
        background-size: auto;
        background-position: center;
        background-repeat: repeat;
    }

</style>