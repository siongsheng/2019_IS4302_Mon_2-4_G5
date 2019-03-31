<template>
  <div id="dashboard">
    <!-- admin dashboard -->
    <div v-if="isAdmin" id="admin-dashboard">
      <ul class="collection with-header">
        <li class="collection-header"><h4>Users</h4></li>
        <li v-for="user in users" v-bind:key="user.id" class="collection-item">
          <div class="chip">{{user.id}}</div>
          <div class="chip">{{user.email}}</div>
          {{user.name}}, {{user.contact_number}}
            <router-link class="secondary-content" v-bind:to="{ name: 'view-user', params: { user_id: user.id }}">
              <i class="fa fa-eye"></i>
            </router-link>
        </li>
      </ul>
      <div class="fixed-action-btn">
        <router-link to="/new" class="btn-floating btn-large red">
          <i class="fa fa-plus"></i>
        </router-link>
      </div>
    </div>
    <!-- user dashboard -->
    <div v-else id="user-dashboard">
      hello, {{this.userEmail}} <br>

      <h3>Your wallet has ${{this.wallet[0].balance}}</h3>
    </div>
  </div>
</template>
<script>
import db from './firebaseInit'
import firebase from 'firebase'
import axios from 'axios'
export default {
  name: 'dashboard',
  data () {
    return {
      users: [],
      isAdmin: false,
      userEmail: firebase.auth().currentUser.email,
      wallet:[]
    }
  },
  created () {
    if(firebase.auth().currentUser){
      //if the user is admin, show the admin dashboard
      if (firebase.auth().currentUser.email === 'group5@test.com'){
        console.log('this is admin');
        this.isAdmin = true
        db.collection('users').orderBy('email', 'desc').get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            // console.log(doc)
            const data = {
              'id': doc.data().user_id,
              'name': doc.data().name,
              'email': doc.data().email,
              'contact_number': doc.data().contact_number
            }
            this.users.push(data)
          })
        })
      } else {
        // if the user is a normal user, show user dashboard instead
        this.isAdmin = false;
      }
    }
  },
  mounted(){
    axios.get('http://localhost:3000/' + firebase.auth().currentUser.email + '/Wallet')
    .then((response) => {
      //console.log(response.data.wallet);
      this.wallet = response.data.wallet
    })
    .catch(error => {
      console.log(error);
    })
  }
}
</script>
