import React, { Component } from 'react';
import Search from './Search'
import Results from './Results'

window.apiUser = 'S65620180226'
window.apiKey = '39dec62aa2dfeed16d22a1d0e18f937c4f10774b'
window.softwareApiUrl = 'https://api.technopedia.com/api/v1/software_extended/?limit=50'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      meta: ''
    }
    this.changeData = this.changeData.bind(this)
  }

  changeData(newData, newMeta) {
    this.setState({
      data: newData,
      meta: newMeta
    })
  }

  render() {
    let results;

    if (this.state.meta != '') {
      results = <Results data={this.state.data} meta={this.state.meta}/>;
    } else {
      results = '';
    }

    return (
      <div className="App">
        <header className="App-header">
          <nav className="navbar navbar-light bg-light">
            <span className="navbar-brand mb-0 h1">Technopedia Search</span>
            <Search changeData={this.changeData}/>
          </nav>
        </header>

        {results}
      </div>
    );
  }
}

export default App;
