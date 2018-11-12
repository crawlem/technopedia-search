import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SoftwareItem from './SoftwareItem'

class Results extends Component {
  render() {
    const softwareItems = this.props.data.map(software => {
      return <SoftwareItem key={software.id} software={software}/>
    })

    if (!softwareItems.length > 0) {
      return ('');
    }

    return (
      <div className="Results container-fluid">
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
      </div>
    );
  }
}

// This class expects these properties
Results.propTypes = {
  data: PropTypes.array.isRequired
};

export default Results;
