<template>
  <div id="buyerEditDeliveryRequest">
    <h3>Edit Desired Price</h3>
        <div class="row">
      <form @submit.prevent="updateLogReqPrice" class="col s12">
        <div class="row">
          <div class="input-field col s12">
            <input type="text" placeholder="Logistic Request ID#" v-model="logReq_id" required disabled>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="price" placeholder="Desired Price" required>
          </div>
        </div>
        <button type="submit" class="btn">Submit</button>
        <router-link to="/buyerDeliveryRequest" class="btn grey">Cancel</router-link>
      </form>
    </div>
  </div>
</template>
<script>
import firebase from 'firebase';
import axios from 'axios';
export default {
  name: 'BuyerEditDeliveryRequest',
  data () {
    return {
      logReq_id: null,
      price: null
    }
  },
  beforeRouteEnter (to, from, next) {
    console.log("in buyerEditDeliveryRequest.beforeRouteEnter()")
    next(vm => {
          vm.logReq_id =to.params.logReq_id
          // console.log(vm.logReq_id)
          axios.get('http://localhost:3000/' + firebase.auth().currentUser.email + '/logisticsrequest/' +to.params.logReq_id).then((response) => {
            // console.log("logistics request  before updating"+response.data.results)
            var logReq = response.data.results
            vm.price = logReq.desiredPrice
          })
        }
    )
  },
  methods: {
    updateLogReqPrice () { //TODO: @Anu test this method
      console.log("in updateLogReqPrice()")
      console.log("price: "+this.price)
      alert("click OK and wait a little...")
      console.log('http://localhost:3000/' + firebase.auth().currentUser.email + '/logisticsrequest/' +this.logReq_id)
      axios.put(
        'http://localhost:3000/' + firebase.auth().currentUser.email + '/logisticsrequest/' +this.logReq_id, 
        {
         "desiredPrice": this.price
        }).then((response)=>{
          console.log(response)
          alert("successfully updated")
          this.$router.push({name: 'buyerDeliveryRequest'})
        }
      ).catch(error => {
      console.log(error);
      alert("unknown error")
      this.$router.push({name: 'buyerDeliveryRequest'})
    })
    }
  },
  mounted(){
  }
}
</script>