<template>
    <div >
        Productos
        {{ productos }}
        
        <div class="row">

            <div v-for="item in productos" :key="item.index" class="card m-3" style="width: 18rem;" @click="agregarProducto(item)">
                <router-link :to="{name:'detalleProducto', params:{idProducto:item.idProducto }}">
                    <img src="../../assets/tuerca.png" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">{{ item.nombreProducto }} - {{ item.marca }}</h5>
                        <p class="card-text" :class="[item.stock >= 20 ? 'text-success':'text-warning']">
                            {{ item.stock >= 20 ? 'Stock disponible': 'Queda poco stock' }}
                        </p>
                        <span>S/. {{ item.precio }}</span>
                    </div>
                </router-link>
                </div>
            </div>

        </div>

</template>

<script>
    export default {
        name:"Productos",
        data() {
            return {
                productos:null
            };
        },
        methods:{
            async traerProductos(){
                await this.axios.get('Producto/listaProductos').then((res) => {
                    this.productos = res.data.content
                })
            },
            agregarProducto(producto){
                this.$store.commit('SET_PRODUCTO',producto)
            }
        },
        created(){
            this.traerProductos();
        }
    }
</script>

<style scoped>
    a{
        text-decoration: none;
        color: black;
    }

    .card{
        transition: 1s;
    }

    .card:hover{
        transform:scale(1.05);
    }
</style>