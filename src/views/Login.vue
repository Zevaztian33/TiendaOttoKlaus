<template>
    <div class="login" id="login">
        <div class="container py-5">
            <h2>Bienvenido!</h2>
            <hr>
                <form @submit.prevent="loginAdmin">
                <div class="mb-3">
                    <label for="inputEmail" class="form-label">Correo Electrónico</label>
                    <input type="email" class="form-control" id="inputEmail" aria-describedby="emailHelp" v-model="email">
                </div>
                <div class="mb-3">
                    <label for="inputPassword" class="form-label">Contraseña</label>
                    <input type="password" class="form-control" v-model="password" id="inputPassword">
                </div>
                <button type="submit" class="btn btn-success">Ingresar</button>
                </form>
        </div>
    </div>
</template>

<script>
import firebase from 'firebase';
import Swal from 'sweetalert2';

export default {
    name: 'Login',
    
    data() {
    return {
        email: '',
        password: ''
    }
    },

    methods: {
        loginAdmin(){
        if (this.email && this.password.length >= 6) {
            firebase.auth().signInWithEmailAndPassword(this.email, this.password)
            .then(() => {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Bienvenido!',
                    showConfirmButton: false,
                    timer: 1500
                })
                console.log('Inicio de sesión correcta')
            this.$router.push({name: 'Panel'});      
            })
            .catch((error) => {
            console.error(error.code);
            console.error(error.message);
            });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Los datos ingresados son incorrectos',
                    footer: 'Por favor, vuelva a intentarlo'
                })
            }
        }
    }
}
</script>

<style>
    .login{
        background-image: url('../assets/set-of-cartoon-clouds-vector.jpg');
        background-size: auto;
        background-position: center;
        background-repeat: repeat;
        height: 80vh;
    }
</style>