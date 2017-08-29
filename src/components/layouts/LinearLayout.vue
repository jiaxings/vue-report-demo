<template>
  <div class="linear-layout-container container">
    <div class="linear-layout-item row" v-for="(child, index) in children" :key="index">
      <chart v-if="child.component === 'chart'" :options="child.data"></chart>
      <component v-else :is="child.component" v-bind="child.data" striped="child.component == 'b-table'"></component>
    </div>
  </div>
</template>
<script>
import ECharts from 'vue-echarts'
import ReportParagraph from '@/components/ReportParagraph.vue'

export default {
  name: 'linear-layout',
  props: {
    children: {
      type: Array,
      required: true
    }
  },
  components: {
    chart: ECharts,
    'report-paragraph': ReportParagraph
  }
}
</script>
