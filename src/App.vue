<template>
  <nav class="navbar">
    <div class="navbar-container">
      <h1 class="navbar-title">Mi Aplicación</h1>
      <ul class="navbar-links">
      </ul>
    </div>
  </nav>
  <div id="app" style="  border: 1px solid #ddd;  border-radius: 5px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <ProductList /> <!-- Aquí se incluye el nuevo componente -->    
  </div>
  <div id="app" style="background-color: #4CAF50; /* Verde */ ; padding: 30px ">
    <ProductTable />
  </div>
  <div id="app" style="padding: 30px; background-color: beige ; border-color: #4CAF50; border-radius: 2px">
    <XmlTreeView />
  </div>
</template>

<script>
import ProductList from './components/ProductList.vue'; // Importa el nuevo componente
import ProductTable from './components/ProductTable.vue';
import XmlTreeView from './components/XmlTreeView.vue';

export default {
  name: 'App',
  components: {
    ProductList, // Registra el nuevo componente
    ProductTable,
    XmlTreeView
  }

}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px; 
}
.navbar {
  background-color: #4CAF50; /* Verde */
  padding: 15px;
}

.navbar-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navbar-title {
  color: white;
  font-family: Arial, sans-serif;
  font-size: 24px;
}
</style>
