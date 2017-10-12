<template>
  <div class="linear-layout-container container">
    <div class="linear-layout-item" v-for="(child, index) in children" :key="index">
      <chart v-if="child.type === 'chart'" :options="child.data"></chart>
      <component v-else :is="child.type" :options="child.options" v-bind="child.options.extra" striped="child.component == 'b-table'"></component>
    </div>
  </div>
</template>
<script>
import ECharts from 'vue-echarts'
import ReportParagraph from '@/components/ReportParagraph.vue'
import VeLine from 'v-charts/lib/line'
import VsLine from '@/components/VsLine'

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
    'report-paragraph': ReportParagraph,
    VeLine,
    VsLine
  },
  created: function () {
    console.log('LinearLayout created')
  }
}
</script>
