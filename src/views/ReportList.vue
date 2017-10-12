<template>
    <div class="report-list-container">
        <h2>报表列表</h2>
        <ul class="report-list">
            <li v-if="error">{{error}}</li>
            <li is="report-list-item" v-for="report in reports" :report="report" :key="report.id">
            </li>
        </ul>
    </div>
</template>
<script>
import ReportListItem from '@/components/ReportListItem.vue'
import api from '@/api/api.js'

import KeywordFilter from '@/components/KeywordFilter'

export default {
  data: function () {
    return {
      reports: [],
      error: undefined,
      filter: null
    }
  },
  methods: {
    onFilter: function (keyword) {
      console.log('Filter event received: ' + keyword)
      this.filter = {'title': keyword}
    }
  },
  computed: {
    filtered: function () {
      let result = []
      let reports = [{id: 1, title: 'test report abc'}, {id: 2, title: 'test report def'}]
      reports.forEach(e => {
        if (this.filter && e.title.indexOf(this.filter['title']) !== -1) {
          result.push(e)
        }
      })
      return result
    }
  },
  components: {
    ReportListItem,
    KeywordFilter
  },
  created: function () {
    api.reports.list().then((value) => {
      console.log('Got reports: ' + JSON.stringify(value))
      this.reports = value
    }, err => {
      this.error = `List all reports failed(${err.message || 'unknown'}), Refresh to retry`
    })
  }
}
</script>
<style>
.report-list {
  list-style: none;
}
.report-list > li {
  line-height: 3em;
  vertical-align: middle;
  box-shadow: 2px 2px 3px #aaa;
  margin-bottom: 0.5em;
}
</style>
