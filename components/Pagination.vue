<template>
  <nav aria-label="Page navigation" class="container-fluid page-nav">
    <ul class="pagination">
      <li v-for="page in pageList" :key="page" class="page-item" :class="($route.query.offset == (page-1) * limit) ? 'active' : ''">
        <a v-if="page === 'LEFT'" :href="'/?manufacturer=' + $route.query.manufacturer + '&product=' + $route.query.product + '&type=' + $route.query.type + '&offset=' + (pageList[2] - 2) * limit" class="page-link" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
          <span class="sr-only">Previous</span>
        </a>
        <a v-else-if="page === 'RIGHT'" :href="'/?manufacturer=' + $route.query.manufacturer + '&product=' + $route.query.product + '&type=' + $route.query.type + '&offset=' + pageList[6] * limit" class="page-link" aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
          <span class="sr-only">Next</span>
        </a>
        <span v-else-if="($route.query.offset == (page-1) * limit)" class="page-link">{{ page }}</span>
        <a v-else class="page-link" :href="'/?manufacturer=' + $route.query.manufacturer + '&product=' + $route.query.product + '&type=' + $route.query.type + '&offset=' + (page-1) * limit">{{ page }}</a>
      </li>
    </ul>
  </nav>
</template>

<script>
const pageNeighbours = 2
const LEFT_PAGE = 'LEFT'
const RIGHT_PAGE = 'RIGHT'

export default {
  name: 'Pagination',
  props: {
    currentPage: {
      type: Number,
      default: 0,
      required: true
    },
    totalRecords: {
      type: Number,
      default: 0,
      required: true
    },
    limit: {
      type: Number,
      default: 0,
      required: true
    }
  },
  computed: {
    totalPages () {
      return Math.ceil(this.totalRecords / this.limit)
    },
    startPage () {
      return Math.max(2, this.currentPage - pageNeighbours)
    },
    endPage () {
      return Math.min(this.totalPages, this.currentPage + pageNeighbours)
    },
    pageList () {
      const totalPages = this.totalPages
      const currentPage = this.currentPage

      /**
       * totalNumbers: the total page numbers to show on the control
       * totalBlocks: totalNumbers + 2 to cover for the left(<) and right(>) controls
       */
      const totalNumbers = (pageNeighbours * 2) + 3
      const totalBlocks = totalNumbers + 2

      if (totalPages > totalBlocks) {
        const startPage = Math.max(2, currentPage - pageNeighbours)
        const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours)

        let pages = this.generateRange(startPage, endPage)

        /**
         * hasLeftSpill: has hidden pages to the left
         * hasRightSpill: has hidden pages to the right
         * spillOffset: number of hidden pages either to the left or to the right
         */
        const hasLeftSpill = startPage > 2
        const hasRightSpill = (totalPages - endPage) > 1
        const spillOffset = totalNumbers - (pages.length + 1)

        switch (true) {
          // handle: (1) < {5 6} [7] {8 9} (10)
          case (hasLeftSpill && !hasRightSpill): {
            const extraPages = this.generateRange(startPage - spillOffset, startPage - 1)
            pages = [LEFT_PAGE, ...extraPages, ...pages]
            break
          }

          // handle: (1) {2 3} [4] {5 6} > (10)
          case (!hasLeftSpill && hasRightSpill): {
            const extraPages = this.generateRange(endPage + 1, endPage + spillOffset)
            pages = [...pages, ...extraPages, RIGHT_PAGE]
            break
          }

          // handle: (1) < {4 5} [6] {7 8} > (10)
          case (hasLeftSpill && hasRightSpill):
          default: {
            pages = [LEFT_PAGE, ...pages, RIGHT_PAGE]
            break
          }
        }

        return [1, ...pages, totalPages]
      }

      return this.generateRange(1, this.endPage)
    }
  },
  methods: {
    generateRange (from, to, step = 1) {
      let i = from
      const range = []

      while (i <= to) {
        range.push(i)
        i += step
      }

      return range
    }
  }
}
</script>

<style>
  .page-link {
    color: rgb(52, 58, 64);
  }

  .page-item.active .page-link {
    background-color: rgb(52, 58, 64);
    border-color: rgb(52, 58, 64);
  }
</style>
