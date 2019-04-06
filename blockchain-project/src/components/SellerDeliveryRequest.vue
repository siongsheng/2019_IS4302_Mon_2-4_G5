<template>
  <div id="sellerDeliveryRequest">
    <h3 class="header">Delivery Status</h3>
    <table>
        <thead>
          <tr>
              <th>Order</th>
              <th>Logistics Partner</th>
              <th>Bid Status</th>
              <th>Delivery Status</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(logReq, log) in closedLogReqs">
            <td>{{logReq.Id}}</td>
            <td>{{deliverers[log]}}</td>
            <td>{{logReq.state}}</td>
            <td>{{orderStates[log]}}</td>
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
  name: 'SellerDeliveryStatus',
  data () {
    return {
      logReqs: [],
      closedLogReqs: [],
      deliverers:[],
      orderStates:[]
    }
  },
  methods:{

    getClosedLogReqs(){
      for(var k=0; k<this.logReqs.length; k++){
        if(this.logReqs[k].state === "CLOSED"){
          this.closedLogReqs.push(this.logReqs[k])
        }
      }
    },

    getDelivererName(){
      for(var k=0; k<this.closedLogReqs.length; k++){
        var delivererId = this.closedLogReqs[k].confirmedDeliverer.substring(44)
        //console.log(delivererId)
        axios.get('http://localhost:3000/' + firebase.auth().currentUser.email + '/logistics/' + delivererId)
        .then((response) => {
          this.deliverers.push(response.data.results.name);
        })
      }

    },

    getOrderStatus(){
      for(var k=0; k<this.closedLogReqs.length; k++){
        var orderId = this.closedLogReqs[k].Id
        //console.log(delivererId)
        axios.get('http://localhost:3000/' + firebase.auth().currentUser.email + '/order/' + orderId)
        .then((response) => {
          this.orderStates.push(response.data.results.orderState);
        })
      }

    }

  },
  mounted(){
    axios.get('http://localhost:3000/' + firebase.auth().currentUser.email + '/logisticsrequest')
    .then((response) => {
      this.logReqs = response.data.results;
    })
    .then((response) => {
      this.getClosedLogReqs()
      this.getDelivererName()
      this.getOrderStatus()
    })
    .catch(error => {
      console.log(error);
    })


  }
}
</script>
