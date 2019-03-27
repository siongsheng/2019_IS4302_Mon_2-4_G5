<template>
  <div id='new-user'>
    <h3>New User</h3>
    <div class="row">
      <form @submit.prevent="saveUser" class="col s12">
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="user_id" required>
            <label>User ID#</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="name" required>
            <label>Name</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="email" required>
            <label>Email</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="contact_number" required>
            <label>Contact Number</label>
          </div>
        </div>
        <button type="submit" class="btn">Submit</button>
        <router-link to="/" class="btn grey">Cancel</router-link>
      </form>
    </div>
  </div>
</template>
<script>
import db from './firebaseInit'
export default {
  name: 'ViewUser',
  data () {
    return {
      user_id: null,
      name: null,
      email: null,
      contact_number: null
    }
  },
  methods: {
    saveUser () {
      db.collection('users').add({
        user_id: this.user_id, // bounded to v-model
        name: this.name,
        email: this.email,
        contact_number: this.contact_number
      }).then(docRef => {
        console.log('Client added: ', docRef.id)
        this.$router.push('/')
      }).catch(error => {
        console.error('Error adding employee: ', error)
      })
    }
  }
}
</script>
