<template>
  <div class="flex flex-col items-center">
    <h1 class="text-white text-2xl">Barcode App</h1>
    <div id="camera" class="relative" />
    <div>
      <div v-if="barcode && !product">
        <span class="text-white font-bold text-3xl"
          >El codigo de barras {{ barcode }} no existe.</span
        >
        <nuxt-link class="underline" to="/register">Registralo aquí</nuxt-link>
      </div>
      <div v-else-if="!barcode && product">
        <p class="text-white font-bold text-3xl">
          {{ product.title }} - {{ product.barcode }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import Quagga from 'quagga'
import { mapActions, mapState } from 'vuex'
import getProduct from '../api/getProduct'
export default {
  data() {
    return {
      initialBarcode: '',
    }
  },
  watch: {
    initialBarcode(newValue, oldValue) {
      if (oldValue !== newValue) {
        this.getProductInformation()
      }
    },
  },
  mounted() {
    Quagga.init(
      {
        inputStream: {
          name: 'Live',
          type: 'LiveStream',
          target: document.querySelector('#camera'),
          constraints: {
            width: 500,
            height: 500,
          },
        },
        decoder: {
          readers: ['ean_reader'],
        },
      },
      function (err) {
        if (err) {
          console.log(err)
          return
        }
        console.log('Initialization finished. Ready to start')
        Quagga.start()
      }
    )
    Quagga.onDetected((data) => {
      console.log(data)
      this.initialBarcode = data.codeResult.code
    })
  },
  methods: {
    ...mapActions(['getProduct']),
    async getProductInformation() {
      try {
        await getProduct(this.initialBarcode)
      } catch (error) {
        console.log(error)
      }
    },
  },
  computed: {
    ...mapState(['barcode', 'product']),
  },
}
</script>
<style>
canvas {
  @apply absolute;
  @apply top-0;
  @apply left-0;
}
</style>
