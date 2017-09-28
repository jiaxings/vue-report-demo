<template>
  <div class="report-view">
    <header><h2>{{ title }}</h2></header>
    <div class="container">
      <component :is="layout" :children="children"></component>
    </div>
    <footer></footer>
  </div>
</template>
<script>
import LinearLayout from '@/components/layouts/LinearLayout.vue'
// import BootstrapVue from 'bootstrap-vue'
import api from '@/api/api.js'

export default {
  data: function () {
    return {
      title: '',
      layout: '',
      children: []
    }
  },
  components: {
    LinearLayout
  },
  created: function () {
    var id = this.$route.params.id
    if (id) {
      api.reports.get(id).then((report) => {
        if (report) {
          console.log(`Got report ${JSON.stringify(report)}`)
          this.title = report.title
          this.layout = report.layout || 'linear-layout'
          this.children = report.components || []
        }
      })
    }
  }
}
</script>
<style>
.report-view header {
  margin-bottom: 5dip;
}
</style>
