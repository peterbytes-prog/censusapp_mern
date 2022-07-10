import React, { Component } from "react";
import { sortBy } from 'lodash';
import SearchComponent from './SearchComponent';

import Sorts from './Sorts';

const SORTS = {
  "none": (list) => list,
  city:{
    asc: (list) => sortBy(list, 'city'),
    dec: (list) => sortBy(list, 'city').reverse(),
  },
  population:{
    asc: (list) => sortBy(list, 'census'),
    dec: (list) => sortBy(list, 'census').reverse(),
  }
}
function sortFunction(list, sort, ord){
  return SORTS[sort][ord](list);
}
function sortsFunction(sorts, list){
  for(let key of Object.keys(sorts)){
    for(let ord of Object.keys(sorts[key])){
      if(sorts[key][ord]===true){
        list = sortFunction(list, key, ord);
        break;
      }
    }
  }
  return list
}
class Census extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            censuses: [],
            search: '',
            sorts:{
              city:{
                asc: false,
                dec: false
              },
              population:{
                asc: true,
                dec: false
              },
            }
        };
        this.handleSearch = this.handleSearch.bind(this);
        this.handleSort = this.handleSort.bind(this);
    }
    handleSort(name, ord){
      let cur = this.state.sorts[name];
      if( ord === 'asc'){
        cur['dec'] = false;
      }else if ( ord === 'dec') {
        cur['asc'] = false;
      }
      cur[ord] = !cur[ord];
      const sortCopy = {...this.state.sorts, [name]: cur};
      this.setState({censuses:sortsFunction(sortCopy, this.state.censuses), sorts:{...sortCopy}});
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
                      censuses:sortsFunction(this.state.sorts, data),
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
          const trs = censuses.map((s) => {
            return (<tr key={s._id}>
              <td>{s.city}</td>
              <td>{s.census}</td>
            </tr>)
          });
          return (
              <table>
                <thead>
                  <tr>
                    <th>City</th>
                    <th>Population</th>
                  </tr>
                </thead>
                <tbody>
                  {trs}
                </tbody>
              </table>

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
              <Sorts sorts={ this.state.sorts } handleSort = { this.handleSort }/>
            </div>
            <div>
              { this.renderResult() }
            </div>
          </div>
      )
    }
}
export default Census;
