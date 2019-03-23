<template>
  <div id="dashboard">
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
</template>
<script>
import db from './firebaseInit'
export default {
  name: 'dashboard',
  data () {
    return {
      users: []
    }
  },
  created () {
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
  }
}
</script>
