<template>
  <div>
    <h1>Lista de Productos registrados</h1>
  </div>
</template>

<script>
export default {
  name: 'Products',
  data() {
    return {
      products: [],
    }
  },
  async created() {
    const response = await fetch('api/products')
    const data = await response.json()
    this.products = data
  },
}
</script>
