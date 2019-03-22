<template>
  <div id="app">
    <NavBar/>
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>

<script>
import NavBar from './components/navBar'
export default {
  name: 'App',
  components:{
    NavBar
  }
}
</script>
