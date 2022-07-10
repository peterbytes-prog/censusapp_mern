import React from 'react';



function SeachComponent({search, handleSearch}){
  const onSearch = (event) =>{
    handleSearch(event.target.value);
  }
  return(
    <div className='searchContainer'>
      <form>
        <input type='text' value={search} onInput={onSearch}/>
        <button>Search</button>
      </form>
    </div>
  )
}
export default SeachComponent;
