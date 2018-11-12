import React, { Component } from 'react';
import http from 'axios'
import { createBrowserHistory } from "history";

class Search extends Component {
  constructor(props) {
    super(props)

    const searchParams = new URLSearchParams(window.location.search);
    
    this.state = {
      manufacturer: searchParams.get('manufacturer') || '',
      product: searchParams.get('product') || '',
      offset: searchParams.get('offset') || 0
    }

    this.search = this.search.bind(this)
    this.searchHandler = this.searchHandler.bind(this)
    this.changeManufacturer = this.changeManufacturer.bind(this)
    this.changeProduct = this.changeProduct.bind(this)
  }

  search() {
    if (this.state.manufacturer !== '' || this.state.product !== '') {
      http.get(window.softwareApiUrl + '&offset=' + this.state.offset + '&manufacturer__istartswith=' + this.state.manufacturer + '&product_name__icontains=' + this.state.product, {'headers': {'Authorization': 'apikey ' + window.apiUser + ':' + window.apiKey }}).then(res => {
        this.props.changeData(res.data.software_extended_list, res.data.meta)
        this.setState({
          offset: res.data.meta.offset
        })
      })
    }
  }

  componentDidMount() {
    if (this.state.manufacturer !== '' || this.state.product !== '') {
      this.search()
    }
  }

  searchHandler(e) {
    e.preventDefault()
    const history = createBrowserHistory()
    history.push('/?manufacturer=' + this.state.manufacturer + '&product=' + this.state.product)
    this.search()
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
      <form className="Search" onSubmit={this.searchHandler}>
        <div className="form-group form-inline">
          <label><input className="form-control mr-sm-2" type="text" placeholder="Manufacturer" value={this.state.manufacturer} onChange={this.changeManufacturer}/></label>
          <label><input className="form-control mr-sm-2" type="text" placeholder="Product" value={this.state.product} onChange={this.changeProduct}/></label>
          <label className="form-check form-check-inline"><input name="type" className="form-check-input" type="radio" defaultChecked/>Software</label>
          <label className="form-check form-check-inline"><input name="type" className="form-check-input" type="radio"/>Hardware</label>
        </div>
        <button className="btn btn-dark my-2 my-sm-0" type="submit">Search <i className="fas fa-search"></i></button>
      </form>
    );
  }
}

export default Search;
