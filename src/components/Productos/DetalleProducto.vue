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

                    <h5 class="card-title">{{ producto.nombreProducto}}</h5>
                    <p class="card-text">Marca: {{ producto.marca }}</p>
                    <p class="card-text">Precio: S/. {{ producto.precio }}</p>
                    <p class="card-text"><small class="text-muted">Stock: {{ producto.stock == 0 ? 'Stock no disponible': producto.stock }}</small></p>
                    <div>
                        <button @click="quitar()" class="btn-producto">
                            <i class="fas fa-minus-circle"></i>
                        </button>
                        <input type="number" class="productoTotal" disabled v-model="totalProducto">
                        <button @click="agregar()" class="btn-producto">
                            <i class="fas fa-plus-circle"></i>
                        </button>
                    </div>
       
                    <h4 class="mt-5">Precio total: S/. {{ precioTotal(producto.precio) }} </h4>
                </div>
                </div>
            </div>
            </div>
        </div>
        <div class="row">

                <!-- SERVICIOS DE FACTURACIÓN  -->
                <div class="col-md-4">
                    <div class="alert alert-info" role="alert" v-if="msgFacturacion">
                    {{ msgFacturacion }}
                </div>
                <form>
                    <h5>Datos de la facturación</h5>
                    <div class="form-group">
                        <label >Nombre de la empresa (*)</label>
                        <input type="text" v-model="dataEnviar.Facturacion.nombreEmpresa" class="form-control">
                    </div>
                    <div class="form-group">
                        <label >Dirección (*)</label>
                        <input type="text" v-model="dataEnviar.Facturacion.direccion" class="form-control">
                    </div>
                </form>
            </div>


            <!-- SERVICIOS DE REGISTAR PEDIDO  -->
            <div class="col-md-4">
                <div class="alert alert-info" role="alert"  v-if="msgPedido">
                    {{ msgPedido }}
                </div>
                <form action="">
                    <h5>Datos de entrega</h5>
                    <div class="form-group">
                        <label >Cliente (*)</label>
                        <select v-model="dataEnviar.Pedido.idCliente" class="form-control">
                            <option disabled value="null">Seleccione un cliente</option>
                            <option v-for="item in usuarios" :key="item.index" :value="item.id_cliente">{{ item.nombre_cliente }}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label >Fecha de compra (*)</label>
                        <input type="date" v-model="dataEnviar.Pedido.fechaCompra" @change="cambio($event)" class="form-control">
                    </div>
                    <div class="form-group">
                        <label >Fecha de entrega (*)</label>
                        <input type="date" v-model="dataEnviar.Pedido.fechaEntrega" class="form-control">
                    </div>
                    <div class="form-group">
                        <label >Observación</label>
                        <textarea v-model="dataEnviar.Pedido.observaciones" class="form-control" placeholder="Si tiene alguna observación, por favor escribala aquí ....." id="floatingTextarea2" style="height: 100px"></textarea>
                    </div>
                </form>
            </div>


            <!-- SERVICIOS DE REGISTRAR VENTA  -->
            <div class="col-md-4">
                <div class="alert alert-info" role="alert" v-if="msgVenta">
                    {{ msgVenta }}
                </div>
                <form action="">
                    <h5>Datos remitente</h5>
                    <div class="form-group">
                        <label >Nombre de remitente (*)</label>
                        <input type="text" v-model="dataEnviar.Venta.nombreRemitente" class="form-control">
                    </div>
                    <div class="form-group">
                        <label >Dirección remitente (*) </label>
                        <input type="text" v-model="dataEnviar.Venta.direccion" class="form-control">
                    </div>
                    <div class="form-group">
                        <label >Teléfono remitente (*)</label>
                        <input type="text" maxlength="9" v-model="dataEnviar.Venta.telefono" class="form-control">
                    </div>
                </form>
            </div>

            <div class="d-flex justify-content-center mt-5">
                <button class="btn btn-primary" @click="enviarData()" :disabled="enviando">Registrar pedido</button>
            </div>
        </div>

    </div>
