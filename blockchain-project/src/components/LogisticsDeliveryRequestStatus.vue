<template>
  <div id="logisticsDeliveryRequestStatus">
    <h3 class="header">Delivery Request</h3>
    <table>
        <thead>
          <tr>
              <th>Order</th>
              <th>Item</th>
              <th>Quantity</th>
              <th>Seller</th>
              <th>Reserve amount</th>
              <th>Bid Placed</th>
              <th>Bid Status</th>
          </tr>
        </thead>

        <tbody>

          <tr v-for="(logReq, log) in logReqs">
            <td>{{logReq.Id}}</td>
            <td>{{prodNames[log]}}</td>
            <td>{{orderQtys[log]}}</td>
            <td>{{sellerNames[log]}}</td>
            <td>$ {{logReq.desiredPrice}}</td>
            <td>$ {{offerPrices[log]}}</td>
            <td>{{bidStates[log]}}</td>
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
  name: 'LogisticsDeliveryRequestStatus',
  data () {
    return {
      logReqs: {},
      orderQtys: [],
      products: [],
      prodNames: [],
      sellers:[],
      sellerNames:[],
      bidStates:[],
      offerArray:[],
      offerPrices:[]
    }
  },
  methods:{
    getOrders(){
      for(var i=0; i<this.logReqs.length; i++){
        this.orderQtys.push(this.logReqs[i].quantity);
        this.products.push(this.logReqs[i].product);
      }
    },
    // getOrderFields(){
    //   var buyer = 'buyer1@test.com'
    //   for(var j=0; j<this.orders.length; j++){
    //     console.log(this.orders[j].substring(40));
    //     axios.get('http://localhost:3000/' + buyer +  '/order/' + this.orders[j].substring(40))
    //     .then((response) => {
    //       //console.log(response.data.quantity);
    //       this.orderQtys.push(response.data.results.quantity);
    //       this.products.push(response.data.results.product);
    //       //console.log("it is a:" + this.products.length)
    //     })
    //     .catch(error => {
    //       console.log(error);
    //     })
    //   }
    // },
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
        console.log(k + " seller")
        axios.get('http://localhost:3000/' + firebase.auth().currentUser.email + '/seller/' + this.sellers[k].substring(41))
        .then((response) => {
          //console.log(response.data.results);
          this.sellerNames.push(response.data.results.name);
        })
        .catch(error => {
          console.log(error);
        })
      }

    },

    getOffers(){
      var userEmail = firebase.auth().currentUser.email;
      var logs = userEmail.substring(0, userEmail.length - 9);

      for(var i=0; i<this.logReqs.length; i++){
        this.offerArray.push(this.logReqs[i].offers);
        if(this.logReqs[i].confirmedDeliverer){
          if(this.logReqs[i].confirmedDeliverer.substring(44) === logs){
            this.bidStates.push('Accepted')
          }
          else{
            this.bidStates.push('Rejected')
          }
        }
        else{
          this.bidStates.push('Pending')
        }
      }

      for(var i=0; i<this.offerArray.length; i++){
        console.log(i)
        if(this.offerArray[i].length > 0){
          for(var j=0; j<this.offerArray[i].length; j++){
            if(logs === this.offerArray[i][j].logistics.substring(44)){
              console.log("LogReq " + i + " Offer price is " + this.offerArray[i][j].offerPrice)
              this.offerPrices.push(this.offerArray[i][j].offerPrice)
            }
          }
        }
        else{
          this.offerPrices.push('-')
        }
      }
    }
  },
  mounted(){
    var self = this;
    axios.get('http://localhost:3000/' + firebase.auth().currentUser.email + '/logisticsrequest')
    .then((response) => {
      //console.log(response.data.results);
      this.logReqs = response.data.results;
    })
    .then((response) => {
      this.getOrders();
      this.getOffers();
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
