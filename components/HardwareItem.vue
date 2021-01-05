<template>
  <tr>
    <td>
      Hardware Model {{ id }}
    </td>
    <td class="d-none d-sm-table-cell">
      {{ category }}
    </td>
    <td>
      {{ manufacturer }}
    </td>
    <td>
      {{ product }}
    </td>
    <td>
      {{ model }}
    </td>
  </tr>
</template>

<script>
export default {
  name: 'HardwareItem',
  props: {
    id: {
      type: Number,
      default: 0,
      required: true
    },
    category: {
      type: String,
      default: '',
      required: true
    },
    manufacturer: {
      type: String,
      default: '',
      required: true
    },
    product: {
      type: String,
      default: '',
      required: true
    },
    model: {
      type: String,
      default: '',
      required: true
    }
  }
}
</script>
