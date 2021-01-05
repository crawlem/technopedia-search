<template>
  <tr>
    <td>
      Software Release {{ id }}
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
      {{ edition }}
    </td>
    <td>
      {{ versionGroup }}
    </td>
    <td>
      {{ version }}
    </td>
    <td>
      {{ patchLevel }}
    </td>
  </tr>
</template>

<script>
export default {
  name: 'SoftwareItem',
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
    edition: {
      type: String,
      default: ''
    },
    versionGroup: {
      type: String,
      default: ''
    },
    version: {
      type: String,
      default: ''
    },
    patchLevel: {
      type: String,
      default: ''
    }
  }
}
</script>
