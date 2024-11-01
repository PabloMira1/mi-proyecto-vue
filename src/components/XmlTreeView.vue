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
        const response = await axios.get("http://71dc-2800-e2-280-1048-344f-5449-4334-3102.ngrok-free.app/api/products/xml", {
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