<template>
  <div class="flex flex-col items-center">
    <h1 class="text-white text-2xl">Barcode Detector</h1>
    <div id="camera" class="relative" />
    <div>
      <div v-if="barcode && !product" class="flex flex-col items-center">
        <p class="text-white text-2xl">
          El codigo de barras <span class="font-bold">{{ barcode }}</span> no
          existe.
        </p>
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
export default {
  data() {
    return {
      initialBarcode: '',
      barcode: '',
      product: '',
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
    async getProductInformation() {
      try {
        const response = await fetch(`api/products/${this.initialBarcode}`)
        const data = await response.json()
        if (data) {
          this.product = data
          this.barcode = ''
          return
        }
        const responseUnregisted = await fetch('api/products/unregistered', {
          method: 'POST',
          body: JSON.stringify({ barcode: this.initialBarcode }),
        })
        await responseUnregisted.json()
        this.barcode = this.initialBarcode
        this.product = ''
      } catch (error) {
        console.log(error)
      }
    },
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
