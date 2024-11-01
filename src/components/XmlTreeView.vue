<template>
  <div>
    <h2>Vista en Árbol XML</h2>
    <pre>{{ xmlTree }}</pre>
  </div>
</template>

<script>
import axios from 'axios';

// Cambia esto a la URL de tu ngrok activa

export default {
  data() {
    return {
      xmlTree: ""
    };
  },
  methods: {
    async fetchXmlTree() {
      try {
        const BASE_URL = "https://d992-2800-e2-280-1048-344f-5449-4334-3102.ngrok-free.app";

        const response = await axios.get("${BASE_URL}/api/products/xml", {
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