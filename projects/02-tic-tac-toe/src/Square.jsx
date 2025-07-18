import React from 'react';

export function Square({children, index}){
 return (
  <div className='square'>
    {index}
    {children}
  </div>
 )
}