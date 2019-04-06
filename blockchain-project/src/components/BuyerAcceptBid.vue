<template>
  <div id="buyerAcceptBid">
    <ul class="collection with-header">
      <li class="collection-header">
        <h4>Accept Bid for {{this.$route.params.order_id}} [{{logReqState}}]</h4>
        <p v-if="confirmed()" style="color:red">Winner: {{this.logReq.confirmedDeliverer.substring(44)}}</p>
      </li>
      <li class="collection-item avatar" v-for="(offer, off) in offers">
        <img src="../assets/truck.png" alt="" class="circle">
      <span class="title">Logistics ID: {{offer.logistics.substring(44)}} </span>
      <p>Logistics Name: {{logNames[off]}}<br>
         Bid: $ {{offer.offerPrice}}
      </p>
      <!-- <a href="#!" class="secondary-content"><i class="material-icons">grade</i></a> -->
      <a v-if="isOpen()" class="btn waves-effect waves-light" tag='button' v-on:click="acceptOffer(offer.logistics.substring(44))">Accept</a>
    </li>
    </ul>
    <router-link v-if="nobid()" class="btn waves-effect waves-light" v-bind:to="{ name: 'buyerEditDeliveryRequest', params: { logReq_id: logReq.Id }}" tag="button">Edit Reserve Price</router-link>
  </div>
</template>
<script>
import firebase from 'firebase';
import axios from 'axios';
export default {
  name: 'BuyerAcceptBid',
  data () {
    return {
      offers: [],
      logNames:[],
      logReqState:'',
      logReq: {}
    }
  },
  methods:{
    confirmed(){
      return this.logReq.confirmedDeliverer
    },
    //returns true if the log req is still open
    isOpen(){
      if(this.logReq.state == 'OPEN'){
        return true
      }
      return false
    },
    //disable the edit button for user if there is already offer to
    nobid(){
      if (this.offers.length == 0){
        return true;
      }
      return false;
    },
    acceptOffer(deliverer){
      let logs = "org.deliverlor.ecommerce.Logistics#" + deliverer;
      this.logReq = "org.deliverlor.ecommerce.LogisticsRequest#" + this.$route.params.order_id;

      axios.post('http://localhost:3000/' + firebase.auth().currentUser.email + '/acceptOfferTx', {
        "confirmedDeliverer": logs,
        "logisticsRequest": this.logReq
      }).then((response) => {
        alert("success");
        this.$router.go({path: this.$router.path});
      })
      .catch((e) => {
        alert("This request is closed!");
        console.error(e)
      })
    },

    getLogNames(){
      for(var k=0; k<this.offers.length; k++){
        axios.get('http://localhost:3000/' + firebase.auth().currentUser.email + '/logistics/' + this.offers[k].logistics.substring(44))
        .then((response) => {
          this.logNames.push(response.data.results.name);
        })
        .catch(error => {
          console.log(error);
        })
      }
    }
  },
  mounted(){
    axios.get('http://localhost:3000/' + firebase.auth().currentUser.email + '/logisticsrequest/'  + this.$route.params.order_id)
    .then((response) => {
      this.logReq=response.data.results;
      this.logReqState = response.data.results.state;
      this.offers = response.data.results.offers;
    })
    .then((response) => {
      this.getLogNames()
    })
    .catch(error => {
      console.log(error);
    })


  }
}
</script>
