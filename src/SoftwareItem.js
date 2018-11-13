import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SoftwareItem extends Component {
  render() {
  	const { id, category, manufacturer, product_name, version_group, version } = this.props.software
    return (
      <tr>
        <td>{id}</td>
        <td className="d-none d-sm-table-cell">{category}</td>
        <td>{manufacturer}</td>
        <td>{product_name}</td>
        <td>{version_group}</td>
        <td>{version}</td>
      </tr>
    );
  }
}

// This class expects these properties
SoftwareItem.propTypes = {
  software: PropTypes.object.isRequired
};

export default SoftwareItem;
