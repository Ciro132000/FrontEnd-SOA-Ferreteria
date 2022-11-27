<template>
    <div>
        <div class="row mt-5">
            <div class="card mb-3" >
            <div class="row g-0">
                <div class="col-md-4">
                <img src="../../assets/tuerca.png" class="img-fluid rounded-start" alt="...">
                </div>
                <div class="col-md-8">
                <div class="card-body">
                    {{ producto }}
                    <h5 class="card-title">{{ producto.nombreProducto }}</h5>
                    <p class="card-text">Marca: {{ producto.marca }}</p>
                    <p class="card-text">Precio: S/. {{ producto.precio }}</p>
                    <p class="card-text"><small class="text-muted">Stock: {{ stock == 0 ? 'Stock no disponible': stock }}</small></p>
                    <div>
                        <button @click="quitar()" class="btn-producto">
                            <i class="fas fa-minus-circle"></i>
                        </button>
                        <input type="number" class="productoTotal" disabled v-model="totalProducto">
                        <button @click="agregar()" class="btn-producto">
                            <i class="fas fa-plus-circle"></i>
                        </button>
                    </div>
       
                    <h4 class="mt-5">Precio total: S/. {{ totalProducto*producto.precio }} </h4>
                </div>
                </div>
            </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-4">
                <form>
                    <h5>Datos de la facturación</h5>
                    <div class="form-group">
                        <label >Nombre de la empresa</label>
                        <input type="text" v-model="dataEnviar.Facturacion.nombreEmpresa" class="form-control">
                    </div>
                    <div class="form-group">
                        <label >Dirección</label>
                        <input type="text" v-model="dataEnviar.Facturacion.direccion" class="form-control">
                    </div>
                </form>
            </div>

            <div class="col-md-4">
                <form action="">
                    <h5>Datos de entrega</h5>
                    <div class="form-group">
                        <label >Cliente</label>
                        <select v-model="dataEnviar.Pedido.idCliente" class="form-control">
                            <option disabled value="null">Seleccione un cliente</option>
                            <option v-for="item in usuarios" :key="item.index" :value="item.id_cliente">{{ item.nombre_cliente }}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label >Fecha de compra</label>
                        <input type="date" class="form-control">
                    </div>
                    <div class="form-group">
                        <label >Fecha de entrega</label>
                        <input type="date" class="form-control">
                    </div>
                    <div class="form-group">
                        <label >Observación</label>
                        <input type="text" class="form-control">
                    </div>
                </form>
            </div>

            <div class="col-md-4">
                <form action="">
                    <h5>Datos remitente</h5>
                    <div class="form-group">
                        <label >Nombre de remitente</label>
                        <input type="text" class="form-control">
                    </div>
                    <div class="form-group">
                        <label >Dirección remitente</label>
                        <input type="text" class="form-control">
                    </div>
                    <div class="form-group">
                        <label >Teléfono remitente</label>
                        <input type="text" class="form-control">
                    </div>
                </form>
            </div>

            <div class="d-flex justify-content-center mt-5">
                <button class="btn btn-primary" @click="enviarData()">Registrar pedido</button>
            </div>
        </div>
        {{ dataEnviar }}
    </div>
</template>

<script>

    import { mapState } from 'vuex'

    export default {
        name:"Detalle Productos",
        data() {
            return {
                totalProducto:1,
                stock:null,
                productos:null,
                idProducto:this.$route.params.idProducto,
                usuarios:[
                    {
                        id_cliente:1,
                        nombre_cliente:'Primer cliente',
                        direccion:'Primero 12512',
                        telefono:934569876,
                    },
                    {
                        id_cliente:2,
                        nombre_cliente:'Segundo cliente',
                        direccion:'Segundo 1145',
                        telefono:951478826,
                    },
                    {
                        id_cliente:3,
                        nombre_cliente:'Tercero cliente',
                        direccion:'Tercero ',
                        telefono:945367812,
                    },
                    {
                        id_cliente:4,
                        nombre_cliente:'Jesus Gonzalo',
                        direccion:'av. calle s/n',
                        telefono:978139472,
                    }
                ],
                dataEnviar:{
                    Facturacion:{
                        idFacturación:null,
                        nombreEmpresa:null,
                        direccion:null,
                    },
                    Pedido:{
                        idCompra:null,
                        idCliente:null,
                        idProducto:this.$route.params.idProducto,
                        idFacturación:null,
                        idFecha:null,
                        precioTotal:null,
                        observaciones:null,
                        fechaCompra:null,
                        fechaEntrega:null,
                    },
                    Venta:{
                        idCompra:null,
                        nombreRemitente:null,
                        direccionRemitente:null,
                        telefonoRemitente:null
                    }
                }
            };
        },
        computed: {
            ...mapState(['producto'])
        },
        methods:{
            async enviarData(){
                
                // Usando servicio de generarFactura 
                await this.axios.post(`Producto/generarFacturacion`,this.dataEnviar.Facturacion).then((res) => {
                    console.log(res.data.content)
                })

                // Usando servicio de procesarPedido 
                await this.axios.post(`Producto/procesarPedido`, this.dataEnviar.Pedido).then((res) => {
                    console.log(res.data.content)
                })

                // Usando servicio de generarVenta 
                await this.axios.post(`Producto/generarVenta`, this.dataEnviar.Venta).then((res) => {
                    console.log(res.data.content)
                })
          
            },
            obtenerID(){
                const date = Date.now()
                this.dataEnviar.Facturacion.idFacturación=date;
                this.dataEnviar.Pedido.idCompra=date;
                this.dataEnviar.Venta.idCompra=date;
            },
            async verificarStock(){
                await this.axios.get(`Producto/verificarDisponibilidad?id=${this.idProducto}`).then((res) => {
                    this.stock = res.data.content.stock
                })
            },
            agregar(){
                if(this.totalProducto + 1  <= this.stock){
                    this.totalProducto++
                }
            },
            quitar(){
                if(this.totalProducto - 1 >= 1){
                    this.totalProducto--
                }
            },
        },
        created(){
            this.obtenerID();
            this.verificarStock();
        },
        // unmounted(){
        //     this.$store.commit('DELETED_PRODUCTO')
        // }
    }
</script>

<style scoped>
    .productoTotal{
        width: 60px;
        text-align: center !important;
        background: none;
        border: none;
        font-size: 1.7rem
    }

    .btn-producto{
        border: none;
        background: none;
        font-size: 1.5rem;
    }
</style>