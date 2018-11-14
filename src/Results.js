import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SoftwareItem from './SoftwareItem'
import HardwareItem from './HardwareItem'

class Results extends Component {
  render() {
    const items = this.props.data.map(item => {
      if (this.props.type === 'software') {
        return <SoftwareItem key={item.id} software={item}/>
      } else {
        return <HardwareItem key={item.id} hardware={item}/>
      }
    })

    if (!items.length > 0) {
      return ('');
    }

    const modelColName = this.props.type === 'software'? 'Version' : 'Model'

    return (
      <div className="Results container-fluid">
        <table className="table table-striped table-sm">
          <thead className="thead-light">
            <tr>
              <th>ID</th>
              <th className="d-none d-sm-table-cell">Category</th>
              <th>Manufacturer</th>
              <th>Product</th>
              {this.props.type === 'software' &&
                <th>Edition</th>
              }
              {this.props.type === 'software' &&
                <th>Version group</th>
              }
              <th>{modelColName}</th>
              {this.props.type === 'software' &&
                <th>Patch</th>
              }
            </tr>
            </thead>
          <tbody>
            {items}
          </tbody>
        </table>
      </div>
    );
  }
}

// This class expects these properties
Results.propTypes = {
  type: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired
};

export default Results;
