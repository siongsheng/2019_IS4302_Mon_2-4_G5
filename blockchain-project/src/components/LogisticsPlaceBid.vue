<template>
  <div id='logisticsPlaceBid'>
    <h3>Place Bid</h3>
    <div class="row">
        <div class="row">
          <div class="input-field col s12">
            <label>Logistics ID: {{logistics.Id}}</label>
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
        <router-link to="/" class="btn grey">Cancel</router-link>
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
      logistics:{},
      port: '',
      bid:'',
      remark:''
    }
  },
  methods:{
    submitBid(bid){
      let logs = "org.deliverlor.ecommerce.Logistics#" + this.logistics.Id;
      let logReq = "org.deliverlor.ecommerce.LogisticsRequest#" + this.$route.params.logReq_id;

      axios.post('http://localhost:3000/' + firebase.auth().currentUser.email + '/offerTx', {
        "offerPrice": bid,
        "logistics": logs,
        "logisticsRequest": logReq,
        "remark": remark
      }).then((response) => {
        alert("success");
      })
      .catch((e) => {
        console.error(e)
      })

    }
  },
  mounted(){
    var self = this;
    axios.get('http://localhost:3000/' + firebase.auth().currentUser.email + '/logisticsrequest/'  + this.$route.params.logReq_id)
    .then((response) => {
      this.logReq = response.data.results;
    })
    .catch(error => {
      console.log(error);
    })
    axios.get('http://localhost:3000/' +  firebase.auth().currentUser.email + '/logistics')
    .then((response) => {
      //console.log(response.data.logs[0]);
      this.logistics = response.data.results.logs[0];
    })
    .catch(error => {
      console.log(error);
    })

  }
}
</script>
