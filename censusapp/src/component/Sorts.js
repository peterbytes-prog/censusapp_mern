import React from 'react';



function SorterButton({name, sort, handleSort }){
  const {asc, dec} = sort;
  const onSort = (rel) =>{
    handleSort(name, rel);
  }
  return (
    <th className='sorts'>
      <div>
        <p>{name}</p>
        <div>
          <button onClick={()=>onSort('asc')} className={asc?'active':'non-active'} >&#8963;</button>
          <button onClick={()=>onSort('dec')} className={dec?'active':'non-active'} >&#8964;</button>
        </div>
      </div>
    </th>
  )
};

function Sorts({sorts, handleSort }){
  return (
    <tr className='sortsContainer'>
      {Object.keys(sorts).map((name)=> <SorterButton key={name} handleSort={handleSort} name={name} sort={sorts[name]}/>)}
    </tr>
  )
}

export default Sorts;
