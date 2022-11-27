<template>
    <div>
        <navBar></navBar>
        <div class="container">
            <router-view/>
        </div>
    </div>
</template>


<script>

import navBar from '../components/Nav'

export default {
  name: 'Home',
  components:{
    navBar
  },
  data(){
    return{
      
    }
  },
}
</script>

<style>

</style>

