<template>
  <span>{{ formattedNumber }}</span>
</template>

<script>
export default {
  name: 'FormattedNumber',
  props: {
    number: {
      type: Number,
      default: 0,
      required: true
    }
  },
  computed: {
    formattedNumber () {
      return this.number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }
  }
}
</script>
