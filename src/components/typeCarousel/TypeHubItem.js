import React from 'react';
import { Link } from 'react-router-dom';

export const TypeHubItem = (props) => {
  return (
    <Link to={`/gallery?type=${props.typeId}`}>
      <div className='typehub-item'>
        <div className=''>
          <img className='w-[250px] h-[157px] object-cover' src={props.image} alt="" />
          <p className=''>{props.type}</p>
        </div>
      </div>
    </Link>
  );
};

export default TypeHubItem;