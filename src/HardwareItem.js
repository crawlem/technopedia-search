import React, { Component } from 'react';
import PropTypes from 'prop-types';

class HardwareItem extends Component {
  render() {
  	const { id, category, manufacturer, product, model } = this.props.hardware
    return (
      <tr>
        <td>{id}</td>
        <td className="d-none d-sm-table-cell">{category}</td>
        <td>{manufacturer}</td>
        <td>{product}</td>
        <td>{model}</td>
      </tr>
    );
  }
}

// This class expects these properties
HardwareItem.propTypes = {
  hardware: PropTypes.object.isRequired
};

export default HardwareItem;
