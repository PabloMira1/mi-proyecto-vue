<template>
  <div>
    <h2>Vista en Árbol XML</h2>
    <pre>{{ xmlTree }}</pre>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      xmlTree: ""
    };
  },
  methods: {
    async fetchXmlTree() {
      try {
        const response = await axios.get("http://localhost:8081/api/products/xml", {
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