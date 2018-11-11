import React, { Component } from 'react';
import SoftwareItem from './SoftwareItem'

class Results extends Component {
  render() {
    const softwareItems = this.props.data.map(software => {
      return <SoftwareItem
        key={software.id}
        software={software}
        />
    })

    return (
      <div className="Results">
        <p>Showing {this.props.meta.offset+1|0}-{this.props.meta.offset + this.props.meta.limit|0} of {this.props.meta.total_count|0} results.</p>
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
          <ul className="pagination pagination-sm">
            <li className="page-item"><a className="page-link" href="#">Previous</a></li>
            <li className="page-item"><a className="page-link" href="#">1</a></li>
            <li className="page-item"><a className="page-link" href="#">2</a></li>
            <li className="page-item"><a className="page-link" href="#">3</a></li>
            <li className="page-item"><a className="page-link" href="#">Next</a></li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default Results;
