<template>
  <div class="product-table">
    <h3>Filtrar por Categoría XML</h3>
    <select v-model="selectedCategory" @change="filterProducts" class="styled-select">
      <option value="">Selecciona una categoría</option> <!-- Opción por defecto -->
      <option v-for="category in categories" :key="category" :value="category">
        {{ category }}
      </option> 
    </select>

    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>Nombre del Producto</th>
            <th>Categoría</th>
            <th>Precio</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in filteredProducts" :key="product.id">
            <td>{{ product.name }}</td>
            <td>{{ product.category }}</td>
            <td>{{ formatCurrency(product.price) }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="summary">
      <h3>Resumen</h3>
      <p><strong>Valor Total de todos los productos:</strong> {{ formatCurrency(summary.totalValue) }}</p>
      <p><strong>Porcentaje de productos Cat 1 :</strong> {{ summary.percentage }}%</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

// Cambia esto a la URL de tu ngrok activa
const BASE_URL = "https://intuitive-joy-production-c7ae.up.railway.app";


export default {
  data() {
    return {
      products: [],
      summary: { totalValue: 0, percentage: 0 },
      selectedCategory: '',
      filteredProducts: [],
      categories: [], // Para almacenar las categorías únicas
    };
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await axios.get(`${BASE_URL}/api/products`);
        this.products = response.data;
        this.filteredProducts = this.products; // Establecer los productos filtrados
        this.getCategories(); // Obtener categorías después de cargar los productos
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    },
    async fetchSummary() {
      try {
        const response = await axios.get(`${BASE_URL}/api/products/summary`);
        this.summary = response.data;
      } catch (error) {
        console.error("Error fetching summary:", error);
      }
    },
    formatCurrency(value) {
      if (typeof value !== 'number') return value;
      return value.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' });
    },
    filterProducts() {
      this.filteredProducts = this.selectedCategory
        ? this.products.filter(product => product.category === this.selectedCategory)
        : this.products; // Si no hay selección, muestra todos los productos
    },
    getCategories() {
      const uniqueCategories = new Set(this.products.map(product => product.category));
      this.categories = Array.from(uniqueCategories);
    }
  },
  mounted() {
    this.fetchProducts();
    this.fetchSummary();
  }
};
</script>

<style scoped>
.product-table {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
}

.table-container {
  max-height: 550px;
  /* Establece el largo máximo */
  overflow-y: auto;
  /* Añade scroll vertical si excede el largo */
  margin-top: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: lightgreen;
  color: white;
}

tr:hover {
  background-color: #f1f1f1;
}

/* CSS */
.styled-select {
    padding: 8px 12px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #f8f9fa;
    color: #333;
    cursor: pointer;
    transition: all 0.3s ease;
    appearance: none;  /* Oculta la flecha en algunos navegadores */
    background-repeat: no-repeat;
    background-position: right 12px center;
    background-size: 16px;
}

.styled-select:hover {
    border-color: #999;
    background-color: #f1f3f5;
}

.styled-select:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}


.summary {
  margin-top: 20px;
  padding: 10px;
  border-top: 2px solid #d6a4a4;
  max-height: 200px;
}

.summary h3 {
  margin: 0 0 10px;
  color: #333;
}

.summary p {
  margin: 5px 0;
  font-size: 16px;
}
</style>
