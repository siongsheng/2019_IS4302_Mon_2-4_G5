<template>
<div class="view-user">
    <ul class="collection with-header">
      <li class="collection-header"><h4>{{name}}</h4></li>
      <li class="collection-item">ID#: {{id}}</li>
      <li class="collection-item">E-mail: {{email}}</li>
      <li class="collection-item">Tel: {{contact_number}}</li>
    </ul>
    <router-link to="/" class="btn grey">Back</router-link>
    <button @click="deleteUser" class="btn red">Delete</button>
    <div class="fixed-action-btn">
      <router-link v-bind:to="{ name: 'edit-user', params: { user_id: id }}" class="btn-floating btn-large red">
        <i class="fa fa-pencil"></i>
      </router-link>
    </div>
</div>
</template>
<script>
import db from './firebaseInit'
export default {
  name: 'view-user',
  data () {
    return {
      'id': null,
      'name': null,
      'email': null,
      'contact_number': null
    }
  },
  beforeRouteEnter (to, from, next) {
    db.collection('users').where('user_id', '==', to.params.user_id).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        next(vm => {
          vm.id = doc.data().user_id
          vm.name = doc.data().name
          vm.contact_number = doc.data().contact_number
          vm.email = doc.data().email
        })
      })
    })
  },
  watch: {
    '$route': 'fetchData'
  },
  methods: {
    fetchData () {
      db.collection('users').where('user_id', '==', this.$route.params.user_id).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.id = doc.data().user_id
          this.name = doc.data().name
          this.email = doc.data().email
          this.contact_number = doc.data().contact_number
        })
      })
    },
    deleteUser () {
      if (confirm('Are you sure?')) {
        db.collection('users').where('user_id', '==', this.$route.params.user_id).get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            doc.ref.delete()
            this.$router.push('/')
          })
        })
      }
    }
  }
}
</script>
