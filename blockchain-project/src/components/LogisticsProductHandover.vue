<template>
  <div id="logisticsProductHandover">
    <h3 class="header">Product Handover</h3>
    <table>
        <thead>
          <tr>
              <th>Order</th>
              <th>Item</th>
              <th>Quantity</th>
              <th>Seller</th>
              <th>Seller Address</th>
              <th>Buyer</th>
              <th>Buyer Address</th>
              <th>Confirm Handover</th>
          </tr>
        </thead>

        <tbody>

          <tr v-for="(order, ord) in orderIds">
            <td>{{orderIds[ord]}}</td>
            <td>{{prodNames[ord]}}</td>
            <td>{{orderQtys[ord]}}</td>
            <td>{{sellerNames[ord]}}</td>
            <td>{{sellerAdds[ord]}}</td>
            <td>{{buyerNames[ord]}}</td>
            <td>{{buyerAdds[ord]}}</td>
            <td><button class="btn waves-effect waves-light" tag='button'
              v-on:click="productHandover(orderIds[ord])">Confirm</button></td>
          </tr>

        </tbody>
      </table>
  </div>

  </div>
</template>
<script>
import firebase from 'firebase';
import axios from 'axios';
export default {
  name: 'LogisticsProductHandover',
  data () {
    return {
      //logReqs: {},
      orders: [],
      orderIds:[],
      orderQtys: [],
      products: [],
      prodNames: [],
      sellers:[],
      sellerNames:[],
      sellerAdds:[],
      buyers:[],
      buyerNames:[],
      buyerAdds:[]
    }
  },
  methods:{
    // getOrders(){
    //   var userEmail = firebase.auth().currentUser.email;
    //   var logs = userEmail.substring(0, userEmail.length - 9);
    //
    //   for(var i=0; i<this.logReqs.length; i++){
    //     //console.log(this.logReqs[i])
    //     if(this.logReqs[i].confirmedDeliverer && this.logReqs[i].confirmedDeliverer.substring(44) === logs){
    //       this.orders.push(this.logReqs[i].order);
    //     }
    //   }
    // },
    getOrderFields(){
      for(var j=0; j<this.orders.length; j++){
        console.log(this.orders[j].Id.substring(40));
        if(this.orders[j].orderState === 'AWAITING_LOGISTICS'){
          this.orderQtys.push(this.orders[j].quantity);
          this.products.push(this.orders[j].product);
          this.orderIds.push(this.orders[j].Id);
          this.buyers.push(this.orders[j].buyer);
        }
      }
    },
    getBuyerNames(){
      for(var k=0; k<this.buyers.length; k++){
        axios.get('http://localhost:3000/' + firebase.auth().currentUser.email + '/buyer/' + this.buyers[k].substring(40))
        .then((response) => {
          this.buyerNames.push(response.data.results.name);
          var buyerAddress = response.data.results.address.houseNo + ' ' + response.data.results.address.street + ' '
          + response.data.results.address.country + ' ' + response.data.results.address.postcode;
          this.buyerAdds.push(buyerAddress);
        })
        .catch(error => {
          console.log(error);
        })
      }
    },
    getProductNames(){
      for(var k=0; k<this.products.length; k++){
        axios.get('http://localhost:3000/' + firebase.auth().currentUser.email + '/product/' + this.products[k].substring(42))
        .then((response) => {
          this.prodNames.push(response.data.results.name);
          this.sellers.push(response.data.results.seller);
        })
        .catch(error => {
          console.log(error);
        })
      }
    },
    getSellerNames(){
      for(var k=0; k<this.sellers.length; k++){
        //console.log(this.sellers[k].substring(41))
        axios.get('http://localhost:3000/' + firebase.auth().currentUser.email + '/seller/' + this.sellers[k].substring(41))
        .then((response) => {
          this.sellerNames.push(response.data.results.name);
          var sellerAddress = response.data.results.address.houseNo + ' ' + response.data.results.address.street + ' '
          + response.data.results.address.country + ' ' + response.data.results.address.postcode;
          this.sellerAdds.push(sellerAddress);
        })
        .catch(error => {
          console.log(error);
        })
      }

    },

    productHandover(orderId){
      let order = "org.deliverlor.ecommerce.Order#" + orderId;

      axios.post('http://localhost:3000/' + firebase.auth().currentUser.email + '/productHandoverTx', {
        "order": order
      }).then((response) => {
        alert("success");
        this.$router.push('/logisticsProductHandover');
      })
      .catch((e) => {
        alert("Handover has been done already!");
        console.error(e)
      })
    }

  },
  mounted(){
    var self = this;
    axios.get('http://localhost:3000/' + firebase.auth().currentUser.email + '/order')
    .then((response) => {
      //console.log(response.data.results);
      this.orders = response.data.results;
    })
    .then((response) => {
      this.getOrderFields();
    })
    .then((response) => {
      setTimeout(function() {
        self.getBuyerNames();
      }, 1000);
    })
    .then((response) => {
      setTimeout(function() {
        self.getProductNames();
      }, 1000);
    })
    .then((response) => {
      setTimeout(function() {
        self.getSellerNames();
      }, 2000);
    })
    .catch(error => {
      console.log(error);
    })

  }
}
</script>
