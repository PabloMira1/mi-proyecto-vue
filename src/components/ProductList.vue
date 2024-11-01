<template>
  <div class="product-list-container">
    <div class="product-list">
      <h2>Lista de Productos</h2>
      <div> 
        <button @click="openCreateForm" class="btn-new">Crear Nuevo Producto</button>
      </div>
      <div class="product-items">
        <div v-for="product in products" :key="product.id" class="product-item">
          <div class="product-info">
            <span class="product-name">{{ product.name }}</span>
            <span class="product-price">${{ product.price.toFixed(2) }}</span>
            <span class="product-category">Categoría: {{ product.category }}</span>
          </div>
          <div class="product-buttons">
            <button @click="editProduct(product)" class="btn-edit">Editar</button>
            <button @click="deleteProduct(product.id)" class="btn-delete">Eliminar</button>
          </div>
        </div>
      </div>
    </div>

     <!-- Formulario para crear o editar un producto, visible solo si showForm es true -->
     <div v-if="showForm" class="edit-form">
      <h3 v-if="selectedProduct">Editar Producto</h3>
      <h3 v-else>Crear Nuevo Producto</h3>
      <form @submit.prevent="selectedProduct ? updateProduct() : createProduct()">
        <div class="form-group">
          <label for="name">Nombre:</label>
          <input v-model="currentProduct.name" id="name" required />
        </div>
        <div class="form-group">
          <label for="price">Precio:</label>
          <input 
            type="number" 
            step="0.01" 
            v-model.number="currentProduct.price" 
            id="price" 
            required 
          />
        </div>
        <div class="form-group">
          <label for="category">Categoría:</label>
          <input 
            v-model="currentProduct.category" 
            id="category" 
            required 
          />
        </div>
        <div class="form-buttons">
          <button type="submit" class="btn-save">
            {{ selectedProduct ? 'Guardar Cambios' : 'Crear Producto' }}
          </button>
          <button @click="cancelEdit" type="button" class="btn-cancel">Cancelar</button>
        </div>
      </form>
    </div>

   

  </div>
</template>

<script>
import axios from 'axios';

// Cambia esto a la URL de tu ngrok activa

export default {
  data() {
    return {
      products: [],
      selectedProduct: null,  // Producto seleccionado para editar
      newProduct: {           // Datos para crear un nuevo producto
        name: '',
        price: 0.00,
        category: ''
      },
      showForm: false,         // Controla la visibilidad del formulario
    };
  },
  computed: {
    // currentProduct siempre será el producto en edición o el nuevo producto
    currentProduct() {
      return this.selectedProduct ? this.selectedProduct : this.newProduct;
    }
  },
  mounted() {
    this.fetchProducts();
  },
  methods: {
    async fetchProducts() {
      try {
        const BASE_URL = "https://d992-2800-e2-280-1048-344f-5449-4334-3102.ngrok-free.app";

        const response = await axios.get(`${BASE_URL}/api/products`);
        this.products = response.data;
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    },
    openCreateForm() {
      this.selectedProduct = null; // Limpiar el formulario de edición
      this.newProduct = { name: '', price: 0.00, category: '' }; // Resetear nuevo producto
      this.showForm = true; // Mostrar el formulario para crear
    },
    async createProduct() {
      try {
        const BASE_URL = "https://d992-2800-e2-280-1048-344f-5449-4334-3102.ngrok-free.app";

        await axios.post(`${BASE_URL}/api/products`, this.newProduct);
        this.fetchProducts(); // Recargar lista de productos
        this.newProduct = { name: '', price: 0.00, category: '' }; // Limpiar el formulario
        this.showForm = false; // Ocultar el formulario después de crear
      } catch (error) {
        console.error("Error creating product:", error);
      }
    },
    async updateProduct() {
      try {
        const BASE_URL = "https://d992-2800-e2-280-1048-344f-5449-4334-3102.ngrok-free.app";

        await axios.put(`${BASE_URL}/api/products/${this.selectedProduct.id}`, this.selectedProduct);
        this.fetchProducts(); // Recargar lista de productos
        this.selectedProduct = null;
        this.showForm = false; // Ocultar el formulario después de editar
      } catch (error) {
        console.error("Error updating product:", error);
      }
    },
    async deleteProduct(productId) {
      try {
        const BASE_URL = "https://d992-2800-e2-280-1048-344f-5449-4334-3102.ngrok-free.app";

        await axios.delete(`${BASE_URL}/api/products/${productId}`);
        this.fetchProducts(); // Recargar lista de productos
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    },
    cancelEdit() {
      this.selectedProduct = null; // Limpiar el formulario de edición
      this.showForm = false; // Ocultar el formulario al cancelar
    },
    editProduct(product) {
      this.selectedProduct = { ...product }; // Copiar los datos del producto seleccionado
      this.showForm = true; // Mostrar el formulario para editar
    }
  }
};
</script>


<style scoped>
.product-list-container {
  display: flex;
  gap: 20px; 
  max-height: 700px;  /* Establece el largo máximo */
  overflow-y: auto;   /* Añade scroll vertical si excede el largo */
  padding: 20px;
}

.product-list {
  flex: 4; /* 60% del ancho disponible */
  max-width: 700px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 5px;
  height: auto;
  
}

.product-info {
  display: flex;
  gap: 20px; /* Espacio entre columnas */
  margin-bottom: 10px; /* Espacio entre filas si es necesario */
}
.product-name,
.product-price,
.product-category {
  padding: 5px; /* Espacio interno para mejor apariencia */
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

.product-items {
  display: flex; /* Usar flexbox para mostrar los productos en línea */
  flex-wrap: wrap; /* Permitir que los elementos se envuelvan si no hay suficiente espacio */
  justify-content: space-between; /* Espacio entre los productos */
  padding: 0; /* Sin padding en el contenedor */
  margin: 0; /* Sin margen en el contenedor */
  list-style-type: none; /* Sin puntos en la lista */
}

.product-item {
  flex: 1 1 300px; /* Permitir que los elementos crezcan y ocupen espacio, mínimo 300px */
  display: flex; /* Usar flexbox para alinear la información y los botones horizontalmente */
  justify-content: space-between; /* Espacio entre la info y los botones */
  align-items: center; /* Centrar verticalmente el contenido */
  margin: 10px; /* Espacio entre productos */
  padding: 10px; /* Espacio interno en cada producto */
  border: 1px solid #ddd; /* Borde ligero alrededor de cada producto */
  border-radius: 5px; /* Bordes redondeados */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Sombra suave para un efecto 3D */
}

.product-info {
  display: flex;
  gap: 20px; /* Espacio entre columnas */
}

.product-name {
  font-weight: bold;
}

.product-price {
  color: #555;
}

.product-buttons {
  display: flex;
  gap: 5px;
}

.btn-edit,
.btn-delete,
.btn-save,
.btn-cancel {
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
}

.btn-new {
  margin: 20px;
  padding: 10px 15px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
}

.btn-edit {
  background-color: #4CAF50;
  color: white;
}

.btn-delete {
  background-color: #f44336;
  color: white;
}

.btn-save {
  background-color: #4CAF50;
  color: white;
}

.btn-cancel {
  background-color: #f44336;
  color: white;
}



.edit-form {
  flex: 1; /* 40% del ancho disponible */
/*  padding: 30px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);*/
  max-height: 350px;
  max-width: 350px;

  margin-top: 40px;
  padding: 40px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.form-buttons {
  display: flex;
  justify-content: space-between;
}
</style>
