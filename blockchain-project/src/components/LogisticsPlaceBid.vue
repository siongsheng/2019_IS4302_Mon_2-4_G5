<template>
  <div id='logisticsPlaceBid'>
    <h3>Place Bid</h3>
    <div class="row">
        <div class="row">
          <div class="input-field col s12">
            <label>Logistics ID: {{logistics_id}}</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <label>Order ID: {{logReq.Id}}</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s6">
            <input type="text" placeholder="Enter bid amount ($)" id="bid_amount" v-model="bid" required>
          </div>
          <div class="input-field col s6">
            <input type="text" placeholder="Remark" id="remark" v-model="remark" required>
          </div>
        </div>
        <button type="submit" class="btn" v-on:click="submitBid(bid)">Submit</button>
        <router-link to="/logisticsDeliveryRequest" class="btn grey">Cancel</router-link>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase';
import axios from 'axios';
export default {
  name: 'LogisticsPlaceBid',
  data () {
    return {
      logReq: {},
      logistics_id:'',
      bid:'',
      remark:''
    }
  },
  methods:{
    submitBid(bid){
      let logs = "org.deliverlor.ecommerce.Logistics#" + this.logistics_id;
      let logReq = "org.deliverlor.ecommerce.LogisticsRequest#" + this.$route.params.logReq_id;

      axios.post('http://localhost:3000/' + firebase.auth().currentUser.email + '/offerTx', {
        "offerPrice": bid,
        "logistics": logs,
        "logisticsRequest": logReq,
        "remark": remark.value
      }).then((response) => {
        alert("success");
        this.$router.push('/logisticsDeliveryRequestStatus')
      })
      .catch((e) => {
        alert("Bid is more than desired price!");
        console.error(e)
      })

    }
  },
  mounted(){
    var userEmail = firebase.auth().currentUser.email;
    axios.get('http://localhost:3000/' + firebase.auth().currentUser.email + '/logisticsrequest/'  + this.$route.params.logReq_id)
    .then((response) => {
      this.logReq = response.data.results;
    })
    .then((response) => {
      this.logistics_id = userEmail.substring(0, userEmail.length - 9)
    })
    .catch(error => {
      console.log(error);
    })


  }
}
</script>
