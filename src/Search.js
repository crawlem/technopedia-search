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

    http.get(window.softwareApiUrl + '&manufacturer__istartswith=' + this.state.manufacturer + '&product_name__icontains=' + this.state.product, {'headers': {'Authorization': 'apikey ' + window.apiUser + ':' + window.apiKey }}).then(res => {
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
      <form className="Search form-inline" onSubmit={this.search}>
        <label><input className="form-control mr-sm-2" type="text" placeholder="Manufacturer" value={this.state.manufacturer} onChange={this.changeManufacturer}/></label>
        <label><input className="form-control mr-sm-2" type="text" placeholder="Product" value={this.state.product} onChange={this.changeProduct}/></label>
        <button className="btn btn-dark my-2 my-sm-0" type="submit">Search</button>
      </form>
    );
  }
}

export default Search;
