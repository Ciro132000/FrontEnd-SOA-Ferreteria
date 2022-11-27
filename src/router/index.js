import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Productos from '../views/Productos/productos.vue'
import DetalleProducto from '../views/Productos/detalleProducto'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {path: '/', component: Productos, name:'productos'},
      {path: '/detalle/:idProducto', component: DetalleProducto, name:'detalleProducto'}
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
