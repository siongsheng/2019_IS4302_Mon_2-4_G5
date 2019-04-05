<template>
  <div id="buyerConfirmDelivery">
    <h3 class="header">Confirm Delivery</h3>
    <table>
        <thead>
          <tr>
              <th>Order</th>
              <th>Logistics Partner</th>
              <th>Confirm Delivery</th>
          </tr>
        </thead>

        <tbody>

          <tr v-for="(order, ord) in inTransitOrders">
            <td>{{order.Id}}</td>
            <td>{{logNames[ord]}}</td>
            <td><button class="btn waves-effect waves-light" tag='button'
              v-on:click="confirmDelivery(order.Id)">Confirm</button></td>
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
  name: 'BuyerDeliveryRequest',
  data () {
    return {
      orders:[],
      inTransitOrders: [],
      logs:[],
      logNames:[]
    }
  },
  methods:{

    getInTransitOrders(){
      for(var i=0; i<this.orders.length; i++){
        if(this.orders[i].orderState === 'IN_TRANSIT'){
          this.inTransitOrders.push(this.orders[i]);
        }
      }
    },

    getLogReqs(){
      for(var i=0; i<this.inTransitOrders.length; i++){
        var logReqId = this.inTransitOrders[i].logisticsRequest.substring(51);
        axios.get('http://localhost:3000/' + firebase.auth().currentUser.email + '/logisticsrequest/' + logReqId)
        .then((response) => {
          this.logs.push(response.data.results.confirmedDeliverer);
        })
        .catch(error => {
          console.log(error);
        })
      }
    },

    getLogNames(){
      for(var i=0; i<this.logs.length; i++){
        var logId = this.logs[i].substring(44);
        axios.get('http://localhost:3000/' + firebase.auth().currentUser.email + '/logistics/' + logId)
        .then((response) => {
          this.logNames.push(response.data.results.name);
        })
        .catch(error => {
          console.log(error);
        })
      }
    },

    confirmDelivery(orderId){
      let order = "org.deliverlor.ecommerce.Order#" + orderId;

      axios.post('http://localhost:3000/' + firebase.auth().currentUser.email + '/productDeliveredTx', {
        "order": order
      }).then((response) => {
        alert("success");
        this.$router.push('/buyerDeliveryStatus');
      })
      .catch((e) => {
        alert("Order has been delivered already");
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
      this.getInTransitOrders();
      this.getLogReqs();
    })
    .then((response) => {
      setTimeout(function() {
        self.getLogNames();
      }, 1000);
    })
    .catch(error => {
      console.log(error);
    })
  }
}
</script>
