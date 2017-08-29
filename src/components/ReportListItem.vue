<template>
    <li>
        <a v-bind:href="link">{{ report.title }}</a>
    </li>
</template>
<script>
export default {
  name: 'report-list-item',
  props: {
    report: {
      type: Object,
      required: true
    }
  },
  computed: {
    link: function () {
      return '#/reports/' + this.report.id
    }
  }
}
</script>
