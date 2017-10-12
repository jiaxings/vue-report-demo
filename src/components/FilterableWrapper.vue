<template>
  <div>
    <div>
      <component ref="filter" v-if="filter && filter.type" :is="filter.type" :setting="setting"></component>
    </div>
    <div>
      <slot ref="child">
      </slot>
    </div>
  </div>
</template>
<script>
import KeywordFilter from '@/components/KeywordFilter'

const filters = {
  keyword: 'keyword-filter'
}

export default {
  name: 'filterable-wrapper',
  props: {
    queries: {
      required: true,
      type: Array
    }
  },
  data: function () {
    return {
      filter: {},
      setting: {}
    }
  },
  methods: {
  },
  components: {
    KeywordFilter
  },
  created: function () {
    console.log('filterable wrapper created')
    if (this.queries && this.queries.length) {
      this.filter = this.queries[0]
      this.filter.type = filters[this.filter.type] || 'keyword-filter'
      this.setting = {
        'name': this.filter.name,
        'label': this.filter.label,
        'required': this.filter.required,
        'multiple': this.filter.multiple,
        'options': this.filter.options
      }
    }
  }
}
</script>
<style>

</style>
