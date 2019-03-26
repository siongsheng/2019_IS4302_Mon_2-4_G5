<template>
    <div align="center">
      <div class="table">
        <h3>Testing the server</h3>
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Product Name</th>
            <th>Product Price</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{Product.Id}}</td>
            <td>{{Product.name}}</td>
            <td>{{Product.price}}</td>
          </tr>
        </tbody>

      </div>

    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      Product: {}
    }
  },
  mounted(){
    axios.get('http://localhost:3000/hlf/api/org.deliverlor.ecommerce.Product')
    .then((response) => {
      console.log(response.data[0]);
      this.Product = response.data[0];
    })
    .catch(error => {
      console.log(error);
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
