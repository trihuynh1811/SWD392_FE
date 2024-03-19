import React from 'react';

export const TypeHubItem = (props) => {
  return (
    <div className='typehub-item'>
      <div className=''>
        <img className='w-[250px] h-[157px] object-cover' src={props.image} alt="" />
        <p className=''>{props.type}</p>
      </div>
    </div>
  );
};

export default TypeHubItem;