import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {CopyToClipboard} from 'react-copy-to-clipboard';

class HardwareItem extends Component {
  render() {
  	const { id, category, manufacturer, product, model } = this.props.hardware
    return (
      <tr>
        <td>
          <CopyToClipboard text={'Hardware Model ' + id}>
            <span className="far fa-clipboard"></span>
          </CopyToClipboard>
        </td>
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
