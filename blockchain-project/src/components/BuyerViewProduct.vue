<template>
  <div id="buyerViewProduct">
    <h2 class="header">Products</h2>
    <div class="row">
    <div class="col s4">
      <div class="card">
        <div class="card-image">
          <img src="../assets/bag.jpg">
        </div>
        <div class="card-content">
          <span class="card-title">Product Name</span>
          <p>Price: $10 <br>
             Description: I am a very simple card. I am good at containing small bits of information.<br>
             Quantity Available: 10</p>


        </div>
        <div class="card-action">
          <select class="browser-default">
            <option value="" disabled selected>Select quantity</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
          <!-- <a href="#">This is a link</a> -->
          <br>
          <!--To replace correct onclick function -->
          <button class="btn waves-effect waves-light" onclick='btnTradeMarble(\""+row.marbleId+"\")'>Submit Order</button>

        </div>
      </div>
    </div>

    <div class="col s4">
      <div class="card">
        <div class="card-image">
          <img src="../assets/shoe.jpg">

        </div>
        <div class="card-content">
          <span class="card-title">Product Name</span>
          <p>Price: $10 <br>
             Description: I am a very simple card. I am good at containing small bits of information.<br>
             Quantity Available: 10</p>
        </div>
        <div class="card-action">
          <select class="browser-default">
            <option value="" disabled selected>Select quantity</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
          <!-- <a href="#">This is a link</a> -->
          <br>
          <button class="btn waves-effect waves-light" onclick="">Submit Order</button>
        </div>
      </div>
    </div>

    <div class="col s4">
      <div class="card">
        <div class="card-image">
          <img src="../assets/tshirt.jpg">
        </div>
        <div class="card-content">
          <span class="card-title">Product Name</span>
          <p>Price: $10 <br>
             Description: I am a very simple card. I am good at containing small bits of information.<br>
             Quantity Available: 10</p>
        </div>
        <div class="card-action">
          <select class="browser-default">
            <option value="" disabled selected>Select quantity</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
          <!-- <a href="#">This is a link</a> -->
          <br>
          <button class="btn waves-effect waves-light" onclick="">Submit Order</button>
        </div>
      </div>
    </div>
  </div>
      <p id="demo"></p>
  </div>
</template>
<script>
// FOR REFERENCE (DELETE AFTER USE) Example from lab 4
function btnTradeMarble(marbleId){
        let newOwnerId = $('#select-'+marbleId).val();
        $.ajax({
            method: "POST",
            url: "/hlf/api/org.hyperledger_composer.marbles.TradeMarble",
            data: {
                "$class": "org.hyperledger_composer.marbles.TradeMarble",
                "marble": "org.hyperledger_composer.marbles.Marble#"+marbleId,
                "newOwner": newOwnerId
            }
        }).done(function(msg) {
            console.log(msg);
            location.reload();
        }).fail(function() {
            alert("Error performing trade");
        })
    }
</script>
