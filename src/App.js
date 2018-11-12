import React, { Component } from 'react';
import http from 'axios'
import { createBrowserHistory } from "history";

import Results from './Results'
import Pagination from './Pagination'

window.apiUser = 'S65620180226'
window.apiKey = '39dec62aa2dfeed16d22a1d0e18f937c4f10774b'
window.softwareApiUrl = 'https://api.technopedia.com/api/v1/software_extended/?limit=50'

class App extends Component {
  constructor(props) {
    super(props)

    const searchParams = new URLSearchParams(window.location.search);

    this.state = {
      data: [],
      meta: '',
      
      manufacturer: searchParams.get('manufacturer') || '',
      product: searchParams.get('product') || '',

      offset: searchParams.get('offset') || 0,
      pageLimit: 50,
      resultCount: 0,
      pageCount: 0,
      currentPage: 1
    }

    // Bind 'this' within our functions
    this.searchSoftware = this.searchSoftware.bind(this)
    this.search = this.search.bind(this)
    this.changeManufacturer = this.changeManufacturer.bind(this)
    this.changeProduct = this.changeProduct.bind(this)
    this.onPageChanged = this.onPageChanged.bind(this)
  }

  componentDidMount() {
    if (this.state.manufacturer !== '' || this.state.product !== '') {
      this.searchSoftware(this.state.offset)
    }
  }

  searchSoftware(offset = 0) {
    http.get(window.softwareApiUrl + '&offset=' + offset + '&manufacturer__istartswith=' + this.state.manufacturer + '&product_name__icontains=' + this.state.product, {'headers': {'Authorization': 'apikey ' + window.apiUser + ':' + window.apiKey }}).then(res => {
        this.setState({
          data: res.data.software_extended_list,
          meta: res.data.meta,

          offset: res.data.meta.offset,
          pageLimit: res.data.meta.limit,
          resultCount: res.data.meta.total_count,
          pageCount: Math.ceil(res.data.meta.total_count / res.data.meta.limit),
          currentPage: (res.data.meta.offset / res.data.meta.limit) + 1
        })
      })

    // Change the URL so we can e.g. favourite link to search results
    const history = createBrowserHistory()
    history.push('/?manufacturer=' + this.state.manufacturer + '&product=' + this.state.product + '&offset=' + offset)
  }

  onPageChanged(pageState) {
    if (pageState.currentPage > 0) {
      this.searchSoftware((pageState.currentPage - 1) * this.state.pageLimit)
    }
  }

  search(e) {
    e.preventDefault()

    if (this.state.manufacturer !== '' || this.state.product !== '') {
      // Hit the Technopedia API
      this.searchSoftware()
    }
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
    const firstRow = this.state.offset + 1
    const lastRow = Math.min(this.state.offset + this.state.pageLimit, this.state.resultCount)
    const totalRecords = this.state.resultCount

    return (
      <div className="App">
        <header className="App-header">
          <nav className="navbar navbar-light bg-light">
            <span className="navbar-brand mb-0 h1"><i className="fas fa-database"></i> Technopedia Search</span>
          </nav>
        </header>

        <div className="jumbotron">
          <h1 className="display-5">Get started</h1>
          <p className="lead">Search Technopedia software and hardware by manufacturer, product or both.</p>
          <hr/>
          <form className="Search" onSubmit={this.search}>
            <div className="form-group form-inline">
              <label><input className="form-control mr-sm-2" type="text" placeholder="Manufacturer" value={this.state.manufacturer} onChange={this.changeManufacturer}/></label>
              <label><input className="form-control mr-sm-2" type="text" placeholder="Product" value={this.state.product} onChange={this.changeProduct}/></label>
              <label className="form-check form-check-inline"><input name="type" className="form-check-input" type="radio" defaultChecked/>Software</label>
              <label className="form-check form-check-inline"><input name="type" className="form-check-input" type="radio"/>Hardware</label>
            </div>
            <button className="btn btn-dark my-2 my-sm-0" type="submit">Search <i className="fas fa-search"></i></button>
          </form>
        </div>

        <Results data={this.state.data} />

        <div className="container-fluid">
          <Pagination totalRecords={totalRecords} pageLimit={50} pageNeighbours={2} onPageChanged={this.onPageChanged} />
          {totalRecords > 0 &&
            <p>{firstRow}-{lastRow} of {this.state.resultCount} results</p>
          }
        </div>
      </div>
    );
  }
}

export default App;
