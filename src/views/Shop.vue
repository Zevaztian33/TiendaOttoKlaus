<template>
    <div class="shop">
        <div class="container py-5">
            <h2>Tu carrito:</h2>
            <hr>
            <div class="my-5">

                <!-- Carrito de Compra -->
                <div v-if="sendSell > 0">
                <table class="table table-striped mt-3 bg-light container text-center">
                    <thead>
                    <tr>
                        <th>Código</th>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                        <th>Restar 1</th>
                        <th>Eliminar Fila</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item,index) in sendTicket" :key="index">
                        <td>{{item.code}}</td>
                        <td>{{item.name}}</td>
                        <td>${{item.price}}</td>
                        <td>{{item.total}}</td>
                        <td><button type="button" class="btn btn-warning" @click="restItem(item)"><font-awesome-icon icon="minus"></font-awesome-icon></button></td>
                        <td><button type="button" class="btn btn-danger" @click="deleteItem(item)"><font-awesome-icon icon="trash-alt"></font-awesome-icon></button></td>
                    </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                        <th colspan="3" class="text-right">Total Venta: ${{sendTotalTicket}}</th>
                        <br>
                        <th>Total Productos: {{sendTotal}}</th>
                        </tr>
                    </tfoot>
                    </table>
                    <div class="text-center">
                        <button type="button" class="btn bg-success text-white" data-toggle="modal" data-target="#exampleModal">Pagar</button>
                    </div>

                    <!-- Modal de Pago -->
                    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">Boleta/Factura N°:</h5>
                                </div>
                                <hr>
                                <div class="modal-body">
                                    <p>Nombre de titular de boleta/factura</p>
                                    <div>
                                        <b-form-input type="text" ></b-form-input>
                                        <div class="mt-2"></div>
                                    </div>
                                    <hr>
                                    <p>Seleccione su forma de pago:</p>
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
                                        <label class="form-check-label" for="flexRadioDefault1">
                                            Tarjeta de Crédito
                                        </label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
                                        <label class="form-check-label" for="flexRadioDefault1">
                                            Tarjeta de Débito
                                        </label>
                                    </div>
                                    <hr>
                                    <p>Ingrese dirección para despacho:</p>
                                    <div>
                                        <b-form-input type="text" ></b-form-input>
                                        <div class="mt-2"></div>
                                    </div>
                                    <p>El despacho se realizará dentro de los próximos 7 días habiles.</p>
                                    <hr>
                                    <h4 class="text-danger">Monto Total a Pagar:</h4>
                                    <h4 class="text-danger">${{sendTotalTicket}}</h4>
                                    <hr>
                                    <div class="text-center">
                                        <button type="button" class="btn bg-primary text-white" data-dismiss="modal" @click="buyFinish">Pagar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div v-else-if="sendSell <= 0">
                    <div class="alert alert-warning container mt-2" role="alert">No hay productos en el carro...</div>
                </div>
                </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters, } from 'vuex';

    export default {
        name: 'Shop',

        computed:{
            ...mapGetters(['sendSell', 'sendTicket', 'sendTotalTicket', 'sendTotal'])
        },

        methods: {
            ...mapActions(['restItem', 'deleteItem']),

            buyFinish(){
                this.$router.push({name: 'Home'});
            }
        }
    }
</script>

<style>
    .shop{
        background-image: url('../assets/set-of-cartoon-clouds-vector.jpg');
        background-size: auto;
        background-position: center;
        background-repeat: repeat;
        height: 80vh;
    }

</style>