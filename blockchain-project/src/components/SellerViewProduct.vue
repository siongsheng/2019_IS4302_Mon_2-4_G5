<template>
  <div id="sellerViewProduct">
    <h2 class="header">Products</h2>
    <div class="row">
    <div class="col s4" v-for="(product, p) in products">
      <div class="card">
        <div class="card-image">
          <img src="../assets/shopping-bag.png">
        </div>
        <div class="card-content">
          <span class="card-title">{{product.name}}</span>
          <p>Price: $ {{product.price}}<br>
             Description: {{product.description}}<br>
             Quantity Available: {{product.stock}}</p>
        </div>
        <div class="card-action">
          <!--To replace correct onclick function -->
          <router-link v-bind:to="{ name: 'sellerEditProduct', params:{product_id: product.Id} }" >
            Edit
          </router-link>
        </div>
      </div>
    </div>
  </div>
      <p id="demo"></p>
  </div>
</template>
<script>
import firebase from 'firebase';
import axios from 'axios';
export default {
  name: 'SellerViewProduct',
  data () {
    return {
      products: [],
      selectedQty:'',
      desiredPrice: {},
      seller:[]
    }
  },
  methods:{
  },
  mounted(){
    //get the seller object 
    axios.get('http://localhost:3000/' + firebase.auth().currentUser.email + '/seller')
    .then((response) => {
      this.seller = response.data.results[0];
    })
    .catch(error => {
      console.log(error);
    })
    //the the product objects
    axios.get('http://localhost:3000/' + firebase.auth().currentUser.email + '/product')
    .then((response) => {
      //loop for products to add only the products the seller own to the list
      for (var i=0; i < response.data.results.length; i++){
        //console prints the detail of a product 
        var p = response.data.results[i]
        var s = p.seller.substring(41) //sellerx
        var u = firebase.auth().currentUser.email //sellerx@test.com
        if (u.includes(s)){
          this.products.push(p)
        }
      }
    })
    .catch(error => {
      console.log(error);
    })


    axios.get('http://localhost:3000/' + firebase.auth().currentUser.email + '/seller')
    .then((response) => {
      this.buyer = response.data.results[0];
    })
    .catch(error => {
      console.log(error);
    })
  }
}
</script>
