<template>
  <filterable-wrapper :queries="queries" @filter="onFilter">
    <ve-line :data="data" :settings="setting"></ve-line>
  </filterable-wrapper>
</template>
<script>
import VeLine from 'v-charts/lib/line'
import FilterableWrapper from '@/components/FilterableWrapper'

export default {
  name: 'vs-line',
  components: {
    VeLine,
    FilterableWrapper
  },
  props: {
    options: {
      required: true
    }
  },
  data: function () {
    return {
      data: {},
      setting: {},
      queries: []
    }
  },
  watch: {
    options: function (value) {
      console.log(`options prop changed, new value: ${JSON.stringify(value)}`)
      this.update(this.options)
    }
  },
  computed: {
  },
  methods: {
    update: function (options, query) {
      if (!('data' in options)) {
        throw new Error('data property is required in options')
      }
      if ('url' in options.data) {
        this.loadData(query)
      } else {
        this.mapData(options.data)
      }
      let queries = options.data.queries
      if (queries && queries.length) {
        this.queries = queries
      }
    },
    loadData: function (query) {
      let url = this.options.data.url
      let q = query || {}
      console.log(JSON.stringify(q))
      let promise = this.$http.get(url, {'params': q})
      promise.then(resp => {
        return resp.json()
      }).then(json => {
        this.mapData(json)
      })
    },
    mapData: function (src) {
      if ('mapping' in this.options) {
        let mappings = this.options.mapping
        let mapped = {}
        let columns = []
        let rows = []
        let fields = mappings.fields || []
        fields.forEach(each => {
          columns.push(each.label)
        })
        mapped['columns'] = columns
        src.forEach((each, idx) => {
          let row = this.mapRow(each, columns)
          rows.push(row)
        })
        mapped['rows'] = rows
        this.data = mapped
        this.mapSettings(mappings, columns)
      } else {
        this.data = src
      }
      console.log(`VsLine data ${JSON.stringify(this.data)}`)
    },
    mapRow: function (values, columns) {
      let row = {}
      values.forEach((each, idx) => {
        let column = columns[idx] || `column${idx}`
        row[column] = each
      })
      return row
    },
    mapSettings: function (mappings, columns) {
      let mapped = {}
      if ('dimension' in mappings) {
        let dimensions = []
        mappings.dimension.forEach(each => {
          dimensions.push(columns[each])
        })
        mapped['dimension'] = dimensions
      }
      if ('metrics' in mappings) {
        let metrics = []
        mappings.metrics.forEach(each => {
          metrics.push(columns[each])
        })
        mapped['metrics'] = metrics
      }
      if ('yAxises' in mappings) {
        let types = []
        let names = []
        let rightMetrics = []
        mappings.yAxises.forEach((each, idx) => {
          types.push(each.type || 'value')
          names.push(each.name || '')
          if ('metrics' in each) {
            if (each.position === 'right') {
              let cols = []
              each.metrics.forEach(each => {
                cols.push(columns[each])
              })
              rightMetrics = rightMetrics.concat(cols)
              console.log(`found right y axis ${JSON.stringify(each)}, columns ${JSON.stringify(rightMetrics)}`)
            }
          }
        })
        mapped['yAxisType'] = types
        if (names) {
          mapped['yAxisName'] = names
        }
        if (rightMetrics) {
          mapped['axisSite'] = {right: rightMetrics}
        }
      }

      if ('extra' in mappings) {
        Object.keys(mappings.extra).forEach(each => {
          mapped[each] = mappings.extra[each]
        })
      }

      this.setting = mapped
      console.log(`VsLine setting ${JSON.stringify(this.setting)}`)
    },
    onFilter: function (query) {
      console.log('vs-line on filter')
      console.log(JSON.stringify(query))
      this.update(this.options, query)
    }
  },
  created: function () {
    console.log('created')
    this.update(this.options)
  }
}
</script>

