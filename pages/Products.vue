<template>
  <div class="flex flex-col items-center">
    <h1 class="text-3xl text-bold">Lista de Productos no registrados</h1>
    <table v-if="products.length > 0" class="table-auto">
      <thead>
        <tr>
          <th class="px-4 py-2">Barcode</th>
          <th class="px-4 py-2">Fecha de Registro</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td class="border px-4 py-2">{{ product.barcode }}</td>
          <td class="border px-4 py-2">{{ product.createdAt }}</td>
        </tr>
      </tbody>
    </table>
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
    const response = await fetch('api/unregistered')
    const data = await response.json()
    this.products = data
  },
}
</script>
