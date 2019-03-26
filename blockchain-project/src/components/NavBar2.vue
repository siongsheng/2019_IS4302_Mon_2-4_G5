<template>
  <nav>
    <div class="nav-wrapper blue darken-2">
      <div class="container">
        <router-link to="/" class="brand-logo">DeliverLor</router-link>
        <img :src="image" style="width:3em; height:2em; margin-left:160px; margin-top:18px;">
        <ul class="right">
          <li v-if="isLoggedIn"><router-link to="/">Dashboard</router-link></li>
          <!-- <li v-if="!isLoggedIn"><router-link to="/login">Login</router-link></li> -->
          <li v-if="isLoggedIn">
            <button v-on:click="logout" class="btn black">Logout</button>
          </li>

        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
  import firebase from 'firebase'
  export default{
    name: 'navbar',
    data(){
      return{
        isloggedIn: false,
        currentUser: false,
        image: require('@/assets/Delivery.png')
      }
    },
    created(){
      if(firebase.auth().currentUser){
        this.isLoggedIn = true;
        this.currentUser = firebase.auth().currentUser.email;
      }
    },
    methods:{
      logout: function(){
        firebase.auth().signOut().then(() => {
          this.$router.go({path: this.$router.path});
        });
      }
    }
  }
</script>-
