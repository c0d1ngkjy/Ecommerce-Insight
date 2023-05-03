<template>
  <q-page class="q-pa-sm column content-center justify-center">
    <q-card class="">
      <q-inner-loading :showing="loading" color="primary"></q-inner-loading>
      <q-card-section class="">
        <div id="chart" />
      </q-card-section>
    </q-card>
    <div class="text-caption text-grey fixed-bottom text-center">@all rights reserved codingkjy@gmail.com</div>
  </q-page>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue'
import { getProducts } from 'src/services/products';
import Plotly from 'plotly.js-dist';

export default defineComponent({
  name: 'IndexPage',
  setup() {
    const products = ref([]);
    const loading = ref()

    async function getDataFromFB() {
      loading.value = true
      const products = await getProducts();
      console.log(products);

      const data = [{
        x: products.map(p => p.name),
        y: products.map(p => p.price / 10000),
        type: 'bar',
        marker: {
          color: 'rgb(87,41,206)'
        },
      }];

      const layout = {
        title: 'Musinsa Product Prices',
        xaxis: {
          tickangle: -45
        },
        yaxis: {
          title: '가격(만원)'
        }
      };

      //displaymodebar : tgg plotly actions bar on top of chart
      Plotly.newPlot('chart', data, layout, { displayModeBar: false });
      loading.value = false
    }



    onMounted(() => {
      getDataFromFB()
    })

    return {
      loading
    }
  }
})
</script>
