<template>
    <div class="shop">
        <div class="container py-5">
            <h2>Tu carrito:</h2>
            <hr>
            <div class="my-5">
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
                </div>
                <div v-else-if="sendSell <= 0">
                    <div class="alert alert-warning container mt-2" role="alert">No hay productos en el carro...</div>
                </div>
                </div>
        </div>
    </div>
</template>

<script>
import {mapActions, mapGetters, } from 'vuex';

    export default {
        name: 'Shop',

        computed:{
            ...mapGetters(['sendSell', 'sendTicket', 'sendTotalTicket', 'sendTotal'])
        },

        method: {
            ...mapActions(['restItem', 'deleteItem'])
        }
    }
</script>

<style>
    .shop{
        background-image: url('../assets/set-of-cartoon-clouds-vector.jpg');
        background-size: auto;
        background-position: center;
        background-repeat: repeat;
    }

</style>