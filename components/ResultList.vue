<template>
  <div class="results container-fluid">
    <table v-if="products.length" class="table table-striped table-sm">
      <thead class="thead-light">
        <tr>
          <th>
            ID
          </th>
          <th class="d-none d-sm-table-cell">
            Category
          </th>
          <th>
            Manufacturer
          </th>
          <th>
            Product
          </th>
          <th v-if="$route.query.type === 'software'">
            Edition
          </th>
          <th v-if="$route.query.type === 'software'">
            Version group
          </th>
          <th>
            {{ modelColName }}
          </th>
          <th v-if="$route.query.type === 'software'">
            Patch
          </th>
        </tr>
      </thead>
      <tbody v-if="$route.query.type === 'hardware'">
        <HardwareItem
          v-for="item in products"
          :id="item.id"
          :key="item.id"
          :category="item.category"
          :manufacturer="item.manufacturer"
          :product="item.product"
          :model="item.model"
        />
      </tbody>
      <tbody v-if="$route.query.type === 'software'">
        <SoftwareItem
          v-for="item in products"
          :id="item.id"
          :key="item.id"
          :category="item.category"
          :manufacturer="item.manufacturer"
          :product="item.product_name"
          :edition="item.edition"
          :version-group="item.version_group"
          :version="item.version"
          :patch-level="item.patchlevel"
        />
      </tbody>
    </table>
  </div>
</template>

<script>
import HardwareItem from '~/components/HardwareItem.vue'
import SoftwareItem from '~/components/SoftwareItem.vue'
export default {
  name: 'Results',
  components: {
    HardwareItem,
    SoftwareItem
  },
  props: {
    type: {
      type: String,
      default: 'software',
      required: true
    },
    products: {
      type: Array,
      default () {
        return []
      },
      required: true
    }
  },
  computed: {
    modelColName () {
      return this.$route.query.type === 'software' ? 'Version' : 'Model'
    }
  }
}
</script>
