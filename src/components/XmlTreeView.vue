<template>
  <div>
    <h2>Vista en Árbol XML</h2>
    <pre>{{ xmlTree }}</pre>
  </div>
</template>

<script>
import axios from 'axios';

// Cambia esto a la URL 
const BASE_URL = "http://192.168.1.53:8081";


export default {
  data() {
    return {
      xmlTree: ""
    };
  },
  methods: {
    async fetchXmlTree() {
      try {
        const response = await axios.get(`${BASE_URL}/api/products/xml`, {
          headers: { "Accept": "application/xml" }
        });
        this.xmlTree = response.data;
      } catch (error) {
        console.error("Error fetching XML tree:", error);
      }
    }
  },
  mounted() {
    this.fetchXmlTree();
  }
};
</script>