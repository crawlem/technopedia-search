<template>
  <div class="App">
    <div class="jumbotron pt-3 pb-3">
      <p class="lead">
        Search Technopedia software and hardware by manufacturer, product or both.
      </p>
      <hr class="my-4">
      <form class="Search" action="/" method="get">
        <div class="form-group form-inline">
          <label>
            <input v-model="manufacturer" name="manufacturer" class="form-control mr-sm-2" type="text" placeholder="Manufacturer">
          </label>
          <label>
            <input v-model="product" name="product" class="form-control mr-sm-2" type="text" placeholder="Product">
          </label>
          <label class="form-check form-check-inline">
            <input v-model="type" name="type" value="software" class="form-check-input" type="radio">
            Software
          </label>
          <label class="form-check form-check-inline">
            <input v-model="type" name="type" value="hardware" class="form-check-input" type="radio">
            Hardware
          </label>
        </div>
        <button class="btn btn-dark my-2 my-sm-0" type="submit">
          Search <i class="fas fa-search" />
        </button>
        <input type="hidden" name="offset" value="0">
      </form>
      <div class="result-summary mt-3">
        <p v-if="lastRow > 0 && !loading">
          Showing <FormattedNumber :number="firstRow" /> to <FormattedNumber :number="lastRow" /> of <strong><FormattedNumber :number="resultCount" /></strong> results
        </p>
        <p v-else-if="!loading">
          No results found
        </p>
      </div>
    </div>

    <div v-if="loading" class="loading container-fluid">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path d="M13.75 22c0 .966-.783 1.75-1.75 1.75s-1.75-.784-1.75-1.75.783-1.75 1.75-1.75 1.75.784 1.75 1.75zm-1.75-22c-1.104 0-2 .896-2 2s.896 2 2 2 2-.896 2-2-.896-2-2-2zm10 10.75c.689 0 1.249.561 1.249 1.25 0 .69-.56 1.25-1.249 1.25-.69 0-1.249-.559-1.249-1.25 0-.689.559-1.25 1.249-1.25zm-22 1.25c0 1.105.896 2 2 2s2-.895 2-2c0-1.104-.896-2-2-2s-2 .896-2 2zm19-8c.551 0 1 .449 1 1 0 .553-.449 1.002-1 1-.551 0-1-.447-1-.998 0-.553.449-1.002 1-1.002zm0 13.5c.828 0 1.5.672 1.5 1.5s-.672 1.501-1.502 1.5c-.826 0-1.498-.671-1.498-1.499 0-.829.672-1.501 1.5-1.501zm-14-14.5c1.104 0 2 .896 2 2s-.896 2-2.001 2c-1.103 0-1.999-.895-1.999-2s.896-2 2-2zm0 14c1.104 0 2 .896 2 2s-.896 2-2.001 2c-1.103 0-1.999-.895-1.999-2s.896-2 2-2z" />
      </svg>
      Loading...
    </div>

    <Pagination v-if="products.length > 0" :current-page="currentPage" :total-records="resultCount" :limit="limit" />
    <ResultList :type="type" :products="products" />
    <Pagination v-if="products.length > 0" :current-page="currentPage" :total-records="resultCount" :limit="limit" />
  </div>
</template>

<script>
import ResultList from '~/components/ResultList.vue'
import Pagination from '~/components/Pagination.vue'
import FormattedNumber from '~/components/FormattedNumber.vue'
export default {
  components: {
    ResultList,
    Pagination,
    FormattedNumber
  },
  data () {
    return {
      manufacturer: this.$route.query.manufacturer || '',
      product: this.$route.query.product || '',
      type: this.$route.query.type || 'software',
      products: [],
      limit: 50,
      offset: this.$route.query.offset || 0,
      pageLimit: 0,
      resultCount: 0,
      pageCount: 0,
      currentPage: 0,
      loading: false
    }
  },
  computed: {
    firstRow () {
      return this.offset + 1
    },
    lastRow () {
      return Math.min(this.offset + this.limit, this.resultCount)
    }
  },
  mounted () {
    if (this.manufacturer !== '' || this.product !== '') {
      this.search()
    }
  },
  methods: {
    async search () {
      // Show our loading holding content
      this.loading = true

      // Build the URL and parameters to pass to Technopedia
      const uri = this.type === 'software' ? 'software_extended/' : 'hardware_extended/'
      let queryParams = '?limit=' + this.limit + '&offset=' + this.offset + '&manufacturer__istartswith=' + this.manufacturer
      if (this.type === 'software') {
        queryParams += '&product_name__icontains=' + this.product + '&order_by=-version_order'
      } else {
        queryParams += '&product__icontains=' + this.product
      }

      // Call the API now
      const searchResponse = await this.$technopedia.get(uri + queryParams)
      const searchJson = await searchResponse.json()

      // Set the local meta values
      this.offset = searchJson.meta.offset
      this.resultCount = searchJson.meta.total_count
      this.pageCount = Math.ceil(searchJson.meta.total_count / searchJson.meta.limit)
      this.currentPage = (searchJson.meta.offset / searchJson.meta.limit) + 1

      // Set the local array of results
      this.products = searchJson[searchJson.meta.api_result_keyname]

      // Hide loading content
      this.loading = false
    }
  }
}
</script>
