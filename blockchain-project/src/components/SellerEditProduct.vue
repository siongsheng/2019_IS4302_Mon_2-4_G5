<template>
  <div id="sellerEditProduct">
    <h3>Edit Product</h3>
        <div class="row">
      <form @submit.prevent="updateProduct" class="col s12">
        <div class="row">
          <div class="input-field col s12">
            <input type="text" placeholder="Product ID#" v-model="product_id" required disabled>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="name" placeholder="Name" required>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="stock" placeholder="Stock" required>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="description" placeholder="Description" required>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="price" placeholder="Price" required>
          </div>
        </div>
        <button type="submit" class="btn">Submit</button>
        <router-link to="/sellerViewProduct" class="btn grey">Cancel</router-link>
      </form>
    </div>
  </div>
</template>
<script>
import firebase from 'firebase';
import axios from 'axios';
export default {
  name: 'SellerEditProduct',
  data () {
    return {
      product_id: null,
      name: null,
      stock: null,
      description: null,
      product: null,
      price:null
    }
  },
  beforeRouteEnter (to, from, next) {
    console.log("in beforeRouteEnter()")
    next(vm => {
          vm.product_id =to.params.product_id
          // console.log('firing GET at '+'http://localhost:3000/' + firebase.auth().currentUser.email + '/product/' +to.params.product_id)
          axios.get('http://localhost:3000/' + firebase.auth().currentUser.email + '/product/' +to.params.product_id).then((response) => {
            console.log("product information before updating"+response.data.results)
            var product = response.data.results
            vm.name = product.name
            vm.stock = product.stock
            vm.description = product.description
            vm.price = product.price
          })
        }
    )
  },
  methods: {
    updateProduct () { //TODO
      console.log("in updateProduct()")
      alert("click OK and wait a little...")
      axios.put(
        'http://localhost:3000/' + firebase.auth().currentUser.email + '/product/' +this.product_id, 
        {
          "name": this.name,
          "price": this.price,
          "description": this.description,
          "stock": this.stock,
          "price": this.price
        }).then((response)=>{
        console.log(response)
        alert("successfully updated")
        this.$router.push({name: 'sellerViewProduct'})
      })
    }
  },
  mounted(){
  }
}
</script>