</template>

<script>

    import { mapState } from 'vuex'

    export default {
        name:"Detalle Productos",
        data() {
            return {
                enviando:false,
                msgPedido:null,
                msgVenta:null,
                msgFacturacion:null,
                totalProducto:1,
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
                        idFacturacion:null,
                        nombreEmpresa:null,
                        direccion:null,
                    },
                    Pedido:{
                        idCompra:null,
                        idCliente:null,
                        idProducto:this.$route.params.idProducto,
                        idFacturacion:null,
                        idFecha:null,
                        precioTotal:null,
                        observaciones:null,
                        fechaCompra:null,
                        fechaEntrega:null,
                    },
                    Venta:{
                        idCompra:null,
                        nombreRemitente:null,
                        direccion:null,
                        telefono:null
                    }
                }
            };
        },
        computed: {
            ...mapState(['producto'])
        },
        methods:{
            async enviarData(){
                this.enviando = true

                const data = this.dataEnviar;

                // Validar datos 
                if( data.Facturacion.nombreEmpresa !=null && 
                    data.Facturacion.direccion != null && 
                    data.Pedido.idCliente != null &&
                    data.Pedido.idProducto != null && 
                    data.Pedido.precioTotal != null &&
                    data.Pedido.fechaCompra != null &&
                    data.Pedido.fechaEntrega != null &&
                    data.Venta.nombreRemitente !=null &&
                    data.Venta.direccion !=null &&
                    data.Venta.telefono !=null
                 ){
                     
                     // Usando servicio de generarFactura 
                    await this.axios.post(`Producto/generarFacturacion`,this.dataEnviar.Facturacion).then((res) => {
                        this.msgFacturacion = res.data.content
                        console.log(res.data)
                    })
                     
     
                     // Usando servicio de procesarPedido 
                     await this.axios.post(`Producto/procesarPedido`, this.dataEnviar.Pedido).then((res) => {
                        this.msgPedido = res.data.content
                        console.log(res.data)
                     })
     
                     // Usando servicio de generarVenta 
                     await this.axios.post(`Producto/generarVenta`, this.dataEnviar.Venta).then((res) => {
                        this.msgVenta = res.data.content
                        console.log(res.data)
                     })
                 }else{
                     alert('Rellene todos los campos, todos son obligatorios')
                 }
                
                this.enviando = false

                // Redireccionar
                setTimeout(() => {
                    this.$router.push('/')
                }, "5000")
          
            },
            obtenerID(){
                const date = Date.now()
                const cadena = date.toString()
                const id_nuevo = cadena.slice(4)
                const id = parseInt(id_nuevo)
                this.dataEnviar.Facturacion.idFacturacion = id;
                this.dataEnviar.Pedido.idCompra = id;
                this.dataEnviar.Pedido.idFacturacion = id;
                this.dataEnviar.Venta.idCompra = id;
                this.dataEnviar.Pedido.idFecha = id
            },
            agregar(){
                if(this.totalProducto + 1  <= this.producto.stock){
                    this.totalProducto++
                }
            },
            quitar(){
                if(this.totalProducto - 1 >= 1){
                    this.totalProducto--
                }
            },
            formatearFecha(date){
            const dateN = new Date(date)
                const formatDate = (current_datetime)=>{
                    let formatted_date = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate(); 
                    // + " " + current_datetime.getHours() + ":" + current_datetime.getMinutes() + ":" + current_datetime.getSeconds();
                    return formatted_date;
                }

                return formatDate(dateN);
            },
            precioTotal(precio){
                this.dataEnviar.Pedido.precioTotal = this.totalProducto*precio
                return this.dataEnviar.Pedido.precioTotal
            }
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

    .form-group{
        margin-top: 1.2rem ;
    }
</style>