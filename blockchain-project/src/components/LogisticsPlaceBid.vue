<template>
  <div id='logisticsPlaceBid'>
    <h3>Place Bid</h3>
    <div class="row">
        <div class="row">
          <div class="input-field col s12">
            <label>Logistics ID: 111</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <label>Order ID: 001</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s6">
            <input type="text" placeholder="Enter bid amount" id="bid_amount" v-model="bid" required>

          </div>
        </div>
        <button type="submit" class="btn" onclick="">Submit</button>
        <router-link to="/" class="btn grey">Cancel</router-link>
    </div>
  </div>
</template>

<script>

</script>
