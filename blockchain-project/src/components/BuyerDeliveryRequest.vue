<template>
  <div id="buyerDeliveryRequest">
    <ul class="collection with-header">
      <li class="collection-header"><h4>Delivery Requests</h4></li>
      <li class="collection-item avatar">
      <img src="../assets/bag.jpg" alt="" class="circle">
      <span class="title">Order ID: XXX </span>
      <p>Product: Bag <br>
         Second Line
      </p>
      <!-- <a href="#!" class="secondary-content"><i class="material-icons">grade</i></a> -->
      <a href="#/buyerAcceptBid" class="secondary-content" onclick="">View</a>
    </li>
    <li class="collection-item avatar">
        <img src="../assets/shoe.jpg" alt="" class="circle">
      <span class="title">Order ID: XXX </span>
      <p>Product: Shoe <br>
         Second Line
      </p>
      <!-- <a href="#!" class="secondary-content"><i class="material-icons">grade</i></a> -->
      <a href="#/buyerAcceptBid" class="secondary-content" onclick="">View</a>
    </li>
    <li class="collection-item avatar">
        <img src="../assets/tshirt.jpg" alt="" class="circle">
      <span class="title">Order ID: XXX </span>
      <p>Product: T-Shirt <br>
         Second Line
      </p>
      <!-- <a href="#!" class="secondary-content"><i class="material-icons">grade</i></a> -->
      <a href="#/buyerAcceptBid" class="secondary-content" onclick="">View</a>
    </li>

      <!-- <li class="collection-header"><h4>Delivery Requests</h4></li>
      <li v-for="user in users" v-bind:key="user.id" class="collection-item">
        <div class="chip">{{user.id}}</div>
        <div class="chip">{{user.email}}</div>
        {{user.name}}, {{user.contact_number}}
          <router-link class="secondary-content" v-bind:to="{ name: 'view-user', params: { user_id: user.id }}"> -->

            <!-- <i class="fa fa-eye"></i>
          </router-link>
      </li> -->
    </ul>
  </div>
</template>
<script>

</script>
