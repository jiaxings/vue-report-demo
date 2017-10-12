<template>
  <div>
    <label :for="name">{{ label }}: </label>
    <input :id="name" :name="name" type="text" v-model.lazy="value" @change="onChange">
  </div>
</template>
<script>
export default {
  name: 'keyword-filter',
  props: [
    'setting'
  ],
  data: function () {
    return {
      value: '',
      name: 'keyword',
      label: 'Keyword'
    }
  },
  methods: {
    onChange: function (value, old) {
      console.log('filter keyword changed')
      let q = {}
      q[this.name] = this.value
      console.log(JSON.stringify(q))
      this.$emit('filter', q)
      // The custom event will not bubble up, so dispatch to the parent mannually
      this.$parent.$emit('filter', q)
    }
  },
  created: function () {
    console.log('keyword filter created')
    this.name = this.setting.name || 'keyword'
    this.label = this.setting.label || 'Keyword'
  }
}
</script>
<style>

</style>
