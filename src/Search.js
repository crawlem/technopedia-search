import React, { Component } from 'react';
import http from 'axios'

class Search extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      manufacturer: '',
      product: ''
    }

    this.search = this.search.bind(this)
    this.changeManufacturer = this.changeManufacturer.bind(this)
    this.changeProduct = this.changeProduct.bind(this)
  }

  search(e) {
    e.preventDefault()

    http.get(window.softwareApiUrl + '&manufacturer__istartswith=' + this.state.manufacturer + '&product_name__icontains=' + this.state.product, {'headers': {'Authorization': 'apikey S65620180226:39dec62aa2dfeed16d22a1d0e18f937c4f10774b' }}).then(res => {
      this.props.changeData(res.data.software_extended_list, res.data.meta)
    })
  }

  changeManufacturer(e) {
    this.setState({
      manufacturer: e.target.value
    })
  }

  changeProduct(e) {
    this.setState({
      product: e.target.value
    })
  }

  render() {
    return (
      <div className="Search">
        <form onSubmit={this.search}>
          <label><input type="text" placeholder="Manufacturer name" value={this.state.manufacturer} onChange={this.changeManufacturer}/></label>
          <label><input type="text" placeholder="Product name" value={this.state.product} onChange={this.changeProduct}/></label>
          <button type="submit">Search</button>
        </form>
      </div>
    );
  }
}

export default Search;
