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
      var report = api.reports.get(id)
      if (report) {
        this.title = report.title
        this.layout = report.template.component || 'linear-layout'
        this.children = report.template.children || []
      }
    }
  }
}
</script>
<style>
.report-view header {
  margin-bottom: 5dip;
}
</style>
