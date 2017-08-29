<template>
    <div class="report-list-container">
        <h2>报表列表</h2>
        <ul>
            <li is="report-list-item" v-for="report in reports" :report="report" :key="report.id">
            </li>
        </ul>
    </div>
</template>
<script>
import ReportListItem from '@/components/ReportListItem.vue'
import api from '@/api/api.js'

export default {
  data: function () {
    return {
      reports: []
    }
  },
  components: {ReportListItem},
  created: function () {
    this.reports = api.reports.list()
  }
}
</script>
