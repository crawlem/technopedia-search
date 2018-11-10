import React, { Component } from 'react';

class SoftwareItem extends Component {
  render() {
  	const { id, category, manufacturer, brand_family, product_name, version_group, version } = this.props.software
    return (
      <tr>
        <td>{id}</td>
        <td>{category}</td>
        <td>{manufacturer}</td>
        <td>{product_name}</td>
        <td>{version_group}</td>
        <td>{version}</td>
      </tr>
    );
  }
}

export default SoftwareItem;
