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
        <table class="table table-striped table-sm">
          <thead class="thead-light">
            <tr>
              <th>ID</th>
              <th>Category</th>
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
      </div>
    );
  }
}

export default Results;
