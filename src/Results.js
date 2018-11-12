import React, { Component } from 'react';
import SoftwareItem from './SoftwareItem'

class Results extends Component {
  render() {
    const softwareItems = this.props.data.map(software => {
      return <SoftwareItem key={software.id} software={software}/>
    })

    // Pagination info
    const pageLimit = this.props.meta.limit
    const resultCount = this.props.meta.total_count
    const pageCount = Math.ceil(this.props.meta.total_count / pageLimit)
    const currentPage = (this.props.meta.offset / pageLimit) + 1
    
    // Result summary info
    const firstRow = this.props.meta.offset + 1
    const lastRow = Math.min(this.props.meta.offset + pageLimit, resultCount)

    return (
      <div className="Results">
        <p>Showing {firstRow}-{lastRow} of {resultCount} results.</p>
        <table className="table table-striped table-sm">
          <thead className="thead-light">
            <tr>
              <th>ID</th>
              <th className="d-none d-sm-table-cell">Category</th>
              <th>Manufacturer</th>
              <th>Product</th>
              <th>Version group</th>
              <th>Specific version</th>
            </tr>
            </thead>
          <tbody>
            {softwareItems}
          </tbody>
        </table>

        <nav>
          {currentPage} / {pageCount}
          <ul className="pagination pagination-sm">
            <li className="page-item"><a className="page-link" href="#">1</a></li>
            <li className="page-item"><a className="page-link" href="#">2</a></li>
            <li className="page-item"><a className="page-link" href="#">3</a></li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default Results;
