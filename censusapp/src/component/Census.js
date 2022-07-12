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
            min: 1,
            max: 50000,
            page: 0,
            limit: 10,
            totalPages:0,
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
        this.handlePage = this.handlePage.bind(this);
        this.handleLimit = this.handleLimit.bind(this);
        this.handleMin = this.handleMin.bind(this);
        this.handleMax = this.handleMax.bind(this);
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
    handlePage(val){
      this.fecthData({page:val});
    }
    fecthData({search, page, limit, min, max}){
      //search resets page
      if(search){
        page = 1;
      }
      fetch(`http://localhost:8081/api/census?search=${search==undefined?this.state.search:search}&page=${page==undefined?this.state.page:page}&limit=${limit===undefined?this.state.limit:limit}&min=${min===undefined?this.state.min:min}&max=${max===undefined?this.state.max:max}`, {
          method:'GET'
      })
          .then(res => res.json())
          .then(
              (data) => {
                  this.setState({
                      isLoaded: true,
                      censuses:sortsFunction(this.state.sorts, data.census),
                      search: search==undefined?this.state.search:search,
                      page: page==undefined?this.state.page:page,
                      totalPages: data.totalPages,
                      limit:limit===undefined?this.state.limit:limit,
                      min:min===undefined?this.state.min:min,
                      max:max===undefined?this.state.max:max
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
      this.fecthData({search:val});
    }
    handleMax(val){
      this.fecthData({max:val});
    }
    handleMin(val){
      this.fecthData({min:val});
    }
    handleLimit(val){
      this.fecthData({limit:val});
    }
    // componentDidUpdate(){
    //   // this.fecthData();
    // }
    componentDidMount() {
        this.fecthData({});
    }
    paginate(){
      let pags = [];
      if(this.state.page>=3){
        pags.push(<button onClick={()=>this.handlePage(0)}>First</button>);
        for(let i=(this.state.page+1)-2; i<=Math.min((this.state.page+1)+2,this.state.totalPages); i++){
          pags.push(<button onClick={()=>this.handlePage(i-1)} className={this.state.page+1===i?'active':''} key={`page_${i}`}>{i}</button>);
        }
      }else{
        for(let i=1; i<=Math.min(5,this.state.totalPages); i++){
          pags.push(<button onClick={()=>this.handlePage(i-1)} className={this.state.page+1===i?'active':''} key={`page_${i}`}>{i}</button>);
        }
      }
      if(this.state.page<this.state.totalPages-1){
        pags.push(<button onClick={()=>this.handlePage(this.state.totalPages-1)}>Last</button>);
      }
      return (<div>{pags}</div>)
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
              <div>
                <table>
                  <thead>
                    <Sorts sorts={ this.state.sorts } handleSort = { this.handleSort }/>
                  </thead>
                  <tbody>
                    {trs}
                  </tbody>
                </table>
                <div className='paginationMenu' style={{marginTop:'2rem'}}>
                  { this.paginate() }
                  <div >
                    <h4>Limits: </h4>
                    <input type='number' onInput={(e)=>this.handleLimit(e.target.value)} step='1' value={this.state.limit}/>
                  </div>
                </div>
              </div>

          );
      }
    }
    render() {
        return (
          <div>
            <div>
              <div className='queryFilter'>
                <SearchComponent search={ this.state.search } handleSearch={ this.handleSearch } handleMax={this.handleMax} handleMin={this.handleMin}  max={ this.state['max'] } min={ this.state['min'] }/>
              </div>

            </div>
            <div>
              { this.renderResult() }
            </div>
          </div>
      )
    }
}
export default Census;
