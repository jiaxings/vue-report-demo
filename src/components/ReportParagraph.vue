<template>
  <p class="report-paragraph">{{ cooked }}</p>
</template>
<script>
import Mustache from 'mustache'

export default {
  name: 'report-paragraph',
  props: {
    content: {
      type: String,
      default: 'No Content'
    },
    data: {
      type: Object,
      required: true
    }
  },
  computed: {
    cooked: function () {
      return Mustache.render(this.content, this.data)
    }
  }
}
</script>
<style>
  .report-paragraph {
    text-align: left;
    text-indent: 2em;
  }
</style>
