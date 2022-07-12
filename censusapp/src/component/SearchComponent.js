import React from 'react';



function SeachComponent({search, handleSearch, min, handleMin, max,  handleMax}){
  const onSearch = (event) =>{
    alert(event.target.value)
    handleSearch(event.target.value);
  }
  return(
    <div className='searchContainer'>
      <h4>Search</h4>
      <form>
        <label>
          <em>city:&nbsp;&nbsp;</em>
          <input type='text' value={search} onInput={onSearch}/>
        </label><br/>
        <label>
          <em>population:&nbsp;&nbsp;</em>
          <input value={ min } onInput={ (e)=> handleMin(e.target.value) } style={{'width':'5%'}} type='number' />
          <input value={ max } onInput={ (e)=> handleMax(e.target.value) } style={{'width':'5%'}} type='number' />
        </label><br/>
        <button>Search</button>
      </form>
    </div>
  )
}
export default SeachComponent;
