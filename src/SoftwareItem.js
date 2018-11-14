import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {CopyToClipboard} from 'react-copy-to-clipboard';

class SoftwareItem extends Component {
  render() {
  	const { id, category, manufacturer, product_name, edition, version_group, version, patchlevel } = this.props.software
    return (
      <tr>
        <td>
          <CopyToClipboard text={'Software Release ' + id}>
            <span className="far fa-clipboard"></span>
          </CopyToClipboard>
        </td>
        <td className="d-none d-sm-table-cell">{category}</td>
        <td>{manufacturer}</td>
        <td>{product_name}</td>
        <td>{edition}</td>
        <td>{version_group}</td>
        <td>{version}</td>
        <td>{patchlevel}</td>
      </tr>
    );
  }
}

// This class expects these properties
SoftwareItem.propTypes = {
  software: PropTypes.object.isRequired
};

export default SoftwareItem;
