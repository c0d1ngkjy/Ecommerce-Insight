<template>
  <q-page class="flex flex-center q-pa-sm">
    <q-card class="fit">
      <q-card-section  class="fit">Musinsa.com</q-card-section>
      <q-card-section class="fit">
        <div  class="fit" id="chart"></div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue'
import { getProducts } from 'src/services/products';
import * as d3 from 'd3';

export default defineComponent({
  name: 'IndexPage',
  setup() {
    const products = ref([]);

    async function getDataFromFB() {
      products.value = await getProducts();
      console.log(products.value);

      // Basic D3.js visualization
      const svg = d3.select('#chart')
        .append('svg')
        .attr('width', '90%')
        .attr('height',400);

      svg.selectAll('rect')
        .data(products.value)
        .enter()
        .append('rect')
        .attr('x', (d, i) => i * 70)
        .attr('y', (d) => 300 - Number(d.price) / 10000)
        .attr('width', 65)
        .attr('height', (d) => Number(d.price) / 10000)
        .attr('fill', 'skyblue');

        svg.selectAll('text')
        .data(products.value)
        .enter()
        .append('text')
        .text((d) => d.name)
        .attr('x', (d, i) => i * 70 + 32.5)
        .attr('y', (d) => 300 - d.price / 10000 - 5)
        .attr('text-anchor', 'middle')
        .attr('font-size', '10px')
        .attr('fill', 'black');
    }


    onMounted(() => {
      getDataFromFB()
    })
  }
})
</script>
