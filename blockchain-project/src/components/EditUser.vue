<template>
  <div>
    <h3>Edit User</h3>
        <div class="row">
      <form @submit.prevent="updateUser" class="col s12">
        <div class="row">
          <div class="input-field col s12">
            <input type="text" placeholder="User ID#" v-model="id" required disabled>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="name" placeholder="Name" required>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="email" placeholder="Email" required>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="contact_number" placeholder="Contact Number" required>
          </div>
        </div>
        <button type="submit" class="btn">Submit</button>
        <router-link to="/" class="btn grey">Cancel</router-link>
      </form>\
    </div>
  </div>
</template>
<script>
import db from './firebaseInit'
export default {
  name: 'editUser',
  data () {
    return {
      user_id: null,
      name: null,
      email: null,
      contact_number: null
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
    updateUser () {
      db.collection('users').where('user_id', '==', this.$route.params.user_id).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref.update({
            user_id: this.id,
            contact_number: this.contact_number,
            email: this.email,
            name: this.name
          }).then(() => {
            this.$router.push({
              name: 'view-user',
              params: {user_id: this.id}
            })
          }

          )
        })
      })
    }
  }
}
</script>
