import React from 'react';



function SorterButton({name, sort, handleSort }){
  const {asc, dec} = sort;
  const onSort = (rel) =>{
    handleSort(name, rel);
  }
  return (
    <div className='sorts'>
      <p>{name}</p>
      <div>
        <button onClick={()=>onSort('asc')} className={asc?'active':'non-active'} >&#8963;</button>
        <button onClick={()=>onSort('dec')} className={dec?'active':'non-active'} >&#8964;</button>
      </div>
    </div>
  )
};

function Sorts({sorts, handleSort }){
  return (
    <div className='sortsContainer'>
      <h5>Sort By: </h5>
      {Object.keys(sorts).map((name)=> <SorterButton key={name} handleSort={handleSort} name={name} sort={sorts[name]}/>)}
    </div>
  )
}

export default Sorts;
