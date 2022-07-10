import React, { Component } from "react";
import SearchComponent from './SearchComponent';
class Census extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            censuses: [],
            search: ''
        };
        this.handleSearch = this.handleSearch.bind(this);
    }
    fecthData(search=""){
      fetch(`http://localhost:8081/api/census?search=${search}`, {
          method:'GET'
      })
          .then(res => res.json())
          .then(
              (data) => {
                  this.setState({
                      isLoaded: true,
                      censuses: data,
                      search: search
                  });
              },

              (error) => {
                  this.setState({
                      isLoaded: true,
                      search: search,
                      error
                  });
              }
          )
    }
    handleSearch(val){
      this.fecthData(val);
    }
    // componentDidUpdate(){
    //   // this.fecthData();
    // }
    componentDidMount() {
        this.fecthData();
    }
    renderResult(){
      const { error, isLoaded, censuses } = this.state;
      if (error) {
          return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
          return <div>Loading...</div>;
      } else {
          return (
              <ul>

          {censuses.map((s) => ((<li>{s.city}::{s.census}</li>)))}
              </ul>

          );
      }
    }
    render() {
        return (
          <div>
            <div>
              <SearchComponent search={ this.state.search } handleSearch={ this.handleSearch }/>
            </div>
            <div>
              { this.renderResult() }
            </div>
          </div>
      )
    }
}
export default Census;
